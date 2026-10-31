import desimalFormat from "~/lib/desimal-format";
import getOrCreateMap from "~/lib/getOrCreateMapper";
import type { DataKdSheetApp } from "~/types/penilaian/DataKdSheetAppType";
import type { DataSheetSkorKdKategoriAsesmenAppType } from "~/types/penilaian/DataSheetSkorKdKategoriAsesmenAppType";
import type { MapperPesertaHasTagihanMapperType, TagihanMapperInMapperSiswaHasTagihanMapper } from "./MapperPesertaTagihan";
type currentSiswa= {
    idbaris:number,
    siswa_id:number, 
    nama_siswa: string, 
    rombel:string
}
export type DataSheetSkorKdKategoriAsesmenMapperType = Map<number, {currentSiswa: currentSiswa, atpMapper:Map<number, {refrence: DataKdSheetApp[], skor:number|null}>}>;
export default class DataSheetSkorKdKategoriAsesmenMapper{
    static build(dataSheetSkorKd:DataSheetSkorKdKategoriAsesmenAppType[], siswaPeserta:MapperPesertaHasTagihanMapperType):DataSheetSkorKdKategoriAsesmenMapperType{
        const mapper:DataSheetSkorKdKategoriAsesmenMapperType = new Map()
        for(const data of dataSheetSkorKd){
            const {idbaris, siswa_id, nama_siswa, rombel, data:dataSheetKd} = data;
            
            const currentTagihanMapper = siswaPeserta.get(siswa_id)?.tagihanMapper
            const atpMapper = this.buildAtpDataKdSheetApp(dataSheetKd, currentTagihanMapper);
            
            getOrCreateMap(mapper, siswa_id, ()=>({
                currentSiswa: {
                    idbaris, siswa_id, nama_siswa, rombel
                },
                atpMapper:atpMapper
            }));

        }
        return mapper;
    }

    private static buildAtpDataKdSheetApp(dataSheets:DataKdSheetApp[], pesertaMember?:TagihanMapperInMapperSiswaHasTagihanMapper){
        const mapper = new Map<number, {refrence: DataKdSheetApp[], skor:number|null}>();
        
        const atp_skor = new Map<number, number[]>();
        for(const dataSheet of dataSheets){
            const {kolomKey, kategoriAssesmen, jenisTagihan, atp_id, skor, skorKdKey, publikasi_id, kodeMapelKey} = dataSheet;
            const bankSoalCurrentAtpInPThisPublikasi = pesertaMember?.get(publikasi_id)?.atpSoalMapper.get(atp_id)
            const skorCurrentAtp = getOrCreateMap(atp_skor, atp_id, ()=>([]));//.push(skor);
            if(bankSoalCurrentAtpInPThisPublikasi){
                const totalSkor = (skor ?? 0)* bankSoalCurrentAtpInPThisPublikasi.length
                skorCurrentAtp.push(totalSkor)
            }
            const atp = getOrCreateMap(mapper, atp_id, ()=>({
                skor:null,
                refrence: []
            }));
            atp.refrence.push(dataSheet);

        }

        for(const [atp_id, skorCollection] of atp_skor.entries()){
            let sumSkor:number|null = null;
            let countSkor: number = skorCollection.length;
            for(const nilai of skorCollection){
                if(!nilai){
                    sumSkor = desimalFormat((sumSkor ?? 0) + (nilai??0))
                }
                

            }

            if(sumSkor){
                const skor = desimalFormat(sumSkor/countSkor);
                mapper.get(atp_id)!.skor = skor;
            }

            // mapper.get(atp_id)?.skor = skor
        }
        return mapper;
    }
}