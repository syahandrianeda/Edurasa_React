import type { RootState } from "../store";
import type KesiswaanServiceImplements from "~/infrastructures/services/kesiswaan-service-implements";
import { setAllSiswa } from "../global-state/siswa-slice";
import type { SiswaType } from "~/types/siswa";
import type { Store } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { setloadedApi } from "../global-state/loaded-slice";
import type KaldikServiceImplements from "~/infrastructures/services/kaldik-service-implements";
import type { KaldikType } from "~/types/kaldik";
import { setKaldik, setLoadedKaldik } from "../global-state/kaldik-slice";
import type AbsensiServiceImplements from "~/infrastructures/services/absensi-service-implements";
import { setAbsensiRombel } from "../global-state/absensi-slice";
import type { AbsensiSiswaSheetType } from "~/types/absensi-siswa";
import { setKurmerAtp, setKurmerCp, setKurmerTpFaseA, setKurmerTpFaseB, setKurmerTpFaseC } from "../global-state/kurikulum/kurmer-slice";
import type { ElemenCpType } from "~/types/kurikulum/elemen-cp";
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum";
import type { AtpKurikulumType } from "~/types/kurikulum/atp-kurikulum";
import { setDataMapel } from "../global-state/mapel/mapel-slice";
import type { InterfaceMapelSheet } from "~/types/mapel/mapel";
import { setDataMapelRombel } from "../global-state/mapel/mapel-rombel-slice";
import type { jp_mapelSheet } from "~/types/mapel/jp_mapel";
import type MapelRombelServiceInterface from "~/domain/interfaces/mapelrombel-service-interface";
import type { settingJadwalSheet } from "~/types/setting_jadwal/setting_jadwal";
import { setSettingJadwalMapel } from "../global-state/mapel/setting-jadwal-mapel-slice";
import type { jadwalMapelAccordTable } from "~/types/setting_jadwal/jadwal_mapel";
import { setDataJadwalPelajaran } from "../global-state/mapel/jadwal-pelajaran";
import { setDataJadwalPembiasaan } from "../global-state/pembiasaan-kegiatan-sekolah/jadwal-pembiasaan";
import type { pembiasaanSheet } from "~/types/pembiasaan/pembiasaan";
import { setDataProta } from "../global-state/prota/prota-slice";
import type {protaSheet } from "~/types/kurikulum/prota-orm";
import { setCp } from "../global-state/kurikulum/cp-slice";
import { setFaseA } from "../global-state/kurikulum/tp-fase-a";
import { setFaseB } from "../global-state/kurikulum/tp-fase-b";
import { setAtp } from "../global-state/kurikulum/atp-slice";
import { setFaseC } from "../global-state/kurikulum/tp-fase-c";

export default class InitNeededSliceStore{
    constructor(private store: Store<RootState>){}

    get state(){
        return this.store.getState();
    }

