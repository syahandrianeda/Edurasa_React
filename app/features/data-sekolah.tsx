import { DoorClosed, DoorOpen, FileUser, School, School2, ShieldCloseIcon } from "lucide-react";
import type { typeSidebarFiturKonten } from "~/types";

export const SubfiturSettingSekolah: typeSidebarFiturKonten[] = [
    {
        groupTitle: 'Identitas Sekolah',
        breadCrumbs: [
            {
                title: 'Tempat Tugas',
                href: '/setting-sekolah/tempat-tugas',
                icon: School,
                description:'Identitas sekolah Anda saat ini yang masih aktif',
                permission: 'view tempat tugas'
            },
            {
                title: 'Riwayat Tempat Tugas',
                href: '/setting-sekolah/riwayat-tempat-tugas',
                icon: School2,
                description: 'Daftar tempat tugas / sekolah ',
                permission: 'view riwayat tempat tugas'
            }
        ]
    }, 
    {
        groupTitle: 'Tugas dan Jabatan',
        breadCrumbs: [
            {
                title: 'Tugas Jabatan Aktif',
                href: '/setting-sekolah/tugas-jabatan',
                icon: FileUser,
                description:'Tugas/Jabatan Anda Saat ini',
                permission: 'view tugas jabatan'
            },
            {
                title: 'Riwayat Tugas Jabatan',
                href: '/setting-sekolah/riwayat-tugas-jabatan',
                icon: ShieldCloseIcon,
                description: 'Daftar Tugas Jabatan Selama di tempat tugas',
                permission: 'view riwayat tugas jabatan'
            }
        ]
    },
    {
        groupTitle: 'Kelas dan Rombel',
        breadCrumbs: [
            {
                title: 'Rombel Aktif',
                href: '/setting-sekolah/rombel-aktif',
                icon: DoorOpen,
                description:'Kelas/rombel yang aktif Anda ampu saat ini',
                permission: 'view rombel aktif'
            },
            {
                title: 'Riwayat Mengajar',
                href: '/setting-sekolah/riwayat-mengajar',
                icon: DoorClosed,
                description: 'Daftar Kelas/Rombel yang pernah Anda ampu',
                permission: 'view riwayat mengajar'
            }
        ]
    },
]
