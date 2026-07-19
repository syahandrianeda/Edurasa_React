import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/program-tahunan";
import { ConfigToolbarSelectMapel } from "~/controllers/kurikulum/toolbar/config-toolbar-select.mapel";
import ProtaPage from "~/pages/kurikulum/prota-page";
import { defineProtaNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/kurikulum/prota-needed";

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

export async function clientLoader({}:Route.ComponentProps){
    
    const settingRombel: controlDropdownKelas ={
            showControlKelas:true,
            title: 'Kelas',
            description:'Daftar Jenjang',
            typeKelas:'rombel'
        }
        
    
    return {
        titleTambahan:'Program Tahunan',
        controlKelas: settingRombel,
        toolbarTabs:ConfigToolbarSelectMapel,
        pesanLoading:'Mempersiapkan Program Tahunan',
        addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
        sheetNeeded: defineProtaNeeded
    };
}

export default function ProgramTahunanRoutePage({loaderData}: Route.ComponentProps) {
    
    return(
        
            <ProtaPage/>
            
    )
}