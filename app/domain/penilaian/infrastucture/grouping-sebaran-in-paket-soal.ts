import type { PaketSoalStruktur } from "~/domain/paket-soal/paket-soal-struktur/PaketSoalStrukturType";
import type { GroupBentukSoalPropertiKurikulumInPublikasiAssesmen, GroupBentukSoalPropertiKurikulumInPublikasiAssesmenWithScore, GroupSebaranNoSoalFromPropertyKurikulum, KoleksiBentukSoalDanPropertyKurikulumBasedBentukSoal, PrediksiNoSoal } from "../model/grouping-kurikulum-by-bentuksoal";
import type { AtpAsOrm, ItemAtpAsProtaEditable } from "~/types/kurikulum/prota-orm";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";

export default class GroupingSebaranInPaketSoal{
    static build(struktur:PaketSoalStruktur[]):KoleksiBentukSoalDanPropertyKurikulumBasedBentukSoal{
        const koleksiBentukSoal = struktur.map(m=>m.dataBentukSoal);
        
       
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
                                    dataBentukSoal: Map<ListBentukSoalType, PrediksiNoSoal[]>
                                    }
                                    >
                            }>
                        }
                        >
                    }>();

        for(const {dataBentukSoal, soal:sourceSoal} of struktur){
            const test = sourceSoal.map(m=>m.atp_soal!);
            for(const {atp_soal:item, soal, no_prefix }of sourceSoal){
                const kodeMapel = item?.kodemapel!;
                const mapelName = item?.mapelname!;
                const cp_id = item?.cp_id!;
                const cp_description = item?.cp_description!;
                const tp_id = item?.tp_as_cp_id!
                const tp_description = item?.tp_as_cp_description!;
                const atp_id = item?.atp_as_tp_id!
                const atp_description = item?.atp_as_tp_description!

                if(!mappingMapel.has(kodeMapel)){
                    mappingMapel.set(kodeMapel, {
                        mapelName,
                        kodeMapel,
                        dataCp: new Map()
                    })
                }
                const mapel= mappingMapel.get(kodeMapel);
                if(!mapel?.dataCp.has(cp_id)){
                    mapel?.dataCp.set(cp_id, {
                        cp_id,
                        cp_description, 
                        dataTp: new Map()
                    })
                }
                const cp = mapel?.dataCp.get(cp_id);
                if(!cp?.dataTp.has(tp_id)){
                    cp?.dataTp.set(tp_id, {
                        tp_id,
                        tp_description,
                        dataAtp: new Map()
                    })
                }

                const tp = cp?.dataTp.get(tp_id);
                if(!tp?.dataAtp.has(atp_id)){
                    tp?.dataAtp.set(atp_id, {
                        atp_id,
                        atp_description,
                        dataBentukSoal: new Map()
                    })
                }

                const atp = tp?.dataAtp.get(atp_id);
                if(!atp?.dataBentukSoal.has(dataBentukSoal)){
                    atp?.dataBentukSoal.set(dataBentukSoal, [])
                }
                const bentukSoal = atp?.dataBentukSoal.get(dataBentukSoal);
                const prediksi = {...soal!, no_soal:no_prefix, skor:0};
                
                bentukSoal?.push(prediksi)
                
            }
        }

        
        const data:GroupBentukSoalPropertiKurikulumInPublikasiAssesmen[] =  [...mappingMapel.values()].map(mapelValue=>{
        // const data:GroupBentukSoalPropertiKurikulumInPublikasiAssesmenWithScore[] =  [...mappingMapel.values()].map(mapelValue=>{
            const {kodeMapel, mapelName, dataCp: dataCpSource} = mapelValue;
            let slotRowMapel = 0;
            const dataCp = [...dataCpSource.values()].map(cp=>{
                let slotRowCp = 0;
                const {cp_id, cp_description, dataTp:dataTpSource} = cp;
                const dataTp = [...dataTpSource.values()].map(tp=>{
                    let slotRowTp = 0;
                    const {tp_id, tp_description, dataAtp:dataAtpSource}=tp;
                    const dataAtp = [...dataAtpSource.values()].map(atp=>{   
                        const {atp_description, atp_id, dataBentukSoal:dataBentukSoalSource} = atp;
                        const dataBentukSoal = [...dataBentukSoalSource.entries()].map(([bentukSoal, soalnya])=>{
                            
                            return {
                                bentukSoal: bentukSoal.name ,
                                data: soalnya//.sort((a,b)=>a.no_soal - b.no_soal)
                            }
                        })
                        slotRowMapel++;
                        slotRowCp++;
                        slotRowTp++;
                        return {
                            atp_id,
                            atp_description,
                            dataBentukSoal
                        }
                    })
                    return {
                        tp_id, 
                        tp_description,
                        slotRow: slotRowTp,
                        dataAtp
                    }
                })
                return {
                    cp_id, 
                    cp_description,
                    slotRow:slotRowCp,
                    dataTp
                }
            })
            return {
                kodeMapel,
                mapelName, 
                slotRow: slotRowMapel,
                dataCp

            }
        })
        return {
            koleksiBentukSoal: koleksiBentukSoal,
            data,
        }
    }
}