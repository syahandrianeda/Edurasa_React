import type { StrukturKurikulumMapelMapperType, StrukturKurikulumMapelType, StrukturKurikulumMapelWithSlotType } from "~/domain/trees-struktur-kurikulum/struktur-kurikulum-type";
import getOrCreateMap from "~/lib/getOrCreateMapper";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import StrukturKurikulumInKoleksiAtpAsOrmBuilder from "../from-atp-as-orm/StrukturKurikulumInKoleksiAtpAsOrmBuilder";

export default class StrukturKurikulumInKoleksiBankSoalBuilder{
    static build(bankSoal:BankSoalAppType[]):StrukturKurikulumMapelType[]{
        
        const mapper = bankSoal.map(soal=>soal.snapshot_kurikulum!);;
        return StrukturKurikulumInKoleksiAtpAsOrmBuilder.build(mapper)
    
        // const mapper = this.buildMapper(bankSoal);
        // return [...mapper.values()].map(levelMapel=>{
        //     const {mapelName, kodeMapel, dataCpMapper}= levelMapel;
        //     const dataCp = [...dataCpMapper.values()].map(levelCp=>{
        //         const {cp_id, cp_description,dataTpMapper} = levelCp;
        //         const dataTp = [...dataTpMapper.values()].map(levelTp=>{
        //             const {tp_id, tp_description, dataAtpMapper} = levelTp;
        //             const dataAtp = [...dataAtpMapper.values()]
                    
        //             return {
        //                 tp_id,
        //                 tp_description,
        //                 dataAtp
        //             }
        //         })
        //         return {
        //             cp_id,
        //             cp_description,
        //             dataTp
        //         }
        //     })
        //     return {
        //         mapelName,
        //         kodeMapel,
        //         dataCp
        //     }
        // })
    }
    static buildWithSlot(bankSoal:BankSoalAppType[]):StrukturKurikulumMapelWithSlotType[]{
        const mapper = bankSoal.map(soal=>soal.snapshot_kurikulum!);;
        return StrukturKurikulumInKoleksiAtpAsOrmBuilder.buildWithSlot(mapper)
    }
    

    static buildMapper(bankSoal:BankSoalAppType[]):StrukturKurikulumMapelMapperType{
        // const result:StrukturKurikulumMapelMapperType = new Map();
        const koleksiAtpAsOrm = bankSoal.map(soal=>soal.snapshot_kurikulum!);

        // for(const item of bankSoal){
        //     const {snapshot_kurikulum} = item;
        //     const {
        //         mapelname, 
        //         kodemapel, 
        //         atp_as_tp_id, 
        //         atp_as_tp_description, 
        //         tp_as_cp_id,
        //         tp_as_cp_description ,
        //         cp_description,
        //         cp_id
        //     } = snapshot_kurikulum!
        //     const currentMapel = getOrCreateMap(result, kodemapel, ()=>({
        //         mapelName: mapelname,
        //         kodeMapel: kodemapel,
        //         dataCpMapper: new Map()
        //     }));
        //     const currentCp = getOrCreateMap(currentMapel.dataCpMapper, cp_id, ()=>({
        //         cp_id,
        //         cp_description,
        //         dataTpMapper: new Map()
        //     }) );
        //     const currentTp = getOrCreateMap(currentCp.dataTpMapper, tp_as_cp_id, ()=>({
        //         tp_id:tp_as_cp_id,
        //         tp_description: tp_as_cp_description,
        //         dataAtpMapper: new Map()
        //     }));
        //     getOrCreateMap(currentTp.dataAtpMapper, atp_as_tp_id, ()=>({
        //         atp_id: atp_as_tp_id,
        //         atp_description: atp_as_tp_description
        //     }))
        // }
        return StrukturKurikulumInKoleksiAtpAsOrmBuilder.buildMapper(koleksiAtpAsOrm);
        
    }
}