import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { TagihanHasDataResponse } from "../penilaian/type/tagihan-assesmen-type";
import getOrCreateMap from "~/lib/getOrCreateMapper";
import type { AtpContainKoleksiBankSoalMapperType, AtpContainKoleksiBankSoalType } from "./AtpContainKoleksiBankSoalType";
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";
import AtpAsOrmUndefined from "../kurikulum/atpAsOrm-undefined";
import type { StrukturAtpType, StrukturCpType, StrukturMapeltype, StrukturTpType } from "../trees-struktur-kurikulum";
import { data } from "react-router";
import type { SiswaType } from "~/types/siswa";
import type AtpWithBankSoal from "./AtpWithBankSoal";
import AtpMapper from "../mapper/atp/AtpMapper";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { jp_mapelApp } from "~/types/mapel/jp_mapel";

export type TagihanBankSoalCurrentAtp = {
    tagihan:TagihanHasDataResponse,
    atpSoal: BankSoalAppType[], 
    // refrenceskurikulum:AtpAsOrm
}

type AtpWithTagihanBankSoalMapperType = Map<number, StrukturMapeltype & StrukturCpType & StrukturTpType  & StrukturAtpType &{data: TagihanBankSoalCurrentAtp[]}>;

type AtpWithTagihanBankSoalType = {
    atp_id:number,
    sourceBankSoal: TagihanBankSoalCurrentAtp[]
}

type AtpWithBankSoalType = {
    atp_id:number,
    atpSoal:BankSoalAppType[]
};//AtpContainKoleksiBankSoalMapperType;

type MapelMapWithPesertaAtpType =Map<string, {pesertaMapper:Map<number, {siswa:SiswaType, atpMapper:AtpContainKoleksiBankSoalMapperType, atpRespon:Map<number, RisponsePenilaianSiswa[]>}>}>
function atpContainKoleksiBankSoalMapper (mapper:AtpWithTagihanBankSoalMapperType, mapperResult:AtpContainKoleksiBankSoalMapperType):void {
    for(const [atp_id, sourceAtp] of mapper.entries()){
            const atp_soal = sourceAtp?.data?.flatMap(m=>m.atpSoal);
            getOrCreateMap(mapperResult, atp_id, ()=>atp_soal);
        }
    
}

export default class AtpWitTagihanBankSoal{
    private dataAtpWithTagihanBankSoal:AtpWithTagihanBankSoalType[]=[];
    private dataAtpWithBankSoal:AtpWithBankSoalType[]=[];
    private mapperAtpWithTagihanBankSoal:AtpWithTagihanBankSoalMapperType = new Map();
    private mapperAtpWithBankSoal:AtpContainKoleksiBankSoalMapperType = new Map();


    constructor(private readonly sumberTagihan:TagihanHasDataResponse[]){ }
    
    get dataAtpContainTagihanBankSoal(): AtpWithTagihanBankSoalType[]{
        return this.dataAtpWithTagihanBankSoal;
    }

    get dataAtpContainBankSoal():AtpWithBankSoalType[]{
        return this.dataAtpWithBankSoal;
    }
    
    get mapperAtpTagihanBankSoal():AtpWithTagihanBankSoalMapperType{
        return this.mapperAtpWithTagihanBankSoal;
    }

    get mapperAtpBankSoal():AtpContainKoleksiBankSoalMapperType{
        return this.mapperAtpWithBankSoal;
    }

