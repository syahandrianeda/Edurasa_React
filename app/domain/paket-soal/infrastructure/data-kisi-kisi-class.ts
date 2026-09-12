import type { JsonAlatJawabTupple } from "~/types/bank-soal/bank-soal-type";
import type { PaketSoalDesign } from "../result/paket-soal";
import type { KisiKisiMapelType } from "../entities/kisi-kisi-nested-map-type";
import type { DisplayFormatItemSoal } from "../result/display-format-item-soal";
import type { SebaranPropertyKurikulumNoSoalPaket } from "../entities/sebaran-property-no-soal-paket";
import type { IdentitasKontenPaket } from "../entities/identitas-paket";
import type { DataSoalDesign } from "../result/session-soal";
import type { PraSettingPaket } from "../entities/pra-setting-paket";
import type { countBentukSoalPaketBaku, DataSoalDesignBaku } from "~/types/bank-soal/entities/paket-soal-app-type";
import type { KoleksiMapelPaketSoal } from "../entities/koleksi-mapel-paket-soal";
import PaketSoalDesignClass from "./paket-soal-design-class";


export default class DataKisiKisi extends PaketSoalDesignClass{
    constructor(PaketSoal:PaketSoalDesign){ super(PaketSoal)}
    
    

    generate():KisiKisiMapelType[]{
        
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
                                                                                                    dataSoal: DisplayFormatItemSoal[]
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
            const cp_description = data_soal?.snapshot_kurikulum?.cp_description ?? 'CP_notFound';
            const elemen = data_soal?.snapshot_kurikulum?.elemen ?? '';
            const tp_id = data_soal?.snapshot_kurikulum?.tp_as_cp_id ?? 0;
            const tp_description = data_soal?.snapshot_kurikulum?.tp_as_cp_description ?? 'TP_notFound';
            const atp_id =data_soal?.snapshot_kurikulum?.atp_as_tp_id ?? 0; //data_soal?.kd_id
            const atp_description = data_soal?.snapshot_kurikulum?.atp_as_tp_description ?? 'ATP_notFound';
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

            materiPokok.dataMateriPokok.get(materi_pokok)!.dataSoal.push(data)
        }

