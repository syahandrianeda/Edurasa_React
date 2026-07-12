import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/create-item-soal";
import { ConfigToolbarDesainPraSoal } from "~/controllers/bank-soal/toolbar/config-toolbar-create-soal";
import { CreateItemSoal } from "~/pages/bank-soal/CreateItemSoal";
import { CreateItemSoalProvider } from "~/controllers/bank-soal/reducer-item-soal/immer-reducer-context";
import { initialCreateItemSoal } from "~/controllers/bank-soal/reducer-item-soal/Initial-item-soal";
import EnsurLoadedApiService from "~/infrastructures/ensure-loaded-api/EnsureLoadedApiService";
import { useEffect, useMemo, useRef } from "react";
import { useFetcher } from "react-router";
import { createParamEnloaded} from "~/infrastructures/ensure-loaded-api/create-param-loaded";
import { toast } from "sonner";
import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import getFaseByRombel from "~/lib/get-fase-by-rombel";
import { defineProsemNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/kurikulum/prosem-needed";
import { useAppSelector } from "~/context-reduct/hook";
import { defineCpTpAtpNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/kurikulum/cp-needed";
import { IndDbSiswaRepository } from "~/infrastructures/indexDb/db-datasiswa-repository";
import { namaTab } from "~/lib/nama-tab-environment";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { defineCreateItemSoalNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/banksoal/create-item-soal-needed";
import { store } from "~/context-reduct/redux-provider";

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
    };
}


export async function clientAction({ request }: Route.ActionArgs){
    const instCall  = new EnsurLoadedApiService();
    const paramReq = ((await request.formData()).get('parameter'));
    const json = JSON.parse(paramReq as string) as Record<string, any>[];
    
    /** jika paramReq meminta datasiswa, cegah dulu.  */
    const indexRequestDataSiswa = json.findIndex(s=>s.tab.toString().includes('datasiswa'));
    const requestWithoutDatasiswa = json.filter((_,i)=>i !== indexRequestDataSiswa);
    if(indexRequestDataSiswa > -1){
        const db = new IndDbSiswaRepository();
        const dbSiswa = await db.getAll();
        const dbTanpaSiswa = await instCall.callNeeded(requestWithoutDatasiswa);

        if(dbSiswa.length>0){
            /** panggil request tanpa tab `datasiswa` */;
            const output = {
                data: dbSiswa,
                success: true,
                detailResponse: {
                    namaTab:namaTab('datasiswa')
                },
                source:'indexDB'
            }
            return [...dbTanpaSiswa, output]
        }
    }
    // const data = await instCall.callNeeded(json);
    const data = await instCall.callNeeded(json);

    return data
}

export default function BankSoalRoute() {
    const fetcher = useFetcher<typeof clientAction>();
    const isSubmitting = useRef(false);
    const st = store.getState();
    const rombel = useAppSelector(state=> state.fokusRombel.value);//st.fokusRombel.value;
    // const rombel = st.fokusRombel.value;
    const dataNeeded:DataSheetNeeeded[] = defineCreateItemSoalNeeded(rombel??getSessionRombel());
    
    const data = useMemo(()=>{
        return createParamEnloaded(st,dataNeeded)
    }, [ dataNeeded, st]);
    
    

    /** Panggil Api sekali yng belum diload */
    useEffect(()=>{
        if (fetcher.state !== "idle") return;
        if (!data.needCall) return;
        if (isSubmitting.current) return;

        isSubmitting.current = true;

            toast.promise(
                fetcher.submit({parameter:JSON.stringify(data.param)}, { method: "post" }),
                {
                    loading: `Memuat data yang dibutuhkan Bank Soal di Kelas ${rombel} / fase ${getFaseByRombel(rombel??getSessionRombel())}`,
                    success: (data) => {
                        
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
    },[data.needCall, data.param, fetcher.state]);

    useEffect(()=>{
        const dataFetch = fetcher.data ;
        
        isSubmitting.current = false;
        if(dataFetch){
            dataFetch.forEach(({success,data,detailResponse})=>{
                if(detailResponse){
                    DispatchingResponseToStore(success,data,detailResponse)
                }
            })
    
        }
        
    },
    [fetcher.state]);
        
        

    return(
        // <CreateItemSoalProvider dataImmer={dataBankSoalApp} actionImmer={setDataBankSoalApp}>
        <CreateItemSoalProvider initialData ={initialCreateItemSoal}>
            <CreateItemSoal/>
            
        </CreateItemSoalProvider>
    )
}

