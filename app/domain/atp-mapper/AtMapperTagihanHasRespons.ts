import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { TagihanHasDataResponse } from "../penilaian/type/tagihan-assesmen-type";
import getOrCreateMap from "~/lib/getOrCreateMapper";
import MemberOfPublikasiPaketBuilder from "../kategori-tagihan/builder/MemberOfPublikasiPaketBuilder";
import type { SiswaType } from "~/types/siswa";
import type { AtpContainKoleksiBankSoalMapperType } from "./AtpContainKoleksiBankSoalType";


export type TagihanWhoseKoleksiBankSoalWichCurrentAtp = {
    dataTagihan: TagihanHasDataResponse,
    atpSoal: BankSoalAppType[],
    memberCurrentTagihanMapper?: Map<number, SiswaType>
}
export type AtpContanTagihanHasKoleksiBankSoalWhoseCurrentAtpType = Map<number, TagihanWhoseKoleksiBankSoalWichCurrentAtp[]>
type atpMapperHelper = {tagihan:TagihanHasDataResponse, atpSoalMapperCurrentTagihan:AtpContainKoleksiBankSoalMapperType};

/**
 * @deprecated
 * untuk mendapatkan data type mapper `AtpContainKoleksiBankSoalMapper:AtpContainKoleksiBankSoalMapperType`, gunakan `AtpWithBankSOal.build()`
 * untuk mendapatkan data type mapper `AtpWithTagihanBankSoal.build()`;
 */
export default class AtMapperTagihanHasRespons{
    private AtpContainKoleksiBankSoalMapper:AtpContainKoleksiBankSoalMapperType = new Map();
    private AtpContainTagihanHasKoleksiBankSoalWhoseCurrentAtpMapper:AtpContanTagihanHasKoleksiBankSoalWhoseCurrentAtpType = new Map();
    
    constructor (private readonly source: TagihanHasDataResponse[]){};
    
    get mapperAtpBankSoal():AtpContainKoleksiBankSoalMapperType{
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
            const atpSoalMapperCurrentTagihan:AtpContainKoleksiBankSoalMapperType = new Map();
            this.AtpContainKoleksiBankSoalMapperTypeBuilder(koleksiBankSoal,atpSoalMapperCurrentTagihan)
            // this.AtpContainKoleksiBankSoalMapperTypeBuilder(koleksiBankSoal,this.AtpContainKoleksiBankSoalMapper)
           
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
                const item = getOrCreateMap(this.AtpContainTagihanHasKoleksiBankSoalWhoseCurrentAtpMapper, atp_id,()=>([]));
                item.push({dataTagihan:tagihan, atpSoal, memberCurrentTagihanMapper:currentMemberTagihan})
                // const item = getOrCreateMap(this.AtpContainTagihanHasKoleksiBankSoalWhoseCurrentAtpMapper, atp_id, ()=>({

                // }))
            }
            
        }
        
        return this;
    }
    AtpContainKoleksiBankSoalMapperTypeBuilder(bankSoal:BankSoalAppType[], mapper:AtpContainKoleksiBankSoalMapperType):AtpContainKoleksiBankSoalMapperType{

        for(const soal of bankSoal){
            const currentSoal = getOrCreateMap(mapper, soal.kd_id, ()=>([]));
            currentSoal.push(soal);
        }
        return mapper
    }
    
}