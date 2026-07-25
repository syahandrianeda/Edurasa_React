import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getNumberFromString } from "~/lib/get-number";
import { selectAllSiswaDTO } from "./data-siswa-aktif";
import { FokusRombelKeuangan } from "./rombel-tabungan-selector";

/**
 * @info Data siswa rombel berdasarkan kelas aksesnya (bukan fokusRombel/kelas ampu)
 * @returns type: SiswaType[]
 */
export const DataCustomerSiswaCurrentRombel = createSelector(
    [
        selectAllSiswaDTO,
        FokusRombelKeuangan
        // (state: RootState) => state.fokusKategoriKeuangan?.value?.rombel
    ],
    (allSiswa, fokusRombel) => {
        if (!fokusRombel) return [];

    return allSiswa.filter(
        s =>
            s.aktif === "aktif" &&
            s.nama_rombel === fokusRombel.rombel &&
            s.jenjang === getNumberFromString(fokusRombel.rombel)
    );
  }
);
