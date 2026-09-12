import type { Route } from "./+types/create-paket-soal";
import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { ConfigCreatePaketSoal } from "~/controllers/paket-soal/toolbar/config-toolbar-create-paket";
import { defineCreateItemSoalNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/banksoal/create-item-soal-needed";
import CreatePaketSoalPage from "~/pages/bank-soal/create-paket-soal-page";


export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Bank Soal'
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
            typeKelas:'rombel',
            
        }
        

    return {
        titleTambahan:'Buat Paket Soal',
        controlKelas: settingRombel,
        toolbarTabs: ConfigCreatePaketSoal,
        showExport:false,
                        // pesanLoading:'Mempersiapkan ATP',
                        addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
                        sheetNeeded: defineCreateItemSoalNeeded
    };
}

export default function CreatePaketSoalRoute() {
    
    return(
        <>
            <CreatePaketSoalPage/>
        </>

    )
}