import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/remedial-pengayaan-route";




export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Penilaian'
        },
        { 
            name: "description", 
            content: "Edurasa New Version" 
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
        titleTambahan:'Kategori Remedial/Pengayaan',
        controlKelas: settingRombel,
        toolbarTabs: undefined,// ConfigToolbarDesainPraSoal,//ConfigToolbarSelectMapel
        showExport:true,
                // pesanLoading:'Mempersiapkan ATP',
                addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
                // sheetNeeded: defineCreateItemSoalNeeded,
                
    };
}


export default function RemedialPengayaanRoute() {
    
        

    return(
        <div className="p-1">
            Hello World
        </div>
    )
}
