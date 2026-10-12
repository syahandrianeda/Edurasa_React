import type { detailNilaiSiswaAppType, NilaiSiswaAppType, SiswaWithNilaiSiswaAppType } from "~/types/penilaian/nilai-siswa-app-type";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { TagihanHasDataResponse } from "../penilaian/type/tagihan-assesmen-type";
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type";
import type { SiswaType } from "~/types/siswa";
import { durasiMenit, filterByRentangUmurTahunSiswa } from "~/lib/date-helper";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";

/**
 * @deprecated
 */
export default class ResponAllSiswaInPublikasiPaket{
    private currentRespon:detailNilaiSiswaAppType[]=[];
    private daftarNilaiKolektifResponSiswa:SiswaWithNilaiSiswaAppType[]=[]
    constructor(
        private readonly currentPublikasi: TagihanHasDataResponse,
        private readonly currentRombel:string
    ){};
    
    /** derived property */
    get dataRespon():detailNilaiSiswaAppType[]{
        return this.currentRespon;
    }
    get dataResponCurrentRombel():detailNilaiSiswaAppType[]{
        return this.currentRespon.filter(s=>s.rombel === this.currentRombel);
    }

    get dataKolektiResonseCurrentPublikasi():SiswaWithNilaiSiswaAppType[]{
        return this.daftarNilaiKolektifResponSiswa;
    }
    get allNilaiSiswaAppType():NilaiSiswaAppType[]{
        return this.currentPublikasi.data_respons
    }

    get pesertaInPublikasi():SiswaType[]{
        return this.currentPublikasi.peserta;
    }

