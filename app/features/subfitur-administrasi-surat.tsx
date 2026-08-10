import { FileInput, FileOutput, FileSymlinkIcon, IdCardIcon, PenBoxIcon,  PlaneTakeoff,  UserIcon, UserPlus, UsersIcon, UserStar, UserXIcon} from "lucide-react"
import type { typeSidebarFiturKonten } from "~/types"

export const SubfiturAdminsitrsiSurat: typeSidebarFiturKonten[] = [
    {
        groupTitle: 'Surat Masuk',
        breadCrumbs: [
            {
                title: 'Surat Masuk',
                href: '/arsip-surat/surat-masuk',
                icon: FileInput,
                description:'Surat Masuk dan Pendataannya',
                permission: 'view administrasi surat'
            },
            {
                title: 'Input Surat Masuk',
                href: '/arsip-surat/create-surat-masuk',
                icon: FileSymlinkIcon,
                description:'Input Surat Masuk Untuk Hari Ini',
                permission: 'view administrasi surat'
            },
            
        ]
    },
    {
        groupTitle: 'Surat Keluar',
        breadCrumbs: [
            {
                title: 'Surat Keluar',
                href: '/arsip-surat/surat-keluar',
                icon: FileOutput,
                description:'Data semua Surat Keluar dan pendataaannya',
                permission: 'view administrasi surat'
            },
            {
                title: 'Buat Surat Keluar',
                href: '/arsip-surat/create-surat-keluar',
                icon: FileSymlinkIcon,
                description:'Input Surat Keluar Untuk Hari Ini',
                permission: 'view administrasi surat'
            },
            
        ]
    },
    {
        groupTitle:'SPPD',
        breadCrumbs:[
            {
                title: 'SPPD',
                href: '/arsip-surat/sppd',
                icon: PlaneTakeoff,
                description:'Daftar Surat Keluar jenis SPPD',
                permission: 'view administrasi surat'
            },
            {
                title: 'Buat SPPD',
                href: '/arsip-surat/buat-sppd',
                icon: PenBoxIcon,
                description:'Buat SPPD',
                permission: 'view administrasi surat'
            },
            {
                title: 'Golongan Pangkat PTK',
                href: '/arsip-surat/golongan-pangkat-ptk',
                icon: UserStar,
                description:'Buat SPPD',
                permission: 'view administrasi surat'
            },
        ]
    },
    {
        groupTitle: 'Template Surat',
        breadCrumbs: [
            {
                title: 'S.Ket Aktif',
                href: '/arsip-surat/sk-siswa-aktif',
                icon: UserIcon,
                description:'Surat Keterangan siswa masih aktif di sekolah',
                permission: 'view administrasi surat'
            },
            {
                title: 'S.Ket NISN',
                href: '/arsip-surat/sk-nisn',
                icon:IdCardIcon,
                description:'Surat Keterangan NISN (Nomor Induk Siswa Nasional)',
                permission: 'view administrasi surat'
            },
            {
                title: 'S.Ket Berkelakuan Baik',
                href: '/arsip-surat/sk-kb',
                icon: UsersIcon,
                description:'Surat Keterangan Berkelakuan Baik',
                permission: 'view administrasi surat'
            },
            {
                title: 'S.Ket Pindahan',
                href: '/arsip-surat/sk-siswa-diterima',
                icon: UserPlus,
                description:'Surat Keterangan Diterima Pindah Sekolah',
                permission: 'view administrasi surat'
            },
            {
                title: 'S.Ket Mutasi (Pindah Sekolah)',
                href: '/arsip-surat/sk-siswa-mutasi',
                icon: UserXIcon,
                description:'Surat Keterangan Siswa Mutasi/Pindah Sekolah',
                permission: 'view administrasi surat'
            },
        ]
    }
]
