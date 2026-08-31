import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import ImportSoalPage from "~/controllers/bank-soal/import-soal/page/import-soal";
import { defineCreateItemSoalNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/banksoal/create-item-soal-needed";
import type { Route } from "./+types/upload-masal-soal";


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
            typeKelas:'jenjang',
            
        }
        

    return {
        titleTambahan:'Upload Masal',
        controlKelas: settingRombel,
        toolbarTabs: undefined,//ConfigToolbarSelectMapel,
        showExport:false,
                        // pesanLoading:'Mempersiapkan ATP',
                        addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
                        sheetNeeded: defineCreateItemSoalNeeded
    };
}

export default function CreatePaketSoalRoute() {
    
    return(
        <>
            <p>Hello Page Upload Massal</p>
            <ImportSoalPage/>
        </>

    )
}