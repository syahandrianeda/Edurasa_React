
import { Outlet } from "react-router";
import type { Route } from "./+types/app-provider-service";
import { useAppSelector } from "~/context-reduct/hook";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import { createParamEnloaded } from "~/infrastructures/ensure-loaded-api/create-param-loaded";
import { store } from "~/context-reduct/redux-provider";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import EnsurLoadedApiService from "~/infrastructures/ensure-loaded-api/EnsureLoadedApiService";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { IndDbSiswaRepository } from "~/infrastructures/indexDb/db-datasiswa-repository";
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { SiswaType } from "~/types/siswa";
import { getNumberFromString } from "~/lib/get-number";
import getFaseByRombel from "~/lib/get-fase-by-rombel";
import { SiswaCrudProvider } from "~/controllers/data-siswa-controller/kesiswaan-controller";
import KesiswaanServiceImplements from "~/infrastructures/services/kesiswaan-service-implements";
import { KaldikCrudProvider } from "~/controllers/kaldik-controller/crud-provider-controller/kaldik-crud-provider";
import { AbsensiCrudProvider } from "~/controllers/absensi-controllers/crud-provider/absensi-crud-provider";
import KaldikServiceImplements from "~/infrastructures/services/kaldik-service-implements";
import AbsensiServiceImplements from "~/infrastructures/services/absensi-service-implements";
import { CrudMapelRombel } from "~/controllers/mapel/crud/crud-mapelrombel-provider";
import { CrudElemenCpProvider } from "~/controllers/kurikulum/crud/crud-elemen-cp-provider";
import { CrudTpFaseProvider } from "~/controllers/kurikulum/crud/crud-tp-fase-provider";
import { CrudAtpProvider } from "~/controllers/kurikulum/crud/crud-atp-provider";
import { SettingJadwalCrudProvider } from "~/controllers/jadwal_pelajaran/crud/crud-setting-jadwal-provider";
import { SebaranJadwalCrudProvider } from "~/controllers/jadwal_pelajaran/crud/crud-sebaran-jadwal-provider";
import { CrudProtaProvider } from "~/controllers/prota/crud/crud-prota-provider";
import MapelRombelServiceImplements from "~/infrastructures/services/mapelrombel-service-implements";
import ElemenCpServiceImplements from "~/infrastructures/services/elemencp-service-implements";
import FaseTpServiceImplements from "~/infrastructures/services/fase-tp-service-implements";
import AtpServiceImplements from "~/infrastructures/services/atp-service-implements";
import SettingJadwalService from "~/infrastructures/services/setting-jadwal-service";
import JadwalMapelServiceImplements from "~/infrastructures/services/sebaran-jadwal-mapel";
import ProtaServiceImplements from "~/infrastructures/services/prota-service-implements";
import { namaTab } from "~/lib/nama-tab-environment";
import { setAllSiswa } from "~/context-reduct/global-state/siswa-slice";
/**
 * `AppProviderLayoutService`, menyediakan:
 *  * ensurLoadedStateService
 *  * menginstansiasi seluruh service implements di sini saja, tidak di sembarang tempat
 *  * merender/menaruh seluruh crudProvider);
 *  * mengambil `matches` untuk mendapatkan `DataSheetNeeded` appScript yang harus dipanggil
 *  
 */
