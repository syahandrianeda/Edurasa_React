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
import MapperSiswaOnDataResponBuilder, { type MapperSiswaOnDataResponType } from "~/domain/respon-tagihan-jenjang/mapper/MapperSiswaOnDataResponBuilder";
import type { KategoriTagihanType } from "../types/entities/KategoriTagihanType";
import getOrCreateMap from "~/lib/getOrCreateMapper";
import type { StrukturAtpType, StrukturCpType, StrukturTpType } from "~/domain/trees-struktur-kurikulum";
import type { CollectionNilaiCp } from "../types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiCp";
import type { SkorKdNullableType } from "~/domain/penilaian/type/SkorKdType";
import MapperTagihanHasDataRespon from "~/domain/penilaian/infrastucture/MapperTagihanHasDataRespon";
import KategoriTagihanRaportBuilder from "../builder/KategoriTagihanRaportBuilder";
import KategoriTagihanHasManyPesertaMapelBuillder from "../builder/KategoriTagihanHasManyPesertaMapelBuillder";
import type { jp_mapelApp } from "~/types/mapel/jp_mapel";
import type { DataSkorSiswaByInstrumenType } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/DataSkorSiswaByInstrumenType";
import type { CollectionNilaiTp } from "../types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiTp";
import type { CollectionNilaiAtp } from "../types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiAtp";
import type { RefrensiTabResponTagihanJenjangType } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/RefrensiTabResponTagihanJenjangType";
import type { DataRefrensiPerBentukSoal } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/DataRefrensiPerBentukSoal";
import desimalFormat from "~/lib/desimal-format";
import SkorKdSheetMapper from "../infrastructures/SkorKdSheetMapper";
import MapperPesertaTagihan from "../infrastructures/MapperPesertaTagihan";
import DataSheetSkorKdKategoriAsesmenMapper from "../infrastructures/DataSheetSkorKdKategoriAsesmenMapper";
import type { StrukturKurikulumMapelType } from "~/domain/trees-struktur-kurikulum/struktur-kurikulum-type";
import type { SiswaType } from "~/types/siswa";
import type { CollectionNilaiCpSheet } from "../types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiCpSheet";
import type { CollectionNilaiTpSheet } from "../types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiTpSheet";
import type { CollectionNilaiAtpSheet } from "../types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiAtpSheet";


export default class KategoriAssesmenClass{
    private _resultData:KategoriTagihanHasManyPesertaMapelType[]=[]
    constructor(
        private readonly data:TagihanHasDataResponse[], 
        private readonly memberMapel:DataSiswaHasMapelType[],
        private readonly mapelRaport:jp_mapelApp[]){};
    
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
        
