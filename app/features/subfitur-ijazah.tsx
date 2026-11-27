import type { typeSidebarFiturKonten } from "~/types";
import { subFiturBukuRaport } from "./subfitur-raport";
import { subFiturRiwayatRaport } from "./subfitur-riwayat-raport";
import { FileBadge } from "lucide-react";


export const subFiturIjazah: typeSidebarFiturKonten[] = [
    ...subFiturBukuRaport,
    {
        groupTitle:'Olah Ijazah',
        breadCrumbs:[
            {
                title:'Ijazah Per Rombel',
                href: '/raport/ijazah-per-rombel',
                icon: FileBadge,
                description: 'Rekap Ijazah Rombel Anda',
                permission: 'view raport'
            },
            {
                title:'Ijazah Per Rombel',
                href: '/raport/rekap-ijazah',
                icon: FileBadge,
                description: 'Rekap Ijazah Seluruh Rombel',
                permission: 'view raport'
            },
            {
                title:'Rekap Transkip Ijazah',
                href: '/raport/transkip-rekap-ijazah',
                icon: FileBadge,
                description: 'Rekap Ijazah Seluruh Rombel',
                permission: 'view raport'
            },
            {
                title:'Raport 5 Semester',
                href: '/raport/transkip-rekap-ijazah',
                icon: FileBadge,
                description: 'Rekap Ijazah Seluruh Rombel',
                permission: 'view raport'
            },
        ]
    },
    {
        groupTitle:'Dokumen Ijazah',
        breadCrumbs:[
            {
                title:'Ijazah',
                href: '/raport/dokumen-ijazah-cetak',
                icon: FileBadge,
                description: 'Sampling Ijazah',
                permission: 'view raport'
            },
            {
                title:'Transkip Ijazah',
                href: '/raport/rekap-ijazah',
                icon: FileBadge,
                description: 'Dokumen Transkip Ijazah',
                permission: 'view raport'
            },
            {
                title:'Suket Kelulusan',
                href: '/raport/suket-kelulusan',
                icon: FileBadge,
                description: 'Surat Ketrangan Kelulusan',
                permission: 'view raport'
            },
            {
                title:'Suket Nilai Raport',
                href: '/raport/transkip-rekap-ijazah',
                icon: FileBadge,
                description: 'Surat Keterangan Nilai Raport',
                permission: 'view raport'
            },
        ]
    },
    ...subFiturRiwayatRaport
];
