import type { StrukturKurikulumCpWithSlotType } from "~/domain/trees-struktur-kurikulum/struktur-kurikulum-type";
import type { mapperDetailNilaiResponType, SourceGroupResponseCpNilaiSiswa, SourceGroupResponseNilaiSiswa, SourceGroupResponseTpNilaiSiswa, SourceResponAtpGroupTagihan } from "../sumber-nilai/mapperSiswaWithDetailNilaiResponAppType";
import Decimal from "decimal.js";
import type { CollectionNilaiCp } from "~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiCp";
import type { SkorKdNullableType } from "~/domain/penilaian/type/SkorKdType";
import type { CollectionNilaiTp } from "~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiTp";
import type { CollectionNilaiAtp } from "~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiAtp";
import type { InterfaceMapel } from "~/types/mapel/mapel";
import type { SkorNilaiFromResponWithSource, DataCpWithSource, SourceKategoriAssesmenWithTagihanRespon, KoleksiTpWithSource, KoleksiAtpWithSource } from "./SkorNilaiFromResponWithSourceType";
import type { RefrensiTabResponTagihanJenjangType } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/RefrensiTabResponTagihanJenjangType";
import type { DataRefrensiPerBentukSoal } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/DataRefrensiPerBentukSoal";
import type { DataSkorSiswaByInstrumenType } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/DataSkorSiswaByInstrumenType";
import type { CollectionNilaiCpSheet } from "~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiCpSheet";
import type { DataSheetKdWithRefrenceSoal, MapperSiswaWithDetailNilaiSheetKdAppType } from "~/domain/TagihanHasDataResponMapper/MapperSiswaWithDetailNilaiSheetKdAppType";
import type { CollectionNilaiTpSheet } from "~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiTpSheet";
import type { CollectionNilaiAtpSheet } from "~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiAtpSheet";
import type { DataCpSheetWithSource, KoleksiAtpSheetWithSource, KoleksiTpSheetWithSource, SkorNilaiFromSheetKdWithSource, SourceGroupKategoriAssesmenWithTagihanSheetKd, SourceSheetAtpGroupTagihan, SourceSheetAtpWithScore, SourceSheetCpWithScore, SourceSheetTpWithScore, TagihanWithDataKdSheetAppDetail, TagihanWithDataKdSheetAppDetailMapper } from "./SkorNilaiFromSheetKdWithSource";
import type { KategoriTagihanType } from "~/domain/kategori-tagihan/types/entities/KategoriTagihanType";
import getOrCreateMap from "~/lib/getOrCreateMapper";

export default class CalculatedNilaiStrukturKurikulum{
   
