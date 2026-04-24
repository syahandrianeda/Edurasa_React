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
import type ElemenCpServiceImplements from "~/infrastructures/services/elemencp-service-implements";
import { setKurmerAtp, setKurmerCp, setKurmerTpFaseA, setKurmerTpFaseB, setKurmerTpFaseC } from "../global-state/kurikulum/kurmer-slice";
import type { ElemenCpType } from "~/types/kurikulum/elemen-cp";
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum";
import type { AtpKurikulumType } from "~/types/kurikulum/atp-kurikulum";
import { setDataMapel } from "../global-state/mapel/mapel-slice";
import type { InterfaceMapelSheet } from "~/types/mapel/mapel";
import { setDataMapelRombel } from "../global-state/mapel/mapel-rombel-slice";
import type { jp_mapelSheet } from "~/types/mapel/jp_mapel";
import type MapelRombelRepositoryInterface from "~/domain/interfaces/mapelrombel-repository-interface";
import type MapelRombelServiceInterface from "~/domain/interfaces/mapelrombel-service-interface";

export default class InitNeededSliceStore{
    constructor(private store: Store<RootState>){}

    get state(){
        return this.store.getState();
    }

    async needSiswa(Service:KesiswaanServiceImplements){
        
        if(this.state.dataSiswa.loaded) return;
        
        this.store.dispatch(setloadedApi({
            loaded:true
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
                            allSiswa: raw,
                            source: data?.source,
                            loading:false
                        }));
                        this.store.dispatch(setloadedApi({
                            loaded:false
                        }));
                    }
                    return 'Data siswa berhasil dimuat dari ' + data?.source;
                },
                error: 'Gagal memuat data siswa',
                finally:()=>{
                    this.store.dispatch(setloadedApi({
                            loaded:false
                        }));
                }

                
                
            }
        );
    }
    async needKaldik(Service:KaldikServiceImplements){
        if(this.state.kaldik.loaded) return;
        this.store.dispatch(setloadedApi({
            loaded:true
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
                            data:raw
                        }));
                        this.store.dispatch(setloadedApi({
                            loaded:false
                        }));
                    }
                    return 'Data Kalender berhasil dimuat dari ' + data?.source;
                },
                error: 'Gagal memuat data kalendar',
                finally:()=>{
                    this.store.dispatch(setloadedApi({
                            loaded:false
                        }));
                }

                
                
            }
        );
    }
    async needAbsensiAndKaldik(rombel:string, Service:AbsensiServiceImplements){
        
        if(this.state.kaldik.loaded && this.state.absensiSiswa.dataAbsensi.find(s=>s.nama_rombel === rombel)) return;
        
        this.store.dispatch(setloadedApi({
                loaded:true
            }));
            
        toast.promise(
            Service.loadAbsensiAndKaldik(rombel),
            {
                loading: 'Memuat data Absensi dan Kaldik...',
                success: (data) => {
                    
                    data.forEach(({success,data,detailResponse})=>{
                        if(success && detailResponse?.namaTab.includes('responses')){
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
                                data:data as KaldikType[]
                            }));
                        }
                    });
                    return 'Pemanggilan data telah selesai' ;//+ data?.source;
                },
                error: 'Gagal memuat data Absen',
                finally:()=>{
                    this.store.dispatch(setloadedApi({
                            loaded:false
                        }));
                }

                
                
            }
        );
    }
    // async needKurikulum(Service:ElemenCpServiceImplements){
    async needKurikulum(Service:MapelRombelServiceInterface){
        if(
            this.state.mapel.loadedMapel && 
            this.state.mapelRombel.loadedDataMapelRombel &&
            this.state.kurmer.loadedAtp && 
            this.state.kurmer.loadedAtp &&
            this.state.kurmer.loadedTpFaseA &&
            this.state.kurmer.loadedTpFaseB &&
            this.state.kurmer.loadedTpFaseC 
        ) return;

        this.store.dispatch(setloadedApi({
                loaded:true
            }));
            
        toast.promise(
            Service.loadAllKurmer(),
            {
                loading: 'Memuat Kurikulum',
                success: (datas) => {
                    datas.forEach(({success,data,detailResponse})=>{
                        
                        if(success && detailResponse?.namaTab.toString().includes('elemencp')){
                            this.store.dispatch(setKurmerCp(data as   ElemenCpType[]));
                        }
                        if(success && detailResponse?.namaTab.toString().includes('faseA')){
                            this.store.dispatch(setKurmerTpFaseA(data as   FaseKurikulumType[]));
                        }
                        if(success && detailResponse?.namaTab.toString().includes('faseB')){
                            this.store.dispatch(setKurmerTpFaseB(data as   FaseKurikulumType[]));
                        }
                        if(success && detailResponse?.namaTab.toString().includes('faseC')){
                            this.store.dispatch(setKurmerTpFaseC(data as   FaseKurikulumType[]));
                        }
                        if(success && detailResponse?.namaTab.toString().includes('faseTPATP')){
                            this.store.dispatch(setKurmerAtp(data as  AtpKurikulumType[]));
                        }
                        if(success && detailResponse?.namaTab ==='mapel'){
                            this.store.dispatch(setDataMapel(data as InterfaceMapelSheet[]))
                        }
                        if(success && detailResponse?.namaTab==='jp_mapel'){
                            this.store.dispatch(setDataMapelRombel(data as jp_mapelSheet[]));
                        }
                    });
                    return 'Pemanggilan data telah selesai' ;//+ data?.source;
                },
                error: 'Gagal memuat data Kurikulum',
                finally:()=>{
                    this.store.dispatch(setloadedApi({
                            loaded:false
                        }));
                }

                
                
            }
        );
        return []
    }

}