import {useCallback, useEffect, useMemo, useRef} from 'react';
import { useAppSelector } from '~/context-reduct/hook';
import { defineCreateItemSoalNeeded } from '~/domain/enloaded/intial-enloaded/by-route-page/banksoal/create-item-soal-needed';
import { sheetBankSoal_publikasiPaket } from "~/domain/enloaded/intial-enloaded/by-sheet/bank-soal";
import BuildParamLoaded from '~/infrastructures/ensure-loaded-api/build-param-loaded';
import { getSessionRombel } from '~/infrastructures/session-storage/rombel-session';
import {toast} from 'sonner';
import EnsurLoadedApiService from '~/infrastructures/ensure-loaded-api/EnsureLoadedApiService';
import DispatchingResponseToStore from '~/lib/dispatching-response-to-store';
import DispatchingResponseToFokusUi from '~/lib/dispatching-response-to-fokus-ui';
import { store } from '~/context-reduct/redux-provider';
import { siswaDefindeAbsenRombelNeeded } from '~/domain/enloaded/intial-enloaded/by-route-page/siswa/menu-needed';
import RingkasanInfoSiswa from '~/controllers/info-siswa/ringkasan-info-siswa';

export default function InfoSiswa(){
    const sheetNeeded = siswaDefindeAbsenRombelNeeded;
    const st = store.getState();
    const user = useAppSelector( state => state.auth.user );
    const rombel =  getSessionRombel();
   
    
    

    
    
    

    const reqParam = useMemo(() => {
    
            if ( sheetNeeded && typeof sheetNeeded === "function" ) {
    
                
    
                return (sheetNeeded as (value: typeof rombel) => unknown)(rombel);
            }
    
            if ( Array.isArray( sheetNeeded ) ) {
    
                return sheetNeeded;
            }
    
            return;
    
        }, [
            rombel,
            sheetNeeded,
        ]);

     const instDataEnloaded = useMemo(() => {
    
            if (!Array.isArray(reqParam)) {
                return;
            }
    
            return new BuildParamLoaded( st, reqParam ).evaluate();
    
        }, [
            st,
            reqParam,
        ]);
     const loadingRef = useRef(false);
    const loadedRef = useRef<Set<string>>(new Set());
    const loadKey = useMemo(() => {
        
       if (!Array.isArray(reqParam) || reqParam.length === 0) {
           return null;
       }

       

       return JSON.stringify({
           rombel,
           param: reqParam,
       });

   }, [
       reqParam,
       rombel
   ]);

    const callApi = useCallback(()=>{
         /**
         * Tidak ada request kalau tidak mempunyai loadKey.
         */
        if (!loadKey) {
            return;
        }


        /**
         * ========================================================
         * CEK 1
         *
         * Data untuk kebutuhan ini sudah pernah berhasil dimuat.
         *
         * Jangan request lagi.
         * ========================================================
         */

        if ( loadedRef.current.has(loadKey) ) {
            return;
        }


        /**
         * ========================================================
         * CEK 2
         *
         * Ada request yang sedang berjalan.
         *
         * Jangan membuat request kedua.
         * ========================================================
         */

        if ( loadingRef.current ) {

            return;
        }


        /**
         * Tandai bahwa request sedang berjalan.
         */

        loadingRef.current = true;
        try{
            const api = new EnsurLoadedApiService();
            if ( !instDataEnloaded?.param || instDataEnloaded.param.length === 0 ) {
    
                    return;
                }
            const param = instDataEnloaded.param;
             if ( param.length === 0 ) {
    
                    return;
                }
            toast.promise(
                    api.callNeeded(param),
                    {
                        loading: 'Memeriksa tugas dan informasi hari ini untuk ananda',
    
                        success: data => {
                            // console.log('data respon', { data });
                            if (data && Array.isArray(data)) {
    
                                console.log(data);
    
                                data.forEach(({ success, data, detailResponse, }) => {
    
                                    if (detailResponse) {
                                        DispatchingResponseToStore(
                                            success,
                                            data,
                                            detailResponse,
                                            rombel
                                        );
    
                                        DispatchingResponseToFokusUi();
                                    }
                                }
                                );
                            }
    
                            return ("Pemanggilan data telah selesai");
                        },
    
                        error:  data=>`Gagal memuat data karena error,  \r`+ data,
    
                        closeButton: true,
                    }
                );
                 loadedRef.current.add( loadKey );
        }catch(er){

        }finally{
            loadingRef.current = false;
        }

        
    },[
        instDataEnloaded,
        rombel, 
        loadKey
    ])

    

    useEffect(() => {
    
            if (!user) { return; }
            if (!instDataEnloaded) { return; }
             if (!loadKey) { return; }
            
            void callApi();
    
        }, [
            user,
            instDataEnloaded,
            loadKey,
            callApi
        ]);
    console.log({reqParam, instDataEnloaded});
    
    return (
        <div className="border-2 rounded-2xl bg-white min-h-[calc(100vh-12rem)] w-10/12 mx-auto p-4 ">
            <h3 className='text-xl text-center'>Selamat Datang {user?.name} (Kelas {rombel})</h3>
            <RingkasanInfoSiswa/>
        </div>
    )
}