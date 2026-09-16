import type { JenisTagihanPenilaiantype } from "./jenis-tagihan-type";

export const ListJenisTagihan:JenisTagihanPenilaiantype[]=[
    {
        name: 'Penilaian Harian',
        description: 'Penilaian Harian',
        shortName: 'PH',
        kode: 'PH',
        semester:[1,2],
        kelas: [1, 2, 3, 4, 5, 6]
    },
    {
        name: 'Remedial',
        description: 'Penilaian Remedial',
        shortName: 'Remedial',
        kode: 'Remedial',
        semester:[1,2],
        kelas: [1, 2, 3, 4, 5, 6]
    },
    {
        name: 'Pengayaan',
        description: 'Penilaian Pengayaan',
        shortName: 'Pengayaan',
        kode: 'Pengayaan',
        semester:[1,2],
        kelas: [1, 2, 3, 4, 5, 6]
    },
    {
        name: 'Sumatif Tengah Semester',
        description: 'Sumatif Tengah Semester untuk Penilaian Tengah Semester',
        shortName: 'STS',
        kode: 'PTS',
        semester:[1,2],
        kelas: [1, 2, 3, 4, 5, 6]
    },
    {
        name: 'Sumatif Akhir Semester',
        description: 'Sumatif Akhir Semester untuk Penilaian akhir di semester 1',
        shortName: 'SAS',
        kode: 'PAS',
        semester: [1],
        kelas: [1, 2, 3, 4, 5, 6]
    },
    {
        name: 'Sumatif Akhir Kelas',
        description: 'Sumatif Akhir Kelas untuk Penilaian akhir di semester 2',
        shortName: 'SAK',
        kode: 'PAK',
        semester: [2],
        kelas: [1, 2, 3, 4, 5]
    },
    {
        name: 'Penilaian Sumatif Akhir Jenjang',
        description: 'Penilaian Sumatif Akhir Jenjang dikhusukan untuk kelas 6 untuk Penilaian akhir di jenjang SD',
        shortName: 'PSAJ',
        kode: 'PSAJ',
        semester: [2],
        kelas: [6]
    },
    {
        name: 'Penilaian Praktek',
        description: 'Penilaian Praktek untuk menganalisis kompetensi praktek',
        shortName: 'Praktek',
        kode: 'Praktek',
        semester: [1,2],
        kelas: [1, 2, 3, 4, 5, 6]
    },
    {
        name: 'Penilaian Produk',
        description: 'Penilaian Produk untuk menganalisis kompetensi terhadap produk yang dihasilkan',
        shortName: 'Produk',
        kode: 'Produk',
        semester: [1,2],
        kelas: [1, 2, 3, 4, 5, 6]
    },
    {
        name: 'Penilaian Proyek',
        description: 'Penilaian Proyek untuk menganalisis kompetensi terhadap proyek yang dilaksanakan',
        shortName: 'Proyek',
        kode: 'Proyek',
        semester: [1,2],
        kelas: [1, 2, 3, 4, 5, 6]
    },
]