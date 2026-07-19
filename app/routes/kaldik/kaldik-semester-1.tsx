import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/kaldik-semester-1";
import KaldikSemesterPage from "~/pages/kaldik/kaldik-semester";
import { ConfigToolbarKaldikSemester } from "~/controllers/kaldik-controller/toolbar/config-kaldik-semester";
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
        titleTambahan: 'Semester 1', 
        data: [], // data: data, 
        toolbarTabs: ConfigToolbarKaldikSemester,
        controlKelas: settingRombel,
        pesanLoading:'Mempersiapkan kaldik semester 1',
        // addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:false},
        sheetNeeded: [sheetKaldik_kalender]
    };
}

export default function KaldikSemesterSatuRoute({loaderData}: Route.ComponentProps){
    return (
        <KaldikSemesterPage semester={1}/>
    )
}