import { FolderClock } from "lucide-react";
import type { typeSidebarFiturKonten } from "~/types";

export const subFiturRiwayatRaport:typeSidebarFiturKonten[] = [{
        groupTitle: 'Riwayat Raport',
        breadCrumbs: [
            {
                title: 'Riwayat Raport',
                href: '/raport/riwayat Raport',
                icon: FolderClock,
                description: 'Daftar Riwayat Raport Siswa Kelas Anda',
                permission: 'view raport'
            },
        ]
    }]