import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { ConfigToolbarSelectMapel } from "~/controllers/kurikulum/toolbar/config-toolbar-select.mapel";
import FaseTpPage from "~/pages/kurikulum/fase-tp-page";
import type { Route } from "./+types/tp-page";

export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Edurasa';
    
    return [
        {
            title: mainTitle + ' | Kurikulum'
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
        titleTambahan:'Tujuan Pembelajaran (Fase TP)',
        controlKelas: settingRombel,
        toolbarTabs: ConfigToolbarSelectMapel
    };
}

export default function TpPageRoute() {
    
    return(
        <FaseTpPage/>
    )
}