        return [...mapMapel.entries()].map(([mapelkey, mapelValue])=>{
            let countRow=0
            const dataCp = [...mapelValue.dataCp.entries()].map(([cpKey, cpValue])=>{
                const {dataTp:sourceTp, cp_description, cp_id, elemen} = cpValue;
                let countCpRow = 0
                    const dataTp = [...sourceTp.entries()].map(([tpKey, tpValue])=>{
                        const {tp_description, tp_id, dataAtp:sourceAtp} = tpValue;
                        let countTpRow = 0
                            const dataAtp = [...sourceAtp.entries()].map(([keyAtp, valueAtp])=>{
                                let countAtpRow = 0
                                const {atp_id, atp_description, dataMateriPokok:sourceMateriPokok} = valueAtp;
                                    const dataMateriPokok = [...sourceMateriPokok.entries()].map(([keyMateri,valueMateri])=>{
                                        const {materiPokok, dataSoal} = valueMateri;
                                        countRow += dataSoal.length
                                        countCpRow += dataSoal.length;
                                        countTpRow += dataSoal.length;
                                        countAtpRow += dataSoal.length
                                        return {
                                            materiPokok, dataSoal, countRow:dataSoal.length
                                        }
                                    })

                                return { 
                                    atp_id, 
                                    atp_description, 
                                    dataMateriPokok,
                                    countRow:countAtpRow
                                }
                            })

                        return {
                            tp_description, 
                            tp_id,
                            dataAtp,
                            countRow:countTpRow
                        }
                    });

                return {
                    cp_id, cp_description, dataTp, elemen, countRow:countCpRow
                }
            })
            
            return  { 
                kodeMapel : mapelValue.kodeMapel,
                mapelName : mapelValue.mapelName,
                dataCp : dataCp,//mapelValue.dataCp,
                countRow

            }
        })
    }

    generateKoleksiNoSoalPaket(): SebaranPropertyKurikulumNoSoalPaket[]{
        const mapMapel = new Map<string, {
                                    mapelName:string,
                                    koleksiBentukSoal:string[],
                                    dataCp: Map<number, 
                                        {
                                            cp_description:string,
                                            elemen:string,
                                            cp_id:number,
                                            dataTp: Map<number, 
                                                        {
                                                            tp_id:number,
                                                            tp_description:string,
                                                            dataAtp: Map<number, 
                                                                {
                                                                    atp_id:number,
                                                                    atp_description:string,
                                                                    dataBentukSoal: Map<string, 
                                                                        {
                                                                            nameBentukSoal:string,
                                                                            noSoal:number[]
                                                                        }
                                                                    >   
                                                                }
                                                            >
                                                        }
                                            >
                                        }
                                    >
                                }>();
        for(const item of this.dataSoal){
            const soal = item.data_soal;
            const kurikulum = item.data_soal?.snapshot_kurikulum
            const kodeMapel = soal?.kode_mapel ??'kodeMapel_notFound';
            const mapelName = soal?.mapel_name ?? 'mapelName_notFound';
            const cp_id = kurikulum?.cp_id ?? 0;
            const cp_description = kurikulum?.cp_description ?? 'cp_description_notFound';
            const elemen = kurikulum?.elemen ?? 'elemen_notFound';
            const tp_id = kurikulum?.tp_as_cp_id ?? 0;
            const tp_description = kurikulum?.tp_as_cp_description ?? 'tp_description_notFound';
            const atp_id = kurikulum?.atp_as_tp_id ?? 0;
            const atp_description = kurikulum?.atp_as_tp_description ?? 'atp_description_notFound'
            const nameBentukSoal = item.bentuk_soal?.description ?? 'bentukSoal_notFound'
            const noSoalItem =  item.no_soal;

            if(!mapMapel.has(kodeMapel)){
                mapMapel.set(kodeMapel, 
                    {
                        mapelName,
                        koleksiBentukSoal:[],
                        dataCp: new Map()
                    }
                )
            };

            const currentMapel = mapMapel.get(kodeMapel);
            if(!currentMapel?.dataCp.has(cp_id)){
                currentMapel?.dataCp.set(cp_id, 
                    {
                        cp_description,
                        cp_id,
                        dataTp: new Map(),
                        elemen
                    }
                )
            }

            const currentCp = currentMapel?.dataCp.get(cp_id);
            if(!currentCp?.dataTp.has(tp_id)){
                currentCp?.dataTp.set(tp_id, 
                    {
                        tp_description,
                        tp_id,
                        dataAtp: new Map()
                    }
                )
            }

            const currantTp = currentCp?.dataTp.get(tp_id);
            if(!currantTp?.dataAtp.has(atp_id)){
                currantTp?.dataAtp.set(atp_id, 
                    {
                        atp_description, 
                        atp_id,
                        dataBentukSoal: new Map()
                    }
                )
            }

            const currentAtp = currantTp?.dataAtp.get(atp_id);
            if(!currentAtp?.dataBentukSoal.has(nameBentukSoal)){
                currentAtp?.dataBentukSoal.set(nameBentukSoal, 
                    {
                        nameBentukSoal, 
                        noSoal: []
                    }
                );

                currentMapel?.koleksiBentukSoal.push(nameBentukSoal)
            }

            const currentBentukSoal = currentAtp?.dataBentukSoal.get(nameBentukSoal);
            currentBentukSoal?.noSoal.push(noSoalItem);
        }
        return [...mapMapel.values()].map(({mapelName, koleksiBentukSoal, dataCp:sourceDataCp})=>{
                let countRowMapel = 0
                const dataCp = [...sourceDataCp.values()].map(({cp_description, elemen, cp_id, dataTp:sourceDataTp})=>{
                    let countRowCp = 0
                    const dataTp = [...sourceDataTp.values()].map(({tp_id, tp_description, dataAtp:sourceDataAtp})=>{
                        let countRowTp = 0;
                        const dataAtp = [...sourceDataAtp.values()].map(({atp_id, atp_description, dataBentukSoal:sourceDataBentukSoal})=>{
                            let skorMaksimalAtp = 0
                            const dataBentukSoal = [...sourceDataBentukSoal.values()].map(({nameBentukSoal, noSoal})=>{
                                skorMaksimalAtp+=(noSoal.length * 100);
                                return {
                                    nameBentukSoal, 
                                    noSoal,
                                }
                            })
                            // const skorMaksimalAtp = dataBentukSoal.length> 0 ? dataBentukSoal.length * 100 : 0;
                            countRowMapel++;
                            countRowCp++;;
                            countRowTp++
                            return {
                                atp_id, 
                                atp_description, 
                                dataBentukSoal,
                                skorMaksimalAtp
                            }
                        })
                        return {
                            tp_id, 
                            tp_description, 
                            countRowTp,
                            dataAtp
                        }
                    })
                    
                    return {
                        cp_description, 
                        elemen,
                        cp_id,
                        countRowCp,
                        dataTp
                    }
                })

            return {
                mapelName, 
                koleksiBentukSoal: [...new Set(koleksiBentukSoal)],
                dataCp,
                countRowMapel,
            }
        })
    }
}