// import { createSelector } from "@reduxjs/toolkit"
// import { RootState } from "@/store"
// import { selectAllSiswaDTO } from "./selectAllSiswaDTO"

import { createSelector } from "@reduxjs/toolkit"
import { selectAllSiswaDTO } from "./data-siswa-aktif"
import type { RootState } from "../store"

export const selectSiswaByTahunMasuk = createSelector(
  [
    selectAllSiswaDTO,
    (_: RootState, tahun?: number) => tahun, // ✅ PARAM JADI INPUT
  ],
  (allSiswa, tahun) => {
    // ⬇️ TRANSFORMASI SELALU TERJADI
    return allSiswa.filter(siswa => {
      if (!tahun || !siswa.masuk_tgl) return true

      const d = new Date(siswa.masuk_tgl)
      const y = d.getFullYear()
      const m = d.getMonth() + 1
      const day = d.getDate()

      return (
        (y > tahun || (y === tahun && (m > 7 || (m === 7 && day >= 1)))) &&
        (y < tahun + 1 || (y === tahun + 1 && (m < 6 || (m === 6 && day <= 30))))
      )
    })
  }
)
