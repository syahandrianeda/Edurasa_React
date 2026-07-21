import { Banknote, BanknoteArrowDown, BanknoteX, BookmarkCheck, BookMarked, LucideBanknoteArrowUp, PiggyBank, TagsIcon } from "lucide-react";
import type { typeSidebarFiturKonten } from "~/types";

export const SubFiturTabungan: typeSidebarFiturKonten[] =[
    {
        groupTitle: 'Tabungan',
        breadCrumbs: [
            {
                title: 'Tabungan',
                href: '/tabungan/tabungan-siswa',
                icon: PiggyBank,
                description:'Tabungan Siswa',
                permission: 'view tabungan kelas'
            },
            {
                title: 'Rekap Tabungan',
                href: '/tabungan/rekap-tabungan-siswa',
                icon: BookmarkCheck,
                description:'Rekap Tabungan Siswa',
                permission: 'view tabungan kelas'
            },
        ]
    },
    {
        groupTitle: 'Keuangan Lainnya',
        breadCrumbs: [
            {
                title: 'Kategori',
                href: '/tabungan/kategori-kuangan',
                icon: TagsIcon,
                description:'Buat Kategori Tabungan',
                permission: 'view tabungan kategori'
            },
            {
                title: 'Debit Kredit',
                href: '/tabungan/debit-kredit',
                icon: Banknote,
                description:'Buat Kategori Tabungan',
                permission: 'view tabungan kategori'
            },
            {
                title: 'Rekap Kuangan',
                href: '/tabungan/rekap-debit-kredit',
                icon: BookMarked,
                description:'Rekap Kategori Keuangan lainnya',
                permission: 'view tabungan kategori'
            },
        ]
    },

]