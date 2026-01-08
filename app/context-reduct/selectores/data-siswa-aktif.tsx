import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getNumberFromString } from "~/lib/get-number";
import { DTOSiswa } from "~/dtos/dto-siswa";

export const selectAllSiswa = (state: RootState) =>
  state.dataSiswa.allSiswa;

export const selectAllSiswaDTO = createSelector(
  [selectAllSiswa],
  (dtos) => DTOSiswa.fromApiArray(dtos)
);

export const DataSiswaAktifRombel = createSelector(
  [
    // (state: RootState) => state.dataSiswa.allSiswa,
    selectAllSiswaDTO,
    (state: RootState) => state.fokusRombel.value,
  ],
  (allSiswa, fokusRombel) => {
    if (!fokusRombel) return [];

    return allSiswa.filter(
      s =>
        s.aktif === "aktif" &&
        s.nama_rombel === fokusRombel &&
        s.jenjang === getNumberFromString(fokusRombel)
    );
  }
);
