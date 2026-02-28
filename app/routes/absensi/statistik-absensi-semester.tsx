import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/statistik-absensi-semester";
import { ConfigToolbarStatistikBulanan } from "~/controllers/absensi-controllers/toolbar/config-toolbar-statistik-bulanan";
import StatistikAbsensiBulananPage from "~/pages/absensi/statistik-absensi-bulanan";
import StatistikAbsensiSemesterPage from "~/pages/absensi/statistik-absensi-semester";
import { ConfigToolbarStatistikSemester } from "~/controllers/absensi-controllers/toolbar/config-toolbar-statistik-semester";

export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Edurasa';
    
    return [
        {
            title: mainTitle + ' | Absensi Siswa'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}

export function clientLoader({}:Route.ComponentProps){
    
    const settingRombel: controlDropdownKelas ={
            showControlKelas:true,
            title: 'Rombel',
            description:'Rombel yang Anda Ampu',
            typeKelas:'rombel'
        }
        

    return {
        titleTambahan:'Statistik Per Semester',
        controlKelas: settingRombel,
        toolbarTabs: ConfigToolbarStatistikSemester,
    };
}

export default function AbsensiStatistikRoute() {
    
    return(
        <StatistikAbsensiSemesterPage/>
    )
}