    async needSiswa(Service:KesiswaanServiceImplements){
        
        if(this.state.dataSiswa.loaded) return;
        
        this.store.dispatch(setloadedApi({
            loaded:true,name:'loaded_animation'
        }));

        toast.promise(
            Service.loadAllSiswa(),
            {
                loading: 'Memuat data siswa...',
                success: (data) => {
                    const raw = data?.data as SiswaType[];
                    
                    if(data?.success){
                        this.store.dispatch(setAllSiswa({
                            loaded:true,
                            // allSiswa: raw,
                            data:raw,
                            source: data?.source,
                            loading:false,
                            name:'datasiswa'
                        }));
                        this.store.dispatch(setloadedApi({
                            loaded:false,name:'loaded_animation'
                        }));
                    }
                    return 'Data siswa berhasil dimuat dari ' + data?.source;
                },
                error: 'Gagal memuat data siswa',
                finally:()=>{
                    this.store.dispatch(setloadedApi({
                            loaded:false,name:'loaded_animation'
                        }));
                }

                
                
            }
        );
    }
    async needKaldik(Service:KaldikServiceImplements){
        if(this.state.kaldik.loaded) return;
        this.store.dispatch(setloadedApi({
            loaded:true,
            name:'loaded_animation'
        }));

        toast.promise(
            Service.loadAllKaldik(),
            {
                loading: 'Memuat data kaldik...',
                success: (data) => {
                    const raw = data?.data as KaldikType[];
                    
                    if(data?.success){
                        this.store.dispatch(setKaldik({
                            loaded:true,
                            data:raw,
                            name:'kalender',
                        }));
                        this.store.dispatch(setloadedApi({
                            loaded:false,
                            name:'loaded_animation'
                        }));
                    }
                    return 'Data Kalender berhasil dimuat dari ' + data?.source;
                },
                error: 'Gagal memuat data kalendar',
                finally:()=>{
                    this.store.dispatch(setloadedApi({
                            loaded:false,
                            name:'loaded_animation'
                        }));
                }

                
                
            }
        );
    }
    async needAbsensiAndKaldik(rombel:string, Service:AbsensiServiceImplements){
        
        if(this.state.kaldik.loaded && this.state.absensiSiswa.dataAbsensi.find(s=>s.nama_rombel === rombel)) return;
        
        this.store.dispatch(setloadedApi({
                loaded:true,name:'loaded_animation'
            }));
            
        toast.promise(
            Service.loadAbsensiAndKaldik(rombel),
            {
                loading: 'Memuat data Absensi dan Kaldik...',
                success: (data) => {
                    
                    data.forEach(({success,data,detailResponse})=>{
                        if(success && detailResponse?.namaTab.includes('kelas_'+rombel)){
                                this.store.dispatch(setAbsensiRombel(
                                    {
                                        nama_rombel:rombel,
                                        data:data as AbsensiSiswaSheetType[]
                                    }
                                ))
                            
                        }
                        if(success && detailResponse?.namaTab.includes('kalender')){
                            this.store.dispatch(setKaldik({
                                loaded:true,
                                data:data as KaldikType[],
                                name:'kalender',
                            }));
                        }
                    });
                    return 'Pemanggilan data telah selesai' ;//+ data?.source;
                },
                error: 'Gagal memuat data Absen',
                finally:()=>{
                    this.store.dispatch(setloadedApi({
                            loaded:false,name:'loaded_animation'
                        }));
                }

                
                
            }
        );
    }
    // async needKurikulum(Service:ElemenCpServiceImplements){
    async needKurikulum(Service:MapelRombelServiceInterface){
        if(
            this.state.mapel.loaded && 
            this.state.jadwalPembiasaan.loaded &&
            this.state.settingJadwalMapel.loaded &&
            this.state.jadwalPelajaran.loaded &&
            // this.sheetMateriTabElemenCp,
            this.state.CP.loaded &&
            this.state.faseA.loaded &&
            this.state.faseB.loaded &&
            this.state.faseC.loaded &&
            this.state.Atp.loaded &&
            this.state.jadwalPembiasaan.loaded &&
            this.state.mapel.loaded &&
            this.state.jpMapel.loaded &&
            this.state.settingJadwalMapel.loaded &&
            this.state.jadwalPelajaran.loaded &&
            this.state.kaldik.loaded &&
            
            this.state.prota.loaded
            
        ) return;

        this.store.dispatch(setloadedApi({
                loaded:true,name:'loaded_animation'
            }));
            
        toast.promise(
            Service.loadAllKurmer(),
            {
                loading: 'Memuat Kurikulum',
                success: (datas) => {
                    
                    datas.forEach(({success,data,detailResponse})=>{
                        if(success && detailResponse?.namaTab.toString().includes('elemen_cp')){
                            // this.store.dispatch(setKurmerCp(data as   ElemenCpType[]));
                            this.store.dispatch(setCp(data as ElemenCpType[]));
                        }
                        if(success && detailResponse?.namaTab.toString().includes('faseA')){
                            // this.store.dispatch(setKurmerTpFaseA(data as   FaseKurikulumType[]));
                            this.store.dispatch(setFaseA(data as FaseKurikulumType[]));
                        }
                        if(success && detailResponse?.namaTab.toString().includes('faseB')){
                            // this.store.dispatch(setKurmerTpFaseB(data as   FaseKurikulumType[]));
                            this.store.dispatch(setFaseB(data as FaseKurikulumType[]));
                        }
                        if(success && detailResponse?.namaTab.toString().includes('faseC')){
                            // this.store.dispatch(setKurmerTpFaseC(data as   FaseKurikulumType[]));
                            this.store.dispatch(setFaseC(data as FaseKurikulumType[]));
                        }
                        if(success && detailResponse?.namaTab.toString().includes('Atp')){
                            // this.store.dispatch(setKurmerAtp(data as  AtpKurikulumType[]));
                            this.store.dispatch(setAtp(data as AtpKurikulumType[]))
                        }
                        if(success && detailResponse?.namaTab.toString().includes('kalender')){
                            this.store.dispatch(setKaldik({
                                loaded:true,
                                data:data as KaldikType[],
                                name:'kalender',
                            }));
                        }
                        if(success && detailResponse?.namaTab ==='mapel'){
                            this.store.dispatch(setDataMapel(data as InterfaceMapelSheet[]))
                        }
                        if(success && detailResponse?.namaTab==='jp_mapel'){
                            this.store.dispatch(setDataMapelRombel(data as jp_mapelSheet[]));
                        }
                        if(success && detailResponse?.namaTab==='jadwal_mapel'){
                            this.store.dispatch(setDataJadwalPelajaran(data as jadwalMapelAccordTable[]));
                        }
                        if(success && detailResponse?.namaTab==='setting_jadwal'){
                            this.store.dispatch(setSettingJadwalMapel(data as settingJadwalSheet[]));
                        }
                        if(success && detailResponse?.namaTab === 'kegiatan_nonkbm'){
                            this.store.dispatch(setDataJadwalPembiasaan(data as pembiasaanSheet[]));
                        }
                        if(success && detailResponse?.namaTab === 'prota'){
                            this.store.dispatch(setDataProta(data as protaSheet[]));
                        }
                    });
                    return 'Pemanggilan data telah selesai' ;//+ data?.source;
                },
                error: 'Gagal memuat data Kurikulum',
                finally:()=>{
                    this.store.dispatch(setloadedApi({
                            loaded:false,name:'loaded_animation'
                        }));
                }
            }
        );
        return []
    }

    callProviderData(){
        /** call Provider menyiapkan data apa saja yang harus dipanggil
         * - InitNeededSliceStore tidak harus menginjeksi devedency lain, cukup punya sendiri aja;
         * - misal fitur/page CP, maka data CP yang harus tersedia oleh aplikasi,
         *   jika tidak ada, maka siapkan parameternya untuk dipanggil;
         * - misalnya: callFiturPage('route.cp')
         */
    }

}