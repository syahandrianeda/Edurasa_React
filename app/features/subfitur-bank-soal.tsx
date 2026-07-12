import { BanknoteArrowDownIcon, BanknoteArrowUp, BanknoteXIcon, CirclePile, LucidePaperclip, ToolCase } from "lucide-react";
import type { typeSidebarFiturKonten } from "~/types";

export const SubFiturBankSoal: typeSidebarFiturKonten[] = [
    {
        groupTitle: 'Bank Soal',
        breadCrumbs: [
            {
                title: 'Buat Item Soal',
                href: '/bank-soal/create-item-soal',
                icon: BanknoteArrowUp,
                description:'Simpan Item Soal sebagai koleksi bank soal Anda',
                permission: 'view bank soal'
            },
            {
                title: 'Upload Massal Soal',
                href: '/bank-soal/create-items-soal',
                icon: BanknoteArrowDownIcon,
                description:'Simpan Item Soal sebagai koleksi bank soal Anda',
                permission: 'view bank soal'
            },
            {
                title: 'Koleksi Bank Soal',
                href: '/bank-soal/koleksi-bank-soal',
                icon: LucidePaperclip,
                description:'Koleksi Bank Soal',
                permission: 'view bank soal'
            },
        ]
    },
    {
        groupTitle: 'Paket Soal',
        breadCrumbs: [
            {
                title: 'Buat Paket Soal',
                href: '/bank-soal/create-paket-soal',
                icon: ToolCase,
                description:'Buat Paket Soal Anda untuk dipublikasikan/Arsip Asesmen',
                permission: 'view bank soal'
            },
            {
                title: 'Koleksi Paket Soal',
                href: '/bank-soal/koleksi-paket-soal',
                icon: LucidePaperclip,
                description:'Koleksi Bank Soal',
                permission: 'view bank soal'
            },
        ]
    },
    {
        groupTitle: 'Taksonomi Bloom',
        breadCrumbs: [
            {
                title: 'Taksonomi Bloom',
                href: '/bank-soal/taksonomi-bloom',
                icon: CirclePile,
                description:'Taksonomi Bloom',
                permission: 'view bank soal'
            },
        ]
    }

]