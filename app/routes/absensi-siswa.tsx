
import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { Navigate, redirect } from "react-router";
import type { Route } from "./+types/absensi-siswa";
import { defineAbsenRombelNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/absensi/absensi-needed";

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
    // const settingRombel: controlDropdownKelas ={
    //         showControlKelas:true,
    //         title: 'Rombel',
    //         description:'Rombel yang Anda Ampu',
    //         typeKelas:'rombel'
    //     }
        

    // return {
    //     titleTambahan:'Hari ini',
    //     controlKelas: settingRombel,
    //     pesanLoading:'Memanggil Data Absen Hari ini',
    //     addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:false},
    //     sheetNeeded:defineAbsenRombelNeeded,
    //     mustLoadSheetNeedSiswaIfExist:true
    // };
    return redirect("/absensi-siswa/absensi-hari-ini")
}

export default function AbsensiSiswa() {
    // return(
    //     <Navigate to="/absensi-siswa/absensi-hari-ini" replace />
    // )
    return null
}