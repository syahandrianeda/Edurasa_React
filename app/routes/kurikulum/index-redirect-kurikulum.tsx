import { Navigate } from "react-router";

import { ConfigToolbarSelectMapel } from "~/controllers/kurikulum/toolbar/config-toolbar-select.mapel";
import { defineCpTpAtpNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/kurikulum/cp-needed";
import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/index-redirect-kurikulum";

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

export async function clientLoader({}:Route.ComponentProps){
     const settingRombel: controlDropdownKelas ={
            showControlKelas:true,
            title: 'Rombel',
            description:'Rombel yang Anda Ampu',
            typeKelas:'rombel'
        }
        

    return {
        titleTambahan:'Capaian Pembelajaran',
        controlKelas: settingRombel,
        toolbarTabs: ConfigToolbarSelectMapel,
        pesanLoading:'Mempersiapkan Capaian Pembelajaran',
        addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
        sheetNeeded: defineCpTpAtpNeeded
    };
}
export default function RedirectToCpPage({loaderData}:Route.ComponentProps) {
    
    return(
    
    <Navigate to="/kurikulum/cp" replace />
    )
}