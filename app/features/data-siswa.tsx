
import { BookDown, BookUp, BookUp2, ChartBar, ChartBarIncreasing, CloudDownload, FileInput, Import, Users, UsersRound } from "lucide-react"
import type { typeSidebarFiturKonten } from "~/types"

const SubfiturKesiswaan: typeSidebarFiturKonten[] = [
    {
        groupTitle: 'Import Database Siswa',
        breadCrumbs: [
            {
                title: 'Koneksikan ke Dapodik',
                href: '/kesiswaan/connect-dapodik',
                icon: CloudDownload,
                description:'Hubungkan dengan Aplikasi Dapodik',
                permission: 'view connect dapodik'
            },
            {
                title: 'Import File PD Siswa',
                href: '/kesiswaan/import-file-pd-siswa',
                icon: Import,
                description: 'Import File PD Siswa',
                permission: 'view import file pdsiswa'
            },
            {
                title: 'Input Manual',
                href: '/kesiswaan/input-siswa',
                icon: FileInput,
                description: 'Input data siswa satu per satu',
                permission: 'view input siswa'
            }
        ],
        
    }, 
    {
        groupTitle: 'Data Siswa',
        breadCrumbs: [
            {
                title: 'Daftar Siswa Rombel',
                href: '/kesiswaan/rombelku',
                icon: Users,
                description:'Daftar siswa di rombel Anda',
                permission: 'view rombelku'
            },
            {
                title: 'Daftar Siswa Jenjang ',
                href: '/kesiswaan/jenjangku',
                icon: UsersRound,
                description: 'Daftar siswa di semua kelas paralel sekolah',
                permission: 'view jenjangku'
            }
        ]
    }, 
    {
        groupTitle: 'Data Mutasi',
        breadCrumbs: [
            {
                title: 'Mutasi Masuk',
                href: '/kesiswaan/mutasi-masuk',
                icon: BookDown,
                description:'Daftar siswa pertama kali masuk sekolah',
                permission: 'view mutasi masuk'
            },
            {
                title: 'Mutasi Keluar',
                href: '/kesiswaan/mutasi-keluar',
                icon: BookUp,
                description: 'Daftar Siswa yang telah keluar',
                permission: 'view mutasi keluar'
            },
            {
                title: 'Laporan Mutasi',
                href: '/kesiswaan/laporan-mutasi',
                icon: BookUp2,
                description: 'Laporan penyusunan data seluruh mutasi',
                permission: 'view laporan mutasi'
            }
        ]
    },
    {
        groupTitle: 'Statistik Siswa',
        breadCrumbs: [
            {
                title: 'Berdasarkan Umur',
                href: '/kesiswaan/statistik-umur',
                icon: ChartBarIncreasing,
                description:'Menampilkan data statistik berdasarkan umur',
                permission: 'view statistik umur'
            },
            {
                title: 'Berdasarkan Agama',
                href: '/kesiswaan/statistik-agama',
                icon: ChartBar,
                description: 'Menampilkan data siswa berdasarkan agamanya',
                permission: 'view statistik agama'
            },
            {
                title: 'Kustom Statistik',
                href: '/kesiswaan/statistik-kustom',
                icon: ChartBar,
                description: 'Menampilkan data siswa berdasarkan agamanya',
                permission: 'view statistik kustom'
            }
        ]
    },
]

export {
    SubfiturKesiswaan
}