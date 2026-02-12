
import { BookDown, BookUp, BookUp2, ChartBar, ChartBarIncreasing, CloudDownload, CloudSync, FileInput, Import, Paperclip, RefreshCw, Search, Users, UsersRound } from "lucide-react"
import type { typeSidebarFiturKonten } from "~/types"

const SubfiturKesiswaan: typeSidebarFiturKonten[] = [
    {
        groupTitle: 'Import Database Siswa',
        breadCrumbs: [
            // {
            //     title: 'Koneksikan ke Dapodik',
            //     href: '/kesiswaan/connect-dapodik',
            //     icon: CloudDownload,
            //     description:'Hubungkan dengan Aplikasi Dapodik',
            //     permission: 'view connect dapodik'
            // },
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
        groupTitle: 'Update Data Siswa',
        breadCrumbs: [
            {
                title: 'Update Data Siswa',
                href: '/kesiswaan/update-data-siswa',
                icon: RefreshCw,
                description:'Update Data Siswa untuk memanggil ulang API data siswa',
                permission: 'view update-data-siswa'
            },
            {
                title: 'Sinkronisasi Dapodik',
                href: '/kesiswaan/sinkron-dapodik',
                icon: CloudSync,
                description:'Sinkronsisasi data siswa dari dapodik',
                permission: 'view sinkron-dapodik'
            },
        ]
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
            },
            {
                title: 'Format Daftar Siswa',
                href: '/kesiswaan/format',
                icon: Paperclip,
                description: 'Format Data siswa desain kustom Anda',
                permission: 'view format daftar siswa'
            },
            {
                title: 'Cari Siswa',
                href: '/kesiswaan/cari-siswa',
                icon: Search,
                description: 'Cari Siswa berdasarkan nama',
                permission: 'view cari siswa'
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
            // {
            //     title: 'Kustom Statistik',
            //     href: '/kesiswaan/statistik-kustom',
            //     icon: ChartBar,
            //     description: 'Menampilkan data siswa berdasarkan agamanya',
            //     permission: 'view statistik kustom'
            // }
        ]
    },
]

export {
    SubfiturKesiswaan
}