import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import KategoriAsessmenInPublikasiBuilder from "../builder/KategoriAsessmenInPublikasiBuilder";
import KoleksiKategoriAssesmenOnJenjang from "../builder/KoleksiKategoriAssesmenOnJenjang";
import StrukturKurikulumInTagihanHasDataResponBuilder from "~/domain/struktur-kurikulum/tagihan-has-data-response/StrukturKurikulumInTagihanHasDataResponBuilder";
import type { DataSiswaHasMapelType } from "~/domain/penilaian/infrastucture/dataSiswaHasMapel";
import type { KategoriTagihanHasManyPesertaMapelType } from "../types/kategori-tagihan-hasMany-respon-siswa/KategoriTagihanHasManyPesertaMapelType";
import type { KoleksiMapelBasedSiswaInResponAllKategoriTagihan } from "../types/kategori-tagihan-hasMany-respon-siswa/KoleksiMapelBasedSiswaInResponAllKategoriTagihan";
import type { KoleksiPublikasiPaketPerMapel } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/StrukturKurikulumMapper";
import type { CollectionNilaiMapel, RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan } from "../types";
import type { DataSiswaBasedMapelInResponAllKategoriTagihanInterface } from "../types/kategori-tagihan-hasMany-respon-siswa/DataSiswaBasedMapelInResponAllKategoriTagihanInterface";
import type { TemplateImportSkorToKd } from "~/domain/import-skor-to-kd/TemplateImportSkorToKd-type";
import type { DataSheetSkorKdKategoriAsesmenAppType } from "~/types/penilaian/DataSheetSkorKdKategoriAsesmenAppType";
import MapperSiswaOnDataResponBuilder, { type ResponAtpMapperType } from "~/domain/respon-tagihan-jenjang/mapper/MapperSiswaOnDataResponBuilder";
import MapperSiswaOnDataSkorKdSheetBuilder from "~/domain/respon-tagihan-jenjang/mapper/MapperSiswaOnDataSkorKdSheetBuilder";
import type { KategoriTagihanType } from "../types/entities/KategoriTagihanType";
import getOrCreateMap from "~/lib/getOrCreateMapper";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { StrukturKurikulumMapelMapperType, StrukturKurikulumMapelType } from "~/domain/trees-struktur-kurikulum/struktur-kurikulum-type";
import type { StrukturAtpType, StrukturCpType, StrukturTpType } from "~/domain/trees-struktur-kurikulum";
import type { CollectionNilaiCp } from "../types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiCp";
import type { SkorKdNullableType } from "~/domain/penilaian/type/SkorKdType";
import MapperTagihanHasDataRespon from "~/domain/penilaian/infrastucture/MapperTagihanHasDataRespon";
import KategoriTagihanRaportBuilder from "../builder/KategoriTagihanRaportBuilder";
import KategoriTagihanHasManyPesertaMapelBuillder from "../builder/KategoriTagihanHasManyPesertaMapelBuillder";
import type { jp_mapelApp } from "~/types/mapel/jp_mapel";
import type { DataKdSheetApp } from "~/types/penilaian/DataKdSheetAppType";
import type { DataSkorSiswaByInstrumenType } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/DataSkorSiswaByInstrumenType";
import type { CollectionNilaiTp } from "../types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiTp";
import type { CollectionNilaiAtp } from "../types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiAtp";
import type { detailNilaiSiswaAppType } from "~/types/penilaian/nilai-siswa-app-type";
import type { RefrensiTabResponTagihanJenjangType } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/RefrensiTabResponTagihanJenjangType";
import type { DataRefrensiPerBentukSoal } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/DataRefrensiPerBentukSoal";
import desimalFormat from "~/lib/desimal-format";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import AtMapperTagihanHasRespons, { type AtpContainKoleksiBankSoalType, type AtpContanTagihanHasKoleksiBankSoalWhoseCurrentAtpType } from "~/domain/atp-mapper/AtMapperTagihanHasRespons";
import MemberOfPublikasiPaketBuilder from "../builder/MemberOfPublikasiPaketBuilder";

 type dataNilaiResponType = {
            atp_id:number,
            // dataNilaiRespon:RisponsePenilaianSiswa[]
            detailNilaiRespon:{ref:detailNilaiSiswaAppType[],rispon:RisponsePenilaianSiswa[]}

        }
