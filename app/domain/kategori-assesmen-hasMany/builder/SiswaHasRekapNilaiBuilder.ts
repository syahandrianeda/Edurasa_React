import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import type { SiswaMapRekapNilai } from "../types/SiswaWithRekapNilaiType";
import type { detailNilaiSiswaAppType } from "~/types/penilaian/nilai-siswa-app-type";
import type { DataSheetSkorKdKategoriAsesmenAppType } from "~/types/penilaian/DataSheetSkorKdKategoriAsesmenAppType";
import type { SiswaType } from "~/types/siswa";
import getOrCreateMap from "~/lib/getOrCreateMapper";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { InterfaceMapel } from "~/types/mapel/mapel";
import type { StrukturMapeltype } from "~/domain/trees-struktur-kurikulum";
import type { Data_response_bySiswaType } from "~/domain/penilaian/type/Data_response_bySiswaType";
import type { GroupBentukSoalPropertiKurikulumInPublikasiAssesmenWithScore } from "~/domain/penilaian/model/grouping-kurikulum-by-bentuksoal";



// type NilaiMapelResponTagihan = StrukturMapeltype & {
//     totalSkor:number|null;
//     skor:number|null;
//     countSoal:number;
//     interfaceMapel?: InterfaceMapel;
//     sourceTagihan:TagihanHasDataResponse
// }


// type NilaiMapelResponKategoriAssesmen = StrukturMapeltype & {
//     totalSkor:number|null;
//     skor:number|null;
//     countSoal:number;
//     interfaceMapel?: InterfaceMapel;
//     sourceTagihan:NilaiMapelResponTagihan[]
// }

type NilaiMapelSheetKdTagihan = StrukturMapeltype & {
    totalSkor:number|null;
    skor:number|null;
    countSoal:number;
    interfaceMapel?: InterfaceMapel;
    sourceTagihan:TagihanHasDataResponse
}
type NilaiMapelSheetKdKategoriAssesmen = StrukturMapeltype & {
    totalSkor:number|null;
    skor:number|null;
    countSoal:number;
    interfaceMapel?: InterfaceMapel;
    sourceTagihan:NilaiMapelSheetKdTagihan[]
}
type StrukturKurikulumRespon = GroupBentukSoalPropertiKurikulumInPublikasiAssesmenWithScore;
type SourceNilaiSiswa = Pick<SiswaType, 'id' | 'pd_nama' | 'nama_rombel'> &{
    ResponMapperMapel:Map<string, StrukturKurikulumRespon[]>;
    SkorKdSheetMapperMapel:Map<string, NilaiMapelSheetKdKategoriAssesmen>;
}

type SiswaMapRekapNilaiKategoriAssesmen = Map<number, SourceNilaiSiswa>;

export class SiswaWithSourceNilaiSiswaMapper{
    static build(source:TagihanHasDataResponse[]){

    }

    /**
     * 
     * @param source 
     * @returns 
     * expexted: Mapper in TagihanHasDataRespons ->siswa_id -->kodeMapel -->detailNilaiSiswaAppType;
     * 
     * 
     */
    static buildSourceNilaiMapper(source:TagihanHasDataResponse[]):SiswaMapRekapNilaiKategoriAssesmen{
        const mapper:SiswaMapRekapNilaiKategoriAssesmen = new Map();

        /** loop level set key Mapper */
        for(const tagihan of source){
            const {data_respons, data_response_bySiswa, dataSkorKdSheet,peserta, sebaranNoSoalFromPropertyKurikulumWithScore} = tagihan;

            /** 
             * first collect peserta as identifier mapper 
             * ------------------------
             * */
            for(const currentSiswa of peserta){
                const {id, pd_nama, nama_rombel} = currentSiswa;
                getOrCreateMap(mapper, id, ()=>({
                    id,
                    pd_nama,
                    nama_rombel,
                    ResponMapperMapel: new Map(),
                    SkorKdSheetMapperMapel:new Map()
                    
                }));
            }
            
            /** mapper data_respons */;
            this.setResponSiswaMapper(data_response_bySiswa,mapper);

            /** mapper skorKdSheet */
            this.setSkorKdSheet(dataSkorKdSheet, mapper);
            
        }

       
        
        return mapper;
    }
   
    private static setResponSiswaMapper(data_response_bySiswa:Data_response_bySiswaType[], mapper:SiswaMapRekapNilaiKategoriAssesmen):SiswaMapRekapNilaiKategoriAssesmen{
        /*
             * `data_response_bySiswa` is data from tab `respon_tagihan_<jenjang>` which is related by `publikasi_id`.
             *  property `siswa` in `data_response_siswa` was referneced by `pesserta`;
             *  property `peserta` have been setted since `publikasi` was publicated.
             *  `peserta` is not described his own siswa. Every siswa has mapel by `jp_mapelApp`;
             *  So, this mapper should be used on searching on other closure/method. This Mapper only provided data if other need
             *  `data_respons`;
             * */

            for(const responSiswa of data_response_bySiswa){
                const {siswa, data} = responSiswa;
                
                /** sett mapper by id siswa */
                const currentSiswa = mapper.get(siswa.id);

                /** skip if currentSiswa not exist */;
                if(!currentSiswa) continue;

                /** refrences */;
                for(const responNiaiSiswaApp of data){
                    const {skorKdSebaran, publikasi} = responNiaiSiswaApp;
                    
                    /** get last response if siswa was sended more */
                    const mapelCurrentTagihan = skorKdSebaran.data.at(-1);
                    
                    /** if `siswa` was not sended/responded this current tagihan, skip! */
                    if(!mapelCurrentTagihan) continue;
                    
                    const {kodeMapel, mapelName, total, skor, jumlahSoalDinilai} = mapelCurrentTagihan;
                    
                    getOrCreateMap(currentSiswa.ResponMapperMapel, kodeMapel, ()=>([])).push(mapelCurrentTagihan);
                    
                    
                }

            }
        return mapper
    }

    private static setSkorKdSheet(dataSkorKdSheet: DataSheetSkorKdKategoriAsesmenAppType[],mapper:SiswaMapRekapNilaiKategoriAssesmen):SiswaMapRekapNilaiKategoriAssesmen{

        /** 
         *  `dataSkorKdSheet` is data from tab type kategoriAssesmenType such as 'harian','mid_semester','akhir_semester', 'ujian_sekolah'.
         *  Its was related by `publikasi_id`, so its data was filtered by tagihan. `dataSkorKdSheet` has property `skor` was build
         *  from calculated skor tagihan by count of `soal`.
         */
        for(const skorKd of dataSkorKdSheet){
            const {data, idbaris, siswa_id, nama_siswa, rombel} = skorKd;
            /** get mapper current `siswa`. if not exist, skip! */
            const mapperCurrentSiswa = mapper.get(siswa_id);
            if(!mapperCurrentSiswa) continue;

            for(const kolomKey of data){
                const {kategoriAssesmen, kodeMapelKey, skor} = kolomKey;
                getOrCreateMap(mapperCurrentSiswa?.SkorKdSheetMapperMapel, kodeMapelKey, ()=>({
                    kodeMapel: kodeMapelKey, 
                    mapelName: '',
                    totalSkor:null,
                    skor:null,
                    countSoal:0,
                    sourceTagihan:[]
                        // interfaceMapel?: InterfaceMapel;
                }))
            }

        }
        return mapper;

    }
    
}