import {  BookA, BookUser, CalendarClock, FileCog, GitCompareArrows, Grid2X2Check, Tags, Target } from "lucide-react";
import type { typeSidebarFiturKonten } from "~/types";
import { subFiturRiwayatRaport } from "./subfitur-riwayat-raport";



export const subFiturBukuRaport:typeSidebarFiturKonten[]=[
    {
        groupTitle:'Dokumen Raport',
        breadCrumbs:[
            {
                title:'Sampul Raport',
                href: '/raport/sampul-raport',
                icon: BookUser,
                description: 'Sampul Raport',
                permission: 'view raport'
            },
            {
                title: 'Halaman Isi',
                href: '/raport/Halaman-isi',
                icon: BookA,
                description: 'Cetak Halaman Isi',
                permission: 'view raport'
            },
            {
                title: 'e-Raport Helper',
                href: '/raport/e-raport-helper',
                icon: BookA,
                description: 'File untuk men-sinrkonkan data e-raport',
                permission: 'view raport'
            },
        ]
    },
    {
        groupTitle: 'Setting Raport',
        breadCrumbs: [
            {
                title: 'KKTP',
                href: '/raport/setting-kktp',
                icon: Target,
                description: 'Setting KKTP untuk tiap Mata Pelajaran',
                permission: 'view raport'
            },
            {
                title: 'Refrensi Deskripsi Raport',
                href: '/raport/refrensi-deskripsi-raport',
                icon: Tags,
                description: 'Atur Kompetensi mana yang akan digunakan sebagai deskripsi raport (ATP, TP, atau CP), byDefault adalah TP',
                permission: 'view raport'
            },
            {
                title: 'Predikat Nilai Rapor',
                href: '/raport/setting-predikat',
                icon: Tags,
                description: 'Setting Predikat dan Kata Kunci Predikat Nilai',
                permission: 'view raport'
            },
            {
                title: 'Titimangsa Raport',
                href: '/raport/setting-titimangsa',
                icon: CalendarClock,
                description: 'Setting Titimangsa Raport',
                permission: 'view raport'
            },
        ]
    },
    {
        groupTitle: 'Setting Nilai dan Deskripsi',
        breadCrumbs: [
            {
                title: 'Olah Nilai',
                href: '/raport/olah-nilai-raport',
                icon: Grid2X2Check,
                description: 'Nilai raport yang Anda Olah untuk jadi nilai raport siap cetak',
                permission: 'view raport'
            },
            {
                title: 'Nilai Perbandingan',
                href: '/raport/nilai-raport-perbandingan',
                icon: GitCompareArrows,
                description: 'Perbandingan Nilai Raport Semester sebelumnya dengan Nilai saat ini',
                permission: 'view raport'
            },
            {
                title: 'Olah Predikat dan Deskripsi',
                href: '/raport/olah-deskripsi-raport',
                icon: FileCog,
                description: 'Nilai raport yang Anda Olah untuk jadi nilai raport siap cetak',
                permission: 'view raport'
            },
        ]
    },
    ...subFiturRiwayatRaport
]