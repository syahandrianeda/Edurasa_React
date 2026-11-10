import AtpWitTagihanBankSoal from "~/domain/atp-mapper/AtpWithTagihanBankSoal";
import MemberOfPublikasiPaketBuilder from "~/domain/kategori-tagihan/builder/MemberOfPublikasiPaketBuilder";
import type { Data_response_bySiswaType } from "~/domain/penilaian/type/Data_response_bySiswaType";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import getOrCreateMap from "~/lib/getOrCreateMapper";
import { groupBy } from "~/lib/group-by";
import type { detailNilaiSiswaAppType } from "~/types/penilaian/nilai-siswa-app-type";
import type { SiswaType } from "~/types/siswa";
import {type MapperDataResponseAtp, type MapperDataResponseCp, type MapperDataResponseMapel, type MapperDataResponseTp, type mapperSiswaWithDetailNilaiResponAppType, type SourceGroupResponseCpNilaiSiswa, type SourceGroupResponseMapelNilaiSiswa, type SourceGroupResponseNilaiSiswa, type SourceGroupResponseTpNilaiSiswa, type sourceResponAtp, type sourceResponTp } from "./mapperSiswaWithDetailNilaiResponAppType";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { KategoriTagihanType } from "~/domain/kategori-tagihan/types/entities/KategoriTagihanType";


type siswaWithDetailNilaiSiswaAppType = {
    siswa:SiswaType,
    response:detailNilaiSiswaAppType[]
}
export default class SumberKoleksiNilaiRapor{
    // private readonly sumberResponsSiswa:detailNilaiSiswaAppType[]=[];
    private mapperSiswaWithDetailNilaiRespon: mapperSiswaWithDetailNilaiResponAppType =new Map();
    // private mapperSiswaWithDetailNilaiSheetKd = new Map<number, sheetKdAppType[]>( )
    
