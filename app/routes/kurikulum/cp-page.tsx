import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/cp-page";
import ElemenCpPage from "~/pages/kurikulum/elemen-cp-page";
import { ConfigToolbarSelectMapel } from "~/controllers/kurikulum/toolbar/config-toolbar-select.mapel";
import EnsurLoadedApiService from "~/infrastructures/ensure-loaded-api/EnsureLoadedApiService";
import { useEffect, useMemo, useRef } from "react";
import { useFetcher } from "react-router";
import { createParamEnloaded} from "~/infrastructures/ensure-loaded-api/create-param-loaded";
import { toast } from "sonner";
import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import {   defineCpTpAtpNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/kurikulum/cp-needed";
import { useAppSelector } from "~/context-reduct/hook";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import getFaseByRombel from "~/lib/get-fase-by-rombel";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { store } from "~/context-reduct/redux-provider";


export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Edurasa';
    
    return [
        {
            title: mainTitle + ' | Kurikulum'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}

export function clientLoader({}:Route.ComponentProps){
    
    // const page = getSessionApp();
    
    // if(!page){
    //     throw redirect('/login');
    // };
    const settingRombel: controlDropdownKelas ={
            showControlKelas:true,
            title: 'Rombel',
            description:'Rombel yang Anda Ampu',
            typeKelas:'rombel'
        }
        

    return {
        titleTambahan:'Capaian Pembelajaran',
        controlKelas: settingRombel,
        toolbarTabs: ConfigToolbarSelectMapel
    };
}

export async function clientAction({ request }: Route.ActionArgs){
    const instCall  = new EnsurLoadedApiService();
    const paramReq = ((await request.formData()).get('parameter'));
    const json = JSON.parse(paramReq as string);
    const data = await instCall.callNeeded(json);
    return data
}


export default function CpPageRoute({loaderData}:Route.ComponentProps) {
    const fetcher = useFetcher<typeof clientAction>();
    const isSubmitting = useRef(false);
    const st = store.getState();
    const rombel = useAppSelector(state=> state.fokusRombel.value);//st.fokusRombel.value;
    const dataNeeded:DataSheetNeeeded[] = defineCpTpAtpNeeded(rombel??getSessionRombel());
    
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
                    loading: `Memuat data yang dibutuhkan Tujuan Pembelajaran di Kelas ${rombel}/ fase ${getFaseByRombel(rombel??getSessionRombel())}`,
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
        <ElemenCpPage/>
    )
}