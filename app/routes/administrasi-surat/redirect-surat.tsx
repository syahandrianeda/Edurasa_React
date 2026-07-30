import { Navigate } from "react-router";
import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/redirect-surat";
import { sheetSurat_suratKeluar } from "~/domain/enloaded/intial-enloaded/by-sheet/surat";


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
                showControlKelas:false,
                title: 'Akses kelas',
                description:'Akses Rombel',
                typeKelas:'rombel',
                // sourceKelas:'tabungan',
            }
    return {
        titleTambahan:'Administrasi Surat', 
        controlKelas: settingRombel,
        pesanLoading:'Mempersiapkan Administrasi Surat',
        sheetNeeded: [sheetSurat_suratKeluar]
        // sheetNeeded: defineTabunganRombelNeededRedirect,//[sheetAkun_dataSiswa],
        // mustLoadSheetNeedSiswaIfExist:true
    
    };
}
export default function RedirectToTabunganSiswaPage({loaderData}:Route.ComponentProps) {
    
    return(
    
    <Navigate to="/arsip-surat/surat-keluar" replace />
    )
}