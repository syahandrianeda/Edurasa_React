import type { jp_mapelApp } from "~/types/mapel/jp_mapel";
import type { TagihanHasDataResponse } from "../penilaian/type/tagihan-assesmen-type";
import type { AtpMapperBelongsToManyTagihanHasDataResponseType } from "../mapper/atp/AtpMapper";
import AtpMapper from "../mapper/atp/AtpMapper";
import type KategoriAsessmenInPublikasiBuilder from "../kategori-tagihan/builder/KategoriAsessmenInPublikasiBuilder";
import getOrCreateMap from "~/lib/getOrCreateMapper";
import type { TagihanMapperInMapperSiswaHasTagihanMapper } from "../kategori-tagihan/infrastructures/MapperPesertaTagihan";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { AtpContainKoleksiBankSoalMapperType } from "../atp-mapper/AtpContainKoleksiBankSoalType";
import AtpAsOrmUndefined from "../kurikulum/atpAsOrm-undefined";
import type { KategoriAssesmenInPublikasiMapperType } from "../penilaian/struktur-tagihan-respon/types/KategoriAssesmenInPublikasiMapperType";
import dtoTagihanAssesmenTypeFromTagihanHasDataRespon from "../penilaian/struktur-tagihan-respon/infrastructure/dtoTagihanAssesmenTypeFromTagihanHasDataRespon";
import type { StrukturKurikulumAtpMapperType, StrukturKurikulumCpMapperType, StrukturKurikulumMapelAtpNonUniqueMapperType, StrukturKurikulumMapelMapperType, StrukturKurikulumMapelWithSlotType, StrukturKurikulumTpMapperAtpNotUniqueType, StrukturKurikulumTpMapperType } from "../trees-struktur-kurikulum/struktur-kurikulum-type";
import type { StrukturAtpType } from "../trees-struktur-kurikulum";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import StrukturKurikulumInKoleksiAtpAsOrmBuilder from "../struktur-kurikulum/from-atp-as-orm/StrukturKurikulumInKoleksiAtpAsOrmBuilder";
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";
import type { MapperDataResponseAtp, MapperDataResponseCp, MapperDataResponseMapel, MapperDataResponseTp, mapperDetailNilaiResponType, mapperSiswaWithDetailNilaiResponAppType } from "../raport/infrastructures/sumber-nilai/mapperSiswaWithDetailNilaiResponAppType";
import type { DataKdSheetApp } from "~/types/penilaian/DataKdSheetAppType";
import type { MapperSiswaOnDataResponType, ResponAtpMapperType } from "../respon-tagihan-jenjang/mapper/MapperSiswaOnDataResponBuilder";
import type { DataKdSheetAppWithCountSoalTagihan, MapperSiswaWithDetailNilaiSheetKdAppType } from "./MapperSiswaWithDetailNilaiSheetKdAppType";

type AtpBankSoalBelongsToTagihanHasDataResponseType = Map<
                                                    number, // atp_id
                                                    Map<
                                                        number, // tagihan_id
                                                        BankSoalAppType[]>>;
type SiswaAsPesertaHasTagihanType = {
    siswa_id:number, 
    nama_siswa: string, 
    rombel: string, 
    dataTagihan:TagihanHasDataResponse[]
}
export default class TagihanHasDataResponseMapperBuilder{
    /**
     * `atpBelongsToManyTagihanHasDataResponse` adalah mapper Atp untuk mendapatkan seluruh data `tagihanHasDataResponse` dimana data
     * tersebut memiliki `atp_id` yang ditentukan method get mapper. Contoh:
     *  atpBelongsToManyTagihanHasDataResponse.get(5) => [tagihanHasDataRespons, tagihanDataRespons]
     *  nilai yag dikembalikan adalah kumpulan `tagihanHasDataResponse` yang belum diotak-atik/murni dari sumber.
     */
    public atpBelongsToManyTagihanHasDataResponse:AtpMapperBelongsToManyTagihanHasDataResponseType = new Map();
    