    constructor(
        private readonly sumberTagihan:TagihanHasDataResponse[],
    ){}
    get mapperSiswaRespon():mapperSiswaWithDetailNilaiResponAppType{
        return this.mapperSiswaWithDetailNilaiRespon
    }
    build():this{
        /** 
         * koleksi Data_response_bySiswaType di semua tagihan (this.sumberTagihan);
         */
        const koleksiData_response_bySiswa:Data_response_bySiswaType[]=this.sumberTagihan.flatMap(m=>m.data_response_bySiswa);

        const memberOfPublikasi = MemberOfPublikasiPaketBuilder.buildMapper(this.sumberTagihan);

        
        
        for(const dataRespon of koleksiData_response_bySiswa){
            const {siswa, data} = dataRespon;
            
            const currentSiswa = getOrCreateMap(this.mapperSiswaWithDetailNilaiRespon, siswa.id, ()=>({
                siswa,
                dataResponseMapel: new Map<string,SourceGroupResponseMapelNilaiSiswa> (),
                dataResponse: new Map<number,SourceGroupResponseNilaiSiswa> (),
                dataResponseTp: new Map<number, SourceGroupResponseTpNilaiSiswa>(),
                dataResponseCp:  new Map<number, SourceGroupResponseCpNilaiSiswa>()
            }));

            /**
             * setiap dataRespon diambil dari satu sumber `TagihanHasDataResponse` atau satu publikasi. Artinya, 
             * kalkulasi ini berputar pada satu publikasi paket.
             * Satu paket publikasi pada dasarnya sudah memiliki StrukturKurikulum masing-masing. Sehingga, dalam satu
             * publikasi menyimpan struktur_kurikuum masing-masing. Namun, di sini `dataRespon` diambil dari seluruh 
             * tagihan. Tidak dapat dipastikan dataRespon ini berada di satu tagihan atau sudah di tagihan yang lain ketika 
             * looping (iteration) terjadi.
             * 
             */
            
            /** 
             * setiap siswa seharusnya mengirimkan satu kali respon. Namun, siswa memungkinkan mengirimkan data lebih dari satu, 
             * jika tidak dihapus,maka data yang dianggap valid adalah data yang dikirim terakhir.
             * oleh karena itu, ambil data yang terakhirnya.
             */
            const lastData = data.at(-1);
            
            if(lastData){
                
                const {respon, publikasi, idbaris, publikasi_id, jenis_tagihan} = lastData;
                
                /** 
                 * skip untuk siswa yang bukan peserta tagihan ini.
                 * ------------------------------------------------
                 * `lastData` adalah data respon siswa yang diambil dari tab `response_tagihan_<jenjang>`, dimana setiap siswa dapat mengerjakan 
                 * publikasi paket soal dan menyimpan hasilnya di tab `response_tagihan_<jenjang>`. Namun, ada suatu kasus dimana publikasi mengalami 
                 * perubahan dengan mengubah peserta publikasinya. Hal ini berpengaruh ketika siswa sudah merespon, sementara publikasi telah dipublish dan 
                 * direspon siswa lalu disimapn dii tab respons_tagihan_<jenjang>. Oleh karena itu, untuk kalkulasi atau penyedian sumber respon, harus
                 * dicegah dulu agar TIDAK DISEDIAKAN SUMBER NILAINYA jika bukan peserta, MESKIPUN siswa telah mengirimkan nilainya.
                 * */
                const getTagihanHasDataResponseMapper = memberOfPublikasi.get(publikasi_id)
                const dataMemberCurrentPublikasi = getTagihanHasDataResponseMapper?.dataSiswaMapper?.get(siswa.id);
                const tagihan = getTagihanHasDataResponseMapper?.publikasi;

                if(!tagihan || !dataMemberCurrentPublikasi) continue;
                
                for(const responNilai of respon){
                    
                    const { 
                        kodemapel,
                        atp_as_tp_id: atp_id, atp_as_tp_description:atp_description,
                        tp_as_cp_id, tp_as_cp_description,
                        cp_description, cp_id,
                     } =responNilai.atp_soal!;
                    /** currentAtp */  
                    this.setMapperMapel(currentSiswa.dataResponseMapel, tagihan, responNilai)  
                    this.setMapperAtp(currentSiswa.dataResponse, tagihan, responNilai)  
                    this.setMapperTp(currentSiswa.dataResponseTp, tagihan, responNilai)  
                    this.setMapperCp(currentSiswa.dataResponseCp, tagihan, responNilai)  
                   
                    
                }
            }

        }

        return this;    
    }

    setMapperAtp(mapperDataRespon:MapperDataResponseAtp, tagihan:TagihanHasDataResponse, responNilai:RisponsePenilaianSiswa):void{
        const { 
                atp_as_tp_id: atp_id, atp_as_tp_description:atp_description,
                tp_as_cp_id:tp_id, tp_as_cp_description:tp_description,
                cp_description, cp_id,
                kodemapel:kodeMapel,
                } =responNilai.atp_soal!;
        const currentAtp = getOrCreateMap(mapperDataRespon, responNilai.atp, ()=>({
            atp: {atp_id, atp_description},
            respon:[],
            sourceRespon:[],
            sourceResponGroupTagihan:new Map(),
            sourceResponGroupkategoriAssesmen: new Map(),
             skorRespon:null
        }));
        

        currentAtp.respon.push(responNilai);

        currentAtp.sourceRespon.push({
            // tagihan:publikasi,
            tagihan,
            currentResponAtp: responNilai

        });

        const currentTagihanAtp = getOrCreateMap(currentAtp.sourceResponGroupTagihan, tagihan.idbaris, ()=>({
            atp_id,
            cp_id:cp_id ??0,
            tp_id:tp_id ?? 0,
            kodeMapel:kodeMapel ?? '',
            tagihan,
            collectionCurrentTagihanAtp:[]
        }));

        currentTagihanAtp.collectionCurrentTagihanAtp.push(responNilai);

        const currentGroupAssesmen = getOrCreateMap(currentAtp.sourceResponGroupkategoriAssesmen, tagihan.tipe_assesmen, ()=>(new Map()));
        const currenttagihanAssesmen = getOrCreateMap(currentGroupAssesmen, tagihan.idbaris, ()=>({
            tagihan,
            collectionCurrentTagihanAtp:[]
        }));
        
        currenttagihanAssesmen.collectionCurrentTagihanAtp.push(responNilai);

    }

