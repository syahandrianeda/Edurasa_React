import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { ConfigToolbarKaldikHariEfektif } from "~/controllers/kaldik-controller/toolbar/config-hari-efektif";
import type { Route } from "./+types/hari-belajar-semester-2";
import KaldikHariEfektifBelajar from "~/pages/kaldik/kaldik-hari-efektif-belajar";
import { sheetKaldik_kalender } from "~/domain/enloaded/intial-enloaded/by-sheet/kaldik";

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
        titleTambahan: 'Hari Efektif Belajar Semester 2', 
        data: [], // data: data, 
        toolbarTabs: ConfigToolbarKaldikHariEfektif,
        controlKelas: settingRombel,
                pesanLoading:'Mempersiapkan Hari Efektif Belajar semester 2',
                // addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:false},
                sheetNeeded: [sheetKaldik_kalender]
    };
}

export default function KaldikHariEfektifBelajarSemesterDuaRoute({loaderData}: Route.ComponentProps){
    return (
        <KaldikHariEfektifBelajar semester={2}/>
    )
}