    /** 
     * `atpHasBankSoal` adalah seluruh data `BankSoalAppType` dengan `atp_id` tertentu di seluruh tagihan tanpa 
     * peduli soal tersebut berasal dari tagihan/publikasi mana.
     * satu soal bisa saja muncul lebih dari satu karena diterapkan di berbagai paket soal (tagihan).
     * Dan ini TIDAK PEDULI soal tersebut ada di `tagihan/publikasi` yang mana. 
     * Ini cocok digunakan untuk menentukan apakah soal tersebut telah digunakan pada suatu paket soal atau belum.
    */
   public atpHasBankSoal:AtpContainKoleksiBankSoalMapperType = new Map();

   /**  
    * `atpHasTagihanWithBankSoal` adalah mapper untuk menentukan data bank soal (`BankSoalAppType[]`) di suatu tagihan, 
    * pada `atp_id` tertentu.
    * Penggunaan: 
    * ```
    * const atp = atpHasTagihanWithBankSoal.get(atp_id).get(tagihan_id); //--> result:  atp = [BankSoalAppType, BankSoalAppType]
   */
    public atpHasTagihanWithBankSoal:AtpBankSoalBelongsToTagihanHasDataResponseType = new Map();

    /**
     * kategori Assesmen
     */
    public kategoriAssesmenHasTagihan:KategoriAssesmenInPublikasiMapperType = new Map();

    /** 
     * strutkurKurikulum itu mapper;
     * strukturKurikulumWithSlot itu non-mapper;
     */
    public strukturKurikulum:StrukturKurikulumMapelMapperType = new Map();
    /** 
     * mapper siswa as peserta tagihan, mapper ini bertugas mendapatkan seluruh tagihan yang diikuti seorang siswa.  
     * yang lebih keren ini: app\domain\kategori-tagihan\infrastructures\MapperPesertaTagihan.ts
    */
   public siswaAsPesertaHasTagihan= new Map<number, SiswaAsPesertaHasTagihanType>();
   
   /** */
   public siswaAsRespondenHasResponTagihan:mapperSiswaWithDetailNilaiResponAppType = new Map();

   public siswaHasSheetKd:MapperSiswaWithDetailNilaiSheetKdAppType = new Map()
//    public siswaHasSheetKd = new Map<number, 
//    { 
//     idbaris:number,
//     siswa_id:number, 
//     nama_siswa:string, 
//     rombel:string, 
//     data:DataKdSheetApp[], 
//     atpMapper:Map<number,DataKdSheetApp[]>,
//     atpMapperWithSource:Map<number, {
//                             tagihanMapper:Map<number,{countSoal:number, tagihan:TagihanHasDataResponse, data:DataKdSheetApp}>
//                     }>

//    }>();

   public siswaHaDetailNilaiRespon:MapperSiswaOnDataResponType = new Map()
   
   /**
    * strutkturKurikulum non-mapper
    */
   public strukturKurikulumWithSlot:StrukturKurikulumMapelWithSlotType[]=[]


    constructor(
        private readonly source:TagihanHasDataResponse[],
        private readonly mapelRombel:jp_mapelApp[]
    ){
        
    }

