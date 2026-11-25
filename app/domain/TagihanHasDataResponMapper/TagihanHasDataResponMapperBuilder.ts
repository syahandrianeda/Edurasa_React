import type { jp_mapelApp } from "~/types/mapel/jp_mapel";
import type { TagihanHasDataResponse } from "../penilaian/type/tagihan-assesmen-type";
import getOrCreateMap from "~/lib/getOrCreateMapper";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { AtpContainKoleksiBankSoalMapperType } from "../atp-mapper/AtpContainKoleksiBankSoalType";
import AtpAsOrmUndefined from "../kurikulum/atpAsOrm-undefined";
import type { KategoriAssesmenInPublikasiMapperType } from "../penilaian/struktur-tagihan-respon/types/KategoriAssesmenInPublikasiMapperType";
import dtoTagihanAssesmenTypeFromTagihanHasDataRespon from "../penilaian/struktur-tagihan-respon/infrastructure/dtoTagihanAssesmenTypeFromTagihanHasDataRespon";
import type { StrukturKurikulumCpMapperType, StrukturKurikulumMapelMapperType, StrukturKurikulumMapelWithSlotType, StrukturKurikulumTpMapperType } from "../trees-struktur-kurikulum/struktur-kurikulum-type";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import StrukturKurikulumInKoleksiAtpAsOrmBuilder from "../struktur-kurikulum/from-atp-as-orm/StrukturKurikulumInKoleksiAtpAsOrmBuilder";
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";
import type { MapperDataResponseAtp, MapperDataResponseCp, MapperDataResponseMapel, MapperDataResponseTp, mapperDetailNilaiResponType, mapperSiswaWithDetailNilaiResponAppType } from "../raport/infrastructures/sumber-nilai/mapperSiswaWithDetailNilaiResponAppType";
import type { DataKdSheetApp } from "~/types/penilaian/DataKdSheetAppType";
import type { MapperSiswaOnDataResponType, ResponAtpMapperType } from "../respon-tagihan-jenjang/mapper/MapperSiswaOnDataResponBuilder";
import type { DataKdSheetAppWithCountSoalTagihan, MapperSiswaWithDetailNilaiSheetKdAppType } from "./MapperSiswaWithDetailNilaiSheetKdAppType";
import type { AtpMapperBelongsToManyTagihanHasDataResponseType } from "../atp-mapper/AtpMapperBelongsToManyTagihanHasDataResponseType";
import type { DataTipeAssesmenMapper } from "../penilaian/type/collection-kurikulum-in-all-publikasi/StrukturKurikulumMapper";
import type { DetailPublikasiWithResponSiswaType } from "../penilaian/type/collection-kurikulum-in-all-publikasi/DetailPublikasiWithResponSiswaType";
import type { DataSkorSiswaByInstrumenType } from "../penilaian/type/collection-kurikulum-in-all-publikasi/DataSkorSiswaByInstrumenType";
import type { RefrensiTabResponTagihanJenjangType } from "../penilaian/type/collection-kurikulum-in-all-publikasi/RefrensiTabResponTagihanJenjangType";
import type { DataRefrensiPerBentukSoal } from "../penilaian/type/collection-kurikulum-in-all-publikasi/DataRefrensiPerBentukSoal";
import type { DataSoalNaskah } from "../penilaian/type/collection-kurikulum-in-all-publikasi/DataSoalNaskah";
import { ListBentukSoal } from "../bank-soal/list-bentuk-soal";
import type { KategoriTagihanType } from "../kategori-tagihan/types/entities/KategoriTagihanType";
import {type SiswaType } from "~/types/siswa";
import type { StrukturAtpType } from "../trees-struktur-kurikulum";
import type { DataBentukSoalWithScore, PrediksiNoSoal } from "../penilaian/model/grouping-kurikulum-by-bentuksoal";
import type { DataMapperSiswaHasAtpContainSourceInstrumen, MapperSiswaHasAtpContainSourceInstrumen, MapperSiswaHasInstrumenSoalWithSkor, MapperSiswaHasSourceAtpInstrumen, TagihanInstrumenSoalCurrentAtp } from "./MapperSiswaHasInstrumenWithSkor";
import Decimal from "node_modules/decimal.js/decimal";

export type AtpBankSoalBelongsToTagihanHasDataResponseType = Map<
                                                    number, // atp_id
                                                    Map<
                                                        number, // tagihan_id
                                                        BankSoalAppType[]>>;
