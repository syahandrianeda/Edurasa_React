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
import {  setKaldikArray } from "~/context-reduct/global-state/kaldik-slice";
import type { KaldikType } from "~/types/kaldik";
import { IndDbSiswaRepository } from "~/infrastructures/indexDb/db-datasiswa-repository";
import { setTaksonomiBloom } from "~/context-reduct/global-state/taksonomi/taksonomi-slice";
import type { TaksonomiSheetType } from "~/types/taksonomi/taksonomi-sheet";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { setAbsensiRombel } from "~/context-reduct/global-state/absensi-slice";
import type { AbsensiSiswaSheetType } from "~/types/absensi-siswa";
import { setSiswaDapodik } from "~/context-reduct/global-state/sheet-dapodik-slice";
import type { SiswaDapodikAppToSheet } from "~/types/siswa-dapodik";
import { saveIsianSiswa } from "~/infrastructures/session-storage/isian-siswa";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type { UserPtk } from "~/types";
import { setTabunganRombel } from "~/context-reduct/global-state/tabungan/tabungan-slice";
import type { TabunganSheetType } from "~/types/tabungan/tabungan-sheet-type";
import {  setKeuanganUser } from "~/context-reduct/global-state/tabungan/keuangan-slice";
import type { KeuanganSheetType } from "~/types/tabungan/keuangan-sheet-type";
import { setKategoriAkses_keuangan } from "~/context-reduct/global-state/tabungan/kategori-keuangan-slice";
import type { KategoriKeuanganAppType, KategoriKeuanganSheetType } from "~/types/tabungan/kategori-keuangan-type";
import { setFokusAksesRombelKeuangan } from "~/context-reduct/global-state/tabungan/ui-akses-keuangan-slice";
import DtoKategoriKeuangan from "~/dtos/dto-kategori-keuangan";


export default async function DispatchingResponseToStore(success:boolean, data:Record<string, any>[],detailResponse:Record<string,any>, rombelAktif?:string){
    // if(success){
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
            // console.log('dispatching data Siswa', detailResponse)
            /**
             * 
             */
            store.dispatch(setAllSiswa({
                data : data as unknown as SiswaType[] ,
                loaded : true,
                source :'API',
                loading:true
    
            } as DataSiswa<SiswaType>));
            
            
            // if(detailResponse.source === 'API'){

            // }
            const db = new IndDbSiswaRepository();
            await db.saveBulkAgain(data as unknown as SiswaType[]);
            
            //simpan di session ini:
            
            const formatIsianSiswa = detailResponse?.objKosong
            saveIsianSiswa(formatIsianSiswa);
        }

        if(detailResponse?.namaTab === namaTab('dapodik')){
            store.dispatch(setSiswaDapodik(data as unknown as SiswaDapodikAppToSheet[]))
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
        if(detailResponse?.namaTab === namaTab('jadwal_mapel')){ 
            store.dispatch(setDataJadwalPelajaran(data as unknown as jadwalMapelAccordTable[]))
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

        if(detailResponse?.namaTab === namaTab('kelas_'+rombelAktif)){
            
                store.dispatch(setAbsensiRombel(
                    {
                        nama_rombel:rombelAktif ?? getSessionRombel(),
                        data: detailResponse?.findTab? data as AbsensiSiswaSheetType[]:[]
                    }
                ))
            
        }
        
        /** tabungan */
        if(detailResponse?.namaTab === `${namaTab('tabungan_')}${rombelAktif}`){
            
            // console.log('tabungan_', detailResponse, data, store.getState().tabungan, rombelAktif)
            /**
             * store.dispatch(setAbsensiRombel(
                    {
                        nama_rombel:rombelAktif ?? getSessionRombel(),
                        data: detailResponse?.findTab? data as AbsensiSiswaSheetType[]:[]
                    }
                ))
             */
            store.dispatch(setTabunganRombel(
                {
                    nama_rombel:rombelAktif ?? getSessionRombel(),
                    data: detailResponse?.findTab? data as TabunganSheetType[]:[]
                }
            ))
            
        }
        /** keuangan */
        if(detailResponse?.namaTab === `${namaTab('keuangan_')}${getSessionApp<UserPtk>()?.id}`){
            
                store.dispatch(setKeuanganUser(
                    {
                        user_id:getSessionApp<UserPtk>()?.id ?? undefined,
                        data: detailResponse?.findTab? data as KeuanganSheetType[] :[]
                    }
                ))
            
        }
        if(detailResponse?.namaTab === namaTab('kategori_akses')){
                // console.log('response kategori akses', data, detailResponse)
                store.dispatch(setKategoriAkses_keuangan({
                    data: data as KategoriKeuanganSheetType[],
                    loaded:true,
                    name:'kategori_akses'

                }));
                /** simpan store kelas awal jika ada,  */
                if(data.length>0 && !getSessionApp<UserPtk>()){
                    const found = (data as KategoriKeuanganSheetType[]).find(s=>s.user_id === getSessionApp<UserPtk>()?.id);
                    if(found){
                        const dto = DtoKategoriKeuangan.fromSheet(found);
                        store.dispatch(setFokusAksesRombelKeuangan({
                            value:{
                                kategori:dto.kategori ,
                                rombel:dto.akses_kelas[0]
                            },
                            name:'fokusRombelKategoriKeuangan',
                            loaded:true
                        }))

                    }else{
                        if(getSessionApp<UserPtk>()?.jabatan === 'Guru Kelas'){
                            store.dispatch(setFokusAksesRombelKeuangan({
                                value:{
                                    kategori:'tabungan' ,
                                    rombel:getSessionRombel()
                                },
                                name:'fokusRombelKategoriKeuangan',
                                loaded:true
                        }))
                        }
                    }
                }
            
        }

}
