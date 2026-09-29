import type AtpOrmHasManySoal from "~/domain/bank-soal/relational-soal/services/atp-has-many-soal";
import type { AtpHasManySoalType } from "~/domain/bank-soal/relational-soal/type";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { GroupBentukSoalPropertiKurikulumInPublikasiAssesmen, GroupSebaranNoSoalFromPropertyKurikulum, PrediksiNoSoal } from "../model/grouping-kurikulum-by-bentuksoal";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";

export default class  GroupingSebaranKurikulum{
    
    static buildGroupBentukSoalInPublikasiAssesmen(dataKurikulum:AtpHasManySoalType[], dataIdSoal:number[]):{koleksiBentukSoal:string[], data:GroupBentukSoalPropertiKurikulumInPublikasiAssesmen[]}{
        /** lakukan filtering dari kurikulum yang memiliki `hasSoal` sesaui dengan `idbaris` pada `dataSoal */;
        const filteringKurikulum  = dataKurikulum.filter(s=>s.hasSoal.some(idsoal=>dataIdSoal.includes(idsoal.idbaris)));

        /** lakukan Mapping dariMapel */
        /** Prediksi saya, lakukan mapping mapel->cp->tp>atp */
        // const bentukSoalMap = new Map(filteringKurikulum.flatMap(m=>m.hasSoal).map(res=>([res.snapshot_kurikulum?.atp_as_tp_id, res])));
        // const bentukSoalMap = new Map(filteringKurikulum.flatMap(m=>m.hasSoal).map(res=>([res.bentuk_soal, res])));
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
                            dataBentukSoal: {bentukSoal:string, data:PrediksiNoSoal[]}[]
                            }
                            >
                    }>
                }
                >
            }>()
        const allBentukSoal = new Map<string, string[]>();
        for(const item of filteringKurikulum){
            const kodeMapel = item.mapelname ?? 'kodeMapel_notFound';
            const mapelName = item.kodemapel ?? 'mapelName_notFound';
            const cp_id = item.cp_id ?? 0;
            const cp_description = item.cp_description ?? 'cp_description_notFound';
            const tp_id = item.tp_as_cp_id ?? 0 ;
            const tp_description = item.tp_as_cp_description ?? 'tp_description_notFound';
            const atp_id = item.atp_as_tp_id;
            const atp_description = item.atp_as_tp_description;
            // const bentukSoal =  bentukSoalMap.get(atp_id)?.bentuk_soal ?? 'bentukSoal_notFound';
            const bentukSoal = new Map(item.hasSoal.map(m=>([m.bentuk_soal, m])));//[...bentukSoalMap.entries()].map(([bentukSoal, data])=>({bentukSoal, data:data.auto_koreksi}));//.filter(s=>s.data.kd_id === atp_id)

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
                const dataBentukSoal = bentukSoal
                dataAtp?.dataAtp.set(atp_id,{
                    atp_id,
                    atp_description,
                    // dataBentukSoal: bentukSoal
                    // dataBentukSoal: []
                    dataBentukSoal:[...bentukSoal.entries()].map(([bentukSoal, data])=>({bentukSoal, data: item.hasSoal.filter(s=>s.bentuk_soal === bentukSoal).map(prediksi=>({...prediksi, no_soal:(dataIdSoal.findIndex(dsi=>dsi === prediksi.idbaris) + 1) }))}))
                })
            }
            
           
            /** mengkoleksikan map */
            allBentukSoal.set('bentukSoal', [...bentukSoal.keys()])
        }
        const koleksiBentukSoal = [...allBentukSoal.values()].flat()
        const data =  [...mappingMapel.values()].map(mapelValue=>{

            const {kodeMapel, mapelName, dataCp:cpSumber} = mapelValue;
            let slotMpel=0
            const dataCp = [...cpSumber.values()].map(CpValue=>{
                const {cp_description, cp_id, dataTp:sourceTp} = CpValue;
                let slotCp=0
                const dataTp = [...sourceTp.values()].map(TpValues=>{
                    let slotTp = 0;
                    const {tp_id, tp_description, dataAtp:sourceAtp} = TpValues;
                    const dataAtp = [...sourceAtp.values()].map(AtpValues=>{
                        // const {atp_id, atp_description, dataBentukSoal:sourceBentukSoal} = AtpValues;
                        const {atp_id, atp_description, dataBentukSoal} = AtpValues;
                        // const dataBentukSoal = [...sourceBentukSoal.entries()].map(([bentukSoalName, values])=>({bentukSoal:bentukSoalName, data:values}));//.map(bentukSoal=>)
                        slotMpel++;
                        slotCp++;
                        slotTp++
                        return {
                            atp_id,
                            atp_description,
                            dataBentukSoal
                        }

                        } )
                    return {
                        tp_id,
                        tp_description,
                        slotRow:slotTp,
                        dataAtp

                    }
                })
                return {
                    cp_id, 
                    cp_description,
                    slotRow:slotCp,
                    dataTp
                }
            })
            return {
                kodeMapel,
                mapelName,
                slotRow: slotMpel,
                dataCp
            }
        })
        return {data, koleksiBentukSoal}
    }

    static buildGroupBentukSoalBasedOnKoleksiIdSoal(dataKurikulum:AtpHasManySoalType[], dataIdSoal:number[]): GroupSebaranNoSoalFromPropertyKurikulum{
        type refAtpHasManySoalTYpe = AtpHasManySoalType & {currentIdSoal:number};
        const filteringKurikulum = dataIdSoal
            .map(idbaris => ({...dataKurikulum.find(s => s.hasSoal.some(hasSoal => hasSoal.idbaris === idbaris)), currentIdSoal:idbaris}))
            .filter((kurikulum): kurikulum is  refAtpHasManySoalTYpe => kurikulum !== undefined);
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
                            dataBentukSoal: Map<string,PrediksiNoSoal[]>
                            }
                            >
                    }>
                }
                >
            }>()
        const allBentukSoal = new Set();
        for(const item of filteringKurikulum){
            const kodeMapel = item.mapelname ?? 'kodeMapel_notFound';
            const mapelName = item.kodemapel ?? 'mapelName_notFound';
            const cp_id = item.cp_id ?? 0;
            const cp_description = item.cp_description ?? 'cp_description_notFound';
            const tp_id = item.tp_as_cp_id ?? 0 ;
            const tp_description = item.tp_as_cp_description ?? 'tp_description_notFound';
            const atp_id = item.atp_as_tp_id;
            const atp_description = item.atp_as_tp_description;
            // const bentukSoal =  bentukSoalMap.get(atp_id)?.bentuk_soal ?? 'bentukSoal_notFound';
            // const bentukSoal = new Map(item.hasSoal.map(m=>([m.bentuk_soal, m])));//[...bentukSoalMap.entries()].map(([bentukSoal, data])=>({bentukSoal, data:data.auto_koreksi}));//.filter(s=>s.data.kd_id === atp_id)
            const bentukSoal = item.hasSoal?.find(s=>s.idbaris === item.currentIdSoal)?.bentuk_soal ?? 'bentukSoal_notFound';

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
                // const dataBentukSoal = bentukSoal
                dataAtp?.dataAtp.set(atp_id,{
                    atp_id,
                    atp_description,
                    // dataBentukSoal: bentukSoal
                    // dataBentukSoal: []
                    // dataBentukSoal:[...bentukSoal.entries()].map(([bentukSoal, data])=>({bentukSoal, data: item.hasSoal.filter(s=>s.bentuk_soal === bentukSoal).map(prediksi=>({...prediksi, no_soal:(dataIdSoal.findIndex(dsi=>dsi === prediksi.idbaris) + 1) }))}))
                    dataBentukSoal: new Map()
                })
            }
            
           const dataBentukSoal = dataAtp?.dataAtp.get(atp_id);
           if(!dataBentukSoal?.dataBentukSoal.has(bentukSoal)){
            dataBentukSoal?.dataBentukSoal.set(bentukSoal, [])
           }
           
           const currentBentukSoal = dataBentukSoal?.dataBentukSoal.get(bentukSoal);
           const koleksiHasSoalCurrentBentukSoal = item.hasSoal.filter(s=>s.bentuk_soal === bentukSoal && dataIdSoal.includes(s.idbaris)).map(prediksi=>({...prediksi, no_soal:(dataIdSoal.findIndex(dsi=>dsi === prediksi.idbaris) + 1) }));
        //    const koleksiBefore = new Set<PrediksiNoSoal>([...(currentBentukSoal ?? []), ...koleksiHasSoalCurrentBentukSoal]);
           const koleksiBefore = new Set<PrediksiNoSoal>(koleksiHasSoalCurrentBentukSoal);
           dataBentukSoal?.dataBentukSoal.set(bentukSoal, [...koleksiBefore].sort((a,b)=>a.no_soal - b.no_soal));
            /** mengkoleksikan map */
            // allBentukSoal.set('bentukSoal', [...bentukSoal.keys()])
            
            allBentukSoal.add(bentukSoal);
        }
        const koleksiBentukSoal = [...allBentukSoal.values()].map(m=>ListBentukSoal.find(s=>s.name === m)).filter((bentukSoal): bentukSoal is ListBentukSoalType => bentukSoal !==undefined) ;
        //.filter((kurikulum): kurikulum is  refAtpHasManySoalTYpe => kurikulum !== undefined);
        const data =  [...mappingMapel.values()].map(mapelValue=>{

            const {kodeMapel, mapelName, dataCp:cpSumber} = mapelValue;
            let slotMapel=0
            const dataCp = [...cpSumber.values()].map(CpValue=>{
                const {cp_description, cp_id, dataTp:sourceTp} = CpValue;
                let slotCp = 0
                const dataTp = [...sourceTp.values()].map(TpValues=>{
                        const {tp_id, tp_description, dataAtp:sourceAtp} = TpValues;
                        let slotTp = 0
                        const dataAtp = [...sourceAtp.values()].map(AtpValues=>{
                            // const {atp_id, atp_description, dataBentukSoal:sourceBentukSoal} = AtpValues;
                            const {atp_id, atp_description, dataBentukSoal:sourceBentukSoal} = AtpValues;
                            const dataBentukSoal = [...sourceBentukSoal.entries()].map(([bentukSoalName, values])=>({bentukSoal:bentukSoalName, data:values}));//.map(bentukSoal=>)
                            slotMapel++;
                            slotCp++;
                            slotTp++
                            return {
                                atp_id,
                                atp_description,
                                dataBentukSoal
                            }

                        })
                        return {
                            tp_id,
                            tp_description,
                            slotRow:slotTp,
                            dataAtp

                        }
                    })
                return {
                    cp_id, 
                    cp_description,
                    slotRow: slotCp,
                    dataTp
                }
            })
            return {
                kodeMapel,
                mapelName,
                slotRow:slotMapel,
                dataCp
            }
        })
        return {data, koleksiBentukSoal}
    }
    

}
    