export default class KategoriAssesmenClass{
    private _resultData:KategoriTagihanHasManyPesertaMapelType[]=[]
    constructor(private readonly data:TagihanHasDataResponse[], private readonly memberMapel:DataSiswaHasMapelType[],private readonly mapelRaport:jp_mapelApp[]){};
    
    get result():KategoriTagihanHasManyPesertaMapelType[]{
        return this._resultData;
    }
    
    initNilaiAsli():this{
        const koleksiKategoriAssesmen = KoleksiKategoriAssesmenOnJenjang.build();
        const mapperKategoriAssesmen = KategoriAsessmenInPublikasiBuilder.buildMapper(this.data);
        const koleksiPerKategori:KategoriTagihanHasManyPesertaMapelType[][] = [];;
        const mapperKoleksi = new Map<KategoriTagihanType, KategoriTagihanHasManyPesertaMapelType>()

        for(const kategoriAssesmen of koleksiKategoriAssesmen){
            const map = mapperKategoriAssesmen.get(kategoriAssesmen)!;
            if(!map) {
                getOrCreateMap(mapperKoleksi, kategoriAssesmen,()=>{
                    return {
                        type:kategoriAssesmen,
                        data:[],
                        koleksiAtpInMapel:[],
                        koleksiPaketSoal:[]
                    }

                })
                continue;
            }

            const { dataPublikasiPaket, dataPublikasiPaketWithRespon }= map;
            getOrCreateMap(mapperKoleksi, kategoriAssesmen, ()=>{
                    const {mapperKategoriTagihanPerAtpSkor:kategoriMapper, mapperStrukturKurikulum:StrukturKurikulumMapper} = MapperTagihanHasDataRespon(dataPublikasiPaketWithRespon);
                    const kategoriTagihanRaport = KategoriTagihanRaportBuilder.buildFromMapper(kategoriMapper, StrukturKurikulumMapper);
                    const koleksiMapel:string[] = this.mapelRaport.map(m=>m.kode);
                        //  this.kategoriTagihanRaport = kategoriTagihanRaport;
                    const KategoriTagihanHasManyPesertaMapel = KategoriTagihanHasManyPesertaMapelBuillder.buildRaport(kategoriTagihanRaport,this.memberMapel ?? [],koleksiMapel)
                    const found = KategoriTagihanHasManyPesertaMapel.find(s=>s.type === kategoriAssesmen);
                    if(found){
                        
                        const refaktor:KategoriTagihanHasManyPesertaMapelType = {
                            ...found, 
                            data:found.data.map(m=>({...m, dataNilai: m.koleksiAtpInMapel ? m.dataNilai: []})), 
                            koleksiAtpInMapel:Boolean(found.koleksiAtpInMapel)?found.koleksiAtpInMapel:[], 
                            koleksiPaketSoal:Boolean(found.koleksiAtpInMapel)?found.koleksiPaketSoal:[]  
                        };
                        return refaktor;
                        // return {...found, 
                        //     data:found.koleksiAtpInMapel?found.data:[], 
                        //     koleksiAtpInMapel:found.koleksiAtpInMapel?found.koleksiAtpInMapel:[], 
                        //     koleksiPaketSoal:found.koleksiAtpInMapel?found.koleksiAtpInMapel:[]  
                        // };
                    };
                return {
                    type:kategoriAssesmen,
                    data:[],
                    koleksiAtpInMapel:[],
                    koleksiPaketSoal:[]
                }
            });
        }
        
        this._resultData = [...mapperKoleksi.values()];//.filter(s=>Boolean(s.koleksiAtpInMapel))
        return this;
    }
    init():this{
        const koleksiKategoriAssesmen = KoleksiKategoriAssesmenOnJenjang.build();
        const mapperKategoriAssesmen = KategoriAsessmenInPublikasiBuilder.buildMapper(this.data);
        const result:KategoriTagihanHasManyPesertaMapelType[] = [];
       
        
        type valueSiswaMapper =  { 
            namaSiswa: string, 
            rombel: string, 
            dataNilaiRespon:dataNilaiResponType[], 
            dataNilaiSkorKd: DataKdSheetApp[], 
            mapperSourceInstumenAtp:AtpContainKoleksiBankSoalType, 
            mappersourcInstrumenAtpPerTagihan:AtpContanTagihanHasKoleksiBankSoalWhoseCurrentAtpType }
        const mapperResult = new Map<KategoriTagihanType, {
                                    StrukturKurikulumKategoriTagihan:StrukturKurikulumMapelType[],

                                    dataNilaiMapelMapper:Map<string, {
                                        mapelName:string,
                                        siswaMapper:Map<number, valueSiswaMapper>,
                                        sourcePublikasiWithRespon:TagihanHasDataResponse[]
                                        }>
                                    }>()

        const koleksiAtpInMapelMapper = new Map<KategoriTagihanType, {koleksiMapelMapper:Map<string, StrukturKurikulumMapelType>}>()
        const mapperResourceBankSoalProperties = new Map<KategoriTagihanType,{koleksiMapelMapper:Map<string, {kodeMapel:string, MapperAtp:Map<number, {countInstrumen:number, totalInstrumen:number}>}>}>
        
        for(const kategoriAssesmen of koleksiKategoriAssesmen){

            const map = mapperKategoriAssesmen.get(kategoriAssesmen)!;
            const mapperResultKategoriAssesmen = getOrCreateMap(mapperResult, kategoriAssesmen,()=>({
                StrukturKurikulumKategoriTagihan:[],
                dataNilaiMapelMapper: new Map()
            }));
            const koleksiAtpInMapelMapelMapper = getOrCreateMap(koleksiAtpInMapelMapper, kategoriAssesmen, ()=>({
                koleksiMapelMapper: new Map()
            }));

            if(!map) continue;
            
            const { dataPublikasiPaket, dataPublikasiPaketWithRespon }= map
            
            
            const strukturKurikulumKategoriAssesmen = StrukturKurikulumInTagihanHasDataResponBuilder.build(dataPublikasiPaketWithRespon);
            mapperResultKategoriAssesmen.StrukturKurikulumKategoriTagihan = strukturKurikulumKategoriAssesmen
            const data_respons = dataPublikasiPaketWithRespon.flatMap(m=>m.data_respons);
            const siswaHasDataResponMapper = MapperSiswaOnDataResponBuilder.build(data_respons);
            const dataSkorKdSheet = dataPublikasiPaketWithRespon.flatMap(m=>m.dataSkorKdSheet);
            const dataSkorKdSheetMapper = MapperSiswaOnDataSkorKdSheetBuilder.build(dataSkorKdSheet);

           
            strukturKurikulumKategoriAssesmen.forEach(mapel=>{
                const {kodeMapel, mapelName, dataCp} = mapel;
                const siswaMemberMapel = this.memberMapel.filter(s=>s.mapel.some(cur=>cur.kode === kodeMapel));
                const mapperResultMapel = getOrCreateMap(mapperResultKategoriAssesmen.dataNilaiMapelMapper, kodeMapel, ()=>({
                    mapelName,
                    siswaMapper: new Map(),
                    sourcePublikasiWithRespon:dataPublikasiPaketWithRespon 
                }));
           
                getOrCreateMap(koleksiAtpInMapelMapelMapper.koleksiMapelMapper, kodeMapel, ()=>mapel);
                 const mapperAtpBankSoal = new AtMapperTagihanHasRespons(dataPublikasiPaketWithRespon ).build();
                 
                 
                dataCp.forEach(cp=>{
                    const {dataTp} = cp;
                    dataTp.forEach(tp=>{
                        tp.dataAtp.forEach(atp=>{
                            // koleksi banksoal disemua publikasi, baik yang direspon siswa maupun tidak;
                           

                            siswaMemberMapel.forEach(currentSiswa=>{
                                
                                const nilaiDataRespon = siswaHasDataResponMapper.get(currentSiswa.dataSiswa.id)?.responAtpMapper;//.get(atp.atp_id) ?? [];
                                const nilaiDataSkorKd = dataSkorKdSheetMapper.get(currentSiswa.dataSiswa.id)?.collectionData;//.get(atp.atp_id)?.currentAtp;
                                const curr = getOrCreateMap(mapperResultMapel.siswaMapper, currentSiswa.dataSiswa.id, ()=>({
                                    namaSiswa: currentSiswa.dataSiswa.pd_nama,
                                    rombel: currentSiswa.dataSiswa.nama_rombel,
                                    // dataNilaiRespon: !nilaiDataRespon ? [] : [...nilaiDataRespon.entries()].map(([atp_id, dataNilaiRespon])=>({atp_id, dataNilaiRespon})),
                                    dataNilaiRespon: !nilaiDataRespon ? [] : [...nilaiDataRespon.entries()].map(([atp_id, dataNilaiRespon])=>{
                                        return {
                                            atp_id,
                                            detailNilaiRespon: { ref:dataNilaiRespon.ref, rispon: dataNilaiRespon.rispon}
                                        }
                                    }),
                                    dataNilaiSkorKd:!nilaiDataSkorKd ?[] : [...nilaiDataSkorKd.values()].flatMap(m=>m.currentAtp),
                                    // mapperSourceInstumenAtp:MapperCountSoalInAtp
                                    mapperSourceInstumenAtp:mapperAtpBankSoal.mapperAtpBankSoal,
                                    mappersourcInstrumenAtpPerTagihan:mapperAtpBankSoal.AtpContainTagihanHasKoleksiBankSoalWhoseCurrentAtp
                                } as valueSiswaMapper));
                                
                            })

                        })
                    })
                });
            })
        }

        this._resultData = [...mapperResult.entries()].map(([type, dataAssesmen])=>{
            const {dataNilaiMapelMapper, StrukturKurikulumKategoriTagihan} = dataAssesmen;
            const koleksiAtpInMapelMapperCurrentType = koleksiAtpInMapelMapper.get(type)?.koleksiMapelMapper;
            const koleksiAtpInMapelAll:RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan[]=[];
            const dataPublikasiSoalByKategoriAssesmen =mapperKategoriAssesmen.get(type)!;
            const koleksiPaketSoal: KoleksiPublikasiPaketPerMapel[] = dataPublikasiSoalByKategoriAssesmen?.dataPublikasiPaketWithRespon?.map(m=>{
                const {idbaris, data_respons, data_response_bySiswa, nama_publikasi, koleksi_mapelName} = m
                return {
                    
                    idbaris,
                    namaPublikasi:nama_publikasi,
                    koleksiMapel:koleksi_mapelName,
                    countRespon:data_response_bySiswa.filter(s=>s.data.length>0).length,
                    detail: m
                }
            })
            if(koleksiAtpInMapelMapperCurrentType){
                [...koleksiAtpInMapelMapperCurrentType.entries()].forEach(([kodeMapel, levelMapel])=>{
                   const {dataCp} = levelMapel
                   const collection_Cp = dataCp.map(({cp_id, cp_description})=>({cp_id, cp_description}));
                   const collection_Tp = dataCp.flatMap(m=>m.dataTp.map(({tp_id, tp_description})=>({tp_id, tp_description})));
                   const collection_Atp = dataCp.flatMap(m=>m.dataTp.flatMap(n=>n.dataAtp.map(({atp_id, atp_description})=>({atp_id, atp_description}))));
                   const ob:RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan = {
                        kodeMapel,
                        collection_Atp,
                        collection_Tp,
                        collection_Cp,
                    }
                    koleksiAtpInMapelAll.push(ob)
                })
            }

            const data:KoleksiMapelBasedSiswaInResponAllKategoriTagihan[] = [...dataNilaiMapelMapper.entries()].map(([kodeMapel,dataPerMapel])=>{
                const {siswaMapper,sourcePublikasiWithRespon, mapelName} = dataPerMapel;
                const koleksiAtpInMapelcurrentMapel = koleksiAtpInMapelAll?.find(s=>s.kodeMapel === kodeMapel);
                const strukturKurikulumCurrentMapel = StrukturKurikulumKategoriTagihan.filter(s=>s.kodeMapel === kodeMapel);

                const dataNilai: DataSiswaBasedMapelInResponAllKategoriTagihanInterface[] = [...siswaMapper.entries()].map(([idSiswa, koleksiNilai])=>{
                    
                    const {dataNilaiRespon, dataNilaiSkorKd,namaSiswa, mapperSourceInstumenAtp, mappersourcInstrumenAtpPerTagihan, rombel} = koleksiNilai;
                    const collection_atp_id_number =  koleksiAtpInMapelAll.filter(s=>s.kodeMapel === kodeMapel).flatMap(m=>m.collection_Atp.map(n=>n.atp_id));
                    // const NilaiSiswa = this.dataNilaiCurrentSiswaByKategoriAssesmen(strukturKurikulumCurrentMapel,dataNilaiRespon, dataNilaiSkorKd,type);
                    const NilaiSiswa = this.skorKdSheetBuild(strukturKurikulumCurrentMapel, dataNilaiSkorKd,type, mappersourcInstrumenAtpPerTagihan , idSiswa);
                    const NilaiSiswaRespon = this.skorKdResponBuild(strukturKurikulumCurrentMapel, dataNilaiRespon);
                    const totalMapel:number|null = null
                    const countSoalMapel:number|null = null
                    const skorMapel: number|null = null
                    const dataCp: CollectionNilaiCp[] = []
                    const sumberPaketSoal:KoleksiPublikasiPaketPerMapel[] = koleksiPaketSoal.filter(s=>s.koleksiMapel.includes(mapelName))
                    const collection_atp_id:number[] = collection_atp_id_number;
                    const collection_tp_id: number[] = koleksiAtpInMapelAll.filter(s=>s.kodeMapel === kodeMapel).flatMap(m=>m.collection_Tp.map(n=>n.tp_id));
                    const collection_cp_id: number[] = koleksiAtpInMapelAll.filter(s=>s.kodeMapel === kodeMapel).flatMap(m=>m.collection_Cp.map(n=>n.cp_id));
                    const skorKd_atp:SkorKdNullableType|undefined =undefined;//l
                    const skorKd_cp:SkorKdNullableType|undefined = undefined;//
                    const skorKd_tp:SkorKdNullableType|undefined = undefined;//
                    const mapel:CollectionNilaiMapel={
                        totalMapel,
                        countSoalMapel,
                        dataCp,
                        sumberPaketSoal,
                        collection_atp_id,
                        collection_tp_id,
                        collection_cp_id,
                        skorKd_tp,
                        skorKd_cp,
                        skorKd_atp,
                        skorMapel,
                        mapelName,
                        kodeMapel,
                        // dataNilaiRespon, dataNilaiSkorKd,
                        ...NilaiSiswaRespon,
                        ...NilaiSiswa
                    }
                    return {
                        idSiswa,
                        namaSiswa,
                        mapel,
                        rombel,
                        koleksiAtpInMapel:koleksiAtpInMapelcurrentMapel
                        
                    }
                })
                return {
                    mapel:kodeMapel,
                    dataNilai,
                    koleksiAtpInMapel:koleksiAtpInMapelcurrentMapel,
                    
                    
                }
            })
            return {
                type,
                data,
                koleksiAtpInMapel:koleksiAtpInMapelAll??[],
                // koleksiAtpInMapel:koleksiAtpInMapelMapperCurrentType ??[],
                koleksiPaketSoal
            }
        });
        return this;
    }

