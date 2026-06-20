import { BookCheckIcon, CalendarSearch, FolderClosed, IdCardIcon, UserIcon, UserLock } from "lucide-react";
import type { typeSidebarFiturKonten } from "~/types";

export const SubProfileSidebar:typeSidebarFiturKonten[] = [
    {
        groupTitle: 'Data Pribadi',
        breadCrumbs: [
            {
                title: 'Profile',
                href: '/profile/about',
                icon: IdCardIcon,
                description:'Tentang Saya',
                permission: 'view profile'
            },
            {
                title: 'Akun',
                href: '/profile/credential',
                icon: UserLock,
                description:'Setting Username dan Password',
                permission: 'view profile'
            },
            {
                title: 'Koleksi Dokumen',
                href: '/profile/my-document',
                icon: FolderClosed,
                description:'Koleksi Dokumen penting',
                permission: 'view profile'
            },
        ]
    },
    {
        groupTitle: 'Tugas Mengajar',
        breadCrumbs: [
            {
                title: 'Tugas Mengajar',
                href: '/profile/tugas-mengajar',
                icon: UserIcon,
                description:'Tugas Mengajar Saat Ini',
                permission: 'view profile'
            },
            {
                title: 'Riwayat Tugas Mengajar',
                href: '/profile/riwayat-tugas-mengajar',
                icon: CalendarSearch,
                description:'Riwayat Tugas Mengajar',
                permission: 'view profile'
            },
        ]
    },
]