type SiswaAsPesertaHasTagihanType = {
    siswa_id:number, 
    nama_siswa: string, 
    rombel: string, 
    dataTagihan:TagihanHasDataResponse[]
};


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
     * class yang sejenis: AtpWithBankSoal
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
    /** export type DataTipeAssesmenMapper= Map<KategoriTagihanType, DetailPublikasiWithResponSiswaType[]> */
    public kategoriAssesmenWithDetailPublikasiWithResponSiswaType :DataTipeAssesmenMapper = new Map();

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
   /**
    * mapelMapperContainTagihan
    */
   public mapelMapperWithTagihanHasDataResponse = new Map<string, TagihanHasDataResponse[]>()

   public siswaHasSheetKd:MapperSiswaWithDetailNilaiSheetKdAppType = new Map()

   public siswaHaDetailNilaiRespon:MapperSiswaOnDataResponType = new Map()
   
   /**
    * strutkturKurikulum non-mapper
    */
   public strukturKurikulumWithSlot:StrukturKurikulumMapelWithSlotType[]=[];
   
   public SiswaHasInstrumenWithSkor:MapperSiswaHasInstrumenSoalWithSkor = new Map()

    constructor(
        private readonly source:TagihanHasDataResponse[],
        private readonly mapelRombel:jp_mapelApp[],
        private readonly kategoriAssesmenPattern:KategoriTagihanType[]
    ){
        
    }

    get ListMapelRaport():jp_mapelApp[]{
        return this.mapelRombel
    }
    build():this{

        /**
         * pada kasus bankSoal yang memiliki `atp_id` = 0 atau `snapshot_kurikulum` bernilai `undefined`, maka
         * data untuk atp-nya adalah `atpUndefined`;
         */
        const atpUndefined = AtpAsOrmUndefined.build();
        
        /** kategoriAssesmen is a pattern tagihan whose implemented */
        for(const tagihanType of this.kategoriAssesmenPattern){
            getOrCreateMap(this.kategoriAssesmenWithDetailPublikasiWithResponSiswaType, tagihanType, ()=>([]));
        }

        for(const tagihan of this.source){
            const {tipe_assesmen, peserta, bank_soal_collections, data_response_bySiswa, dataSkorKdSheet, sebaranNoSoalFromPropertyKurikulumWithScore} = tagihan;
            const dataTagihanAssesmen = dtoTagihanAssesmenTypeFromTagihanHasDataRespon.fromTagihanHasDataResponse(tagihan);
            
            /** build mapper `kategoriAssesmenHasTagihan` */
            const type = tipe_assesmen;

            const currentType = getOrCreateMap(this.kategoriAssesmenHasTagihan, type,()=>({
                dataPublikasiPaket:[],
                dataPublikasiPaketWithRespon:[]
            }));
            currentType.dataPublikasiPaket.push(dataTagihanAssesmen);;
            currentType.dataPublikasiPaketWithRespon.push(tagihan);

            const currentAssesmenDetail = this.kategoriAssesmenWithDetailPublikasiWithResponSiswaType.get(type) ;//getOrCreateMap(this.kategoriAssesmenWithDetailPublikasiWithResponSiswaType, type, ()=>([]));

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
                currentSiswaHasTagihan.dataTagihan.push(tagihan);

                /**  
                 * build `this.SiswaHasInstrumenWithSkor` 
                 * 
                */
                const currentSiswaHasInstrumen = getOrCreateMap(this.SiswaHasInstrumenWithSkor, siswa.id, ()=>({
                    siswa,
                    tagihanMapper: new Map() as MapperSiswaHasSourceAtpInstrumen,
                    /** atpMapperTagihanWithInsrumen diinisasi, lalu diisi setelahnya */
                    atpMapperTagihanWithInstrumen: new Map() as MapperSiswaHasAtpContainSourceInstrumen
                   
                }))
                getOrCreateMap(currentSiswaHasInstrumen.tagihanMapper, tagihan.idbaris, ()=>({
                    tagihan,
                    atpMapperWithInstrumen:new Map<number, {atp:StrukturAtpType, dataInstrumen:DataBentukSoalWithScore[]}>(),
                    sourceRespon: new Map<number, {refrence:RisponsePenilaianSiswa[]}>(), 
                    sourceSheetKd: new Map<number, {refrence:DataKdSheetApp[]}>(),
                

                }));
                // getOrCreateMap(currentSiswaHasInstrumen.atpMapperTagihanWithInstrumen, tagihan.idbaris, ()=>new Map())
            }

            /** inisasi sementara untuk ATP di tagihan ini */
            const MapperLokalAtpCurrentTagihan= new Map<number, StrukturAtpType>();

            /**
             * Build mapper from `bank_soal_collections`
             * ----------------------------------
             */
            for(const soal of bank_soal_collections){
                const {idbaris, kd_id, snapshot_kurikulum, kode_mapel, jawaban} = soal;
                const kurikulum = snapshot_kurikulum ?? atpUndefined;
                
                /**
                 * mapperMapelContainTagihan
                 */
                const currentMapel = getOrCreateMap(this.mapelMapperWithTagihanHasDataResponse, snapshot_kurikulum?.kodemapel, ()=>([]));
                if(!currentMapel.some(s=>s.idbaris === tagihan.idbaris)){
                    currentMapel.push(tagihan)

                }
                
                /** build `atpBelongsToManyTagihanHasDataResponse` */
                const atpSoal = getOrCreateMap(this.atpBelongsToManyTagihanHasDataResponse, kd_id, ()=>([]));
                if(atpSoal && atpSoal.some(s=>s.idbaris !== tagihan.idbaris)){
                    atpSoal.push(tagihan);
                }

                /** build mapper `atpHasBankSoal`  */
                getOrCreateMap(this.atpHasBankSoal, kd_id, ()=>([])).push(soal);
                /**
                 * AtpWithBankSoal
                 */

                /** build mapper `atpHasTagihanWithBankSoal` */
               const tagihanAtp = getOrCreateMap(this.atpHasTagihanWithBankSoal, kd_id, ()=>new Map())
               getOrCreateMap(tagihanAtp, tagihan.idbaris, ()=>([])).push(soal);

               /** build struktur kurikulum */
               this.buildStrukturKurikulum(kurikulum)
               
               /** buildAtpLokal */
               getOrCreateMap(MapperLokalAtpCurrentTagihan, kd_id, ()=>({
                atp_id: snapshot_kurikulum?.atp_as_tp_id,
                atp_description: snapshot_kurikulum?.atp_as_tp_description
               }))
                
              
            }

            /** 
             * memasangkan mapper pada `this.SiswaHasInsrumenWithSkor` pada property:
             * - atpMappertagihanWithIsnrumen;
             * ---------
             * `this.SiswaHasInstrumenWithSkor` sudah menginisisasi property berikut ketika me-loopinng `peserta`;
             * - siswa, <-- sudah dilakukan
             * - tagihan <-- sudah dilakukan
             * -atpMapperTagihanWithInstrumen; <-- dikerjakan di sini
             * 
            */

            for(const [siswId, SiswaAndInstrumen] of this.SiswaHasInstrumenWithSkor.entries()){
                const currentSiswaHasInstrumen = SiswaAndInstrumen.atpMapperTagihanWithInstrumen;
                for(const [atp_id, strukturAtp] of MapperLokalAtpCurrentTagihan.entries()){
                    const currentAtpMapperHasInstrumen = getOrCreateMap(currentSiswaHasInstrumen, atp_id, ()=>({
                        atp: strukturAtp,//{atp_id:atp_as_tp_id, atp_description: atp_as_tp_description},
                        tagihan:[], //<--dilakukan di baris 262
                        sourceRespon:[], //<--dilakukan di baris 329
                        instrumenSoal:[], //<--dilakukan di baris 366

                        sourceSheetKd:[],  //<-- dikerjakan dibaris 449
                        instrumenSoalSheet:[]
                    }) );

                    const currentTagihanByAtp = currentAtpMapperHasInstrumen.tagihan;
                    /** memastikan tidak ada data `tagihan (TaghihanHasDataResponse)` ganda/duplikat 
                     * Jika sudah diinput pada tagihan, maka ga usah diinput lagi.
                    */
                    if(!currentTagihanByAtp.some(m=>m.idbaris === tagihan.idbaris)){
                        currentAtpMapperHasInstrumen.tagihan.push(tagihan);
                    }

                    
                }

            }
            

            
            // /** Helper MapperInstruemSoal yang dijawab oleh siswa */
            const mapperHelperSiswaHasSkorRespon = new Map<number, {siswa:SiswaType, atpHasDataBentukSoalWithScore:Map<number, {dataBentukSoalRespon:DataBentukSoalWithScore[]}>}>();
            // /** build from responsBy_siswa */
            for(const responden of data_response_bySiswa){
                const {siswa, data} = responden;
                const lastData = data.at(-1);
                // const currentSiswaMapperHelperSisswaHasInstrumenSoalCurrentTagihan = getOrCreateMap(MapperHelperSisswaHasInstrumenSoalCurrentTagihan, siswa.id, ()=>({
                //     siswa,
                //     atpMapperHelper: new Map<number, {atp:StrukturAtpType, dataInsrumen:TagihanInstrumenSoalCurrentAtp[]}>()
                // }))
                const currentSiswa: mapperDetailNilaiResponType = getOrCreateMap(this.siswaAsRespondenHasResponTagihan, siswa.id, ()=>({
                    siswa,
                    dataResponseMapel: new Map() as MapperDataResponseMapel,
                    dataResponse: new Map() as MapperDataResponseAtp,
                    dataResponseTp: new Map() as MapperDataResponseTp,
                    dataResponseCp: new Map() as MapperDataResponseCp,
                    hasDetailNilaiRespon: new Map()
                }));
                const currentSiswwaHelperHasRespon = getOrCreateMap( mapperHelperSiswaHasSkorRespon , siswa.id, ()=>({
                    siswa,
                    atpHasDataBentukSoalWithScore:new Map<number, {dataBentukSoalRespon:DataBentukSoalWithScore[]}>()
                }))

                const currentSiswaHasInstrumen = this.SiswaHasInstrumenWithSkor.get(siswa.id);
            
                const  mapperCurrentResponInSiswaHasInstrumen = currentSiswaHasInstrumen?.tagihanMapper.get(tagihan.idbaris)
                

                if(lastData){
                    const {respon, sumber_respon, idbaris,templateKoreksiSiswa,siswa_id, skorKdSebaran, siswa, publikasi, publikasi_id} = lastData;
                    const currentSiswaHasDetailNilai = getOrCreateMap(currentSiswa.hasDetailNilaiRespon, siswa_id, ()=>({
                        siswa,
                        responAtpMapper: new Map() as ResponAtpMapperType
                    }));

                    
                    for(const responjawaban of respon){
                        const {respon:jawabanSiswa, skor, atp, atp_soal, soal, no_prefix} = responjawaban;
                        const {atp_as_tp_id, atp_as_tp_description} = atp_soal!;
                        // getOrCreateMap(currentSiswaMapperHelperSisswaHasInstrumenSoalCurrentTagihan.atpMapperHelper, atp, ()=>({
                        //     atp:{atp_id: atp_as_tp_id, atp_description:atp_as_tp_description},
                        //     dataInsrumen:[]
                        // }))

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

                        if(currentSiswaHasInstrumen && mapperCurrentResponInSiswaHasInstrumen){
                            const data = getOrCreateMap(mapperCurrentResponInSiswaHasInstrumen.sourceRespon, atp, ()=>({
                                refrence: []
                            }));
                            data.refrence.push(responjawaban);
                            
                            const atpMapperTagihanInstrumen_sourceReson:DataMapperSiswaHasAtpContainSourceInstrumen|undefined= currentSiswaHasInstrumen.atpMapperTagihanWithInstrumen.get(atp);

                            if(atpMapperTagihanInstrumen_sourceReson){
                                atpMapperTagihanInstrumen_sourceReson.sourceRespon.push(responjawaban);
                            }
                        }
                        

                        
                    }

                    
                    
                    const koleksiDataAtpInSebaran = skorKdSebaran.data.flatMap(m=>m.dataCp.flatMap(n=>n.dataTp.flatMap(o=>o.dataAtp.map(p=>{
                        
                        return {
                            ...p,
                            source:sumber_respon
                        }
                    }))));
                    
                    for(const dataAtpMap of koleksiDataAtpInSebaran){
                        
                        const {dataBentukSoal,atp_id, atp_description, jumlahSoalDinilai} = dataAtpMap;
                        const currentDataBentukSoalRespon = getOrCreateMap(currentSiswwaHelperHasRespon.atpHasDataBentukSoalWithScore, atp_id, ()=>({
                            dataBentukSoalRespon:[]
                        }));
                        currentDataBentukSoalRespon.dataBentukSoalRespon.push(...dataBentukSoal)
                        
                        getOrCreateMap(mapperCurrentResponInSiswaHasInstrumen?.atpMapperWithInstrumen!, atp_id, ()=>({
                                atp:{atp_id, atp_description,}, 
                                dataInstrumen:dataBentukSoal
                            }));
                        
                        // currentSiswaHasInstrumen?.atpMapperTagihanWithInstrumen.get(atp_id)?.instrumenSoal.push({
                        //     tagihan,
                        //     soalSkor: dataBentukSoal,
                        //     koleksiSkor: dataBentukSoal.flatMap(m=>m.data.map(n=>n.skor))
                            
                        // });
                        
                        // currentSiswaMapperHelperSisswaHasInstrumenSoalCurrentTagihan.atpMapperHelper.get(atp_id)?.dataInsrumen.push({
                        //     tagihan,
                        //     soalSkor: dataBentukSoal,
                        // })
                        
                        
                    }

                }

            }

            /** 
             * build from dataSheetKd 
             * 
             * dataSkorKdSheet exist if user do correcting/importing skorKd, unless do it, this data never exist;
            */
           /** Helper MapperInstruemSoal yang dijawab oleh siswa */
            const MapperHelperSisswaHasInstrumenSoalSheetCurrentTagihan = new Map<number, { atpMapperHelper:Map<number, { dataSheetKd:DataKdSheetApp[]}>}>();
            
            /** build from responsBy_siswa */
            
            for(const sheetKd of dataSkorKdSheet){
                const {siswa_id, nama_siswa, rombel, data, idbaris} = sheetKd;
                /** avoid current siswa_id as not peserta */
                const currentSIsswaHelperLokal = getOrCreateMap(MapperHelperSisswaHasInstrumenSoalSheetCurrentTagihan, siswa_id, ()=>({
                    
                    atpMapperHelper:new Map<number, {dataSheetKd:DataKdSheetApp[]}>()
                }) )

                const currentSiswaSheetKd = getOrCreateMap(this.siswaHasSheetKd, siswa_id, ()=>({
                        siswa_id,
                        nama_siswa,
                        rombel,
                        data,
                        idbaris,
                        atpMapper: new Map<number, DataKdSheetApp[] >(),
                        atpMapperWithSource: new Map()// new Map<number, {tagihanMapper:DataKdSheetAppWithCountSoalTagihan}>()
                }));

                 const currentSiswaHasInstrumen = this.SiswaHasInstrumenWithSkor.get(siswa_id);
                 const  mapperCurrentResponInSiswaHasInstrumen = currentSiswaHasInstrumen?.tagihanMapper.get(tagihan.idbaris)?.sourceSheetKd
                
                for(const item of data){
                    const {publikasi_id, kategoriAssesmen,  kodeMapelKey, skor, skorKdKey, atp_id}= item;
                    /**
                     * kategoriAssesmen sometime dismatching from data in SheetKd and tagihan, 
                     * so, avoid if kategoriAssesmen dismatching
                     */
                    if(tagihan.tipe_assesmen !== kategoriAssesmen) continue;

                    getOrCreateMap(currentSiswaSheetKd.atpMapper, item.atp_id, ()=>([])).push(item);
                    
                    const atpSource = getOrCreateMap(currentSiswaSheetKd.atpMapperWithSource, atp_id , ()=>({
                        tagihanMapper: new Map<number,DataKdSheetAppWithCountSoalTagihan>()
                    }));

                    /** bank_soal_collections were collections instrumen on this `tagihan`, not all tagihan 
                     * so, this indicated count instrumen for this atp's id.
                    */
                    // const soalCurrentAtp = bank_soal_collections.filter(s=>s.kd_id === atp_id);
                    const soalCurrentAtp = sebaranNoSoalFromPropertyKurikulumWithScore.data.flatMap(m=>m.dataCp.flatMap(n=>n.dataTp.flatMap(o=>o.dataAtp.flatMap(p=>p.dataBentukSoal.flatMap(q=>q.data)))))
                    const atpSourceTagihan = getOrCreateMap(atpSource.tagihanMapper, tagihan.idbaris, ()=>({
                        // countSoal:soalCurrentAtp,
                        tagihan:tagihan,
                        data:[]
                    }as DataKdSheetAppWithCountSoalTagihan ));
                    
                    atpSourceTagihan.data.push({
                        countSoal: soalCurrentAtp,
                        data: item
                    });


                    /**
                     * 
                     */
                    const atpMapperInCurrentSiswaHasInstrumen = currentSiswaHasInstrumen?.atpMapperTagihanWithInstrumen.get(atp_id);
                    atpMapperInCurrentSiswaHasInstrumen?.sourceSheetKd.push(item);
                    
                    // const soalSkorSheetGroup= groupBy(soalCurrentAtp,(m)=>m.bentuk_soal);
                    // const soalSkorSheet = Object.fromEntries(Object.entries(soalSkorSheetGroup).map(([bentuksoal, soal])=>([bentuksoal, soal])))
                    
                    // atpMapperInCurrentSiswaHasInstrumen?.instrumenSoalSheet.push({
                    //     tagihan,
                    //     soalSkor:soalSkorSheet
                    // })
                    

                    if(mapperCurrentResponInSiswaHasInstrumen){
                        const dataRefrence = getOrCreateMap(mapperCurrentResponInSiswaHasInstrumen, atp_id, ()=>({
                            refrence:[]
                        }));
                        dataRefrence.refrence.push(item);
                    }

                    const dataInstrumenSheetLokal = getOrCreateMap(currentSIsswaHelperLokal.atpMapperHelper, atp_id, ()=>({
                        dataSheetKd:[]
                    }));
                    dataInstrumenSheetLokal.dataSheetKd.push(item)

                    
                    

                }
            }

            /** build from sebaran */
            const MapperHelperAtpContainDataInstrumen = new Map<number, {atp:StrukturAtpType, dataInsrumen:TagihanInstrumenSoalCurrentAtp[]}>();
            for(const sebaran of sebaranNoSoalFromPropertyKurikulumWithScore.data){
                const {kodeMapel, objekSkorKd, mapelName, skor, dataCp, jumlahSoalDinilai, total, slotRow} = sebaran;
                
                for(const cpLevel of dataCp){
                    const {cp_id, cp_description} = cpLevel;
                
                    for(const tpLevel of cpLevel.dataTp){
                        const {tp_id, tp_description} = tpLevel;
                
                        for(const atpLevel of tpLevel.dataAtp){
                                const {atp_id, atp_description, jumlahSoalDinilai, skor, total, dataBentukSoal} = atpLevel;
                                
                                const dataResponSiswa:DataSkorSiswaByInstrumenType[]= data_response_bySiswa.filter(s=>s.data.length> 0).map(mr=>{
                                    const {siswa, data} = mr;
                                    const lastDataSkor = data.at(-1);
                                    const key= kodeMapel+'_'+atp_id;
                                    
                                    const dataSumberPublikasiPaket=dtoTagihanAssesmenTypeFromTagihanHasDataRespon.fromTagihanHasDataResponse(tagihan);//currentTagihan;
                                    if(lastDataSkor){
                                        
                                        const dataRefrensiTabResponTagihanJenjang:RefrensiTabResponTagihanJenjangType[] = lastDataSkor.skorKdSebaran.data.flatMap(m=>m.dataCp.flatMap(cp=>cp.dataTp.flatMap(tp=>tp.dataAtp))).filter(s=>s.atp_id === atp_id).map(atp=>{
                                            return  atp.dataBentukSoal.map(m=>{
                                                return m.data.map(sk=>{
                                                    const responJawaban = lastDataSkor.respon.find(s=>s.atp === sk.kd_id && s.no_prefix === sk.no_soal && s.bentuk_soal === sk.bentuk_soal)
                                                    return {
                                                        responId: lastDataSkor.idbaris,
                                                        skor: sk.skor,
                                                        noSoal: sk.no_soal,
                                                        atp_id: sk.kd_id,
                                                        responJawaban: responJawaban?.respon ?? '',
                                                        bentukSoal: responJawaban?.bentuk_soal!,
                                                        kunciJawabanPg:responJawaban?.bentuk_soal! === 'pg'? sk.jawaban.join(''):'',
                                                        dataPublikasi:lastDataSkor.publikasi
                                                    }
                                                })
                                            })
                                            
                                            }).flat(2);
                                        
                                        const dataPerBentukSoal:DataRefrensiPerBentukSoal[] = dataBentukSoal.map(m=>{
                                                        
                                                        const data:RefrensiTabResponTagihanJenjangType[]= dataRefrensiTabResponTagihanJenjang.filter(s=>s.bentukSoal === m.bentukSoal)
                                                        return {
                                                            bentukSoal: m.bentukSoal,
                                                            data
                                                        }
                                                    });
                                        const countSoal = dataRefrensiTabResponTagihanJenjang.length;
                                        const total = dataRefrensiTabResponTagihanJenjang.length === 0? 0 : dataRefrensiTabResponTagihanJenjang.map(m=>Number(m.skor)).reduce((a,b)=>Number(a)+ Number(b));
                                        
                                        const skor = Number((total/countSoal).toFixed(2));
                                        const skorKd ={[key]: skor}
                                        return {
                                            siswa_id: siswa.id,
                                            namaSiswa:siswa.pd_nama,
                                            rombel:siswa.nama_rombel,
                                            total,
                                            dataRefrensiTabResponTagihanJenjang,
                                            dataSumberPublikasiPaket,
                                            dataPerBentukSoal,
                                            countSoal,
                                            skor,
                                            skorKd
                                        }

                                    }
                                    return {
                                            siswa_id: siswa.id,
                                            namaSiswa:siswa.pd_nama,
                                            rombel:siswa.nama_rombel,
                                            total: 0,
                                            dataRefrensiTabResponTagihanJenjang:[],
                                            dataSumberPublikasiPaket,
                                            dataPerBentukSoal:[],
                                            countSoal: 0,
                                            skor:0,
                                            skorKd: {[key]:0}
                                        }
                                })                
                                
                                const dataSoalNaskah:DataSoalNaskah[]  = dataBentukSoal.map(bs=>{
                                    const bentukSoal = ListBentukSoal.find(s=>s.name === bs.bentukSoal)!;
                                    const koleksiNoSoal = bs.data.map(noSoal=>noSoal.no_soal);
                                    const koleksiJawaban = bs.data.map(jwbn=>jwbn.bentuk_soal === 'pg'?jwbn.jawaban.join(''):'')
                                    return {
                                        bentukSoal,
                                        koleksiNoSoal,
                                        koleksiJawaban
                                    }
                                })
                                                    
                                const DetailPublikasiWithResponSiswa: DetailPublikasiWithResponSiswaType ={
                                        kodeMapel,
                                        mapelName,
                                        cp_id,
                                        cp_description,
                                        tp_id,
                                        tp_description,
                                        atp_id,
                                        atp_description,
                                        
                                        idbaris: tagihan.idbaris,
                                        namaPublikasi: tagihan.nama_publikasi,
                                        counstInstrumen: jumlahSoalDinilai,
                                        // dataResponSiswa: DataSkorSiswaByInstrumenType[],
                                        dataResponSiswa,
                                        dataSumberPublikasiPaket:[],
                                        
                                        dataSoalNaskah,
                                        mapelNaskah: tagihan.koleksi_mapelName.join(', '),
                                        koleksiMapel: tagihan.koleksi_mapelName,
                                        countResponByPublikasi: dataResponSiswa.length
                                    }

                                if(currentAssesmenDetail){
                                    currentAssesmenDetail.push(DetailPublikasiWithResponSiswa)
                                }

                                const dataIsnttrumenHelper = getOrCreateMap(MapperHelperAtpContainDataInstrumen, atp_id, ()=>({
                                    atp:{atp_id, atp_description},
                                    dataInsrumen:[]
                                }));
                                dataIsnttrumenHelper.dataInsrumen.push({
                                    tagihan,
                                    soalSkor:dataBentukSoal,
                                    koleksiSkor: dataBentukSoal.flatMap(m=>m.data.map(n=> n.skor))
                                })
                                
                    
                            
                            }
                        }
                    }



            }
            
            for(const [siswaId, SiswaAndInstrumen] of this.SiswaHasInstrumenWithSkor.entries()){
                const result = SiswaAndInstrumen.atpMapperTagihanWithInstrumen;
                const soureSiswaSheetKd = MapperHelperSisswaHasInstrumenSoalSheetCurrentTagihan.get(siswaId)?.atpMapperHelper
                const currentSiswaHasRespon = mapperHelperSiswaHasSkorRespon.get(siswaId)
                

                for(const [atp_id, strukturAtp] of MapperLokalAtpCurrentTagihan.entries()){
                    const currentResultAtp = result.get(atp_id);
                    const strukturSoal = MapperHelperAtpContainDataInstrumen.get(atp_id)?.dataInsrumen ?? [];
                    const currentAtpCurrentSiswaHasInstrumen = soureSiswaSheetKd?.get(atp_id)?.dataSheetKd ?? [];
                    const currentStrukturHasRespon = currentSiswaHasRespon?.atpHasDataBentukSoalWithScore.get(atp_id)?.dataBentukSoalRespon

                    for(const struktur of strukturSoal){
                        const {koleksiSkor:sourceKoleksiSkor, soalSkor:soalSkorStrukturLoop, tagihan} = struktur;
                        const soalSkorStruktur = currentStrukturHasRespon ?? soalSkorStrukturLoop;
                        const koleksiSkor:(number|null)[] = [];//soalSkorStruktur.flatMap(m=>m.data.map(n=>n.skor))
                        
                        const soalSkor:DataBentukSoalWithScore[]=[];
                        if(currentAtpCurrentSiswaHasInstrumen.length > 0){
                            for(const sheetKd of currentAtpCurrentSiswaHasInstrumen){
                                const {skor:skorSheetKd, publikasi_id, atp_id:atp_idSheetKd} = sheetKd;
                                koleksiSkor.push(skorSheetKd);
                                let skorPerInstrumenSoal:(number|null) = null;
                                
                                for(const soal of soalSkorStruktur){
                                    const dataPrediksiNoSoalSheet:PrediksiNoSoal[] = [];
                                    const {data, bentukSoal, source} = soal;
                                    const totalSkorInstrumen = Decimal.sum(skorSheetKd ?? 0).times(data.length);
                                    const koleksiSkorPadaDataStruktur = data.map(m=>m.skor);
                                    const koleksiSkorPadaDataStrukturNumber = koleksiSkorPadaDataStruktur.map(n=>n ?? 0);
                                    const jumlahKoleksiSkor = koleksiSkorPadaDataStrukturNumber.length === 0 ? 0 : Decimal.sum(...koleksiSkorPadaDataStrukturNumber).toNumber();
                                    const skorCurrentInstrumentSTruktur = Decimal(totalSkorInstrumen).div(data.length).toDecimalPlaces(2).toNumber()
                                    for(const itemSoal of data){
                                        dataPrediksiNoSoalSheet.push({
                                            ...itemSoal,
                                            // skor: currentStrukturHasRespon ? itemSoal.skor :  null
                                            //null//itemSoal.skor,// totalSkorInstrumen.toNumber() === jumlahKoleksiSkor ? itemSoal.skor : skorCurrentInstrumentSTruktur
                                            skor: totalSkorInstrumen.toNumber() === jumlahKoleksiSkor ? itemSoal.skor : skorCurrentInstrumentSTruktur
                                        })
                                    }
    
                                    soalSkor.push({
                                        bentukSoal,
                                        data:dataPrediksiNoSoalSheet,
                                        source
        
                                    })
                                }
                                
                            }
                        }else{
                            for(const soal of soalSkorStruktur){
                                    const dataPrediksiNoSoalSheet:PrediksiNoSoal[] = [];
                                    const {data, bentukSoal, source} = soal;
                                    // const totalSkorInstrumen = Decimal.sum(skorSheetKd ?? 0).times(data.length);
                                    // const koleksiSkorPadaDataStruktur = data.map(m=>m.skor);
                                    // const koleksiSkorPadaDataStrukturNumber = koleksiSkorPadaDataStruktur.map(n=>n ?? 0);
                                    // const jumlahKoleksiSkor = koleksiSkorPadaDataStrukturNumber.length === 0 ? 0 : Decimal.sum(...koleksiSkorPadaDataStrukturNumber).toNumber();
                                    // const skorCurrentInstrumentSTruktur = Decimal(totalSkorInstrumen).div(data.length).toDecimalPlaces(2).toNumber()
                                    for(const itemSoal of data){
                                        dataPrediksiNoSoalSheet.push({
                                            ...itemSoal,
                                            skor: null,// totalSkorInstrumen.toNumber() === jumlahKoleksiSkor ? itemSoal.skor : skorCurrentInstrumentSTruktur
                                        })
                                        koleksiSkor.push(null);
                                    }
    
                                    soalSkor.push({
                                        bentukSoal,
                                        data:dataPrediksiNoSoalSheet,
                                        source
        
                                    })
                                }
                        }
                        const obTagihanInstrumenSoalCurrentAtp:TagihanInstrumenSoalCurrentAtp = {
                            tagihan,
                            soalSkor,
                            koleksiSkor,
                            // soalSkorStruktur
                        }
                        currentResultAtp?.instrumenSoalSheet.push(obTagihanInstrumenSoalCurrentAtp)

                    }

                    // currentAtpCurrentSiswaHasInstrumen?.push(...strukturSoal)
                    // if(currentAtpCurrentSiswaHasInstrumen && strukturSoal){
                    // }
                }
            }



        };
        
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