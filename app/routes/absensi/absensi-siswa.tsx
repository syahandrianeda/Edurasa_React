import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/absensi-siswa";
import { ConfigToolbarAbsenHariIni } from "~/controllers/absensi-controllers/toolbar/config-toolbar-absen-hari-ini";
import AbsensiSiswaHariIniPage from "~/pages/absensi/hari-ini";

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
        toolbarTabs: ConfigToolbarAbsenHariIni
    };
}

export default function AbsensiSiswaHariIni() {
    
    return(
        <AbsensiSiswaHariIniPage/>
    )
}