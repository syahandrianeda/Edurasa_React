import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/absensi-bulanan";
import { useAppSelector } from "~/context-reduct/hook";
import { OrmAbsensiSelector } from "~/context-reduct/selectores/absensi-selector";
import { useMemo } from "react";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import AbsensiSiswaBulananPage from "~/pages/absensi/absensi-siswa-bulanan";
import { ConfigToolbarLaporan } from "~/controllers/data-siswa-controller/config-toolbar";
import { ConfigToolbarAbsenBulanan } from "~/controllers/absensi-controllers/toolbar/confit-toolbar-absen";

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
        titleTambahan:'Hari ini',
        controlKelas: settingRombel,
        toolbarTabs: ConfigToolbarAbsenBulanan,
       
    };
}

export default function AbsensiiswaBulanan() {
    
    return(
        <AbsensiSiswaBulananPage/>
    )
}