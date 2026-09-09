import type { JsonAlatJawabTupple } from "~/types/bank-soal/bank-soal-type";
import type { PaketSoalDesign } from "../result/paket-soal";
import type { KisiKisiMapelType } from "../entities/kisi-kisi-nested-map-type";


export default class DataKisiKisi{
    constructor(private readonly PaketSoal:PaketSoalDesign){ }
    
    get dataSetting(){
        return  this.PaketSoal.setting
    }

    get dataKontenSoal(){
        return this.PaketSoal.data
    }
    
    get dataSoal(){
        return this.dataKontenSoal?.map(m=>m.dataSoal)?.flat()
    }

    generate():KisiKisiMapelType[]{
        // const isMultiple = this.dataSetting?.koleksi_mapel?.isMultiple;
        type dataKontenKisiKisi = {
            indikatorSoal:string,
            bentukSoal:string,
            lk:string,
            noSoal:number,
            stimulus:string, 
            pertanyaan:string,
            jsonAlatJawab:JsonAlatJawabTupple,
            jawaban: string[]|string[][],
            pembahasanPenskoran: string
        }
        const mapMapel = new Map<string, {
                        kodeMapel:string, 
                        mapelName:string, 
                        dataCp :Map<number, {
                                        cp_id: number, 
                                        cp_description: string, 
                                        elemen: string,
                                        dataTp:Map<number, {
                                                                tp_description:string, 
                                                                tp_id:number, 
                                                                dataAtp:Map<number, { 
                                                                                        atp_description:string, 
                                                                                        atp_id:number,
                                                                                        dataMateriPokok:Map<string, {
                                                                                                    materiPokok:string,
                                                                                                    dataSoal: dataKontenKisiKisi[]
                                                                                                }>
                                                                                        /** data kisi-kisi:
                                                                                         * - materi pokok
                                                                                         * - indikator soal
                                                                                         * - bentuk soal
                                                                                         * - soal
                                                                                         * - jawaban/penskoran
                                                                                         * \
                                                                                         */
                                                                                    }>
                                                            }>

                                    }>,


                    } >();
        for(const data of this.dataSoal){
            const data_soal = data.data_soal; 

            const kodeMapel = data_soal?.kode_mapel ?? '';
            const mapelName = data_soal?.mapel_name ??'';
            const cp_id = data_soal?.snapshot_kurikulum?.cp_id ?? 0;
            const cp_description = data_soal?.snapshot_kurikulum?.cp_description ?? '';
            const elemen = data_soal?.snapshot_kurikulum?.elemen ?? '';
            const tp_id = data_soal?.snapshot_kurikulum?.tp_as_cp_id ?? 0;
            const tp_description = data_soal?.snapshot_kurikulum?.tp_as_cp_description ?? '';
            const atp_id =data_soal?.snapshot_kurikulum?.atp_as_tp_id ?? 0; //data_soal?.kd_id
            const atp_description = data_soal?.snapshot_kurikulum?.atp_as_tp_description ?? '';
            const materi_pokok = data_soal?.materi_pokok ?? ''


            if(!mapMapel.has(kodeMapel)){
                mapMapel.set(kodeMapel,
                    {
                        kodeMapel,
                        mapelName,
                        dataCp: new Map()
                    }
                )
            }

            const mapCp = mapMapel.get(kodeMapel)!
            if(!mapCp.dataCp.has(cp_id)){
                mapCp.dataCp.set(cp_id, 
                    {
                        cp_id,
                        cp_description,
                        elemen,
                        dataTp: new Map()
                    }
                )
            }


            const mapTp = mapCp.dataCp.get(cp_id)!;
            if(!mapTp.dataTp.has(tp_id)){
                   mapTp.dataTp.set(tp_id, 
                    {
                        tp_id,
                        tp_description, 
                        dataAtp:new Map()
                    }
                )
            }

            const  mapAtp = mapTp.dataTp.get(tp_id)!;
            if(!mapAtp.dataAtp.has(atp_id)){
                mapAtp.dataAtp.set(atp_id,
                    {
                        atp_description,
                        atp_id,
                        dataMateriPokok: new Map()
                    }
                )
            }

            const materiPokok = mapAtp.dataAtp.get(atp_id)!;
            if(!materiPokok?.dataMateriPokok.has(materi_pokok)){
                materiPokok.dataMateriPokok.set(materi_pokok, 
                    {
                        materiPokok:materi_pokok,
                        dataSoal: []
                    }
                )
            }

            materiPokok.dataMateriPokok.get(materi_pokok)!.dataSoal.push({
                indikatorSoal: data_soal?.indikator_soal ?? '',
                bentukSoal: data.bentuk_soal?.name ?? '',
                lk: data_soal?.lk ?? 'LK1',
                noSoal:data.no_soal,
                jawaban: data_soal?.jawaban ?? [],
                pertanyaan: data_soal?.pertanyaan ?? '',
                stimulus: data_soal?.stimulus ?? '',
                jsonAlatJawab:(data_soal?.json_alat_jawab ?? []) as JsonAlatJawabTupple,
                pembahasanPenskoran: data_soal?.pembahasan_penskoran ?? ''
            })
        }

        return [...mapMapel.entries()].map(([mapelkey, mapelValue])=>{

            const dataCp = [...mapelValue.dataCp.entries()].map(([cpKey, cpValue])=>{
                const {dataTp:sourceTp, cp_description, cp_id, elemen} = cpValue;
                    const dataTp = [...sourceTp.entries()].map(([tpKey, tpValue])=>{
                        const {tp_description, tp_id, dataAtp:sourceAtp} = tpValue;
                            const dataAtp = [...sourceAtp.entries()].map(([keyAtp, valueAtp])=>{
                                const {atp_id, atp_description, dataMateriPokok:sourceMateriPokok} = valueAtp;
                                    const dataMateriPokok = [...sourceMateriPokok.entries()].map(([keyMateri,valueMateri])=>{
                                        const {materiPokok, dataSoal} = valueMateri
                                        return {
                                            materiPokok, dataSoal
                                        }
                                    })

                                return { 
                                    atp_id, 
                                    atp_description, 
                                    dataMateriPokok
                                }
                            })

                        return {
                            tp_description, 
                            tp_id,
                            dataAtp
                        }
                    })
                return {
                    cp_id, cp_description, dataTp, elemen
                }
            })
            
            return  { 
                kodeMapel : mapelValue.kodeMapel,
                mapelName : mapelValue.mapelName,
                dataCp : dataCp,//mapelValue.dataCp

            }
        })
    }
}