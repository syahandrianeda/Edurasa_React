import { Navigate } from "react-router";

import { sheetAkun_dataSiswa } from "~/domain/enloaded/intial-enloaded/by-sheet/akun";
import type { Route } from "./+types/redirect-tabungan";


export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Sekolah'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}

export function clientLoader({}:Route.ComponentProps){
    
    return {
        titleTambahan:'Buku Tabungan Loading', 
        pesanLoading:'Mempersiapkan Buku Tabungan',
        sheetNeeded: [sheetAkun_dataSiswa],
        
        mustLoadSheetNeedSiswaIfExist:true
    
    };
}
export default function RedirectToTabunganSiswaPage({loaderData}:Route.ComponentProps) {
    
    return(
    
    <Navigate to="/tabungan/tabungan-siswa" replace />
    )
}