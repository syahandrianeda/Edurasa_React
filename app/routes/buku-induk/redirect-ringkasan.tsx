import { Navigate, redirect } from "react-router";
import type { Route } from "./+types/redirect-ringkasan";
import { sheetAkun_dataSiswa } from "~/domain/enloaded/intial-enloaded/by-sheet/akun";


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
//         titleTambahan:'Buku Induk Loading', 
//         pesanLoading:'Mempersiapkan Buku Induk',
//         sheetNeeded: [sheetAkun_dataSiswa],
        
//         mustLoadSheetNeedSiswaIfExist:true
    
//     };
// }
export function clientLoader(){
    return redirect('/buku-induk/ringkasan')
}
export default function RedirectToRingkasanPage({loaderData}:Route.ComponentProps) {
    
    // return(
    
    // <Navigate to="/buku-induk/ringkasan" replace />
    // )
    return null
}