import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/koleksi-bank-soal";
import { defineCreateItemSoalNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/banksoal/create-item-soal-needed";
import { useAppSelector } from "~/context-reduct/hook";
import { DtoBankSoalSelector} from "~/context-reduct/selectores/bank-soal-selector";
import { getNumberFromString } from "~/lib/get-number";
import KoleksiBankSoalPage from "~/pages/bank-soal/koleksi-bank-soal-page";
import { useMemo } from "react";



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
            title: 'Kelas',
            description:'Kelas',
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
        titleTambahan:'Koleksi Bank Soal',
        controlKelas: settingRombel,
        toolbarTabs: undefined,//ConfigToolbarSelectMapel
        showExport:true,
                addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
                sheetNeeded: defineCreateItemSoalNeeded
        
    };
}


// export async function clientAction({ request }: Route.ActionArgs){
//     const instCall  = new EnsurLoadedApiService();
//     const paramReq = ((await request.formData()).get('parameter'));
//     const json = JSON.parse(paramReq as string);
//     const data = await instCall.callNeeded(json);
//     return data
// }

export default function KoleksiBankSoalRoute() {
    const dataSoalAsal = useAppSelector(DtoBankSoalSelector);
    const kelas = useAppSelector(s=>s.fokusRombel.value)
    const dataSoal = useMemo(()=> dataSoalAsal.filter(s=>s.status === '' && s.fase_jenjang.includes(getNumberFromString(kelas))),[dataSoalAsal])
   

    // const normalizedFilters = filters as BankSoalFilterType;

    return(
        <div className="p-1">
            <h3 className="text-2xl text-center font-extrabold uppercase">Koleksi Bank Soal kelas {getNumberFromString(kelas)} </h3>
            <KoleksiBankSoalPage dataSoal={dataSoal}/>
        </div>
    )
}