import { describe, expect, it } from "vitest";
import GroupPrefixInduk from "~/domain/buku-induk/infrastructures/group-prefix-induk";
import DuplicateNis from "~/domain/buku-induk/ValidateNis/DuplicateNis";
import type { SiswaType } from "~/types/siswa";

// import GroupPrefixNis from "~/domain/grouping/GroupPrefixNis";
// import DuplicateNis from "~/domain/validation/DuplicateNis";

describe("DuplicateNis", () => {

  const grouping = new GroupPrefixInduk();
  const duplicate = new DuplicateNis();

  it("tidak ada duplicate", () => {

    const grouped = grouping.group([
      {
        id:1,
        jenjang:1,
        nama_rombel:"A",
        nis:"202500001",
        nisn:"1111111111",
        pd_nama:"Andi",
        pd_jk:"L",
      },
      {
        id:2,
        jenjang:1,
        nama_rombel:"A",
        nis:"202500002",
        nisn:"2222222222",
        pd_nama:"Budi",
        pd_jk:"L",
      },
    ] as SiswaType[]);

    const result = duplicate.validate(grouped);

    expect(result[0].data[0].validation.duplicate.nis).toBeUndefined();
    expect(result[0].data[1].validation.duplicate.nis).toBeUndefined();

  });

  it("mendeteksi duplicate", () => {

    const grouped = grouping.group([
      {
        id:1,
        jenjang:1,
        nama_rombel:"A",
        nis:"202500001",
        nisn:"1111111111",
        pd_nama:"Andi",
        pd_jk:"L",
      },
      {
        id:2,
        jenjang:1,
        nama_rombel:"A",
        nis:"202500001",
        nisn:"2222222222",
        pd_nama:"Budi",
        pd_jk:"L",
      },
    ] as SiswaType[]);

    const result = duplicate.validate(grouped);

    expect(result[0].data[0].validation.duplicate.nis).toEqual({
      value:"202500001",
      withIds:[1,2],
      withNames:["Andi","Budi"],
    });

    expect(result[0].data[1].validation.duplicate.nis).toEqual({
      value:"202500001",
      withIds:[1,2],
      withNames:["Andi","Budi"],
    });

  });

  it("mengabaikan NIS yang formatnya tidak valid", () => {

    const grouped = grouping.group([
      {
        id:1,
        jenjang:1,
        nama_rombel:"A",
        nis:"",
        nisn:"1111111111",
        pd_nama:"Andi",
        pd_jk:"L",
      },
      {
        id:2,
        jenjang:1,
        nama_rombel:"A",
        nis:"121523e334",
        nisn:"2222222222",
        pd_nama:"Budi",
        pd_jk:"L",
      },
    ] as SiswaType[]);

    const result = duplicate.validate(grouped);

    expect(result[0].data[0].validation.duplicate.nis).toBeUndefined();
    expect(result[0].data[1].validation.duplicate.nis).toBeUndefined();

  });

});