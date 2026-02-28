import RekapAbsensiSiswaPage from "~/pages/absensi/rekap-absensi-siswa";
import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { ConfigToolbarRekapAbsensiSiswa } from "~/controllers/absensi-controllers/toolbar/config-toolbar-rekap-absensi-siswa";
import type { Route } from "./+types/rekap-absensi-siswa";


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
        titleTambahan:'Rekap Bulanan',
        controlKelas: settingRombel,
        toolbarTabs: ConfigToolbarRekapAbsensiSiswa,
    };
}

export default function AbsensiiswaBulanan() {
    
    return(
        <RekapAbsensiSiswaPage/>
    )
}