export default function AppProviderLayoutService({matches}:Route.ComponentProps){
    const st = store.getState();
    const preventSecondLoad = useRef(false);
    const user = useAppSelector(state => state.auth.user);
    const rombel = useAppSelector(s=>s.fokusRombel.value) ?? getSessionRombel();
    const loaderDataKiriman = matches.at(-1)?.loaderData as { 
            toolbarTabs?: TabsConfigProps,
            titleTambahan:string, 
            pesanLoading?:string,
            controlKelas?:controlDropdownKelas
            addPesanRombel?:{isAdd:boolean, type:'jenjang'|'rombel', includeFaseName?:boolean},
            sheetNeeded?: (v?:string)=>DataSheetNeeeded[],
            mustLoadSheetNeedSiswaIfExist?:boolean
        } 
    const textLoading = loaderDataKiriman?.pesanLoading || `Memuat data yang dibutuhkan ${loaderDataKiriman.titleTambahan}`;
    const textRombelJenjang = loaderDataKiriman?.addPesanRombel?.type === 'jenjang'? getNumberFromString(rombel): rombel;
    const textFase = loaderDataKiriman?.addPesanRombel &&  (loaderDataKiriman?.addPesanRombel?.includeFaseName? `/Fase ${getFaseByRombel(rombel)}`: '' )||'';
    const textRombelFase:string = loaderDataKiriman?.addPesanRombel?.isAdd ? ` di kelas ${textRombelJenjang}${textFase}`: `` ;
    
    /** semua infrastructure service diinstansi di sini */;
    const sericeSiswa               = new KesiswaanServiceImplements();
    const serviceKaldik             = new KaldikServiceImplements();
    const serviceAbsensi            = new AbsensiServiceImplements();
    const serviceMapelRombel        = new MapelRombelServiceImplements();
    const serviceElemen             = new ElemenCpServiceImplements();
    const serviceTpFase             = new FaseTpServiceImplements();
    const serviceAtp                = new AtpServiceImplements();
    const serviceSettingJadwal      = new SettingJadwalService();
    const serviceSebaranJadwal      = new JadwalMapelServiceImplements();
    const serviceProta              = new ProtaServiceImplements();
    
    
    const indexDbSiswa = useCallback(async()=>await new IndDbSiswaRepository().getAll(),[]) 
    
    const reqParam = useMemo(()=>{
        if(loaderDataKiriman.sheetNeeded && typeof loaderDataKiriman.sheetNeeded === 'function'){
            return loaderDataKiriman.sheetNeeded(rombel);
        }
        if(Array.isArray(loaderDataKiriman.sheetNeeded)){
            return loaderDataKiriman.sheetNeeded
        }
        return 
    },[rombel,loaderDataKiriman.sheetNeeded])
    
    const dataEnloaded = useMemo(()=>{

            if(!reqParam) return;
            
            return createParamEnloaded(st,reqParam);
        }, [ reqParam, st]);
    
    const buildStore = useCallback(async()=>{
        const api = new EnsurLoadedApiService();
        const db =  await indexDbSiswa();
        
        if(dataEnloaded?.needCall){
            preventSecondLoad.current = true;
            
            const param = (db && db.length > 0) ? dataEnloaded.param.filter(s => s.tab !== namaTab('datasiswa')): dataEnloaded.param;
            // const param = (!loaderDataKiriman?.mustLoadSheetNeedSiswaIfExist) ? dataEnloaded.param.filter(s => s.tab !== namaTab('datasiswa')): dataEnloaded.param;
            
            if(db.length > 0 && st.dataSiswa.data.length === 0){
                store.dispatch(setAllSiswa({
                    data:db,
                    name:'datasiswa',
                    loaded:true,
                    source:'indexDB'
                }))
            }
            // const param = dataEnloaded.param;
            if(param.length === 0) return;
            
            toast.promise(
                api.callNeeded(param),
                    {
                    loading: textLoading + textRombelFase,
                    success: (data) => {
                        
                        if(data) {
                                data.forEach(({success,data,detailResponse})=>{
                                    if(detailResponse){
                                        DispatchingResponseToStore(success,data,detailResponse,rombel)
                                    }
                                })
                            }
                        
                        return 'Pemanggilan data telah selesai' 
                    },
                    error: `Gagal memuat data ${loaderDataKiriman.titleTambahan}`,
                    finally(){
                        preventSecondLoad.current = false
                    },
                    closeButton:true,
                }
            )

            
        }
    },[dataEnloaded?.needCall, dataEnloaded?.param]);

    useEffect( ()=>{
        /** cegah saat user logout */
        if(!user) return;
        
        if(!dataEnloaded) return;
        if(!dataEnloaded.needCall) return;
        if(dataEnloaded.dataAbsensiKelasIni) return;
        
        if(preventSecondLoad.current) return;
        
        buildStore()
        preventSecondLoad.current = false

    },[user,buildStore, dataEnloaded]);
    
    
    return (
        <SiswaCrudProvider service={sericeSiswa}>
            <KaldikCrudProvider service={serviceKaldik}>
                <AbsensiCrudProvider service={serviceAbsensi}>
                    <CrudMapelRombel service={serviceMapelRombel}>
                        <CrudElemenCpProvider service={serviceElemen}>
                            <CrudTpFaseProvider service={serviceTpFase}>
                                <CrudAtpProvider service={serviceAtp}>
                                    <SettingJadwalCrudProvider service={serviceSettingJadwal}>
                                        <SebaranJadwalCrudProvider service={serviceSebaranJadwal}>
                                            <CrudProtaProvider service={serviceProta}>
                                                <Outlet/>
                                            </CrudProtaProvider>
                                        </SebaranJadwalCrudProvider>
                                    </SettingJadwalCrudProvider>
                                </CrudAtpProvider>
                            </CrudTpFaseProvider>
                        </CrudElemenCpProvider>
                    </CrudMapelRombel>
                </AbsensiCrudProvider>
            </KaldikCrudProvider>
        </SiswaCrudProvider>
    )
}