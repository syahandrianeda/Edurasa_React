import { Navigate, redirect } from "react-router";
import { sheetAkun_dataSiswa } from "~/domain/enloaded/intial-enloaded/by-sheet/akun";
import type { Route } from "./+types/entry-point-gallery";
import { sheetGallery_serahTerimaDokumen, sheetGallery_transaksiSerahTerimaDokumen } from "~/domain/enloaded/intial-enloaded/by-sheet/gallery";
import { sheetTendik_pangkatGolongan, sheetTendik_riwayatIdAkun } from "~/domain/enloaded/intial-enloaded/by-sheet/tendik";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";


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

// export function clientLoader({}:Route.ComponentProps){
    
//     return {
//         titleTambahan:'Gallery', 
//         pesanLoading:'Mempersiapkan Gallery',
//         toolbarTabs: {...TabConfigKopTtd, defaultValue:'tabTtd'},
//         sheetNeeded: [
//             sheetAkun_dataSiswa,
//             sheetGallery_serahTerimaDokumen,
//             sheetGallery_transaksiSerahTerimaDokumen,
//             sheetTendik_riwayatIdAkun,
//             sheetTendik_pangkatGolongan
            
//         ],
        
//         mustLoadSheetNeedSiswaIfExist:true
    
//     };
// }
export function clientLoader(){
    return redirect("/gallery/create-daftar-serah-terima-dokumen")
}
export default function RedirectToGalleryPage({loaderData}:Route.ComponentProps) {
    
    // return(
    
    // <Navigate to="/gallery/create-daftar-serah-terima-dokumen" replace />
    // )
    return null
}