// domains/siswa/dto/CreateSiswaDTO.ts

import type { Gender } from "~/types/enums/gender"



export interface CreateSiswaDTO {
  nama: string
  nisn: string
  jenis_kelamin: Gender
  tempat_lahir: string
  tanggal_lahir: string // ISO date
  alamat: string

  // relasi awal
  sekolah_id: string
  rombel_id?: string
}


export interface UpdateSiswaDTO {
  nama: string
  nisn: string
  jenis_kelamin: Gender
  tempat_lahir: string
  tanggal_lahir: string // ISO date
  alamat: string

  // relasi awal
  sekolah_id: string
  rombel_id?: string
}