    setMapperMapel(mapperDataRespon:MapperDataResponseMapel, tagihan:TagihanHasDataResponse, responNilai:RisponsePenilaianSiswa):void{
        const { 
                 atp_as_tp_id: atp_id, atp_as_tp_description:atp_description,
                tp_as_cp_id:tp_id, tp_as_cp_description:tp_description,
                cp_description, cp_id,
                kodemapel:kodeMapel,
                mapelname
                } =responNilai.atp_soal!;

        const currentAtp = getOrCreateMap(mapperDataRespon, kodeMapel
            , ()=>({
            kodeMapel: kodeMapel!,
            namaMapel:mapelname!,
            respon:[],
            sourceRespon:[],
            sourceResponGroupTagihan:new Map(),
            sourceResponGroupkategoriAssesmen: new Map(),
             skorRespon:null
        }));
        

        currentAtp.respon.push(responNilai);

        currentAtp.sourceRespon.push({
            // tagihan:publikasi,
            tagihan,
            currentResponAtp: responNilai

        });

        const currentTagihanAtp = getOrCreateMap(currentAtp.sourceResponGroupTagihan, tagihan.idbaris, ()=>({
            atp_id,
            cp_id:cp_id ??0,
            tp_id:tp_id ?? 0,
            kodeMapel:kodeMapel ?? '',
            tagihan,
            collectionCurrentTagihanAtp:[]
        }));

        currentTagihanAtp.collectionCurrentTagihanAtp.push(responNilai);

        const currentGroupAssesmen = getOrCreateMap(currentAtp.sourceResponGroupkategoriAssesmen, tagihan.tipe_assesmen, ()=>(new Map()));
        const currenttagihanAssesmen = getOrCreateMap(currentGroupAssesmen, tagihan.idbaris, ()=>({
            tagihan,
            collectionCurrentTagihanAtp:[]
        }));
        
        currenttagihanAssesmen.collectionCurrentTagihanAtp.push(responNilai);

    }

    setMapperTp(mapperDataRespon:MapperDataResponseTp, tagihan:TagihanHasDataResponse, responNilai:RisponsePenilaianSiswa):void{
        const { 
                 atp_as_tp_id: atp_id, atp_as_tp_description:atp_description,
                tp_as_cp_id:tp_id, tp_as_cp_description:tp_description,
                cp_description, cp_id,
                kodemapel:kodeMapel,
                } =responNilai.atp_soal!;
        const currentTp = getOrCreateMap(mapperDataRespon, tp_id, ()=>({
            tp: {tp_id: tp_id!, tp_description: tp_description!},
            respon:[],
            sourceRespon:[],
            sourceResponGroupTagihan:new Map(),
            sourceResponGroupkategoriAssesmen: new Map(),
            skorRespon:null
        }));
        currentTp.respon.push(responNilai);

        currentTp.sourceRespon.push({
            tagihan,
            currentResponTp: responNilai

        });

        const currentTagihanTp = getOrCreateMap(currentTp.sourceResponGroupTagihan, tagihan.idbaris, ()=>({
            atp_id,
            tp_id:tp_id ?? 0,
            cp_id:cp_id ?? 0,
            kodeMapel:kodeMapel??'',
            tagihan,
            collectionCurrentTagihanAtp:[]
        }));

        currentTagihanTp.collectionCurrentTagihanAtp.push(responNilai);

        const currentGroupAssesmenTp = getOrCreateMap(currentTp.sourceResponGroupkategoriAssesmen, tagihan.tipe_assesmen, ()=>(new Map()));
        const currenttagihanAssesmenTp = getOrCreateMap(currentGroupAssesmenTp, tagihan.idbaris, ()=>({
            tagihan,
            collectionCurrentTagihanAtp:[]
        }));
        currenttagihanAssesmenTp.collectionCurrentTagihanAtp.push(responNilai);
    }
    setMapperCp(mapperDataRespon:MapperDataResponseCp, tagihan:TagihanHasDataResponse, responNilai:RisponsePenilaianSiswa):void{
        const { 
                 atp_as_tp_id: atp_id, atp_as_tp_description:atp_description,
                tp_as_cp_id:tp_id, tp_as_cp_description:tp_description,
                cp_description, cp_id,
                kodemapel:kodeMapel,
                } =responNilai.atp_soal!;
        const currentTp = getOrCreateMap(mapperDataRespon, cp_id, ()=>({
            cp: {cp_id:cp_id!,cp_description:cp_description!},
            respon:[],
            sourceRespon:[],
            sourceResponGroupTagihan:new Map(),
            sourceResponGroupkategoriAssesmen: new Map(),
             skorRespon:null
        }));
        currentTp.respon.push(responNilai);

        currentTp.sourceRespon.push({
            tagihan,
            currentResponCp: responNilai

        });

        const currentTagihanTp = getOrCreateMap(currentTp.sourceResponGroupTagihan, tagihan.idbaris, ()=>({
            atp_id,
            tp_id:tp_id?? 0,
            cp_id: cp_id??0,
            kodeMapel:kodeMapel ?? '',
            tagihan,
            collectionCurrentTagihanAtp:[],

        }));

        currentTagihanTp.collectionCurrentTagihanAtp.push(responNilai);

        const currentGroupAssesmenTp = getOrCreateMap(currentTp.sourceResponGroupkategoriAssesmen, tagihan.tipe_assesmen, ()=>(new Map()));
        const currenttagihanAssesmenTp = getOrCreateMap(currentGroupAssesmenTp, tagihan.idbaris, ()=>({
            tagihan,
            collectionCurrentTagihanAtp:[]
        }));
        currenttagihanAssesmenTp.collectionCurrentTagihanAtp.push(responNilai);
    }
    
}

