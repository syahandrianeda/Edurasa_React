import { BadgeQuestionMarkIcon, CalendarCheck2, CloudSyncIcon, FolderGit2, FolderTree, ListCheckIcon, PackageSearchIcon, StarHalfIcon, Stars } from "lucide-react";
import type { typeSidebarFiturKonten } from "~/types";

export const subFiturPenilaian:typeSidebarFiturKonten[]=[
    {
        groupTitle:'Daftar Penilaian',
        breadCrumbs:[
            {
                title:'Daftar Penilaian',
                href: '/penilaian/list-penilaian',
                icon: BadgeQuestionMarkIcon,
                description: 'Daftar tagihan penilaian yang Anda laksanakan/publikasikan di kelas',
                permission: 'view penilaian'
            },
            {
                title: 'Kompetensi Penilaian',
                href: '/penilaian/kompetensi-tagihan-penilaian',
                icon: ListCheckIcon,
                description: 'Daftar Kompetensi penilaian yang Anda uji kepada murid',
                permission: 'view penilaian'
            }
        ]
    },
    {
        groupTitle: 'Kategori Assesmen',
        breadCrumbs: [
            {
                title: 'Harian',
                href: '/penilaian/tagihan-harian',
                icon: CalendarCheck2,
                description: 'Penilaian yang dilakukan tiap hari atau ulangan harian',
                permission: 'view penilaian'
            },
            {
                title: 'Remedial/Pengayaan',
                href: '/penilaian/remedial-pengayaan',
                icon: CloudSyncIcon,
                description: 'Penilaian Remedial/Pengayaan yang Anda lakukan kepada beberapa murid',
                permission: 'view penilaian'
            },
            {
                title: 'Praktek, produk, proyek',
                href: '/penilaian/praktek-produk-proyek',
                icon: PackageSearchIcon,
                description: 'Penilaian untuk mengukur kompetensi praktek, produk, atau proyek yang dilaksanakan',
                permission: 'view penilaian'
            },
            {
                title: 'Pertengahan Semester',
                href: '/penilaian/tagihan-mid-semester',
                icon: StarHalfIcon,
                description: 'Penilaian yang dilakukan di pertengahan semester',
                permission: 'view penilaian'
            },
            {
                title: 'Akhir Semester',
                href: '/penilaian/tagihan-akhir-semester',
                icon: Stars,
                description: 'Penilaian yang dilakukan di akhir semester',
                permission: 'view penilaian'
            },
        ]
    },
    {
        groupTitle: 'Rekapitulasi Penilaian',
        breadCrumbs: [
            {
                title: 'Per Jenis Tagihan',
                href: '/penilaian/rekap-per-tagihan',
                icon: FolderTree,
                description: "Rekap nilai asli per jenis tagihan (harian, midsemester, dan akhir semester",
                permission: "view penilaian"
            },
            {
                title: "per Kompetensi",
                href: "/penilaian/rekap-nilai-kompetensi",
                icon: FolderGit2,
                description: "Rekapitulasi nilai asli tiap kompetensi yang diperoleh siswa",
                permission: "view penilaian"
            }
        ]
    }
]