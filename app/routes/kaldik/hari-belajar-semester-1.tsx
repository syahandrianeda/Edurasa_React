import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { ConfigToolbarKaldikHariEfektif } from "~/controllers/kaldik-controller/toolbar/config-hari-efektif";
import type { Route } from "./+types/hari-belajar-semester-1";
import KaldikHariEfektifBelajar from "~/pages/kaldik/kaldik-hari-efektif-belajar";

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

export default function KaldikHariEfektifBelajarSemesterSatuRoute({loaderData}: Route.ComponentProps){
    return (
        <KaldikHariEfektifBelajar semester={1}/>
    )
}