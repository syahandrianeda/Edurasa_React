import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { ConfigToolbarKeteranganKaldik } from "~/controllers/kaldik-controller/toolbar/config-toolbar-kaldik";

import KeteranganKaldikPage from "~/pages/kaldik/keterangan-kaldik";
import type { Route } from "./+types/keterangan-kaldik";
import { useAppSelector } from "~/context-reduct/hook";
import { store } from "~/context-reduct/redux-provider";
import { useEffect, useMemo, useRef } from "react";
import { createParamEnloaded } from "~/infrastructures/ensure-loaded-api/create-param-loaded";
import { namaTab } from "~/lib/nama-tab-environment";
import EnsurLoadedApiService from "~/infrastructures/ensure-loaded-api/EnsureLoadedApiService";
import { useFetcher } from "react-router";
import { toast } from "sonner";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import { sheetAkun_dataSiswa } from "~/domain/enloaded/intial-enloaded/by-sheet/akun";
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
    
    const fetcher = useFetcher<typeof clientAction>();
    const isSubmitting = useRef(false);
    const rombel = useAppSelector(s=>s.fokusRombel.value);
    const st = store.getState();
    const reqParam = useMemo(()=>[
            sheetAkun_dataSiswa,
            sheetKaldik_kalender,
            {sheet: 'absensi', tab:`${namaTab('kelas')}_${rombel}`}
    ],[rombel]);
    const findDataAbsenRombel = useMemo(()=>createParamEnloaded(st, reqParam),[st, reqParam])
    

    const { param,dataAbsensiKelasIni } = findDataAbsenRombel;
    
    useEffect(()=>{
        
        if(dataAbsensiKelasIni) return
        if (fetcher.state !== "idle") return;
        if (isSubmitting.current) return;
        
        isSubmitting.current = true;
        
        
            toast.promise(
                fetcher.submit({parameter:JSON.stringify(param)}, { method: "post" }),
                {
                    loading: `Memuat data yang dibutuhkan Absensi di Kelas ${rombel}`,
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
        
    }, [dataAbsensiKelasIni, fetcher.state]);
    
    useEffect(()=>{
            const dataFetch = fetcher.data ;
            
            isSubmitting.current = false;
            if(dataFetch){
                dataFetch.forEach(({success,data,detailResponse})=>{
                    if(detailResponse){
                        DispatchingResponseToStore(success,data,detailResponse, rombel)
                    }
                })
        
            }
            
        },
        [fetcher.state]);
    
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
        controlKelas: settingRombel
    };
}


export async function clientAction({ request }: Route.ActionArgs){
    const instCall  = new EnsurLoadedApiService();
    const paramReq = ((await request.formData()).get('parameter'));
    const json = JSON.parse(paramReq as string);
    const data = await instCall.callNeeded(json);
    return data
}


export default function KeteranganKaldikRoute(){
    const fetcher = useFetcher<typeof clientAction>();
        const isSubmitting = useRef(false);
        const rombel = useAppSelector(s=>s.fokusRombel.value);
        const st = store.getState();
        const reqParam = useMemo(()=>[
                sheetAkun_dataSiswa,
                sheetKaldik_kalender,
                {sheet: 'absensi', tab:`${namaTab('kelas')}_${rombel}`}
        ],[rombel]);
        const findDataAbsenRombel = useMemo(()=>createParamEnloaded(st, reqParam),[st, reqParam])
        
    
        const { param,needCall } = findDataAbsenRombel;
        
        useEffect(()=>{
            
            
            if (fetcher.state !== "idle") return;
            if(!needCall) return;
            if (isSubmitting.current) return;
            
            isSubmitting.current = true;
            
            
                toast.promise(
                    fetcher.submit({parameter:JSON.stringify(param)}, { method: "post" }),
                    {
                        loading: `Memuat data yang dibutuhkan Kalender Pendidikan di Kelas ${rombel}`,
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
            //},[data.needCall, data.param, fetcher.state]);
        }, [needCall, fetcher.state]);
        
        useEffect(()=>{
                const dataFetch = fetcher.data ;
                
                isSubmitting.current = false;
                if(dataFetch){
                    dataFetch.forEach(({success,data,detailResponse})=>{
                        if(detailResponse){
                            DispatchingResponseToStore(success,data,detailResponse, rombel)
                        }
                    })
            
                }
                
            },
            [fetcher.state]);
        
    return (
        <KeteranganKaldikPage />
    )
}