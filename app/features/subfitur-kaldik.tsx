
import { Calendar1, Calendar1Icon, CalendarClock, CalendarClockIcon, CalendarCog, CalendarDays, CalendarDaysIcon, CalendarSync } from "lucide-react"
import type { typeSidebarFiturKonten } from "~/types"

const SubfiturKaldik: typeSidebarFiturKonten[] = [
    {
        groupTitle: 'Setting Keterangan',
        breadCrumbs: [
            {
                title: 'Setting Kaldik',
                href: '/kaldik/keterangan-kaldik',
                icon: CalendarCog,
                description:'Isikan keterangan Kaldik Sekolah Anda',
                permission: 'view kaldik'
            },
            {
                title: 'Kaldik default',
                href: '/kaldik/keterangan-kaldik-default',
                icon: CalendarCog,
                description:'Isikan keterangan Kaldik Sekolah Anda',
                permission: 'view kaldik default'
            },
        ]
    }, 
    {
        groupTitle: 'Format Kaldik Sekolah',
        breadCrumbs: [
            {
                title: 'Semester 1',
                href: '/kaldik/kaldik-semester-1',
                icon: Calendar1,
                description:'Format Cetak Kaldik Semester 1',
                permission: 'view kaldik'
            },
            {
                title: 'Semester 2',
                href: '/kaldik/kaldik-semester-2',
                icon: Calendar1Icon,
                description: 'Format Cetak Kaldik Semester 2',
                permission: 'view kaldik'
            },
            {
                title: 'Satu Tahun',
                href: '/kaldik/kaldik-setahun',
                icon: CalendarSync,
                description: 'Format Cetak Kaldik 1 Tahun',
                permission: 'view kaldik'
            }
        ]
    }, 
    {
        groupTitle: 'Hari Efektif',
        breadCrumbs: [
            {
                title: 'Semester 1',
                href: '/kaldik/hari-efektif-semester-1',
                icon: CalendarDays,
                description:'Kalkulasi hari efektif selama semester 1',
                permission: 'view kaldik'
            },
            {
                title: 'Semester 2',
                href: '/kaldik/hari-efektif-semester-2',
                icon: CalendarDaysIcon,
                description: 'Kalkulasi hari efektif selama Semester 2',
                permission: 'view kaldik'
            },
        ]
    }, 
    {
        groupTitle: 'Hari Efektif Belajar',
        breadCrumbs: [
            {
                title: 'Semester 1',
                href: '/kaldik/hari-belajar-semester-1',
                icon: CalendarDays,
                description:'Kalkulasi hari efektif belajar selama semester 1',
                permission: 'view kaldik'
            },
            {
                title: 'Semester 2',
                href: '/kaldik/hari-belajar-semester-2',
                icon: CalendarDaysIcon,
                description: 'Kalkulasi hari efektif belajar selama Semester 2',
                permission: 'view kaldik'
            },
        ]
    },  
    {
        groupTitle: 'Jam Efektif Belajar',
        breadCrumbs: [
            {
                title: 'Semester 1',
                href: '/kaldik/jam-belajar-semester-1',
                icon: CalendarClockIcon,
                description:'Kalkulasi jumlah JP selama semester 1',
                permission: 'view kaldik'
            },
            {
                title: 'Semester 2',
                href: '/kaldik/jam-belajar-semester-2',
                icon: CalendarClock,
                description: 'Kalkulasi jumlah JP selama Semester 2',
                permission: 'view kaldik'
            },
        ]
    }, 
]

export {
    SubfiturKaldik
}