    /**
     * calculated `SkorNilaiFromRespon`
     * ----
     * skor nilai respon suatu mata pelajaran tertentu yang dimiliki oleh seorang siswa;
     * ----
     * kita butuh StrukturMapelType, dimana terdapat property `dataCP`, lalu di dalamnya terdapat `dataTP`, hingga 
     * di paling dalam terdapat `dataAtp`
     */
    static getNilaiFromResponse(
        strukturDataCp: StrukturKurikulumCpWithSlotType[],
        siswaId:number, 
        kodeMapelInterface:InterfaceMapel,
        instSumberKoleksiNilai?:mapperDetailNilaiResponType,
    ):SkorNilaiFromResponWithSource{
        if(!instSumberKoleksiNilai){
            return {
            totalMapel:null,
            countSoalMapel:0,
            skorMapel:null,
            dataCp:[],
            dataCpWithSource:[],
            sourceResponGroupTagihanLevelTp:[],
            sourceResponGroupTagihanLevelCp:[],
            sourceResponGroupTagihanLevelAtp:[],
            sourceResponGroupTagihan:[],//sourceResponGroupTagihanLevelMapel,
            sourcesByGroupKategoriAssesmen:[]//sourcesByGroupKategoriAssesmenLevelMapel
        }
        }
        const sumberData:mapperDetailNilaiResponType = instSumberKoleksiNilai;//?.mapperSiswaRespon.get(this.siswaId);

        const kodeMapel = kodeMapelInterface.kode;;
        const sumberDataMapel = sumberData.dataResponseMapel.get(kodeMapel)
        
        const sumberDataTp = sumberData.dataResponseTp;
        const sumberDataCp = sumberData.dataResponseCp;
        const sumberDataAtp = sumberData.dataResponse;
        const sumberSiswaHasDataDetilNilaiRespon  = sumberData.hasDetailNilaiRespon.get(siswaId);
        const idCps = strukturDataCp.map(m=>m.cp_id)
        const idTps = strukturDataCp.flatMap(m=>m.dataTp.map(n=>n.tp_id));
        const idAtps = strukturDataCp.flatMap(m=>m.dataTp.flatMap(n=>n.dataAtp.map(o=>o.atp_id)));
      

        

        let totalMapel:number|null=null;
        let countSoalMapel:number = 0;
        let skorMapel:number|null = null;

        const dataCp:CollectionNilaiCp[]=[];
        
        const obSkorKd_cp:SkorKdNullableType = Object.create(null);
        const obSkorKd_tp:SkorKdNullableType = Object.create(null);
        const obSkorKd_atp:SkorKdNullableType = Object.create(null);

        const dataCpWithSource:DataCpWithSource[]=[];
        const sourcesByGroupKategoriAssesmenLevelMapel:SourceKategoriAssesmenWithTagihanRespon[] = sumberDataMapel?.sourceResponGroupkategoriAssesmen
            ? [...sumberDataMapel.sourceResponGroupkategoriAssesmen.entries()].map(([type, tagihanWithRespon]) => ({
                type,
                tagihanWithRespon: [...tagihanWithRespon.values()].flat()
            }))
            : [];
        const sourceResponGroupTagihanLevelMapel:SourceResponAtpGroupTagihan[]= sumberDataMapel?.sourceResponGroupTagihan ? [...sumberDataMapel?.sourceResponGroupTagihan?.values()] : []
        const sourceResponGroupTagihanLevelTp: SourceGroupResponseTpNilaiSiswa[]=sumberDataTp ? [...sumberDataTp.values()].filter(s=> idTps.includes(s.tp.tp_id)).map(res=>{
            const koleksiSkor = res.respon.map(n=>Decimal(n.skor?? 0));
            const skorRespon = Decimal.sum(...koleksiSkor).div(koleksiSkor.length).toDecimalPlaces(2).toNumber();
            return {
                ...res,
                skorRespon
            }
        }) : [];
        
        const sourceResponGroupTagihanLevelCp: SourceGroupResponseCpNilaiSiswa[]=sumberDataCp ? [...sumberDataCp.values()].filter(s=>idCps.includes(s.cp.cp_id)).map(res=>{
            const koleksiSkor = res.respon.map(n=>Decimal(n.skor?? 0));
            const skorRespon = Decimal.sum(...koleksiSkor).div(koleksiSkor.length).toDecimalPlaces(2).toNumber();
            return {
                ...res,
                skorRespon
            }
        }) : [];

        const sourceResponGroupTagihanLevelAtp: SourceGroupResponseNilaiSiswa[]=sumberDataAtp? [...sumberDataAtp.values()].filter(s=>idAtps.includes(s.atp.atp_id)).map(res=>{
            const koleksiSkor = res.respon.map(n=>Decimal(n.skor?? 0));
            const skorRespon = Decimal.sum(...koleksiSkor).div(koleksiSkor.length).toDecimalPlaces(2).toNumber();
            return {
                ...res,
                skorRespon
            }
        }) : [];

        for(const cp of strukturDataCp){
            const {cp_id, cp_description, slotCp, dataTp}=cp;
            const keyMapel_CpId= `${kodeMapel}_${cp_id}`;
            const sumberDataCp = sumberData?.dataResponseCp.get(cp_id);
            const sourcesByGroupKategoriAssesmenLevelCp= sumberDataCp ? 
                [...sumberDataCp?.sourceResponGroupkategoriAssesmen?.entries()].map(([type, typeValue])=>{
                    const tagihanWithRespon = [...typeValue.values()].flat()
                    return {
                        type,
                        tagihanWithRespon
                    }
                })
            :[];
            const sourcesByGroupTagihanLevelCp: SourceResponAtpGroupTagihan[] = sumberDataCp?
            [...sumberDataCp.sourceResponGroupTagihan.entries()].map(([tagihan, collectionCurrentTagihanAtp])=>{
               
                return collectionCurrentTagihanAtp
            })
             :[]
            
            
            /** space cp */
            let totalCp:number|null=null;
            let countSoalCp:number = 0
            let skorCp:number|null = null
            
            const koleksiTp:CollectionNilaiTp[] = []
            const koleksiTpWithSource:KoleksiTpWithSource[] = []
            for(const tp of dataTp){
                const {tp_description, tp_id, slotTp, dataAtp} = tp;
                const keyMapel_TpId= `${kodeMapel}_${tp_id}`;
                const getSourceTp = sumberData?.dataResponseTp.get(tp_id);
                const sourcesByGroupKategoriAssesmenLevelTp = getSourceTp ? 
                    [...getSourceTp.sourceResponGroupkategoriAssesmen.entries()].map(([type, tagihanLevel])=>{
                        const  tagihanWithRespon = [...tagihanLevel.values()].flat()
                        return {
                            type,
                            tagihanWithRespon
                        }
                    })
                    :[];

                const sourcesByGroupTagihanLevelTp: SourceResponAtpGroupTagihan[] = getSourceTp?
                    [...getSourceTp.sourceResponGroupTagihan.entries()].map(([tagihan, collectionCurrentTagihanAtp])=>{
                    
                        return collectionCurrentTagihanAtp
                    })
                    :[];

                /** space tp */
                let totalTp:number|null = null;
                let countSoalTp:number = 0;
                let skorTp:number|null = null;
                const koleksiAtpWithSource: KoleksiAtpWithSource[]=[]
                const koleksiAtp:CollectionNilaiAtp[] = [];

                for(const atp of dataAtp){
                    /**
                     * `atp_id` selalu bukan nol karena telah diatasi oleh class `BankSoalCollectionsBuilder`;
                     * ini terjasdi ketiik ada User yang tidak membuat bank soal, dimana idBankSoal adalah 0, sementara
                     * `snapshoot_kurikulum`-nya sdah berisi ATP.
                     * Biasanya insturmen soal ini berasal dari `Paket Nonsoal`.
                     * ----------
                     * Kasusnya: bagaimana jika soal itu belum terselesaikan? atau tidak ada soal sama sekoli. 
                     * Jawab: soal yang tidak terdeteksi bankSoal biasanya `undefined`, dan sudah diskip melalui keberadaan
                     * snapsot_kurikulum. jika snapshot_kurikulum undefined, maka tidak akan terjadi looping di parent ini.
                     */
                    const {atp_id, atp_description} = atp;

                    /** calculate proccessesing*/
                    const keyMapel_AtpId= `${kodeMapel}_${atp.atp_id}`;
                    const dataNilaiCurrentSiswa= sumberData?.dataResponse?.get(atp.atp_id);
                            
                    /** 
                     * jika Respon tidak ditemukan, maka lewati. Ini membawa dampak/pegnertian bahwa 
                     * - siswa mungkin saja tidak mengikuti tes/tidak ikut onlline
                     * - siswa mungkin saja tidak DIBANTU GURU dalam mengisi respon siswa
                     * Jika siswa tidak merespon atau guru tidak memberikan BANTU ISI, maka siswa kehilangan data
                     * nilai respon. Kehilangan nilai respon mengakibatkan nilai raport menjadi nol (bukan null).
                     * Nilai nol (0) diambil sebagai keputusan bahwa nili respon yang diperoleh siswa tidak ada.
                     * Berbeda dengan nilai yang ada di server rekap (tab 'harian'/'mid_semester'/'akhir_semester'),
                     * nilai Respon adalah nilai yang dimiliki secara utuh oleh siswa dan akan ditampilkan di siswa secara
                     * langsung.
                     * 
                     */
                    if(!dataNilaiCurrentSiswa) continue;
                    
                    /** koleksi soal yang tidak diisi (null) dianggap nol. Nilai ini sudah melewati tahap filtering */
                    const koleksiSkor = dataNilaiCurrentSiswa?.respon?.map(m=>m.skor ?? 0);
                    
                    const sumber = [...dataNilaiCurrentSiswa.sourceResponGroupTagihan.values()];//.map(([tagihan, collectionResponAtp])=>({tagihan, collectionResponAtp}));
                    
                    const sum = Decimal.sum(...koleksiSkor);
                    const totalAtp = sum.toNumber();
                    const skorAtp = sum.div(koleksiSkor.length).toDecimalPlaces(2).toNumber();

                    obSkorKd_atp[keyMapel_AtpId] = skorAtp;
                    
                    totalTp = Decimal.sum(Decimal(totalTp??0), ...koleksiSkor).toNumber();
                    totalCp= Decimal.sum(Decimal(totalCp ?? 0), ...koleksiSkor).toNumber();
                    totalMapel = Decimal.sum(Decimal(totalMapel??0), ...koleksiSkor).toNumber();
                    
                    countSoalMapel = Decimal.sum(countSoalMapel, koleksiSkor.length).toNumber();
                    countSoalTp= Decimal.sum(countSoalTp, koleksiSkor.length).toNumber();
                    countSoalCp= Decimal.sum(countSoalCp, koleksiSkor.length).toNumber();
                    
                    const sourcesByGroupKategoriAssesmen:SourceKategoriAssesmenWithTagihanRespon[] = [...dataNilaiCurrentSiswa.sourceResponGroupkategoriAssesmen.entries()].map(([type, tagihanWithResponMap])=>{
                        const tagihanWithRespon=[...tagihanWithResponMap.values()].flat();
                        return {
                            type,
                            tagihanWithRespon
                        }
                    });

                    /** build detail */
                    const currentRespon = sumberSiswaHasDataDetilNilaiRespon?.responAtpMapper.get(atp.atp_id);
                    
                    // let totalAtpRespon:number|null = null;
                    let skorAtpRespon:number|null = null;
                    let countSoalAtpRespon:number = 0
                    const detail: DataSkorSiswaByInstrumenType[] = [];

                    if(currentRespon){
                        const {ref, rispon} =currentRespon;

                        for(const itemRef of ref){
                            const {publikasi,siswa_id,skor_kd, siswa, respon, idbaris, templateKoreksiSiswa, objekKdSebaran, skorKdSebaran}=itemRef;
                            const dataRefrensiTabResponTagihanJenjang:RefrensiTabResponTagihanJenjangType[] = respon.filter(s=>s.atp === atp_id).map(m=>{
                                    return {
                                        responId: idbaris,
                                        noSoal: m.no_prefix,
                                        skor:m.skor??null,
                                        bentukSoal:m.bentuk_soal,
                                        atp_id,
                                        kunciJawabanPg:m.bentuk_soal === 'pg'? (m.soal?.jawaban as string[])?.[0] ?? '':'',
                                        dataPublikasi: publikasi,
                                        responJawaban:m.respon ?? '',
                                    } 
                                });

                            const dataPerBentukSoal: DataRefrensiPerBentukSoal[] = templateKoreksiSiswa.map(m=>{
                                return {
                                    bentukSoal:m.bentuk_soal.name,
                                    data: m.data.map(mm=> dataRefrensiTabResponTagihanJenjang.find(s=>s.noSoal === mm.no_prefix && s.bentukSoal === mm.soal?.bentuk_soal)!)
                                }
                            });
                           
                            let totalDetail:number|null = null;
                            let skorDetail:number|null = null
                            
                            for(const itemDetail of dataRefrensiTabResponTagihanJenjang){
                                /** aritmetika aman: akumulasi detail skor tanpa artefak floating-point */
                                totalDetail = Decimal.sum(totalDetail?? 0, Decimal(itemDetail.skor ?? 0)).toNumber();
                            }
                            
                            if(totalDetail !==null){
                                skorDetail = Decimal(totalDetail ?? 0).div(dataRefrensiTabResponTagihanJenjang.length).toDecimalPlaces(2).toNumber();
                            }
                            
                            detail.push({
                                siswa_id,
                                namaSiswa: siswa?.pd_nama ?? '',
                                rombel: siswa?.nama_rombel ?? '',
                                total: totalDetail ?? 0,
                                countSoal: dataRefrensiTabResponTagihanJenjang.length,
                                dataRefrensiTabResponTagihanJenjang,
                                dataPerBentukSoal,
                                dataSumberPublikasiPaket:publikasi,
                                skor:skorDetail ?? 0,
                                skorKd:{[keyMapel_AtpId]:skorAtp}
                            })
                        }
                    }
                    
                    koleksiAtp.push({
                        atp_id, 
                        atp_description, 
                        totalAtp,
                        countSoalAtp: koleksiSkor.length,
                        skorAtp,
                        detail,
                    })
                   
                    koleksiAtpWithSource.push({
                        atp_id, 
                        atp_description, 
                        totalAtp,
                        countSoalAtp: koleksiSkor.length,
                        skorAtp,
                        detail,
                        sourcesByGroupTagihan:sumber,
                        sourcesByGroupKategoriAssesmen
                    })
                }

                if(totalTp !== null){
                    skorTp = Decimal(totalTp).div(countSoalTp).toDecimalPlaces(2).toNumber();
                    obSkorKd_tp[keyMapel_TpId] = skorTp;
                }

                koleksiTp.push({
                    tp_id, 
                    tp_description, 
                    totalTp,
                    slotTp,
                    countSoalTp,
                    skorTp,
                    koleksiAtp
                });

                koleksiTpWithSource.push({
                    tp_id, 
                    tp_description, 
                    totalTp,
                    slotTp,
                    countSoalTp,
                    skorTp,
                    koleksiAtp,
                    sourcesByGroupTagihan: sourcesByGroupTagihanLevelTp,
                    sourcesByGroupKategoriAssesmen:sourcesByGroupKategoriAssesmenLevelTp,
                    koleksiAtpWithSource
                });
            }

            if(totalCp !== null){
                skorCp = Decimal(totalCp).div(countSoalCp).toDecimalPlaces(2).toNumber();
                obSkorKd_cp[keyMapel_CpId] = skorCp;
            }

            dataCp.push({
                cp_id, 
                cp_description, 
                totalCp,
                slotCp,
                countSoalCp,
                skorCp,
                koleksiTp
            });

            dataCpWithSource.push({
                cp_id, 
                cp_description, 
                totalCp,
                slotCp,
                countSoalCp,
                skorCp,
                koleksiTp,
                koleksiTpWithSource,
                sourcesByGroupTagihan:sourcesByGroupTagihanLevelCp,
                sourcesByGroupKategoriAssesmen:sourcesByGroupKategoriAssesmenLevelCp
            })
        }
        
        if(totalMapel !==null){
            skorMapel = Decimal(totalMapel).div(countSoalMapel).toDecimalPlaces(0).toNumber();
        }
        
        const skorKd_atp = Object.keys(obSkorKd_atp).length > 0 ? obSkorKd_atp : undefined;
        const skorKd_tp = Object.keys(obSkorKd_tp).length > 0 ? obSkorKd_tp : undefined;
        const skorKd_cp = Object.keys(obSkorKd_cp).length > 0 ? obSkorKd_cp : undefined;

        return {
            totalMapel,
            countSoalMapel,
            skorMapel,
            dataCp,
            dataCpWithSource,
            skorKd_atp,
            skorKd_tp,
            skorKd_cp,
            sourceResponGroupTagihanLevelTp,
            sourceResponGroupTagihanLevelCp,
            sourceResponGroupTagihanLevelAtp,
            sourceResponGroupTagihan:sourceResponGroupTagihanLevelMapel,
            sourcesByGroupKategoriAssesmen:sourcesByGroupKategoriAssesmenLevelMapel
        }
    }
   