    build():this{

        /**
         * pada kasus bankSoal yang memiliki `atp_id` = 0 atau `snapshot_kurikulum` bernilai `undefined`, maka
         * data untuk atp-nya adalah `atpUndefined`;
         */
        const atpUndefined = AtpAsOrmUndefined.build();

        for(const tagihan of this.source){
            const {tipe_assesmen, peserta, bank_soal_collections, data_response_bySiswa, dataSkorKdSheet} = tagihan;
            const dataTagihanAssesmen = dtoTagihanAssesmenTypeFromTagihanHasDataRespon.fromTagihanHasDataResponse(tagihan);
            
            /** build mapper `kategoriAssesmenHasTagihan` */
            const type = tipe_assesmen;
            const currentType = getOrCreateMap(this.kategoriAssesmenHasTagihan, type,()=>({
                dataPublikasiPaket:[],
                dataPublikasiPaketWithRespon:[]
            }));
            currentType.dataPublikasiPaket.push(dataTagihanAssesmen);;
            currentType.dataPublikasiPaketWithRespon.push(tagihan)



            /**
             * Build mapper from `bank_soal_collections`
             * ----------------------------------
             */
            for(const soal of bank_soal_collections){
                const {idbaris, kd_id, snapshot_kurikulum, jawaban} = soal;
                const kurikulum = snapshot_kurikulum ?? atpUndefined;
                
                /** build `atpBelongsToManyTagihanHasDataResponse` */
                const atpSoal = getOrCreateMap(this.atpBelongsToManyTagihanHasDataResponse, kd_id, ()=>([]));
                if(atpSoal.some(s=>s.idbaris !== tagihan.idbaris)){
                    atpSoal.push(tagihan);
                }

                /** build mapper `atpHasBankSoal`  */
                getOrCreateMap(this.atpHasBankSoal, kd_id, ()=>([])).push(soal);

                /** build mapper `atpHasTagihanWithBankSoal` */
               const tagihanAtp = getOrCreateMap(this.atpHasTagihanWithBankSoal, kd_id, ()=>new Map())
               getOrCreateMap(tagihanAtp, tagihan.idbaris, ()=>([])).push(soal);

               /** build struktur kurikulum */
               this.buildStrukturKurikulum(kurikulum)

               

              
            }

            /**
             * Build mapper from peserta
             */
            for(const siswa of peserta){
                const {id, pd_nama, nama_rombel} = siswa;
                const currentSiswaHasTagihan = getOrCreateMap(this.siswaAsPesertaHasTagihan, id, ()=>({
                    siswa_id: id, 
                    nama_siswa: pd_nama,
                    rombel: nama_rombel,
                    dataTagihan: []
                }));
                currentSiswaHasTagihan.dataTagihan.push(tagihan)
            }

            /** build from responsBy_siswa */
            for(const responden of data_response_bySiswa){
                const {siswa, data} = responden;
                const lastData = data.at(-1);
                
                const currentSiswa: mapperDetailNilaiResponType = getOrCreateMap(this.siswaAsRespondenHasResponTagihan, siswa.id, ()=>({
                    siswa,
                    dataResponseMapel: new Map() as MapperDataResponseMapel,
                    dataResponse: new Map() as MapperDataResponseAtp,
                    dataResponseTp: new Map() as MapperDataResponseTp,
                    dataResponseCp: new Map() as MapperDataResponseCp,
                    hasDetailNilaiRespon: new Map()
                }));
                if(lastData){
                    const {respon, sumber_respon, idbaris,templateKoreksiSiswa,siswa_id, siswa, publikasi, publikasi_id} = lastData;
                    const currentSiswaHasDetailNilai = getOrCreateMap(currentSiswa.hasDetailNilaiRespon, siswa_id, ()=>({
                        siswa,
                        responAtpMapper: new Map() as ResponAtpMapperType
                    }));
                    
                    for(const responjawaban of respon){
                        const {respon:jawabanSiswa, skor, atp, atp_soal} = responjawaban;
                        this.setMapperMapel(currentSiswa.dataResponseMapel, tagihan, responjawaban);
                        this.setMapperAtp(currentSiswa.dataResponse, tagihan, responjawaban);
                        this.setMapperTp(currentSiswa.dataResponseTp, tagihan, responjawaban);
                        this.setMapperCp(currentSiswa.dataResponseCp, tagihan, responjawaban);

                        const currentSiswaHasDetailNilaiInThisAtp = getOrCreateMap(currentSiswaHasDetailNilai.responAtpMapper, atp, ()=>({
                            ref:[],
                            rispon:[]
                        }));

                        const existRef = currentSiswaHasDetailNilaiInThisAtp.ref;
                       
                        if(!existRef.some(s=>s.idbaris === idbaris)){
                            currentSiswaHasDetailNilaiInThisAtp.ref.push(lastData)
                        }
                        currentSiswaHasDetailNilaiInThisAtp.rispon.push(responjawaban);

                    }
                }
            }

            /** build from dataSheetKd */
            for(const sheetKd of dataSkorKdSheet){
                const {siswa_id, nama_siswa, rombel, data, idbaris} = sheetKd;
                const currentSiswaSheetKd = getOrCreateMap(this.siswaHasSheetKd, siswa_id, ()=>({
                        siswa_id,
                        nama_siswa,
                        rombel,
                        data,
                        idbaris,
                        atpMapper: new Map<number, DataKdSheetApp[] >(),
                        atpMapperWithSource: new Map()// new Map<number, {tagihanMapper:DataKdSheetAppWithCountSoalTagihan}>()
                }))
                for(const item of data){
                    const {publikasi_id, kategoriAssesmen, kodeMapelKey, skor, skorKdKey, atp_id}= item;
                    const soalCurrentAtp = bank_soal_collections.filter(s=>s.kd_id === atp_id);
                    getOrCreateMap(currentSiswaSheetKd.atpMapper, item.atp_id, ()=>([])).push(item);
                    const atpSource = getOrCreateMap(currentSiswaSheetKd.atpMapperWithSource, atp_id , ()=>({
                        tagihanMapper: new Map<number,DataKdSheetAppWithCountSoalTagihan>()
                    }));
                    if(publikasi_id === tagihan.idbaris){
                        getOrCreateMap(atpSource.tagihanMapper, publikasi_id, ()=>({
                            countSoal:soalCurrentAtp,
                            tagihan: tagihan,
                            data: item
                        }))
                    }

                }

            }
        }

        
       this.strukturKurikulumWithSlot = StrukturKurikulumInKoleksiAtpAsOrmBuilder.buildWithSlotFromMapper(this.strukturKurikulum);

        return this;
    }

