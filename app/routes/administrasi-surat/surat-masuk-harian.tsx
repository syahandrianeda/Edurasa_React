import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/surat-masuk-harian";



export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Surat'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}
export function clientLoader({}:Route.ComponentProps){
    
    const settingRombel: controlDropdownKelas ={
            showControlKelas:false,
            title: 'Rombel',
            description:'Rombel yang Anda Ampu',
            typeKelas:'jenjang'
        }
    /** sediakan data apa yang dibutuhkan untuk halaman ini
     * misal, butuh:
     * [ 
     *  {sheet:'kurikulum', tab:'elemen_cp'},
     *  {sheet:'kurikulum', tab:'Atp'},
     *  {sheet:'kurikulum', tab:'Atp'},
     * ]
     *  */    
     
    return {
        titleTambahan:'Buat Surat Masuk',
        controlKelas: settingRombel,
        toolbarTabs: undefined,//ConfigToolbarSelectMapel
        showExport:false,
                // pesanLoading:'Mempersiapkan ATP',
                // addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
                // sheetNeeded: defineCreateItemSoalNeeded
        
    };
}


// export async function clientAction({ request }: Route.ActionArgs){
//     const instCall  = new EnsurLoadedApiService();
//     const paramReq = ((await request.formData()).get('parameter'));
//     const json = JSON.parse(paramReq as string);
//     const data = await instCall.callNeeded(json);
//     return data
// }

export default function SuratMasukHarianRoute() {
    
   
    return(
        <div className="p-1">
            Hello World Buat Surat Masuk
            
        </div>
    )
}