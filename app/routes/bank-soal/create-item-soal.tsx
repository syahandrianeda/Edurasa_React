import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/create-item-soal";
import { ConfigToolbarDesainPraSoal } from "~/controllers/bank-soal/toolbar/config-toolbar-create-soal";
import { CreateItemSoalProvider } from "~/controllers/bank-soal/reducer-item-soal/immer-reducer-context";
import { initialCreateItemSoal } from "~/controllers/bank-soal/reducer-item-soal/Initial-item-soal";
import { defineCreateItemSoalNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/banksoal/create-item-soal-needed";
import CreateItemSoalPage from "~/pages/bank-soal/CreateItemSoalPage";

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
            typeKelas:'rombel'
        }
        

    return {
        titleTambahan:'Buat Item Soal',
        controlKelas: settingRombel,
        toolbarTabs: ConfigToolbarDesainPraSoal,//ConfigToolbarSelectMapel
        showExport:true,
                // pesanLoading:'Mempersiapkan ATP',
                addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
                sheetNeeded: defineCreateItemSoalNeeded,
                 mustLoadSheetNeedSiswaIfExist:true,
                
    };
}


export default function BankSoalRoute() {
    
        

    return(
        // <CreateItemSoalProvider dataImmer={dataBankSoalApp} actionImmer={setDataBankSoalApp}>
        <CreateItemSoalProvider initialData ={initialCreateItemSoal}>
            <CreateItemSoalPage/>
        
        </CreateItemSoalProvider>
    )
}

