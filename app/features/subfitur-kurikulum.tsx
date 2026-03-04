import { Bookmark, CalendarCheck, ClipboardClock, GitForkIcon, LandPlotIcon, LocateFixed, Target, TargetIcon } from "lucide-react";
import type { typeSidebarFiturKonten } from "~/types";


export const SubfiturKurikulum: typeSidebarFiturKonten[] = [
    {
        groupTitle: 'Properti Kurikulum',
        breadCrumbs: [
            {
                title: 'Capaian Pembelajaran (CP)',
                href: '/kurikulum/cp',
                icon: LandPlotIcon,
                description:'Capaian Pembelajaran (CP) Kurikulum Sekolah Anda',
                permission: 'view kurikulum'
            },
            {
                title: 'Tujuan Pembelajaran (TP)',
                href: '/kurikulum/tp',
                icon: TargetIcon,
                description:'Tujuan Pembelajaran (TP) Kurikulum Sekolah Anda',
                permission: 'view kurikulum'
            },
            {
                title: 'Alur Tujuan Pembelajaran (ATP)',
                href: '/kurikulum/atp',
                icon: LocateFixed,
                description:'Alur Tujuan Pembelajaran (ATP) Kurikulum Sekolah Anda, ATP akan dijadikan deskripsi untuk Raport',
                permission: 'view kurikulum'
            },
        ]
    },
    {
        groupTitle: 'Mata Pelajaran',
        breadCrumbs: [
            {
                title: 'Mata Pelajaran',
                href: '/kurikulum/mapel',
                icon: Bookmark,
                description:'Mata Pelajaran yang Berlaku di jenjang Anda Pada Tahun Pelajaran Ini',
                permission: 'view mapel'
            },
            {
                title: 'Jadwal Pelajaran',
                href: '/kurikulum/jadwal-pelajaran',
                icon: ClipboardClock,
                description:'Atur Jadwal Pelajaran di Rombel ini, ini berguna untuk penyebaran materi pembelajaran dan penilaian',
                permission: 'view jadwal mapel'
            },
            {
                title: 'Aloksi waktu Mata Pelajaran',
                href: '/kurikulum/alokasi-waktu',
                icon: CalendarCheck,
                description:'Atur alokasi waktu mata pelajaran di Rombel ini, ini berguna untuk penyebaran materi pembelajaran dan penilaian',
                permission: 'view alokasi mapel'
            },
        ]   
    },
    
]