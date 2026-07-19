import { BookA, BookCopyIcon, BookDashedIcon, Bookmark, FolderArchive } from "lucide-react";
import type { typeSidebarFiturKonten } from "~/types";

export const SubFiturBukuInduk: typeSidebarFiturKonten[] = [
    {
        groupTitle: 'Buku Induk',
        breadCrumbs: [
            {
                title: 'Ringkasan',
                href: '/buku-induk/ringkasan',
                icon: Bookmark,
                description:'Ringkasan Buku Induk',
                permission: 'view buku induk'
            },
            {
                title: 'Rekap Buku Induk',
                href: '/buku-induk/rekap',
                icon: BookDashedIcon,
                description:'Rekapitulasi data induk',
                permission: 'view buku induk'
            },
            {
                title: 'Arsip Siswa',
                href: '/buku-induk/arsip',
                icon: FolderArchive,
                description:'Koleksi Arsip yang dimiliki siswa',
                permission: 'view buku induk'
            },
        ]
    }, 
    {
        groupTitle: 'Klapper',
        breadCrumbs: [
            {
                title: 'Klapper',
                href: '/buku-induk/klepper-induk',
                icon: BookCopyIcon,
                description:'Klapper berdasarkan Huruf Awal Nama Siswa',
                permission: 'view buku induk'
            },
        ]
    },
    {
        groupTitle: 'Ijazah',
        breadCrumbs: [
            {
                title: 'Arsip Nilai Ijazah',
                href: '/buku-induk/data-ijazah',
                icon: BookA,
                description:'Klapper berdasarkan Huruf Awal Nama Siswa',
                permission: 'view buku induk'
            },
        ]
    }
]