import { describe, expect, it } from "vitest";
import GroupPrefixInduk from "~/domain/buku-induk/infrastructures/group-prefix-induk";
import aJson from '../fixtures/siswa-nis-a.json';
import bJson from '../fixtures/siswa-nis-b.json';
import cJson from '../fixtures/siswa-valid-nis-invalid-nisn.json'
import dataIndukKosong from '../fixtures/siswa-nis-empty.json';
import type { SiswaType } from "~/types/siswa";
import { DTOSiswa } from "~/dtos/dto-siswa";

describe("GroupPrefixInduk", () => {
    const dataInduk1516 = DTOSiswa.fromApiArray(aJson);
    const dataInduk1516InvalidNisn = DTOSiswa.fromApiArray(cJson);
    const dataInduk2122= DTOSiswa.fromApiArray(bJson);
    const dataKosong= DTOSiswa.fromApiArray(dataIndukKosong);
    const service = new GroupPrefixInduk();
    const duaGrupNisValid:SiswaType[] = [...dataInduk1516, ...dataInduk2122]
    const duaGrupNisValidKosong:SiswaType[] = [...dataKosong, ...dataInduk2122]

    it("mengelompokkan berdasarkan 4 digit awal NIS", () => {
        const result = service.group(duaGrupNisValid)
        // const result = service.group([
        //   {
        //     id: 1,
        //     jenjang: 1,
        //     nama_rombel: "A",
        //     nis: "202500001",
        //     nisn: "1234567890",
        //     pd_nama: "Andi",
        //     pd_jk: "L",
        //   },
        //   {
        //     id: 2,
        //     jenjang: 1,
        //     nama_rombel: "A",
        //     nis: "202500002",
        //     nisn: "1234567891",
        //     pd_nama: "Budi",
        //     pd_jk: "L",
        //   },
        //   {
        //     id: 3,
        //     jenjang: 1,
        //     nama_rombel: "A",
        //     nis: "202600001",
        //     nisn: "1234567892",
        //     pd_nama: "Caca",
        //     pd_jk: "P",
        //   },
        // ]);

        expect(result).toHaveLength(2);

        expect(result[0].groupNis).toBe("1516");
        expect(result[0].data).toHaveLength(2);

        expect(result[1].groupNis).toBe("2122");
        expect(result[1].data).toHaveLength(2);
    });

    it("NIS tidak valid masuk group 'kosong'", () => {

        const result = service.group(dataKosong);

        expect(result).toHaveLength(1);
        expect(result[0].data).toHaveLength(2);

        expect(result[0].groupNis).toBe("kosong");
    });

  it("summary menghitung invalid NIS", () => {

    const result = service.group(dataKosong);

    expect(result[0].summary).toEqual({
      countInvalid: 2,
      countInvalidNis: 2,
      countInvalidNisn: 0,
      countInvalidNisDuplicate: 0,
      countInvalidNisnDuplicate: 0,
    });
  });

  it("summary menghitung invalid NISN", () => {

    const result = service.group(dataInduk1516InvalidNisn);

    expect(result[0].summary).toEqual({
      countInvalid: 1,
      countInvalidNis: 0,
      countInvalidNisn: 1,
      
      countInvalidNisDuplicate: 0,
      countInvalidNisnDuplicate: 0,
    });
  });

//   it("summary menghitung invalid NIS dan NISN", () => {

//     const result = service.group([
//       {
//         id: 1,
//         jenjang: 1,
//         nama_rombel: "A",
//         nis: "",
//         nisn: "",
//         pd_nama: "Andi",
//         pd_jk: "L",
//       },
//     ]);

//     expect(result[0].summary).toEqual({
//       countInvalid: 2,
//       countInvalidNis: 1,
//       countInvalidNisn: 1,
//     });
//   });

//   it("menghasilkan validation pada setiap siswa", () => {

//     const result = service.group([
//       {
//         id: 1,
//         jenjang: 1,
//         nama_rombel: "A",
//         nis: "",
//         nisn: "",
//         pd_nama: "Andi",
//         pd_jk: "L",
//       },
//     ]);

//     expect(result[0].data[0].validation.isValid).toBe(false);

//     expect(result[0].data[0].validation.errors).toEqual({
//       nis: "NIS harus berupa angka sebanyak 9 digit.",
//       nisn: "NISN harus berupa angka sebanyak 10 digit.",
//     });
//   });

});