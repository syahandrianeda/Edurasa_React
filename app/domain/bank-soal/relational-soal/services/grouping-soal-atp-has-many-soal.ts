import type { AtpHasManySoalType, dataAtpMany, GroupingAtpHasManySoalType } from "../type";
import GroupingSoal from "./grouping-soal";

export default class GroupedAtpHasManySOal{
    static buildGroup(data:AtpHasManySoalType[]):GroupingAtpHasManySoalType[]{
        const mappingMapel = new Map<
                    string, {
                                kodeMapel: string, 
                                mapelName: string,
                                countAtp: number,
                                hasTp: Map<
                                        number, 
                                        {
                                            tp_id:number,
                                            tp_description: string,
                                            hasAtp:Map<number,dataAtpMany>
                                        }
                                >
                            }
                    >();
        for(const item of data){
            const keyKodeMapel = item.kodemapel ?? 'unknown';
            const mapelName = item.mapelname ?? 'Mapel Not Found'
            const tp_id = item.tp_as_cp_id ?? 0;
            const atp_id = item.atp_as_tp_id;
            
            if(!mappingMapel.has(keyKodeMapel)){
                mappingMapel.set(keyKodeMapel, 
                    {
                        kodeMapel:keyKodeMapel, 
                        mapelName,
                        countAtp:0,
                        hasTp: new Map()
                    }
                )
            }

            const mappingTp = mappingMapel.get(keyKodeMapel);
            mappingTp!.countAtp++;
            if(!mappingTp?.hasTp.has(tp_id)){
                mappingTp?.hasTp.set(tp_id, 
                    {
                        tp_id,
                        tp_description: item.tp_as_cp_description ?? 'Tp Terhapus',
                        hasAtp: new Map()
                    }
                )
            }
            
            const mappingAtp = mappingTp?.hasTp.get(tp_id);
            
            if(!mappingAtp?.hasAtp.has(atp_id)){
                mappingAtp?.hasAtp.set(atp_id, 
                    {
                        atp_id,
                        atp_description:item.atp_as_tp_description,
                        kelas: item.kelas,
                        source:item,
                        hasSoal:[]
                    }
                )
            }

            const groupBentukSoal = GroupingSoal.GroupingByBentukSoal(item.hasSoal)
            mappingAtp?.hasAtp.get(atp_id)?.hasSoal.push(...groupBentukSoal)
        }
        return  [...mappingMapel.entries()].map(([kodeMapel, valueMap])=>{
            const mapelName = valueMap.mapelName;
            const countAtp= valueMap.countAtp
            const hasTp = [...valueMap.hasTp.entries()].map(([tp, mapTp])=>{
                const tp_id = mapTp.tp_id
                const tp_description = mapTp.tp_description;
                const hasAtp = [...mapTp.hasAtp.entries()].map(([soal, soalMap])=>{
                    const atp_id = soalMap.atp_id;
                    const atp_description = soalMap.atp_description
                    const hasSoal = soalMap.hasSoal
                    const kelas = soalMap.kelas
                    const source = soalMap.source
                    return {
                        atp_id, atp_description, hasSoal, kelas, source
                    }
                })
                return {
                    tp_id,
                    tp_description,
                    hasAtp:hasAtp
                }
            })
            return {
                kodeMapel, 
                mapelName,
                hasTp,
                countAtp
            }
        })
        
    }
}