import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/koleksi-bank-soal";
import { useEffect, useMemo } from "react";
import { useFetcher } from "react-router";
import EnsurLoadedApiService from "~/infrastructures/ensure-loaded-api/EnsureLoadedApiService";
import { createParamEnloaded} from "~/infrastructures/ensure-loaded-api/create-param-loaded";
import { store } from "~/context-reduct/redux-provider";
import { toast } from "sonner";
import { setBankSoal } from "~/context-reduct/global-state/bank-soal/bank-soal-slice";
import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import { CreateItemSoalNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/banksoal/create-item-soal-needed";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";



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
        titleTambahan:'Koleksi Bank Soal',
        controlKelas: settingRombel,
        toolbarTabs: undefined,//ConfigToolbarSelectMapel
        showExport:false,
        
    };
}


export async function clientAction({ request }: Route.ActionArgs){
    const instCall  = new EnsurLoadedApiService();
    const paramReq = ((await request.formData()).get('parameter'));
    const json = JSON.parse(paramReq as string);
    const data = await instCall.callNeeded(json);
    return data
}

export default function KoleksiBankSoalRoute() {
    
    const fetcher = useFetcher<typeof clientAction>();
    const st = store.getState();
    const dataNeeded:DataSheetNeeeded[] = CreateItemSoalNeeded;
    const data = useMemo(()=>{
        return createParamEnloaded(st,dataNeeded)
    }, [dataNeeded, createParamEnloaded]);
    
    console.log('state redux', st)
    console.log(' data createParam', data);

    /** Panggil Api sekali yng belum diload */
    useEffect(()=>{
        if (fetcher.state === "idle" && fetcher.data === null && data.needCall ) {
            
            toast.promise(
                fetcher.submit({parameter:JSON.stringify(data.param)}, { method: "post" }),
                {
                    loading: 'Memuat data yang dibutuhkan Bank Soal...',
                    success: () => {
                        return 'Pemanggilan data telah selesai' ;//+ data?.source;
                    },
                    error: 'Gagal memuat data Absen',
                    finally:()=>{
                        /**=========================== 
                         * jika butuh animasi loader atas, aktifkan ini. 
                         *  tapi harus menempakan beberapa kode  di beberapa tempat
                         * -----------------------------
                                store.dispatch(setloadedApi({
                                    loaded:false,name:'loaded_animation'
                                }));
                         * --------------------------*/
                    }
                }

            )
        }
    },[data.needCall,fetcher.state]);

    useEffect(()=>{
        const dataFetch = fetcher.data ;
        console.log('state redux', st)
        if(dataFetch){
            dataFetch.forEach(({success,data,detailResponse})=>{
                detailResponse && DispatchingResponseToStore(success, data, detailResponse)
            })
    
        }
    },
    [fetcher.data]);

    return(
        <div className="p-1">
            Hello Koleksi Bank Soal
        </div>
    )
}