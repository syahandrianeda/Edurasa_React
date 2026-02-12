import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { ConfigToolbarKaldikHariEfektif } from "~/controllers/kaldik-controller/toolbar/config-hari-efektif";
import type { Route } from "./+types/jam-belajar-semester-2";
import KaldikJamEfektifBelajar from "~/pages/kaldik/kaldik-jam-efektif-belajar";

export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Edurasa';
    
    return [
        {
            title: mainTitle + ' | Kalendar Pendidikan'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}


export async function clientLoader({}:Route.ComponentProps){

    const settingRombel: controlDropdownKelas ={
        showControlKelas:false,
        title: 'Rombel',
        description:'Rombel yang Anda Ampu',
        typeKelas:'rombel'
    }
    
    return {
        titleTambahan: 'Hari Efektif Belajar Semester 1', 
        data: [], // data: data, 
        toolbarTabs: ConfigToolbarKaldikHariEfektif,
        controlKelas: settingRombel,
    };
}

export default function KaldikJamEfektifBelajarSemesterDuaRoute({loaderData}: Route.ComponentProps){
    return (
        <KaldikJamEfektifBelajar semester={2}/>
    )
}