/**
 * 
 * 
 * 
        type MapperResponseItem<T> = {
            item: T;
            respon: RisponsePenilaianSiswa[];

            sourceRespon: {
                tagihan: TagihanHasDataResponse;
                currentRespon: RisponsePenilaianSiswa;
            }[];

            sourceResponGroupTagihan: Map<
                number,
                {
                    tagihan: TagihanHasDataResponse;
                    collectionCurrentRespon: RisponsePenilaianSiswa[];
                }
            >;

            sourceResponGroupkategoriAssesmen: Map<
                string,
                Map<
                    KategoriTagihanType,
                    {
                        tagihan: TagihanHasDataResponse;
                        collectionCurrentRespon: RisponsePenilaianSiswa[];
                    }
                >
            >;
        };
        type MapperConfig<T> = {
            key: string | number;
            item: T;
        };
    setMapper<T>(
        mapperDataRespon: Map<number|string, MapperResponseItem<T>>,
        tagihan: TagihanHasDataResponse,
        responNilai: RisponsePenilaianSiswa,
        config: MapperConfig<T>
    ): void {

        const { key, item } = config;

        const currentItem = getOrCreateMap(
            mapperDataRespon,
            key,
            () => ({
                item,
                respon: [],
                sourceRespon: [],
                sourceResponGroupTagihan: new Map(),
                sourceResponGroupkategoriAssesmen: new Map(),
            })
        );

        currentItem.respon.push(responNilai);

        currentItem.sourceRespon.push({
            tagihan,
            currentRespon: responNilai,
        });

        // Group berdasarkan tagihan
        const currentTagihan = getOrCreateMap(
            currentItem.sourceResponGroupTagihan,
            tagihan.idbaris,
            () => ({
                tagihan,
                collectionCurrentRespon: [],
            })
        );

        currentTagihan.collectionCurrentRespon.push(responNilai);

        // Group berdasarkan kategori asesmen
        const currentGroupAssesmen = getOrCreateMap(
            currentItem.sourceResponGroupkategoriAssesmen,
            tagihan.tipe_assesmen,
            () => new Map()
        );

        const currentTagihanAssesmen = getOrCreateMap(
            currentGroupAssesmen,
            tagihan.idbaris,
            () => ({
                tagihan,
                collectionCurrentRespon: [],
            })
        );

        currentTagihanAssesmen.collectionCurrentRespon.push(responNilai);
    }

    
 */