        for(const type of koleksiKategoriAssesmen){
            /** result object yang diharapkan dii tiap-tiap kategori assesmen */
            const objKategoriTagihanHasManyPesertaMapelType:KategoriTagihanHasManyPesertaMapelType = Object.create(null);
            /** `data` adalah koleksi data yang berisi [dataNilai, mapel, ] */
            const data:KoleksiMapelBasedSiswaInResponAllKategoriTagihan[] = [];
            
            const koleksiAtpInMapel: RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan[] = [];

            const koleksiJenisTagihanHasRespon = mapperKategoriAssesmen.get(type);
            
            if(!koleksiJenisTagihanHasRespon) {
                /** jika tidak ditemukan koleksii jenis tagihan, tetap buatkan data type-nya.
                 * properti lain akan default;
                 */
                objKategoriTagihanHasManyPesertaMapelType.type = type;
                objKategoriTagihanHasManyPesertaMapelType.data = data;
                objKategoriTagihanHasManyPesertaMapelType.koleksiPaketSoal = [];
                objKategoriTagihanHasManyPesertaMapelType.koleksiAtpInMapel = koleksiAtpInMapel;
                result.push(objKategoriTagihanHasManyPesertaMapelType);
                continue;
            }
            
            const {dataPublikasiPaket, dataPublikasiPaketWithRespon} = koleksiJenisTagihanHasRespon;
            const data_respons = dataPublikasiPaketWithRespon.flatMap(m=>m.data_respons);
            const dataSkorKdSheet = dataPublikasiPaketWithRespon.flatMap(m=>m.dataSkorKdSheet);
            const strukturKurikulumKategoriAssesmen = StrukturKurikulumInTagihanHasDataResponBuilder.buildWithSlot(dataPublikasiPaketWithRespon);
            
            const siswaHasDataResponMapper:MapperSiswaOnDataResponType = MapperSiswaOnDataResponBuilder.build(data_respons);
            const mapperDataSkorKdSheet = SkorKdSheetMapper.build(dataSkorKdSheet);
            const siswaAsPesertaTagihan = MapperPesertaTagihan.buildMapperSiswaHasTagihanMapper(dataPublikasiPaketWithRespon);

            const mapperSkor = DataSheetSkorKdKategoriAsesmenMapper.build(dataSkorKdSheet,siswaAsPesertaTagihan)

            const koleksiPaketSoal: KoleksiPublikasiPaketPerMapel[] = dataPublikasiPaketWithRespon?.map(m=>{
                const {idbaris, data_respons, data_response_bySiswa, nama_publikasi, koleksi_mapelName} = m
                return {
                    idbaris,
                    namaPublikasi:nama_publikasi,
                    koleksiMapel:koleksi_mapelName,
                    countRespon:data_response_bySiswa.filter(s=>s.data.length>0).length,
                    detail: m
                }
            })
            
            /**
             * ============ TEST REFAKTOR
             */
           
            /**
             * ========= BUILD DATA ========
             * data:KoleksiMapelBasedSiswaInResponAllKategoriTagihan;
             * sumber refrensinya diambil dari `strukturKurikulumKategoriAssesmen` dimana berisi data:
             *  - seluruh mapel tagihan yang dipublikasikan
             *  - tiap tagihan sudah mempunyai `data_respon` dan `dataSheetKd`
             *  - `data_respon` berasal dari tab `respon_tagihan_<Jenjang>
             *  - `dataSheetKd` beradal dari tab ['harian', 'mid_semester', `akhir_semester`];
            */
           
           
           for(const mapelRapor of this.mapelRaport){
               const {kode,nama_mapel,data_students} = mapelRapor;
               
               /** found Mapel in Struktur Kurikulum in current kategori assesmen */
               const foundCurrentMapelStruktur = strukturKurikulumKategoriAssesmen.find(s=>s.kodeMapel === kode);
              
                /** 
                 * kita hanya mengoleksi mapel yang telah dipublikasin, jadi `foundMapelStrukturKurikulum` 
                 * yang  tidak terdeteksi, tidak dimasukkan 
                 * */
                if(foundCurrentMapelStruktur){
                    const {mapelName:mapelNameStruktur,kodeMapel:kodeMapelStruktur, dataCp:dataCpStruktur, slotMapel} = foundCurrentMapelStruktur;
                    const dataNilai:DataSiswaBasedMapelInResponAllKategoriTagihanInterface[] = [];
                    const collection_Cp: StrukturCpType[] = dataCpStruktur.map(({cp_id, cp_description})=>({cp_id, cp_description}))//.map(m=>({}));
                    const collection_Tp: StrukturTpType[] = dataCpStruktur.flatMap(cp=>cp.dataTp.map(({tp_id, tp_description})=>({tp_id, tp_description})));
                    const collection_Atp: StrukturAtpType[] = dataCpStruktur.flatMap(m=>m.dataTp.flatMap(n=>n.dataAtp.map(({atp_id, atp_description})=>({atp_id, atp_description}))));
                    
                    const koleksiAtpInMapelInCurrentMapel:RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan = {
                        kodeMapel:kode,
                        collection_Atp,
                        collection_Tp,
                        collection_Cp
                    }
                    /** registrasikan dataSiswa mapel ini */
                    for(const siswa of data_students){
                        const {id:idSiswa, pd_nama:namaSiswa, nama_rombel:rombel} = siswa;
                        
                        
                        const refrensiResponTagihan = siswaHasDataResponMapper.get(idSiswa);
                       
                        const refrensiSkorKdSheet = mapperDataSkorKdSheet.mapperSiswaHasDataSkorKdSheet.get(idSiswa);//.get(atpCurrentMapel.atp_id)?.belongsToSiswa.get(idSiswa)
                        const siswaPeserta = siswaAsPesertaTagihan.get(idSiswa);
                        /** proses kalkukasi */
                        let totalMapel:number|null = null;
                        let countSoalMapel:number=0;
                        const dataCp:CollectionNilaiCp[] = []
                        let skorMapel:number|null = null;
                        

                        let skorMapel_sheet:number|null = null;
                        let totalMapel_sheet:number|null=null;
                        let countSoalMapel_sheet:number=0;
                        const dataCp_sheet:CollectionNilaiCpSheet[] = [];
                        const skorKd_atp_sheet:SkorKdNullableType = Object.create(null);
                        const skorKd_tp_sheet:SkorKdNullableType = Object.create(null);
                        const skorKd_cp_sheet:SkorKdNullableType = Object.create(null);
                        const skorKd_atp:SkorKdNullableType = Object.create(null);
                        const skorKd_cp:SkorKdNullableType = Object.create(null);
                        const skorKd_tp:SkorKdNullableType = Object.create(null);
                        
                        
                        for(const CpCurrentMapel of dataCpStruktur){
                            const {cp_id,cp_description, dataTp:dataTpStruktur, slotCp}= CpCurrentMapel;
                            
                            const keyCpSheet = `${kodeMapelStruktur}_${cp_id}`;
                            let totalCp_sheet:number|null=null;
                            let countSoalCp_sheet: number= 0;
                            let skorCp_sheet:number|null = null;
                            
                            let totalCp:number|null = null;
                            let skorCp:number|null = null;
                            let countSoalCp:number = 0;


                            let koleksiTp:CollectionNilaiTp[]=[]
                            let koleksiTpSheet:CollectionNilaiTpSheet[]=[]
                            for(const TpCurrentMapel of dataTpStruktur){
                                const {tp_id, tp_description, slotTp, dataAtp:dataAtpStruktur}=TpCurrentMapel;
                                let keyTpSheet = `${kodeMapelStruktur}_${tp_id}`;
                                let totalTp_sheet:number|null = null;
                                let countTpSoal_sheet:number=0;
                                let skorTp_sheet:number|null = null;
                                /** counted respon siswa */
                                let totalTp:number|null = null;
                                let skorTp:number|null = null;
                                let countSoalTp:number = 0;
                                const koleksiAtp:CollectionNilaiAtp[]=[];
                                const koleksiAtpSheet:CollectionNilaiAtpSheet[]=[]
                                for(const atpCurrentMapel of dataAtpStruktur){
                                    const {atp_id, atp_description} = atpCurrentMapel;
                                     
                                    /** skorKdSheet */
                                    let keySkorKdAtpSheet = `${kodeMapelStruktur}_${atp_id}`;
                                    let countSoalAtp:number = 0;
                                    let totalAtp_sheet:number|null = null;
                                    let countSoalAtp_sheet:number = 0;
                                    let skorAtp_sheet:number|null = null
                                    const currentAllSkorAtp = refrensiSkorKdSheet?.dataKdSheetMapper.get(atp_id)?.dataSkorKd;
                                    if(currentAllSkorAtp){
                                        for(const dataTabKd of currentAllSkorAtp){
                                            const {atp_id,publikasi_id,skor}=dataTabKd;
                                            const CountSoalThatSiswaAsPesertaInCurrentTegahan = siswaPeserta?.tagihanMapper.get(publikasi_id)?.atpSoalMapper?.get(atp_id)?.length ?? 0;
                                            if(skor !==null){
                                                totalAtp_sheet = (totalAtp_sheet ?? 0) + ((skor ?? 0) * CountSoalThatSiswaAsPesertaInCurrentTegahan);
                                                // countSoalAtp_sheet  += CountSoalThatSiswaAsPesertaInCurrentTegahan;
                                                countSoalAtp_sheet +=  CountSoalThatSiswaAsPesertaInCurrentTegahan;
                                            }

                                        }
                                    }
                                    skorKd_atp_sheet[keySkorKdAtpSheet] = null;
                                    if(totalAtp_sheet!==null){
                                        skorAtp_sheet = desimalFormat(totalAtp_sheet/countSoalAtp_sheet);
                                        skorKd_atp_sheet[keySkorKdAtpSheet] = skorAtp_sheet;

                                        totalTp_sheet = desimalFormat((totalTp_sheet ?? 0) + totalAtp_sheet);
                                        countTpSoal_sheet += countSoalAtp_sheet;

                                        totalCp_sheet = desimalFormat((totalCp_sheet ?? 0) + totalAtp_sheet);
                                        countSoalCp_sheet += countSoalAtp_sheet;

                                        totalMapel_sheet = desimalFormat((totalMapel_sheet ?? 0) + totalAtp_sheet);
                                        countSoalMapel_sheet += countSoalAtp_sheet;

                                    }

                                    /**skor respon */
                                    const currentResponThisSiswa = refrensiResponTagihan?.responAtpMapper.get(atp_id);
                                    let totalAtp:number|null = null;
                                    let skorAtp:number|null = null;
                                    let countSoalAtpRespon:number = 0
                                    const detail: DataSkorSiswaByInstrumenType[] = []
                                    if(currentResponThisSiswa){
                                        const {ref, rispon} = currentResponThisSiswa;
                                        for(const itemRispon of rispon){
                                            const {skor, no_prefix, bentuk_soal, bentuk_soal_detail} = itemRispon;
                                            if(skor!==null){
                                                totalAtp = ((totalAtp ?? 0) + (skor ?? 0));
                                            }
                                            
                                        };
                                        countSoalAtpRespon+=rispon.length;
                                        for(const itemRef of ref){
                                            const {publikasi,siswa_id,skor_kd, respon, idbaris, templateKoreksiSiswa, objekKdSebaran, skorKdSebaran}=itemRef;
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
                                            const skor= objekKdSebaran[keySkorKdAtpSheet]
                                            let totalDetail:number|null = 0;
                                            
                                            for(const itemDetail of dataRefrensiTabResponTagihanJenjang){
                                                totalDetail = (totalDetail ?? 0)+(itemDetail.skor ?? 0)
                                            }

                                            detail.push({
                                                siswa_id,
                                                namaSiswa,
                                                rombel,
                                                total: totalDetail,
                                                countSoal: dataRefrensiTabResponTagihanJenjang.length,
                                                dataRefrensiTabResponTagihanJenjang,
                                                dataPerBentukSoal,
                                                dataSumberPublikasiPaket:publikasi,
                                                skor,
                                                skorKd:{[keySkorKdAtpSheet]:skor}



                                            })
                                        }
                                    }

                                    skorKd_atp[keySkorKdAtpSheet] = null;
                                    if(totalAtp!==null){
                                        const skorAtpRispon = desimalFormat(totalAtp/countSoalAtpRespon);
                                        skorKd_atp[keySkorKdAtpSheet] = skorAtpRispon;

                                        totalTp = (totalTp ?? 0) + totalAtp;
                                        countSoalTp += countSoalAtpRespon;

                                        totalCp = (totalCp?? 0) + totalAtp;
                                        countSoalCp +=countSoalAtpRespon;

                                        totalMapel= (totalMapel ?? 0) + totalAtp;
                                        countSoalMapel += countSoalAtpRespon;

                                    }

                                    koleksiAtp.push({
                                        atp_id,
                                        atp_description,
                                        totalAtp,
                                        countSoalAtp:countSoalAtpRespon,
                                        skorAtp,
                                        detail

                                    })
                                    koleksiAtpSheet.push({
                                        atp_id,
                                        atp_description,
                                        totalAtp: totalAtp_sheet,
                                        countKeyAtp: countSoalAtp_sheet,
                                        skorAtp: skorAtp_sheet,
                                        

                                    })


                                };
                                skorKd_tp_sheet[keyTpSheet]=null;
                                if(totalTp_sheet !== null){
                                    skorTp_sheet = desimalFormat(totalTp_sheet/countTpSoal_sheet);
                                    skorKd_tp_sheet[keyTpSheet] = skorTp_sheet;
                                }
                                skorKd_tp[keyTpSheet] = null;
                                if(totalTp!== null){
                                    skorTp = desimalFormat(totalTp/countSoalTp);
                                    skorKd_tp[keyTpSheet] = skorTp;
                                }

                                koleksiTp.push({
                                    tp_id,
                                    tp_description,
                                    totalTp,
                                    slotTp,
                                    countSoalTp,
                                    skorTp,
                                    koleksiAtp
                                })
                                koleksiTpSheet.push({
                                    tp_id,
                                    tp_description,
                                    totalTp :totalTp_sheet,
                                    countKeyTp:countTpSoal_sheet,
                                    skorTp: skorTp_sheet,
                                    slotTp,
                                    koleksiAtp:koleksiAtpSheet
                                })

                                
                            }
                            skorKd_cp_sheet[keyCpSheet] = null;
                            if(totalCp_sheet !== null){
                                skorCp_sheet= desimalFormat(totalCp_sheet/countSoalCp_sheet);
                                skorKd_cp_sheet[keyCpSheet] = skorCp_sheet;
                            }
                            
                            skorKd_cp[keyCpSheet] = null;
                            if(totalCp!== null){
                                skorCp = desimalFormat(totalCp/countSoalCp);
                                skorKd_cp[keyCpSheet] = skorCp;
                            }
                            

                            dataCp.push({
                                cp_id,
                                cp_description,
                                countSoalCp,
                                skorCp,
                                slotCp,
                                koleksiTp,
                                totalCp
                            })
                            dataCp_sheet.push({
                                cp_id,
                                cp_description,
                                slotCp,
                                countKeyCp: countSoalCp_sheet,
                                skorCp: skorCp_sheet,
                                koleksiTp : koleksiTpSheet,
                                totalCp: totalCp_sheet
                            })



                        }
                        
                        if(totalMapel_sheet!==null){
                            const skor = desimalFormat(totalMapel_sheet/countSoalMapel_sheet);
                            skorMapel_sheet = skor;
                        }
                        if(totalMapel!==null){
                            const skor = desimalFormat(totalMapel/countSoalMapel);
                            skorMapel = skor;
                        }

                       
                        const mapel:CollectionNilaiMapel=Object.create(null);
                                mapel.kodeMapel= kodeMapelStruktur;
                                mapel.mapelName= mapelNameStruktur;
                                mapel.totalMapel_sheet = totalMapel_sheet;//totalMapel_sheet===null ? undefined: totalMapel_sheet;
                                mapel.countSoalMapel_sheet = countSoalMapel_sheet;
                                mapel.skorMapel_sheet = skorMapel_sheet;
                                mapel.dataCp_sheet = dataCp_sheet;
                                mapel.skorKd_cp_sheet = Object.keys(skorKd_cp_sheet).length === 0? undefined: skorKd_cp_sheet;
                                mapel.skorKd_tp_sheet = Object.keys(skorKd_tp_sheet).length === 0? undefined: skorKd_tp_sheet;
                                mapel.skorKd_atp_sheet = Object.keys(skorKd_atp_sheet).length === 0? undefined: skorKd_atp_sheet;
                                mapel.slotMapel = slotMapel;
                                mapel.totalMapel = totalMapel;
                                mapel.countSoalMapel = countSoalMapel;
                                mapel.dataCp = dataCp;
                                mapel.skorKd_atp = Object.keys(skorKd_atp).length === 0? undefined: skorKd_atp;
                                mapel.skorKd_tp = Object.keys(skorKd_tp).length === 0? undefined:skorKd_tp;
                                mapel.skorKd_cp = Object.keys(skorKd_cp).length === 0? undefined:skorKd_cp;
                                mapel.skorMapel = skorMapel;


                        // mapel.countSoalMapel_sheet = countSoalMapel_sheet
                        const memberOfTagihan = dataPublikasiPaketWithRespon.filter(s=>s.peserta.some(siswa=>siswa.id === idSiswa) && s.koleksi_mapelName.includes(mapelNameStruktur))
                        const obDataNilai:DataSiswaBasedMapelInResponAllKategoriTagihanInterface ={
                            idSiswa,
                            namaSiswa,
                            rombel,
                            mapel,
                            koleksiAtpInMapel: koleksiAtpInMapelInCurrentMapel,
                            memberOfTagihan
                        }
                        dataNilai.push(obDataNilai)
                    }


                    
                    const koleksiMapel:KoleksiMapelBasedSiswaInResponAllKategoriTagihan = {
                        mapel:kode,
                        dataNilai,
                        koleksiAtpInMapel:koleksiAtpInMapelInCurrentMapel
                    }

                   

                    data.push(koleksiMapel);
                    koleksiAtpInMapel.push(koleksiAtpInMapelInCurrentMapel);
                }
           }

            objKategoriTagihanHasManyPesertaMapelType.type = type;
            objKategoriTagihanHasManyPesertaMapelType.data = data;
            objKategoriTagihanHasManyPesertaMapelType.koleksiPaketSoal = koleksiPaketSoal;
            objKategoriTagihanHasManyPesertaMapelType.koleksiAtpInMapel = koleksiAtpInMapel;
            result.push(objKategoriTagihanHasManyPesertaMapelType);
        }
        this._resultData =result;
        return this;
    }

}