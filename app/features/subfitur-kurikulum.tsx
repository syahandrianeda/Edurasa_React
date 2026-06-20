import { Bookmark, Calendar, CalendarCheck, ClipboardClock, GitForkIcon, LandPlotIcon, LocateFixed, Target, TargetIcon } from "lucide-react";
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
                title: 'Semua Jadwal Pelajaran',
                href: '/kurikulum/all-jadwal-pelajaran',
                icon: CalendarCheck,
                description:'Menampilkan semua jadwal pelajaran yang sudah di atur di setiap rombel, ini berguna untuk melihat keseluruhan jadwal pelajaran yang sudah di atur',
                permission: 'view alokasi mapel'
            },
        ]   
    },
    {
        groupTitle:'Program Pembelajaran',
        breadCrumbs: [
            {
                title: "Program Tahunan (Prota)",
                href: '/kurikulum/program-tahunan',
                icon: Calendar,
                description:'Program Tahunan disusun berdasarkan ATP yang telah Anda Isi',
                permission:'view kurikulum'
            },
            {
                title:'Program Semester',
                href: '/kurikulum/program-semester',
                icon: GitForkIcon,
                description:'Program Semester disusun berdasarkan Program Tahunan. Anda cukup menyebarkannya ke kaldik',
                permission:'view kurikulum'
            }
        ]
    },
    
    
]