    buildStrukturKurikulum(kurikulum:AtpAsOrm){
        const {
            mapelname, 
            kodemapel, 
            atp_as_tp_id, 
            atp_as_tp_description, 
            tp_as_cp_id,
            tp_as_cp_description ,
            cp_description,
            cp_id} = kurikulum;

        const strukturMapel = getOrCreateMap(this.strukturKurikulum, kodemapel, ()=>({
                    kodeMapel: kodemapel??'',
                    mapelName: mapelname??'',
                    dataCpMapper: new Map() as StrukturKurikulumCpMapperType
                }));
                
        const strukturCp = getOrCreateMap(strukturMapel.dataCpMapper, cp_id, ()=>({
            cp_id,
            cp_description,
            dataTpMapper: new Map() as StrukturKurikulumTpMapperType
        }));
        
        const strukturTp = getOrCreateMap(strukturCp.dataTpMapper, tp_as_cp_id, ()=>({
            tp_id: tp_as_cp_id,
            tp_description: tp_as_cp_description,
            dataAtpMapper: new Map()
        }));

        getOrCreateMap(strukturTp.dataAtpMapper, atp_as_tp_id, ()=>({
            atp_id:atp_as_tp_id,
            atp_description: atp_as_tp_description
        }))
    }
    
    setMapperAtp(mapperDataRespon:MapperDataResponseAtp, tagihan:TagihanHasDataResponse, responNilai:RisponsePenilaianSiswa):void{
        const { 
                atp_as_tp_id: atp_id, atp_as_tp_description:atp_description,
                tp_as_cp_id, tp_as_cp_description,
                cp_description, cp_id,
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
                kodemapel, mapelname,
                atp_as_tp_id: atp_id, atp_as_tp_description:atp_description,
                tp_as_cp_id, tp_as_cp_description,
                cp_description, cp_id,
                } =responNilai.atp_soal!;
        const currentAtp = getOrCreateMap(mapperDataRespon, kodemapel
            , ()=>({
            kodeMapel: kodemapel!,
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
                tp_as_cp_id, tp_as_cp_description,
                cp_description, cp_id,
                } =responNilai.atp_soal!;
        const currentTp = getOrCreateMap(mapperDataRespon, tp_as_cp_id, ()=>({
            tp: {tp_id: tp_as_cp_id!, tp_description: tp_as_cp_description!},
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
                tp_as_cp_id, tp_as_cp_description,
                cp_description, cp_id,
                } =responNilai.atp_soal!;
        const currentTp = getOrCreateMap(mapperDataRespon, cp_id, ()=>({
            cp: {cp_description:cp_description!, cp_id:cp_id!},
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
        
}