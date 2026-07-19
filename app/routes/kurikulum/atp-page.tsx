import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/atp-page";
import { ConfigToolbarSelectMapel } from "~/controllers/kurikulum/toolbar/config-toolbar-select.mapel";
import AtpPage from "~/pages/kurikulum/atp-page";
import {  defineCpTpAtpNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/kurikulum/cp-needed";

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
    // const page = getSessionApp();
    
    // if(!page){
    //     throw redirect('/login');
    // }
    const settingRombel: controlDropdownKelas ={
            showControlKelas:true,
            title: 'Rombel',
            description:'Rombel yang Anda Ampu',
            typeKelas:'rombel'
        }
        

    return {
        titleTambahan:'Alur Tujuan Pembelajaran (ATP)',
        controlKelas: settingRombel,
        toolbarTabs: ConfigToolbarSelectMapel,
        pesanLoading:'Mempersiapkan ATP',
        addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
        sheetNeeded: defineCpTpAtpNeeded
    };
}

export default function TpPageRoute() {
    
    
    return(
        <AtpPage/>
    )
}