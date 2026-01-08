
import { BookUser, CalendarCog, CalendarDays, ChartArea, ChartColumn, Sheet, Table2, UserCheck } from "lucide-react"
import type { typeSidebarFiturKonten } from "~/types"

const SubfiturAbsensiSiswa: typeSidebarFiturKonten[] = [
    {
        groupTitle: 'Daftar Hadir',
        breadCrumbs: [
            {
                title: 'Kehadiran Hari ini',
                href: '/absensi-hari-ini',
                icon: UserCheck,
                description:'Daftar Hadir Hari ini',
                permission: 'view absensi siswa'
            },
            
            {
                title: 'Kehadiran Bulanan',
                href: '/absensi-bulanan',
                icon: UserCheck,
                description:'Daftar hadir per bulan siswa Anda',
                permission: 'view absensi siswa'
            },
            {
                title: 'Keterangan Kaldik',
                href: '/keterangan-kaldik',
                icon: CalendarCog,
                description:'Isikan keterangan Kaldik Sekolah Anda',
                permission: 'view keterangan kaldik'
            },
        ]
    }, 
    {
        groupTitle: 'Rekapitulasi Absensi Siswa',
        breadCrumbs: [
            {
                title: 'Rekap Bulanan',
                href: '/absensi-bulanan-siswa',
                icon: CalendarDays,
                description:'Rekap Kehadiran Siswa per Bulan',
                permission: 'view absensi siswa'
            },
            
            {
                title: 'Kehadiran Semester',
                href: '/absensi-semester-siswa',
                icon: BookUser,
                description:'Rekap Kehadiran Siswa per Semester',
                permission: 'view absensi siswa'
            },
        ]
    }, 
    {
        groupTitle: 'Sakit Ijin Alpa',
        breadCrumbs: [
            {
                title: 'Per Bulan',
                href: '/rekap-sia-bulanan',
                icon: Sheet,
                description:'Menampilkan Rekap SIA tiap bulan',
                permission: 'view absensi siswa'
            },
            
            {
                title: 'Per Semester',
                href: '/rekap-sia-semester',
                icon: Table2,
                description:'Menampilkan Rekap SIA per Semester',
                permission: 'view absensi siswa'
            },
        ]
    }, 
    {
        groupTitle: 'Grafik Absensi (SIA)',
        breadCrumbs: [
            {
                title: 'Statistik Bulanan',
                href: '/statistik-absensi-bulanan',
                icon: ChartColumn,
                description:'Menampilkan Grafik SIA tiap bulan',
                permission: 'view absensi siswa'
            },
            
            {
                title: 'Statistik Semester',
                href: '/statistik-absensi-semester',
                icon: ChartArea,
                description:'Menampilkan Grafik SIA per Semester',
                permission: 'view absensi siswa'
            },
        ]
    }, 
]

export {
    SubfiturAbsensiSiswa
}