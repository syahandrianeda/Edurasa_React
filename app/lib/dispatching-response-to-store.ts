import { setBankSoal } from "~/context-reduct/global-state/bank-soal/bank-soal-slice";
import { setAtp } from "~/context-reduct/global-state/kurikulum/atp-slice";
import { setCp } from "~/context-reduct/global-state/kurikulum/cp-slice";
import { setFaseA } from "~/context-reduct/global-state/kurikulum/tp-fase-a";
import { setFaseB } from "~/context-reduct/global-state/kurikulum/tp-fase-b";
import { setFaseC } from "~/context-reduct/global-state/kurikulum/tp-fase-c";
import { setJpMapel } from "~/context-reduct/global-state/mapel/mapel-rombel-slice";
import { setDataMapel } from "~/context-reduct/global-state/mapel/mapel-slice";
import { setAllSiswa, type DataSiswa } from "~/context-reduct/global-state/siswa-slice";
import { store } from "~/context-reduct/redux-provider";
import type { BankSoalSheetType } from "~/types/bank-soal/bank-soal-type";
import type { AtpKurikulumType } from "~/types/kurikulum/atp-kurikulum";
import type { ElemenCpType } from "~/types/kurikulum/elemen-cp";
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum";
import type { jp_mapelSheet } from "~/types/mapel/jp_mapel";
import type { InterfaceMapelSheet } from "~/types/mapel/mapel";
import type { SiswaType } from "~/types/siswa";
import { namaTab } from "./nama-tab-environment";
import { setDataJadwalPelajaran, setJadwalMapel } from "~/context-reduct/global-state/mapel/jadwal-pelajaran";
import type { jadwalMapelAccordTable } from "~/types/setting_jadwal/jadwal_mapel";
import { setSettingJadwalMapel } from "~/context-reduct/global-state/mapel/setting-jadwal-mapel-slice";
import type { settingJadwalSheet } from "~/types/setting_jadwal/setting_jadwal";
import { setDataJadwalPembiasaan } from "~/context-reduct/global-state/pembiasaan-kegiatan-sekolah/jadwal-pembiasaan";
import type { pembiasaanSheet } from "~/types/pembiasaan/pembiasaan";
import { setDataProta } from "~/context-reduct/global-state/prota/prota-slice";
import type { protaSheet } from "~/types/kurikulum/prota-orm";
import { setKaldik, setKaldikArray } from "~/context-reduct/global-state/kaldik-slice";
import type { KaldikType } from "~/types/kaldik";
import { IndDbSiswaRepository } from "~/infrastructures/indexDb/db-datasiswa-repository";
import { setTaksonomiBloom } from "~/context-reduct/global-state/taksonomi/taksonomi-slice";
import type { TaksonomiSheetType } from "~/types/taksonomi/taksonomi-sheet";


export default function DispatchingResponseToStore(success:boolean, data:Record<string, any>[],detailResponse:Record<string,any>):void{
    if(success){
        // ga boleh ada trial-nya, karena namanya bakal ngefek ke bawah
        if(detailResponse?.namaTab === namaTab('mapel')){
            store.dispatch(setDataMapel(data as unknown as InterfaceMapelSheet[]));
        };
        
        // boleh ada trialnya, tapi saat ini tidak ada trial karena fitur baru
        if(detailResponse?.namaTab === namaTab('bank_soal')){
            store.dispatch(setBankSoal(data as unknown as BankSoalSheetType[]))
        }
        // datasiswa ada trial-nya
        if(detailResponse?.namaTab === namaTab('datasiswa')){
            // store.dispatch(setAllSiswa(data as unknown as DataSiswa<SiswaType>))
            store.dispatch(setAllSiswa({
                data : data as unknown as SiswaType[] ,
                loaded : true,
                source :detailResponse.source,//'API',
                loading:true
    
            } as DataSiswa<SiswaType>));
            /** jika `detailRespons.source = 'API'` lakukan save indexDb */
            if(detailResponse.source === 'API'){
                const db = new IndDbSiswaRepository();
                db.saveBulkAgain(data as unknown as SiswaType[])
            }
            
        }
    
        //taksonomi belum dibuatkan store-nya
        if(detailResponse?.namaTab === namaTab('taksonomi_bloom')){
            store.dispatch(setTaksonomiBloom(data as unknown as TaksonomiSheetType[]))
            
        }
        
        // ada trial-nya
        if(detailResponse?.namaTab === namaTab('faseA')){
            store.dispatch(setFaseA(data as unknown as FaseKurikulumType[]))
        }
        
        // ada trial-nya;
        if(detailResponse?.namaTab === namaTab('faseB')){
            store.dispatch(setFaseB(data as unknown as FaseKurikulumType[]))
        }
        
        // ada trial-nya:
        if(detailResponse?.namaTab === namaTab('elemen_cp')){
            store.dispatch(setCp(data as unknown as ElemenCpType[]))
        }
    
        // ada trial-nya:
        if(detailResponse?.namaTab === namaTab('faseC')){
            store.dispatch(setFaseC(data as unknown as FaseKurikulumType[]))
        }
        
        // ada trial-nya:
        if(detailResponse?.namaTab === namaTab('Atp')){
            store.dispatch(setAtp(data as unknown as AtpKurikulumType[]))
        }
    
        // ada trial-nya:
        if(detailResponse?.namaTab === namaTab('jp_mapel')){
            store.dispatch(setJpMapel(data as unknown as jp_mapelSheet[]))
        }
        
        // ada trial-nya:
        if(detailResponse?.namaTab === namaTab('jadwal_mapel')){ store.dispatch(setDataJadwalPelajaran(data as unknown as jadwalMapelAccordTable[]))
            // store.dispatch(setJadwalMapel(data as unknown as jadwalMapelAccordTable[]))
        }
        // ada trial-nya:
        if(detailResponse?.namaTab === namaTab('setting_jadwal')){
            store.dispatch(setSettingJadwalMapel(data as unknown as settingJadwalSheet[]))
        }
        // ada trial-nya:
        if(detailResponse?.namaTab === namaTab('kegiatan_nonkbm')){
            store.dispatch(setDataJadwalPembiasaan(data as unknown as pembiasaanSheet[]))
        }
            // ada trial-nya:
        if(detailResponse?.namaTab === namaTab('prota')){
            store.dispatch(setDataProta(data as unknown as protaSheet[]))
        }
        
        if(detailResponse?.namaTab === namaTab('kalender')){
            store.dispatch(setKaldikArray(data as unknown as KaldikType[]))
        }
    }
    

}
