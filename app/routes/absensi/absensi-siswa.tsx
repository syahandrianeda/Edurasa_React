import AbsensiSiswaPage from "~/pages/absensi-siswa";

import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/absensi-siswa";
import { useAppSelector } from "~/context-reduct/hook";
import { AbsensiRombelAktifDTO } from "~/context-reduct/selectores/absensi-selector";
import { instanceOfKaldik } from "~/context-reduct/selectores/kaldik-selector";

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
       
    };
}

export default function AbsensiSiswaHariIni() {
    const testData = useAppSelector(AbsensiRombelAktifDTO);
    const kaldik = useAppSelector(instanceOfKaldik);
    console.log(kaldik.arrayDateInMonth(new Date()));
    return(
        <AbsensiSiswaPage/>
    )
}