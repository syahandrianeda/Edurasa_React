import type { RootState } from "../store";
import type KesiswaanServiceImplements from "~/infrastructures/services/kesiswaan-service-implements";
import { setAllSiswa } from "../global-state/siswa-slice";
import type { SiswaType } from "~/types/siswa";
import type { Store } from "@reduxjs/toolkit";
import { ShowLoadingPromise, ShowToasterError, ShowToasterLoadingInfo, ShowToasterSuccess } from "~/lib/toaster";
import { toast } from "sonner";
import type { ApiResponse } from "~/configs/appscript-config";

export default class InitNeededSliceStore{
    constructor(private store: Store<RootState>){}

    get state(){
        return this.store.getState();
    }

    async needSiswa(Service:KesiswaanServiceImplements){
        if(this.state.dataSiswa.loaded) return;
        toast.promise(
        Service.loadAllSiswa(),
        {
            loading: 'Memuat data siswa...',
            success: (data) => {
                const raw = data?.data as SiswaType[];
                this.store.dispatch(setAllSiswa({
                    loaded:true,
                    allSiswa: raw,
                    source: data?.source,
                    loading:false
                }));
                return 'Data siswa berhasil dimuat dari ' + data?.source;
            },
            error: 'Gagal memuat data siswa',
            
        }
    );
        // if(!this.state.dataSiswa.loaded){
        //     const data = await Service.loadAllSiswa();
        //     if(!data?.success){
        //         this.store.dispatch(setAllSiswa({
        //             loaded:false,
        //             loading: false,
        //             allSiswa: [],
        //                 // source: data.source
        //             }));    
        //         ShowToasterError('Gagal Memanggil Data Siswa')
        //     }
        //     if(data?.success && data?.data){
        //         const raw  = data.data as SiswaType[];
                
        //         this.store.dispatch(setAllSiswa({
        //             loaded: true,
        //             allSiswa: raw,
        //             source: data.source,
        //             loading: false
        //         }));
        //         ShowToasterSuccess('Berhasil Memuat Database yang diambil dari '+ data.source)
        //     }
        // }
        
        // ShowToasterSuccess('Berhasil Memuat Database yang diambil dari '+this.state.dataSiswa.source)
        // return this;

    }
}