    getNilaiSiswaAppCurrentId(token:number): NilaiSiswaAppType|undefined{
        return this.allNilaiSiswaAppType.find(s=>s.siswa_id === token)
    }
    totalValidRespon(respon:RisponsePenilaianSiswa[]):number{
        return respon.filter(s=>s.respon !=='' && s.respon !== null).length
        // return respon.filter(s=>s.respon !=='').length
    }
    build():this{
        this.currentRespon = this.currentPublikasi.data_respons.map(m=>(
            {
                ...m, 
                siswa:this.pesertaInPublikasi.find(s=>s.id === m.siswa_id), 
                totalResponValid:this.totalValidRespon(m.respon), 
                durasiPengerjaan:durasiMenit(m.start_time ?? '', m.end_time ?? '') 
            })
        )
        .sort((a,b)=>(a.siswa?.pd_nama??'').toString().localeCompare(b.siswa?.pd_nama??'','id-ID',{sensitivity:'base'}));
        
        
        this.daftarNilaiKolektifResponSiswa = this.pesertaInPublikasi.map(m=>{
            const dataResponsCurrentPublikasi = this.currentPublikasi.data_respons
                                    .filter(respon=>respon.siswa_id === m.id)
                                    .map(nilaiRespon=>(
                                        {
                                            siswa:m,    
                                            ...nilaiRespon, 
                                            totalResponValid:this.totalValidRespon(nilaiRespon.respon), 
                                            durasiPengerjaan:durasiMenit(nilaiRespon.start_time ?? '', nilaiRespon.end_time ?? '') 
                                        })
                                    )
            return {
                siswa:m,
                // publikasi_id: this.currentPublikasi,//.idbaris,
                currentPublikasi:this.currentPublikasi,
                data: dataResponsCurrentPublikasi
            }
        })
        return this;
    }
    buildSebaranAtp(){
        const dataKurikulum = this.currentPublikasi.kurikulum_tagihan;
        const dataIdSoal = this.currentPublikasi.id_bank_soal;
        
        /** lakukan filtering dari kurikulum yang memiliki `hasSoal` sesaui dengan `idbaris` pada `dataSoal */;
        const filteringKurikulum  = dataKurikulum.filter(s=>s.hasSoal.some(idsoal=>dataIdSoal.includes(idsoal.idbaris)));

        /** lakukan Mapping dariMapel */
        /** Prediksi saya, lakukan mapping mapel->cp->tp>atp */
        const bentukSoalMap = new Map(filteringKurikulum.flatMap(m=>m.hasSoal).map(res=>([res.snapshot_kurikulum?.atp_as_tp_id, res])));
        const mappingMapel = new Map<string, {
                kodeMapel:string,
                mapelName: string,
                dataCp: Map<number, {
                    cp_id: number,
                    cp_description: string,
                    dataTp: Map<number, {
                        tp_id: number, 
                        tp_description: string,
                        dataAtp: Map<number, {
                            atp_id: number,
                            atp_description: string,
                            dataBentukSoal: Map<string, BankSoalAppType[]>
                        }>
                    }>
                }
                >
            }>()
        
        for(const item of filteringKurikulum){
            const kodeMapel = item.mapelname ?? 'kodeMapel_notFound';
            const mapelName = item.kodemapel ?? 'mapelName_notFound';
            const cp_id = item.cp_id ?? 0;
            const cp_description = item.cp_description ?? 'cp_description_notFound';
            const tp_id = item.tp_as_cp_id ?? 0 ;
            const tp_description = item.tp_as_cp_description ?? 'tp_description_notFound';
            const atp_id = item.atp_as_tp_id;
            const atp_description = item.atp_as_tp_description;
            const bentukSoal =  bentukSoalMap.get(atp_id)?.bentuk_soal ?? 'bentukSoal_notFound';

            if(!mappingMapel.get(kodeMapel)){
                mappingMapel.set(kodeMapel, {
                    kodeMapel,
                    mapelName,
                    dataCp: new Map()
                })
            }

            const dataCp = mappingMapel.get(kodeMapel);
            if(!dataCp?.dataCp.has(cp_id)){
                dataCp?.dataCp.set(cp_id, {
                    cp_id,
                    cp_description, 
                    dataTp: new Map()
                })
            }

            const dataTp = dataCp?.dataCp.get(cp_id);
            if(!dataTp?.dataTp.has(tp_id)){
                dataTp?.dataTp.set(tp_id, {
                    tp_id,
                    tp_description,
                    dataAtp: new Map()
                })
            }

            const dataAtp = dataTp?.dataTp.get(tp_id);
            if(!dataAtp?.dataAtp.has(atp_id)){
                dataAtp?.dataAtp.set(atp_id,{
                    atp_id,
                    atp_description,
                    dataBentukSoal: new Map()
                })
            }
            
            const dataBentukSoal = dataAtp?.dataAtp.get(atp_id);
            if(!dataBentukSoal?.dataBentukSoal.has(bentukSoal)){
                dataBentukSoal?.dataBentukSoal.set(bentukSoal, 
                    []
                );
                
            }
            const currentBentukSoal = dataBentukSoal?.dataBentukSoal.get(bentukSoal);
            const bankSoal = item.hasSoal.filter(s=> dataIdSoal.includes(s.idbaris));
            currentBentukSoal?.push(...bankSoal);
        }

        return [...mappingMapel.values()].map(mapelValue=>{

            const {kodeMapel, mapelName, dataCp:cpSumber} = mapelValue;
            const dataCp = [...cpSumber.values()].map(CpValue=>{
                const {cp_description, cp_id, dataTp:sourceTp} = CpValue;
                const dataTp = [...sourceTp.values()].map(TpValues=>{
                    const {tp_id, tp_description, dataAtp:sourceAtp} = TpValues;
                    const dataAtp = [...sourceAtp.values()].map(AtpValues=>{
                        const {atp_id, atp_description, dataBentukSoal:sourceBentukSoal} = AtpValues;
                        const dataBentukSoal = [...sourceBentukSoal.entries()].map(([bentukSoalName, values])=>({bentukSoal:bentukSoalName, values}));//.map(bentukSoal=>)
                        
                        return {
                            atp_id,
                            atp_description,
                            dataBentukSoal
                        }

                        } )
                    return {
                        tp_id,
                        tp_description,
                        dataAtp

                    }
                })
                return {
                    cp_id, 
                    cp_description,
                    dataTp
                }
            })
            return {
                kodeMapel,
                mapelName,
                dataCp
            }
        })

}

}