   /**
    * @deprecated
    */
    dataNilaiCurrentSiswaByKategoriAssesmen(
            strukturKurikulum:StrukturKurikulumMapelType[], 
            dataRespon:dataNilaiResponType[], 
            dataSheetKd: DataKdSheetApp[], 
            currentKategoriAssesm:KategoriTagihanType,
            // mapperAtpInInstrumen: AtpContainKoleksiBankSoalType
            // mapperAtpInInstrumen: AtpContainKoleksiBankSoalType
            mapperAtpInInstrumen: AtpContanTagihanHasKoleksiBankSoalWhoseCurrentAtpType,
            idSiswa:number
        ):Partial<CollectionNilaiMapel>{
            
            const ObjSkorKdSheet = this.skorKdSheetBuild(strukturKurikulum, dataSheetKd, currentKategoriAssesm, mapperAtpInInstrumen, idSiswa)
            return {
                ...ObjSkorKdSheet
            }
    }
    skorKdResponBuild(strukturKurikulum:StrukturKurikulumMapelType[], dataRespon:dataNilaiResponType[]):Partial<CollectionNilaiMapel>{
        // const dataCp = strukturKurikulum.map(mapel=>{
        const result:Partial<CollectionNilaiMapel> =  Object.create(null);
        const skorKd_atp:SkorKdNullableType = Object.create(null);
        const skorKd_tp:SkorKdNullableType = Object.create(null);
        const skorKd_cp:SkorKdNullableType = Object.create(null);

        strukturKurikulum.forEach(mapel=>{
            const {kodeMapel, mapelName, dataCp} = mapel;
            let totalMapel:number|null = null;
            let countSoalMapel:number|null = null;
            let skorMapel:number|null = null;

            const koleksiCp:CollectionNilaiCp[] = [];
            dataCp.forEach(cp=>{
                const {cp_id, cp_description, dataTp} = cp;
                let totalCp:number|null=null;
                let countSoalCp:number|null = null;
                let skorCp:number|null = null;
                const koleksiTp: CollectionNilaiTp[] = [];
                
                dataTp.forEach(tp=>{
                    const {tp_id, tp_description, dataAtp} = tp;
                    let totalTp:number|null = null;
                    let countSoalTp:number|null = null;
                    let skorTp:number|null = null;

                    const koleksiAtp:CollectionNilaiAtp[] = [];
                    dataAtp.forEach(atp=>{
                        const {atp_id, atp_description} = atp;
                        const found:dataNilaiResponType|undefined = dataRespon.find(s=>s.atp_id===atp_id);
                        const detail:DataSkorSiswaByInstrumenType[] = [];
                        let skorAtp: number|null = null;
                        let deviden:number|null= null;
                        let totalAtp:number|null = null;
                        
                        if(found){
                            
                            const itemInstrume = found.detailNilaiRespon.rispon;
                             
                            itemInstrume.forEach(respon=>{
                                totalAtp = (totalAtp ?? 0) + (respon.skor ?? 0)
                            });
                            deviden = (deviden ?? 0)+itemInstrume.length;


                        }
                        
                        if(totalAtp !== null && deviden !==null){
                            // const skor = Number((totalAtp/deviden).toFixed(2));
                            const skor = desimalFormat((totalAtp/deviden));
                            skorAtp = skor;

                            totalTp = (totalTp ?? 0) + totalAtp;
                            totalCp = (totalCp ?? 0) + totalAtp;
                            totalMapel =(totalMapel?? 0) + totalAtp;

                            countSoalTp = (countSoalTp ?? 0) + deviden;
                            countSoalCp = (countSoalCp ?? 0) + deviden;
                            countSoalMapel = (countSoalMapel ?? 0) + deviden;
                        }
                        
                        if(found){
                           
                            const founds = found.detailNilaiRespon.ref;
                           
                            
                            for(const responSiswa of founds){
                                const {siswa_id, siswa, idbaris, respon,publikasi, templateKoreksiSiswa} = responSiswa;
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
                                
                                const itemDetail:DataSkorSiswaByInstrumenType ={
                                    siswa_id,
                                    namaSiswa: siswa?.pd_nama!,
                                    rombel: siswa?.nama_rombel!,
                                    dataRefrensiTabResponTagihanJenjang,
                                    dataSumberPublikasiPaket: publikasi,
                                    dataPerBentukSoal,
                                    total: totalAtp ?? 0,
                                    countSoal:deviden ?? 0,
                                    skor: skorAtp ?? 0, 
                                    skorKd:{[kodeMapel+'_'+atp_id]:skorAtp??0}
                                    // skor: number;
                                    // skorKd: SkorKdType;
                                }
                                detail.push(itemDetail)

                            }
                           

                        }
                        const obKoleksiAtp:CollectionNilaiAtp =  {
                            atp_id, atp_description, skorAtp, totalAtp, countSoalAtp:deviden, detail
                        };
                        const keySkorKd=kodeMapel+'_'+atp_id;
                        skorKd_atp[keySkorKd] = skorAtp;
                        koleksiAtp.push(obKoleksiAtp);
                    })
                     if(totalTp !== null && countSoalTp !==null){
                            // const skor = Number((totalTp/countSoalTp).toFixed(2));
                            const skor = desimalFormat((totalTp/countSoalTp));
                            skorTp = skor;
                    }
                    const obKoleksiTp:CollectionNilaiTp =  {
                        tp_id,
                        tp_description,
                        koleksiAtp,
                        totalTp,
                        countSoalTp,
                        skorTp,
                    };
                    const keySkorKd=kodeMapel+'_'+tp_id;
                    skorKd_tp[keySkorKd] = skorTp;
                    
                    koleksiTp.push(obKoleksiTp);
                });

                if(totalCp !== null && countSoalCp !== null){
                    // skorCp = Number((totalCp/countSoalCp).toFixed(2));
                    skorCp = desimalFormat((totalCp/countSoalCp));

                }
                const obKoleksiCp:CollectionNilaiCp =  {
                    cp_id, cp_description, koleksiTp, totalCp, countSoalCp, skorCp
                }
                const keySkorKd=kodeMapel+'_'+cp_id;
                skorKd_cp[keySkorKd] = skorCp;
                
                koleksiCp.push(obKoleksiCp);
            });
            // result = Object.assign( {
            //     kodeMapel, mapelName, dataCp:koleksiCp, totalMapel, countSoalMapel,skorMapel
            // })
            if(totalMapel !== null && countSoalMapel !== null){
                // const skor = Number((totalMapel/countSoalMapel).toFixed(2));
                const skor = desimalFormat((totalMapel/countSoalMapel));
                skorMapel = skor;
            }

            result.kodeMapel = kodeMapel
            result.mapelName = mapelName;
            result.dataCp = koleksiCp;
            result.totalMapel= totalMapel;
            result.countSoalMapel = countSoalMapel;
            result.skorMapel = skorMapel
            result.skorKd_atp = skorKd_atp;
            result.skorKd_tp = skorKd_tp;
            result.skorKd_cp = skorKd_cp;
        })
        return {...result}
    }
    skorKdSheetBuild(
        strukturKurikulum:StrukturKurikulumMapelType[], 
        dataSheetKd: DataKdSheetApp[], 
        currentKategoriAssesmen:KategoriTagihanType,
        // mapperAtpInInstrumen: AtpContainKoleksiBankSoalType
        mapperAtpInInstrumen: AtpContanTagihanHasKoleksiBankSoalWhoseCurrentAtpType,
        idSiswa:number
        // const mappersourcInstrumenAtpPerTagihan: AtpContanTagihanHasKoleksiBankSoalWhoseCurrentAtpType
    ):Partial<CollectionNilaiMapel>{
            const ObjSkorKd_atp_sheet:SkorKdNullableType = Object.create(null);
            const ObjSkorKd_cp_sheet:SkorKdNullableType = Object.create(null);
            const ObjSkorKd_tp_sheet:SkorKdNullableType = Object.create(null);
            let skorMapel_sheet:number|undefined = undefined;
            let totalMapel_sheet:number|undefined = undefined;
            strukturKurikulum.forEach(mapel=>{
                const {kodeMapel, mapelName, dataCp} = mapel;
                let totalMapel:number|null = null;
                let countMapel:number = 0;
                
                dataCp.forEach(cp=>{
                    const {cp_id, cp_description, dataTp} = cp;
                    /** */
                    let countCp :number = 0;
                    let totalCp:number|null=null;
                    dataTp.forEach(tp=>{
                        const {tp_id, tp_description, dataAtp} = tp;
                        let countTp:number = 0;
                        let totalTp: number|null= null;

                        dataAtp.forEach(atp=>{
                            const {atp_id, atp_description} = atp;
                            let nilaiAtp: number|null = null;
                            let devidenAtp:number = 0;
                            
                            const foundSkorKdSheet = dataSheetKd?.filter(s=>s.atp_id === atp_id && s.kategoriAssesmen === currentKategoriAssesmen);
                            const foundRefInstrumen = mapperAtpInInstrumen.get(atp_id)
                            
                            if(foundSkorKdSheet){
                                foundSkorKdSheet.forEach(nilai=>{
                                    const countInstumenSoalBasedOnCurrentAtpByPublikasi = foundRefInstrumen?.find(s=>s.dataTagihan.idbaris === nilai.publikasi_id);
                                    const countInstumenSoalBasedOnCurrentAtpByIdSiswa = countInstumenSoalBasedOnCurrentAtpByPublikasi?.memberCurrentTagihanMapper?.get(idSiswa)
                                    if(!countInstumenSoalBasedOnCurrentAtpByIdSiswa) return;
                                    
                                    const countInstumenSoalBasedOnCurrentAtp = countInstumenSoalBasedOnCurrentAtpByPublikasi?.atpSoal?.length ?? 0;
                                    nilaiAtp =  desimalFormat(((nilaiAtp??0) + ((nilai.skor ?? 0) * countInstumenSoalBasedOnCurrentAtp)));
                                    
                                    devidenAtp +=countInstumenSoalBasedOnCurrentAtp;
                                })
                                // devidenAtp = foundRefInstrumen?.map(m=>m?.atpSoal?.length ?? 0)?.reduce((a,b)=>(a+b)) ?? 0
                                // devidenAtp = foundSkorKdSheet.length;
                            };
                            
                            if(nilaiAtp!==null){
                                
                                const keyAtp = kodeMapel+'_'+atp_id;
                                // const skorAtp = Number((nilaiAtp/devidenAtp).toFixed(2))
                                const skorAtp = desimalFormat((nilaiAtp/devidenAtp))
                                ObjSkorKd_atp_sheet[keyAtp] = skorAtp;
                                totalCp = (totalCp ?? 0) + nilaiAtp;
                                totalTp = (totalTp ?? 0) + nilaiAtp;
                                totalMapel = (totalMapel ?? 0) + nilaiAtp;
                                
                                countTp += devidenAtp;
                                countCp += devidenAtp;
                                countMapel += devidenAtp;
                            }
                        })
                        
                        const keyTp = kodeMapel+'_'+tp_id;
                        
                        if(totalTp!==null){
                            // const skorTp = Number((totalTp/countTp).toFixed(2))
                            const skorTp = desimalFormat((totalTp/countTp))
                            ObjSkorKd_tp_sheet[keyTp] = skorTp;
                        }

                    });
                    const keyCp = kodeMapel+'_'+cp_id;
                    // ObjSkorKd_cp_sheet[keyCp] = 0;
                    if(totalCp!==null){
                        // const skorCp = Number((totalCp/countCp).toFixed(2))
                        const skorCp = desimalFormat((totalCp/countCp))
                        ObjSkorKd_cp_sheet[keyCp] = skorCp;
                    }
                })

                if(totalMapel!==null){
                    // const skor = Number((totalMapel/countMapel).toFixed(2));
                    const skor = desimalFormat((totalMapel/countMapel));
                    skorMapel_sheet= skor
                }
                totalMapel_sheet =totalMapel ?? 0
            })
            return {
                skorKd_atp_sheet: Object.keys(ObjSkorKd_atp_sheet).length===0?undefined: ObjSkorKd_atp_sheet,
                skorKd_tp_sheet: Object.keys(ObjSkorKd_tp_sheet).length===0?undefined: ObjSkorKd_tp_sheet,
                skorKd_cp_sheet: Object.keys(ObjSkorKd_cp_sheet).length===0?undefined: ObjSkorKd_cp_sheet,
                skorMapel_sheet,
                totalMapel_sheet
            }
    }
}