import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { ConfigToolbarKeteranganKaldik } from "~/controllers/kaldik-controller/toolbar/config-toolbar-kaldik";
import type { Route } from "../+types/kaldik";
import KeteranganKaldikPage from "~/pages/kaldik/keterangan-kaldik";
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
        titleTambahan: 'Setting Kalender', 
        data: [], // data: data, 
        toolbarTabs: ConfigToolbarKeteranganKaldik,
        controlKelas: settingRombel, 
        pesanLoading:'Mempersiapkan data Setting',
        // addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:false},
        sheetNeeded: [sheetKaldik_kalender]
    };
}

export default function KeteranganKaldikRoute(){
    
    return (
        <KeteranganKaldikPage />
    )
}