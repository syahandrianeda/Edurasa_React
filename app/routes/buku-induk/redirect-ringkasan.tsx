import { Navigate } from "react-router";
import type { Route } from "./+types/redirect-ringkasan";
import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import { sheetAkun_dataSiswa } from "~/domain/enloaded/intial-enloaded/by-sheet/akun";
import { store } from "~/context-reduct/redux-provider";
import { defineCpTpAtpNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/kurikulum/cp-needed";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { defineAbsenRombelNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/absensi/absensi-needed";
import { IndDbSiswaRepository } from "~/infrastructures/indexDb/db-datasiswa-repository";


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
        titleTambahan:'Buku Induk Loading', 
        pesanLoading:'Mempersiapkan Buku Induk',
        sheetNeeded: [sheetAkun_dataSiswa],
    
    };
}
export default function RedirectToRingkasanPage({loaderData}:Route.ComponentProps) {
    
    return(
    
    <Navigate to="/buku-induk/ringkasan" replace />
    )
}