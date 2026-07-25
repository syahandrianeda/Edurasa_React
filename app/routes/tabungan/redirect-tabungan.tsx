import { Navigate } from "react-router";
import type { Route } from "./+types/redirect-tabungan";
import { defineTabunganRombelNeededRedirect } from "~/domain/enloaded/intial-enloaded/by-route-page/tabungan/input-tabungan-needed";
import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";


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
    const settingRombel: controlDropdownKelas ={
                showControlKelas:true,
                title: 'Akses kelas',
                description:'Akses Rombel',
                typeKelas:'rombel',
                sourceKelas:'tabungan',
            }
    return {
        titleTambahan:'Buku Tabungan Loading', 
        controlKelas: settingRombel,
        pesanLoading:'Mempersiapkan Hak Akses Keuangan',
        sheetNeeded: defineTabunganRombelNeededRedirect,//[sheetAkun_dataSiswa],
        sourceKelas:'tabungan',
        mustLoadSheetNeedSiswaIfExist:true
    
    };
}
export default function RedirectToTabunganSiswaPage({loaderData}:Route.ComponentProps) {
    
    return(
    
    <Navigate to="/tabungan/tabungan-siswa" replace />
    )
}