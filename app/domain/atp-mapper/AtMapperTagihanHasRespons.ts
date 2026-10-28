import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { TagihanHasDataResponse } from "../penilaian/type/tagihan-assesmen-type";
import getOrCreateMap from "~/lib/getOrCreateMapper";
import MemberOfPublikasiPaketBuilder from "../kategori-tagihan/builder/MemberOfPublikasiPaketBuilder";
import type { SiswaType } from "~/types/siswa";

export type TagihanWhoseKoleksiBankSoalWichCurrentAtp = {
    dataTagihan: TagihanHasDataResponse,
    atpSoal: BankSoalAppType[],
    memberCurrentTagihanMapper?: Map<number, SiswaType>
}
export type AtpContainKoleksiBankSoalType = Map<number, {atpSoal:BankSoalAppType[]}>;
export type AtpContanTagihanHasKoleksiBankSoalWhoseCurrentAtpType = Map<number, TagihanWhoseKoleksiBankSoalWichCurrentAtp[]>
type atpMapperHelper = {tagihan:TagihanHasDataResponse, atpSoalMapperCurrentTagihan:AtpContainKoleksiBankSoalType}
export default class AtMapperTagihanHasRespons{
    private AtpContainKoleksiBankSoalMapper:AtpContainKoleksiBankSoalType = new Map();
    private AtpContainTagihanHasKoleksiBankSoalWhoseCurrentAtpMapper:AtpContanTagihanHasKoleksiBankSoalWhoseCurrentAtpType = new Map()
    constructor (private readonly source: TagihanHasDataResponse[]){};
    get mapperAtpBankSoal():AtpContainKoleksiBankSoalType{
        return this.AtpContainKoleksiBankSoalMapper
    }
    get AtpContainTagihanHasKoleksiBankSoalWhoseCurrentAtp():AtpContanTagihanHasKoleksiBankSoalWhoseCurrentAtpType{
        return this.AtpContainTagihanHasKoleksiBankSoalWhoseCurrentAtpMapper
    }
    build():this{
        const tagihanHasAtpSoalMapper:atpMapperHelper[]=[];
        const memberOfTagihan = MemberOfPublikasiPaketBuilder.buildMapper(this.source)
        for(const tagihan of this.source){
            /** mengkoleksi atp dari bank soal di tiap-tiap tagihan */;
            const koleksiBankSoal = tagihan.bank_soal_collections;
            const atpSoalMapperCurrentTagihan:AtpContainKoleksiBankSoalType = new Map();
            this.AtpContainKoleksiBankSoalTypeBuilder(koleksiBankSoal,atpSoalMapperCurrentTagihan)
            this.AtpContainKoleksiBankSoalTypeBuilder(koleksiBankSoal,this.AtpContainKoleksiBankSoalMapper)
           
            const obj:atpMapperHelper = {
                tagihan,
                atpSoalMapperCurrentTagihan
            };
            tagihanHasAtpSoalMapper.push(obj);
        }
        
        for(const itemTagihanHasAtpSoalMapper of tagihanHasAtpSoalMapper){
            const {tagihan, atpSoalMapperCurrentTagihan} = itemTagihanHasAtpSoalMapper;
            const currentMemberTagihan = memberOfTagihan.get(tagihan.idbaris)?.dataSiswaMapper
            for(const [atp_id, atpSoal] of atpSoalMapperCurrentTagihan.entries()){
                getOrCreateMap(this.AtpContainTagihanHasKoleksiBankSoalWhoseCurrentAtpMapper, atp_id,()=>([])).push({dataTagihan:tagihan, atpSoal:atpSoal.atpSoal, memberCurrentTagihanMapper:currentMemberTagihan})
            }
            
        }
        
        return this;
    }
    AtpContainKoleksiBankSoalTypeBuilder(bankSoal:BankSoalAppType[], mapper:AtpContainKoleksiBankSoalType):AtpContainKoleksiBankSoalType{

        for(const soal of bankSoal){
            const currentSoal = getOrCreateMap(mapper, soal.kd_id, ()=>({
                atpSoal:[]
            }));
            currentSoal.atpSoal.push(soal);
        }
        return mapper
    }
    // AtpContainKoleksiBankSoalMapper():AtpContainKoleksiBankSoal{
    //     const mapper:AtpContainKoleksiBankSoal = new Map()
    //     for(const tagihan of this.source){
    //         for(const soal of tagihan.bank_soal_collections){
    //             const currentAtp = getOrCreateMap(mapper, soal.kd_id, ()=>({
    //                 atpSoal:[]
    //             }));
    //             currentAtp.atpSoal.push(soal);
    //         }
          
    //     }
    //     return mapper;
    // }
    // AtpContanTagihanHasKoleksiBankSoalWhoseCurrentAtpMapper():AtpContanTagihanHasKoleksiBankSoalWhoseCurrentAtp{
    //     const mapper:AtpContanTagihanHasKoleksiBankSoalWhoseCurrentAtp = new Map();
    //     for(const tagihan of this.source){

    //     }
    //     return mapper;
    // }
}