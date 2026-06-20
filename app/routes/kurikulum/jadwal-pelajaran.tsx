import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { ConfigToolbarJadwalMapel } from "~/controllers/jadwal_pelajaran/toolbar/config-toolbar-jadwal-mapel";
import type { Route } from "./+types/jadwal-pelajaran";
import JadwalMapelPage from "~/pages/kurikulum/jadwal-mapel";
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
    // }
    const settingRombel: controlDropdownKelas ={
            showControlKelas:true,
            title: 'Rombel',
            description:'Rombel yang Anda Ampu',
            typeKelas:'rombel'
        }
        

    return {
        titleTambahan:'Jadwal Pelajaran',
        controlKelas: settingRombel,
        toolbarTabs: ConfigToolbarJadwalMapel
    };
}

export default function JadwalMapelPageRoute() {
    
    return(
        <JadwalMapelPage/>
    )
}