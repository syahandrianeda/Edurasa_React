
import { Outlet } from "react-router";
import type { Route } from "./+types/app-provider-service";
import { useAppSelector } from "~/context-reduct/hook";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import { store } from "~/context-reduct/redux-provider";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import EnsurLoadedApiService from "~/infrastructures/ensure-loaded-api/EnsureLoadedApiService";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import { toast } from "sonner";
import { IndDbSiswaRepository } from "~/infrastructures/indexDb/db-datasiswa-repository";
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
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
import BuildParamLoaded from "~/infrastructures/ensure-loaded-api/build-param-loaded";
import { CrudTabunganProvider } from "~/controllers/tabungan/crud/crud-tabungan-provider";
import TabunganServiceImplements from "~/infrastructures/services/tabungan-service-implements";
import { FokusRombelKeuangan } from "~/context-reduct/selectores/rombel-tabungan-selector";
import SuratKeluarService from "~/infrastructures/services/surat-keluar-service";
import { SuratKeluarCrudProvider } from "~/controllers/surat/crud/surat-keluar-crud-provider";
import { CrudSppdProvider } from "~/controllers/surat/crud/sppd-crud-provider";
import SppdService from "~/infrastructures/services/sppd-service";
import SuratMasukService from "~/infrastructures/services/surat-masuk-service";
import { SuratMasukCrudProvider } from "~/controllers/surat/crud/surat-masuk-crud-provider";
import PangkatGolonganService from "~/infrastructures/services/PangkatGolonganService";
import { CrudPangkatGolonganProvider } from "~/controllers/tendik/crud/crud-tendik-provider";
import { CrudSerahTerimaProvider } from "~/controllers/serah-terima-dokumen/cruds/crud-provider-serah-terima-dokumen";
import SerahTerimaDokumenService from "~/infrastructures/services/serah-terima-dokumen-service";
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
    const rombelKeuangan = useAppSelector(FokusRombelKeuangan)
    const loaderDataKiriman = matches.at(-1)?.loaderData as { 
            toolbarTabs?: TabsConfigProps,
            titleTambahan:string, 
            pesanLoading?:string,
            controlKelas?:controlDropdownKelas
            addPesanRombel?:{isAdd:boolean, type:'jenjang'|'rombel', includeFaseName?:boolean},
            sheetNeeded?: (v?:string)=>DataSheetNeeeded[],
            mustLoadSheetNeedSiswaIfExist?:boolean,
            sourceKelas?:string
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
    const serviceTabungan           = new TabunganServiceImplements();
    const serviceSuratKeluar        = new SuratKeluarService();
    const serviceSuratMasuk         = new SuratMasukService();
    const serviceSppd               = new SppdService();
    const servicePangkatGolongan    = new PangkatGolonganService();
    const serviceSerahTerimaDokumen = new SerahTerimaDokumenService();

    
    
    const indexDbSiswa = useCallback(async()=>await new IndDbSiswaRepository().getAll(),[]) 
    
    const reqParam = useMemo(()=>{
        if(loaderDataKiriman.sheetNeeded && typeof loaderDataKiriman.sheetNeeded === 'function'){
            const decidedRombel = loaderDataKiriman?.sourceKelas ? rombelKeuangan?.rombel :  rombel ;
            return loaderDataKiriman.sheetNeeded(decidedRombel);
        }
        if(Array.isArray(loaderDataKiriman.sheetNeeded)){
            return loaderDataKiriman.sheetNeeded
        }
        return 
    },[rombel,loaderDataKiriman.sheetNeeded, loaderDataKiriman?.sourceKelas, rombelKeuangan?.rombel])
    
   
    const instDataEnloaded = useMemo(()=> {
        if(!reqParam) return;
        return new BuildParamLoaded(st, reqParam).evaluate()
    },[st, reqParam]);
    
    
    
    const buildStore = useCallback(async()=>{
        const api = new EnsurLoadedApiService();
        const db =  await indexDbSiswa();
        
        if(instDataEnloaded?.param && instDataEnloaded?.param?.length>0){
            preventSecondLoad.current = true;
            
            // const param = (db && db.length > 0) ? dataEnloaded.param.filter(s => s.tab !== namaTab('datasiswa')): dataEnloaded.param;
            const param = (!loaderDataKiriman?.mustLoadSheetNeedSiswaIfExist) ? 
                        instDataEnloaded?.param.filter(s => s.tab !== namaTab('datasiswa')): 
                        instDataEnloaded.param;
            
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
                            const decidedRombel = loaderDataKiriman?.sourceKelas ? rombelKeuangan?.rombel :  rombel ;
                                data.forEach(({success,data,detailResponse})=>{
                                    if(detailResponse){
                                        DispatchingResponseToStore(success,data,detailResponse,decidedRombel)
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
    },[ instDataEnloaded?.param, loaderDataKiriman?.mustLoadSheetNeedSiswaIfExist]);

    useEffect( ()=>{
        /** cegah saat user logout */
        if(!user) return;
        
        if(!instDataEnloaded) return;
        
        if(preventSecondLoad.current) return;
        
        buildStore()
        preventSecondLoad.current = false

    },[user,buildStore, instDataEnloaded]);
    
    
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
                                                <CrudTabunganProvider service={serviceTabungan}>
                                                    <SuratKeluarCrudProvider service={serviceSuratKeluar}>
                                                        <SuratMasukCrudProvider service={serviceSuratMasuk}>
                                                            <CrudSppdProvider service={serviceSppd}>
                                                                <CrudPangkatGolonganProvider service={servicePangkatGolongan}>
                                                                    <CrudSerahTerimaProvider service={serviceSerahTerimaDokumen}>
                                                                        <Outlet/>
                                                                    </CrudSerahTerimaProvider>
                                                                </CrudPangkatGolonganProvider>
                                                            </CrudSppdProvider>
                                                        </SuratMasukCrudProvider>
                                                    </SuratKeluarCrudProvider>
                                                </CrudTabunganProvider>
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