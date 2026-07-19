import { describe, expect, it } from "vitest";
import GroupPrefixInduk from "~/domain/buku-induk/infrastructures/group-prefix-induk";
import DuplicateNisn from "~/domain/buku-induk/ValidateNis/DuplicateNisn";

// import GroupPrefixNis from "~/domain/grouping/GroupPrefixNis";
// import DuplicateNisn from "~/domain/validation/DuplicateNisn";

describe("DuplicateNisn", () => {

  const grouping = new GroupPrefixInduk();
  const duplicate = new DuplicateNisn();

  it("tidak ada duplicate NISN", () => {

    const grouped = grouping.group([
      {
        id: 1,
        jenjang: 1,
        nama_rombel: "A",
        nis: "202500001",
        nisn: "1111111111",
        pd_nama: "Andi",
        pd_jk: "L",
      },
      {
        id: 2,
        jenjang: 1,
        nama_rombel: "A",
        nis: "202500002",
        nisn: "2222222222",
        pd_nama: "Budi",
        pd_jk: "L",
      },
    ]);

    const result = duplicate.validate(grouped);

    expect(result[0].data[0].validation.duplicate.nisn).toBeUndefined();
    expect(result[0].data[1].validation.duplicate.nisn).toBeUndefined();

  });

  it("mendeteksi duplicate NISN", () => {

    const grouped = grouping.group([
      {
        id: 1,
        jenjang: 1,
        nama_rombel: "A",
        nis: "202500001",
        nisn: "1111111111",
        pd_nama: "Andi",
        pd_jk: "L",
      },
      {
        id: 2,
        jenjang: 1,
        nama_rombel: "A",
        nis: "202500002",
        nisn: "1111111111",
        pd_nama: "Budi",
        pd_jk: "L",
      },
    ]);

    const result = duplicate.validate(grouped);

    expect(result[0].data[0].validation.duplicate.nisn).toEqual({
      value: "1111111111",
      withIds: [1, 2],
      withNames: ["Andi", "Budi"],
    });

    expect(result[0].data[1].validation.duplicate.nisn).toEqual({
      value: "1111111111",
      withIds: [1, 2],
      withNames: ["Andi", "Budi"],
    });

  });

  it("mengabaikan NISN yang formatnya tidak valid", () => {

    const grouped = grouping.group([
      {
        id: 1,
        jenjang: 1,
        nama_rombel: "A",
        nis: "202500001",
        nisn: "",
        pd_nama: "Andi",
        pd_jk: "L",
      },
      {
        id: 2,
        jenjang: 1,
        nama_rombel: "A",
        nis: "202500002",
        nisn: "",
        pd_nama: "Budi",
        pd_jk: "L",
      },
    ]);

    const result = duplicate.validate(grouped);

    expect(result[0].data[0].validation.duplicate.nisn).toBeUndefined();
    expect(result[0].data[1].validation.duplicate.nisn).toBeUndefined();

  });

});