    static getNilaiFromSheetKd(
        strukturDataCp: StrukturKurikulumCpWithSlotType[],
        siswaId:number, 
        kodeMapelInterface:InterfaceMapel,
        instSumberKoleksiNilai?:MapperSiswaWithDetailNilaiSheetKdAppType,
    ):SkorNilaiFromSheetKdWithSource{

        const currentSiswaSheetKd = instSumberKoleksiNilai?.get(siswaId);

        if(!instSumberKoleksiNilai || !currentSiswaSheetKd){
            return {
                totalMapel_sheet:null,
                countSoalMapel_sheet:0,
                skorMapel_sheet:null,
                dataCp_sheet:[],
                dataCpSheetWithSource:[],
                sourceSheetKdGroupTagihan: [],
                sourceSheetKdGroupTagihanLevelAtp:[],
                sourceSheetKdGroupTagihanLevelTp: [],
                sourceSheetKdGroupTagihanLevelCp:[],
                sourcesByGroupKategoriAssesmen:new Map()
            }
        };

        let totalMapel_sheet:number|null = null;
        let countSoalMapel_sheet:number = 0;
        let skorMapel_sheet:number|null = null;
        const dataCp_sheet:CollectionNilaiCpSheet[] = [];
        const dataCpSheetWithSource:DataCpSheetWithSource[]=[]
        const sourcesByGroupKategoriAssesmen: SourceGroupKategoriAssesmenWithTagihanSheetKd = new Map()
        const sourceSheetKdGroupTagihanPerAtp: SourceSheetAtpGroupTagihan[]=[]
        const sourceSheetKdGroupTagihanLevelAtp: SourceSheetAtpWithScore[]=[];
        const sourceSheetKdGroupTagihanLevelTp: SourceSheetTpWithScore[] = [];
        const sourceSheetKdGroupTagihanLevelCp: SourceSheetCpWithScore[]=[];
        const sourceDataKdSheetCp: SourceSheetAtpGroupTagihan[]=[]
        const ob_skorKd_atp_sheet:SkorKdNullableType = Object.create(null);
        const ob_skorKd_tp_sheet: SkorKdNullableType = Object.create(null);
        const ob_skorKd_cp_sheet: SkorKdNullableType = Object.create(null);

        for(const cp of strukturDataCp){
            const {cp_id, slotCp, dataTp, cp_description} = cp;
            const keyMapelCpId = `${kodeMapelInterface.kode}_${cp_id}`;
            let totalCp_sheet:number|null = null;
            let countSoalCp_sheet:number = 0;
            let skorCp_sheet:number|null = null;
            const koleksiTp: CollectionNilaiTpSheet[]=[];
            const koleksiTpSheetWithSource: KoleksiTpSheetWithSource[]=[]

            /** mapper Cp */
            const sourceKategoriAssesmenDataKdSheetMapperCp = new Map<KategoriTagihanType, TagihanWithDataKdSheetAppDetailMapper>();
            const sourceTagihanDataKdSheetMapperCp= new Map<number, TagihanWithDataKdSheetAppDetail>()

            for(const tp of dataTp){
                const {tp_id, tp_description, dataAtp, slotTp}=tp;
                const keyMapelTpId = `${kodeMapelInterface.kode}_${tp_id}`;
                let totalTp_sheet:number|null = null;
                let countSoalTp_sheet:number = 0;
                let skorTp_sheet: number|null = null;
                const koleksiAtp:CollectionNilaiAtpSheet[]=[];
                const  koleksiAtpSheet: KoleksiAtpSheetWithSource[]=[]
                const sourceKategoriAssesmenDataKdSheetMapperTp = new Map<KategoriTagihanType, TagihanWithDataKdSheetAppDetailMapper>();
                const sourceTagihanDataKdSheetMapperTp= new Map<number, TagihanWithDataKdSheetAppDetail>();
                const sourceDataKdSheetTp: SourceSheetAtpGroupTagihan[] = []

                for(const atp of dataAtp){
                    const {atp_id, atp_description}=atp; 
                    const currentAtp = currentSiswaSheetKd.atpMapperWithSource.get(atp_id);
                    const keyMapelAtpId = `${kodeMapelInterface.kode}_${atp_id}`;
                    let currentTotalSkorAtp:number|null = null;
                    let countSoalCurrentAtp:number = 0;
                    let skorAtp_sheet:number|null = null;
                    const sourceTagihanDataKdSheetMapper=new Map<number, TagihanWithDataKdSheetAppDetail>();
                    const sourceKategoriAssesmenDataKdSheetMapper = new Map<KategoriTagihanType, TagihanWithDataKdSheetAppDetailMapper>();
                    const sourceDataKdSheet:SourceSheetAtpGroupTagihan[]= [];

                    if(currentAtp){
                        for(const [publikasi_id, dataNilai] of currentAtp.tagihanMapper.entries()){
                                const { data, tagihan} = dataNilai;
                                /** define Mapper Atp */
                                const currentTagihan = getOrCreateMap(sourceTagihanDataKdSheetMapper, tagihan.idbaris, ()=>({
                                    tagihan,
                                    collectionCurrentTagihanAtp:[]
                                }));
                                const currentKategoriAssesem = getOrCreateMap(sourceKategoriAssesmenDataKdSheetMapper, tagihan.tipe_assesmen, ()=>({
                                    tagihanMapper: new Map<number, {collectionCurrentTagihanAtp:DataSheetKdWithRefrenceSoal[]}>()
                                }));
                                const currentKategoriTagihan = getOrCreateMap(currentKategoriAssesem.tagihanMapper, tagihan.idbaris, ()=>({
                                    collectionCurrentTagihanAtp:[]
                                }));

                                /** define Mapper TP */
                                const currentTagihanTp = getOrCreateMap(sourceTagihanDataKdSheetMapperTp, tagihan.idbaris, ()=>({
                                    tagihan,
                                    collectionCurrentTagihanAtp:[]
                                }))
                                const currentSourceKategoriTp = getOrCreateMap(sourceKategoriAssesmenDataKdSheetMapperTp,tagihan.tipe_assesmen, ()=>({
                                    tagihanMapper: new Map<number, {collectionCurrentTagihanAtp:DataSheetKdWithRefrenceSoal[]}>()
                                }));
                                const currentTagihanSourceKategoriTp = getOrCreateMap(currentSourceKategoriTp.tagihanMapper, tagihan.idbaris, ()=>({
                                    collectionCurrentTagihanAtp:[]
                                }));

                                /** kategoriAssesmenAll */
                                const kategoriAsseesmenAll = getOrCreateMap(sourcesByGroupKategoriAssesmen, tagihan.tipe_assesmen, ()=>({
                                    type: tagihan.tipe_assesmen,
                                    tagihanWithSheetKd:[]

                                }) )
                                const newTagihanFilteringBankSoal = {
                                    ...tagihan,
                                    bank_soal_collections: tagihan.bank_soal_collections.filter(s=>s.kd_id === atp_id)
                                }
                                const ObSourceSheetAtpGroupTagihan:SourceSheetAtpGroupTagihan = {
                                        atp: {atp_id, atp_description},
                                        tagihan: newTagihanFilteringBankSoal,
                                        collectionCurrentTagihanAtp: []
                                    }
                                
                                /** define mapper Cp */
                                const tagihanMapperCp = getOrCreateMap(sourceTagihanDataKdSheetMapperCp, tagihan.idbaris, ()=>({
                                    tagihan,
                                    collectionCurrentTagihanAtp:[]
                                }))
                                const kategoriAssesmenCp = getOrCreateMap(sourceKategoriAssesmenDataKdSheetMapperCp, tagihan.tipe_assesmen, ()=>({
                                    tagihanMapper: new Map<number, {collectionCurrentTagihanAtp:DataSheetKdWithRefrenceSoal[]}>()
                                }));
                                const currentKategoriAssesmenCp = getOrCreateMap(kategoriAssesmenCp.tagihanMapper, tagihan.idbaris, ()=>({
                                    collectionCurrentTagihanAtp:[]
                                }));


                                for(const {data:source, countSoal} of data){
                                    const {skor} = source;
                                    const currentTotalSkorAtpInTagihan = Decimal(skor??0).times(countSoal.length).toNumber();

                                    currentTotalSkorAtp = Decimal.sum(currentTotalSkorAtp??0, currentTotalSkorAtpInTagihan).toDecimalPlaces(0).toNumber();
                                    countSoalCurrentAtp = Decimal.sum(countSoalCurrentAtp, countSoal.length).toNumber();

                                    ObSourceSheetAtpGroupTagihan.collectionCurrentTagihanAtp.push(source);
                                    
                                    currentTagihan.collectionCurrentTagihanAtp.push({
                                        data:source,
                                        countSoal:countSoal,
                                    });
                                    currentKategoriTagihan.collectionCurrentTagihanAtp.push({
                                        data:source,
                                        countSoal:countSoal
                                    });

                                    /** TP */
                                    currentTagihanTp.collectionCurrentTagihanAtp.push({
                                        data:source,
                                        countSoal:countSoal
                                    });
                                    currentTagihanSourceKategoriTp.collectionCurrentTagihanAtp.push({
                                        data:source,
                                        countSoal:countSoal
                                    });
                                    
                                    /** CP */
                                    currentKategoriAssesmenCp.collectionCurrentTagihanAtp.push({
                                        data:source,
                                        countSoal:countSoal
                                    });
                                    tagihanMapperCp.collectionCurrentTagihanAtp.push({
                                        data:source,
                                        countSoal:countSoal
                                    });
                                }

                                sourceDataKdSheet.push(ObSourceSheetAtpGroupTagihan);
                                sourceDataKdSheetTp.push(ObSourceSheetAtpGroupTagihan);
                                sourceDataKdSheetCp.push(ObSourceSheetAtpGroupTagihan);

                                kategoriAsseesmenAll.tagihanWithSheetKd.push(ObSourceSheetAtpGroupTagihan)
                               

                               
                        }
           
                    }

                    if(currentTotalSkorAtp !== null){
                        const skor = Decimal(currentTotalSkorAtp).div(countSoalCurrentAtp).toDecimalPlaces(2).toNumber();;
                            skorAtp_sheet = skor;
                        ob_skorKd_atp_sheet[keyMapelAtpId] = skor;

                        totalMapel_sheet = Decimal.sum(totalMapel_sheet??0, currentTotalSkorAtp).toNumber();
                        totalCp_sheet = Decimal.sum(totalCp_sheet??0, currentTotalSkorAtp).toNumber();
                        totalTp_sheet = Decimal.sum(totalTp_sheet??0, currentTotalSkorAtp).toNumber();
                    }
                    
                    countSoalMapel_sheet = Decimal.sum(countSoalMapel_sheet, countSoalCurrentAtp).toNumber();
                    countSoalCp_sheet = Decimal.sum(countSoalCp_sheet, countSoalCurrentAtp).toNumber();
                    countSoalTp_sheet = Decimal.sum(countSoalTp_sheet, countSoalCurrentAtp).toNumber();

                    const dataSkorAtp:SourceSheetAtpWithScore = {
                                atp_id,
                                atp_description,
                                totalAtp: currentTotalSkorAtp,
                                countKeyAtp: countSoalCurrentAtp,
                                skorAtp: skorAtp_sheet,
                                sourceDataKdSheet,
                                sourceTagihanDataKdSheetMapper,
                                sourceKategoriAssesmenDataKdSheetMapper
                           };

                    sourceSheetKdGroupTagihanLevelAtp.push(dataSkorAtp);

                    koleksiAtp.push({
                        atp_id,
                        atp_description,
                        skorAtp: skorAtp_sheet,
                        countKeyAtp: countSoalCurrentAtp,
                        totalAtp: currentTotalSkorAtp
                    });

                    koleksiAtpSheet.push({
                        atp_id,
                        atp_description,
                        skorAtp: skorAtp_sheet,
                        countKeyAtp: countSoalCurrentAtp,
                        totalAtp: currentTotalSkorAtp,
                        sourceSheetKdGroupTagihan:[...sourceDataKdSheet.values()],
                        sourcesByGroupKategoriAssesmen: [...sourceKategoriAssesmenDataKdSheetMapper.keys()].map(type=>{
                                return {
                                    type,
                                    tagihanWithSheetKd: sourceDataKdSheet.filter(source => source.tagihan.tipe_assesmen === type)
                                }
                            })
                        });
                }

                if(totalTp_sheet !== null){
                    const skor = Decimal(totalTp_sheet).div(countSoalTp_sheet).toDecimalPlaces(2).toNumber();
                    skorTp_sheet = skor;
                    ob_skorKd_tp_sheet[keyMapelTpId] = skor;
                   
                }

                koleksiTp.push({
                    tp_id, 
                    tp_description, 
                    slotTp,
                    countKeyTp:countSoalTp_sheet,
                    totalTp:totalTp_sheet,
                    skorTp:skorTp_sheet,
                    koleksiAtp
                });

                koleksiTpSheetWithSource.push({
                    tp_id, 
                    tp_description, 
                    slotTp,
                    countKeyTp:countSoalTp_sheet,
                    totalTp:totalTp_sheet,
                    skorTp:skorTp_sheet,
                    koleksiAtp, 
                    koleksiAtpSheet,
                    // sourceSheetKdGroupTagihan:[],
                    // sourcesByGroupKategoriAssesmen:[],
                    sourceSheetKdGroupTagihan:[...sourceDataKdSheetTp.values()],
                    sourcesByGroupKategoriAssesmen: [...sourceKategoriAssesmenDataKdSheetMapperTp.keys()].map(type=>{
                        return {
                            type,
                            tagihanWithSheetKd: sourceDataKdSheetTp.filter(source => source.tagihan.tipe_assesmen === type)
                        }
                    })
                    
                });

                /** ob_SourceSheetTpWithScore */
                const ob_SourceSheetTpWithScore:SourceSheetTpWithScore={
                    tp_id, 
                    tp_description, 
                    totalTp:totalTp_sheet,
                    countKeyTp:countSoalTp_sheet,
                    skorTp:skorTp_sheet,
                    sourceDataKdSheet:sourceDataKdSheetTp,
                    sourceKategoriAssesmenDataKdSheetMapper:sourceKategoriAssesmenDataKdSheetMapperTp,
                    sourceTagihanDataKdSheetMapper:sourceTagihanDataKdSheetMapperTp
                };

                sourceSheetKdGroupTagihanLevelTp.push(ob_SourceSheetTpWithScore)
            }

            if(totalCp_sheet!==null){
                const skor = Decimal(totalCp_sheet).div(countSoalCp_sheet).toDecimalPlaces(2).toNumber();
                skorCp_sheet = skor;
                ob_skorKd_cp_sheet[keyMapelCpId] = skor;

            }

            dataCp_sheet.push({
                cp_id,
                cp_description,
                skorCp:skorCp_sheet,
                slotCp,
                totalCp:totalCp_sheet,
                countKeyCp:countSoalCp_sheet,
                koleksiTp
            });

            dataCpSheetWithSource.push({
                cp_id,
                cp_description,
                skorCp:skorCp_sheet,
                slotCp,
                totalCp:totalCp_sheet,
                countKeyCp:countSoalCp_sheet,
                koleksiTp,
                /**
                 * koleksiTpSheetWithSource: KoleksiTpSheetWithSource[]
                     sourceSheetKdGroupTagihan: SourceSheetAtpGroupTagihan[];
                     sourcesByGroupKategoriAssesmen: SourceGroupKategoriAssesmenWithTagihanSheetKd;
                 }
                 */
                koleksiTpSheetWithSource,
                sourceSheetKdGroupTagihan:[...sourceDataKdSheetCp.values()],
                sourcesByGroupKategoriAssesmen: [...sourceKategoriAssesmenDataKdSheetMapperCp.keys()].map(type=>{
                    return {
                        type,
                        tagihanWithSheetKd: sourceDataKdSheetCp.filter(source => source.tagihan.tipe_assesmen === type)
                    }
                })
            });
            
            const obSourceSheetKdGroupTagihanLevelCp:SourceSheetCpWithScore  ={
                cp_id,
                cp_description,
                totalCp: totalCp_sheet,
                countKeyCp: countSoalCp_sheet,
                skorCp: skorCp_sheet,
                sourceDataKdSheet:sourceDataKdSheetCp,
                sourceKategoriAssesmenDataKdSheetMapper: sourceKategoriAssesmenDataKdSheetMapperCp,
                sourceTagihanDataKdSheetMapper: sourceTagihanDataKdSheetMapperCp
            };

            sourceSheetKdGroupTagihanLevelCp.push(obSourceSheetKdGroupTagihanLevelCp)
        }
        
        if(totalMapel_sheet!==null){
            skorMapel_sheet = Decimal(totalMapel_sheet).div(countSoalMapel_sheet).toDecimalPlaces(0).toNumber();
        }
        
        const skorKd_atp_sheet=Object.keys(ob_skorKd_atp_sheet).length === 0?undefined:ob_skorKd_atp_sheet;
        const skorKd_tp_sheet=Object.keys(ob_skorKd_tp_sheet).length === 0?undefined:ob_skorKd_tp_sheet;
        const skorKd_cp_sheet=Object.keys(ob_skorKd_cp_sheet).length === 0?undefined:ob_skorKd_cp_sheet;

        return {
            totalMapel_sheet,
            countSoalMapel_sheet,
            skorMapel_sheet,
            dataCp_sheet,
            dataCpSheetWithSource,
            skorKd_atp_sheet,
            skorKd_tp_sheet,
            skorKd_cp_sheet,
            sourceSheetKdGroupTagihan:sourceSheetKdGroupTagihanPerAtp,
            sourcesByGroupKategoriAssesmen,
            sourceSheetKdGroupTagihanLevelAtp:sourceSheetKdGroupTagihanLevelAtp,
            sourceSheetKdGroupTagihanLevelTp,
            sourceSheetKdGroupTagihanLevelCp
        }
    }


}