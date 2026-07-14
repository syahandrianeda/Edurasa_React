import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/program-tahunan";
import { useAppSelector } from "~/context-reduct/hook";
import ProsemPage from "~/pages/kurikulum/prosem-page";
import { ConfigToolbarSemester } from "~/controllers/prosem/config-semester-toolbar";
import EnsurLoadedApiService from "~/infrastructures/ensure-loaded-api/EnsureLoadedApiService";
import { useEffect, useMemo, useRef } from "react";
import { useFetcher } from "react-router";
import { createParamEnloaded} from "~/infrastructures/ensure-loaded-api/create-param-loaded";
import { toast } from "sonner";
import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import getFaseByRombel from "~/lib/get-fase-by-rombel";
import { defineProsemNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/kurikulum/prosem-needed";
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

export async function clientLoader({}:Route.ComponentProps){
    // const page = getSessionApp();
    
    // if(!page){
    //     throw redirect('/login');
    // }
    const settingRombel: controlDropdownKelas ={
            showControlKelas:true,
            title: 'Kelas',
            description:'Daftar Jenjang',
            typeKelas:'rombel'
        }
        
    
    return {
        titleTambahan:'Program Semester',
        controlKelas: settingRombel,
        toolbarTabs:ConfigToolbarSemester//ConfigToolbarSelectMapel,//ConfigToolbarJadwalMapelAll
    };
}

export async function clientAction({ request }: Route.ActionArgs){
    const instCall  = new EnsurLoadedApiService();
    const paramReq = ((await request.formData()).get('parameter'));
    const json = JSON.parse(paramReq as string);
    const data = await instCall.callNeeded(json);
    return data
}
export default function ProgramSemesterRoutePage({loaderData}: Route.ComponentProps) {
    const fetcher = useFetcher<typeof clientAction>();
    const isSubmitting = useRef(false);
    const st = store.getState();
    const rombel = useAppSelector(state=> state.fokusRombel.value);//st.fokusRombel.value;
    const dataNeeded:DataSheetNeeeded[] = defineProsemNeeded(rombel??getSessionRombel());
    
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
                    loading: `Memuat data yang dibutuhkan Program Semester di Kelas ${rombel} / fase ${getFaseByRombel(rombel??getSessionRombel())}`,
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
        
            <ProsemPage/>
            
    )
}