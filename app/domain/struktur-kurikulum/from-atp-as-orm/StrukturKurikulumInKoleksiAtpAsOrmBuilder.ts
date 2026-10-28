import type { StrukturKurikulumMapelMapperType, StrukturKurikulumMapelType, StrukturKurikulumMapelWithSlotType } from "~/domain/trees-struktur-kurikulum/struktur-kurikulum-type";
import getOrCreateMap from "~/lib/getOrCreateMapper";
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";

export default class StrukturKurikulumInKoleksiAtpAsOrmBuilder{
        static build(atpAsOrm:AtpAsOrm[]):StrukturKurikulumMapelType[]{
            const mapper = this.buildMapper(atpAsOrm);
            return [...mapper.values()].map(levelMapel=>{
                const {mapelName, kodeMapel, dataCpMapper}= levelMapel;
                const dataCp = [...dataCpMapper.values()].map(levelCp=>{
                    const {cp_id, cp_description,dataTpMapper} = levelCp;
                    const dataTp = [...dataTpMapper.values()].map(levelTp=>{
                        const {tp_id, tp_description, dataAtpMapper} = levelTp;
                        const dataAtp = [...dataAtpMapper.values()]
                        
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
                    mapelName,
                    kodeMapel,
                    dataCp
                }
            })
        }
        static buildWithSlot(atpAsOrm:AtpAsOrm[]):StrukturKurikulumMapelWithSlotType[]{
            const mapper = this.buildMapper(atpAsOrm);
            return [...mapper.values()].map(levelMapel=>{
                let slotMapel:number = 0;
                const {mapelName, kodeMapel, dataCpMapper}= levelMapel;
                const dataCp = [...dataCpMapper.values()].map(levelCp=>{
                    let slotCp:number = 0
                    const {cp_id, cp_description,dataTpMapper} = levelCp;
                    const dataTp = [...dataTpMapper.values()].map(levelTp=>{
                        let slotTp:number = 0
                        const {tp_id, tp_description, dataAtpMapper} = levelTp;
                        const dataAtp = [...dataAtpMapper.values()]
                        dataAtp.forEach(item=>{
                            slotTp++;
                            slotCp++;
                            slotMapel++;
                        })
                        return {
                            tp_id,
                            tp_description,
                            slotTp,
                            dataAtp
                        }
                    })
                    return {
                        cp_id,
                        cp_description,
                        slotCp,
                        dataTp
                    }
                })
                return {
                    mapelName,
                    kodeMapel,
                    slotMapel,
                    dataCp
                }
            })
        }
    static buildMapper(atpAsOrm:AtpAsOrm[]):StrukturKurikulumMapelMapperType{
        const result:StrukturKurikulumMapelMapperType = new Map();
        for(const atp of atpAsOrm){
            const {
                mapelname, 
                kodemapel, 
                atp_as_tp_id, 
                atp_as_tp_description, 
                tp_as_cp_id,
                tp_as_cp_description ,
                cp_description,
                cp_id
            } = atp
            const currentMapel = getOrCreateMap(result, kodemapel, ()=>({
                mapelName: mapelname,
                kodeMapel: kodemapel,
                dataCpMapper: new Map()
            }));
            const currentCp = getOrCreateMap(currentMapel.dataCpMapper, cp_id, ()=>({
                cp_id,
                cp_description,
                dataTpMapper: new Map()
            }) );
            const currentTp = getOrCreateMap(currentCp.dataTpMapper, tp_as_cp_id, ()=>({
                tp_id:tp_as_cp_id,
                tp_description: tp_as_cp_description,
                dataAtpMapper: new Map()
            }));
            getOrCreateMap(currentTp.dataAtpMapper, atp_as_tp_id, ()=>({
                atp_id: atp_as_tp_id,
                atp_description: atp_as_tp_description
            }))
        };
        return result;
        
    }
}