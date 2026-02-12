import type { SiswaType } from "~/types/siswa"

type ValidationErrors<T> = Partial<Record<keyof T, string>>
export function validateSiswa(data: SiswaType): ValidationErrors<SiswaType> {
  const errors: ValidationErrors<SiswaType> = {}

  if (!data.pd_nama || data.pd_nama.trim() === "") {
    errors.pd_nama = "Nama wajib diisi"
  }
  if (!data.pd_tl || data.pd_tl.trim() === "") {
    errors.pd_tl = "Nama wajib diisi"
  }

  if (!data.nik || data.nik.length !== 16) {
    errors.nik = "NIK harus 16 digit"
  }

  if (data.pd_tanggallahir && new Date(data.pd_tanggallahir) > new Date()) {
    errors.pd_tanggallahir= "Tanggal lahir tidak valid"
  }

  return errors
}