    init():this{
        this.mapperAtpWithTagihanBankSoal = AtpWitTagihanBankSoal.mapper(this.sumberTagihan);

        atpContainKoleksiBankSoalMapper(this.mapperAtpWithTagihanBankSoal, this.mapperAtpWithBankSoal);

        this.dataAtpWithTagihanBankSoal = [...this.mapperAtpWithTagihanBankSoal.entries()].map(([atp_id, value])=>{
            return {
                kodeMapel: value?.kodeMapel,
                mapelName: value?.mapelName,
                atp_id,
                tp_id: value?.tp_id ?? 0,
                cp_id: value?.cp_id ?? 0,
                atp_description: value?.atp_description??'',
                tp_description: value?.tp_description,
                cp_description: value?.cp_description,
                sourceBankSoal:value?.data
            }
        });

        this.dataAtpWithBankSoal = [...this.mapperAtpWithBankSoal.entries()].map(([atp_id, atpSoal])=>{
            
            return {
                atp_id,
                atpSoal
            }
        });

        return this;
    }

    static getDataAtpWithBankSoal(sumberTagihan:TagihanHasDataResponse[]):AtpWithTagihanBankSoalType[]{
        const mapper = this.mapper(sumberTagihan);
        return [...mapper.entries()].map(([atp_id, value])=>{
            return {
                atp_id,
                sourceBankSoal:value.data
            }
        })
    }
    
    static mapperAtpWithBankSoal(sumberTagihan:TagihanHasDataResponse[]):AtpContainKoleksiBankSoalMapperType{
        const resultMapper:AtpContainKoleksiBankSoalMapperType = new Map()
        const mapper = this.mapper(sumberTagihan);
        
        atpContainKoleksiBankSoalMapper(mapper, resultMapper);

        return resultMapper;
    }

    static mapper(sumberTagihan:TagihanHasDataResponse[]):AtpWithTagihanBankSoalMapperType{
        const mapper:AtpWithTagihanBankSoalMapperType = new Map();
        const atpUndefined = AtpAsOrmUndefined.build();

        for(const tagihan of sumberTagihan){
            const {bank_soal_collections, sebaran_kurikulum_by_bentuk_soal} = tagihan;
            
            for(const bankSoal of bank_soal_collections){
                const {snapshot_kurikulum}=bankSoal;
                const kurikulum = snapshot_kurikulum ?? atpUndefined;
                getOrCreateMap(mapper, bankSoal.kd_id, ()=>({
                    mapelName: kurikulum.mapelname ??'',
                    kodeMapel: kurikulum.kodemapel ?? '',
                    cp_id: kurikulum.cp_id ?? 0,
                    cp_description: kurikulum.cp_description ?? '', 
                    tp_id: kurikulum.tp_as_cp_id ?? 0,
                    tp_description: kurikulum.tp_as_cp_description ?? '',
                    atp_id: kurikulum.atp_as_tp_id,
                    atp_description: kurikulum.atp_as_tp_description,
                    data:[]
                }));
            };
            

            for(const atpId of mapper.keys()){
                const atpSoal = bank_soal_collections.filter(s=>s.kd_id === atpId);
                if(atpSoal.length > 0){
                    /** 
                     * refrenceAtp seharusnya diambil dari `snapshot_kurikulum` sebagai sumber kebenaran.
                     * seharusnya `snapshot_kurikulum` dengan atp_id (kd_id) yang sama mempunya data `snapshot_kurikulum`
                     * yang sama. Jadi, kita ambil sampling pada data pertama saja.
                     * Kelebihannya:
                     *  - build data cepat tanpa harus filter. 
                     *  - ketika Apt/kurikulum diubah, atp tidak error/undefined. atp tetap tidak terpengaurh karena ini menyimpan snapsot data
                     *    struktur kurikulum pada saat bank soal ini dibuat.
                     * Kelemahannya:
                     *  - Jika merefrensi data struktur kurikulum berdasarkan `snapshot`, maka data pengolahan selanjutnya tidak
                     *    ikut terupdate. Misal mengganti atp dengan relasi tp yang lain atau menghapus atp, maka tagihan seharusnya
                     *    tidak valid.
                     * 
                     */
                   
                   

                    mapper.get(atpId)?.data.push({
                        tagihan,
                        atpSoal, 
                    })

                }
            }
        }


        return mapper;
        
    }
    
}