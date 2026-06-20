import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/cp-page";
import ElemenCpPage from "~/pages/kurikulum/elemen-cp-page";
import { ConfigToolbarSelectMapel } from "~/controllers/kurikulum/toolbar/config-toolbar-select.mapel";

import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import { redirect } from "react-router";
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
    // };
    const settingRombel: controlDropdownKelas ={
            showControlKelas:true,
            title: 'Rombel',
            description:'Rombel yang Anda Ampu',
            typeKelas:'rombel'
        }
        

    return {
        titleTambahan:'Capaian Pembelajaran',
        controlKelas: settingRombel,
        toolbarTabs: ConfigToolbarSelectMapel
    };
}

export default function CpPageRoute({loaderData}:Route.ComponentProps) {
    console.log(loaderData)
    return(
        <ElemenCpPage/>
    )
}