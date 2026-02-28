import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { ConfigToolbarRekapAbsensiSiswa } from "~/controllers/absensi-controllers/toolbar/config-toolbar-rekap-absensi-siswa";
import type { Route } from "./+types/statistik-absensi-bulanan";
import StatistikAbsensiBulananPage from "~/pages/absensi/statistik-absensi-bulanan";
import { ConfigToolbarStatistikBulanan } from "~/controllers/absensi-controllers/toolbar/config-toolbar-statistik-bulanan";

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
        titleTambahan:'Statistik Bulanan',
        controlKelas: settingRombel,
        toolbarTabs: ConfigToolbarStatistikBulanan,
    };
}

export default function AbsensiiswaBulanan() {
    
    return(
        <StatistikAbsensiBulananPage/>
    )
}