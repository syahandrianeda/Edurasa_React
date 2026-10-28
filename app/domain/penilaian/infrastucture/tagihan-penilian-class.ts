import type { PublikasiPaketAppType } from "~/types/publikasi-paket-soal/publikasi-paket-app-type";
import DtoPaketSoalSheetClass from "~/dtos/dto-paket-soal-sheet-class";
import type { PaketSoalSheetType } from "~/types/paket-soal/paket-soal-sheet-type";
import type { AtpHasManySoalType } from "~/domain/bank-soal/relational-soal/type";
import type { TagihanHasDataResponse } from "../type/tagihan-assesmen-type";
import type { DetailTarget } from "../type/DetailTarget";
import type { SiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif";
import { durasiMenit } from "~/lib/date-helper";
import SebaranTagihanKurikulumClass, { type SebaranTagihanAssesmenKurikulumType } from "./sebaran-tagihan-kurikulum-class";
import type { PraSettingBaku } from "~/types/bank-soal/entities/PraSettingBaku";
import type { NilaiSiswaAppType } from "~/types/penilaian/nilai-siswa-app-type";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
// import GroupingSebaranKurikulum from "./grouping-kurikulum-to-sebaran";
// import type { templateResponseKoreksi } from "../type/templateResponseKoreksi";
// import type { DataResponseKoreksi } from "../type/DataResponseKoreksi";
// import type { GroupSebaranNoSoalFromPropertyKurikulum } from "../model/grouping-kurikulum-by-bentuksoal";
// import type { CountBentukSoalPaket } from "~/domain/paket-soal/entities/count-bentuk-soal-paket";
// import type { TemplateKoreksiSiswaType } from "~/types/penilaian/TemplateKoreksiSiswaType";
// import type { DataTemplateKoreksiSiswa } from "~/types/penilaian/DataTemplateKoreksiSiswa";
// import BankSoalAppUndefined from "~/domain/bank-soal/orm/bank-soal-undifined";
// import RisponsePenilaianSiswaBuilder from "./rispon-penilaian-siswa-builder";
import type { PaketSoalStruktur } from "~/domain/paket-soal/paket-soal-struktur/PaketSoalStrukturType";
import { PaketSoalStrukturBuilder } from "~/domain/paket-soal/paket-soal-struktur/PaketSoalStrukturBuilder";
import RisponseNilaiSiswaBuilder from "./RisponseNilaiSiswaBuilder";
import TemplateKoreksiSiswaBuilder from "~/types/penilaian/TemplateKoreksiSiswaBuilder";
import GroupingSebaranInPaketSoal from "./grouping-sebaran-in-paket-soal";
import DetailTargetBuilder from "./DetailTargetBuilder";
import BankSoalCollectionsBuilder from "./BankSoalCollectionsBuilder";
import SkorKdSebaranBuilder from "./SkorKdSebaranBuilder";
import SkorKdBuilder from "./SkorKdBuilder";
import type { KeyLabelTemplateImport, TemplateImportSkorToKd } from "~/domain/import-skor-to-kd/TemplateImportSkorToKd-type";
import TemplateImportSkorToKdBuilder from "~/domain/import-skor-to-kd/TemplateImportSkorToKd-builder";
import type { DataSheetSkorKdSelectorType } from "~/context-reduct/selectores/rekap-sheet-kategori-assesment-selector";
import SwitchKategoriTagihan from "~/domain/asesmen-penilaian/switch-kategori-tagihan-class";
import type { KategoriTagihanType } from "../../kategori-tagihan/types/entities/KategoriTagihanType";
import type { DataSheetSkorKdKategoriAsesmenAppType } from "~/types/penilaian/DataSheetSkorKdKategoriAsesmenAppType";
import type { CollactionMapelInAllPublikasiPaketType } from "../type/collection-kurikulum-in-all-publikasi/CollactionMapelInAllPublikasiPaketType";
import CountInstrumenSoalTiapAtpInPublikasiPaket from "./CountInstrumenSoalTiapAtpInPublikasi";
import { SanitizerOrderMapelBasedOnMapelRaport } from "~/domain/sanitizer/sanitizer-order-mapel";
import type { jp_mapelApp } from "~/types/mapel/jp_mapel";
import { SanitizerKodeMapelRaport } from "~/domain/sanitizer/sanitizer-kode-mapel-rapor";
import { dataSiswaHasMapel, type DataSiswaHasMapelType } from "./dataSiswaHasMapel";
import KategoriTagihanRaportBuilder from "~/domain/kategori-tagihan/builder/KategoriTagihanRaportBuilder";
import KategoriTagihanHasManyPesertaMapelBuillder from "~/domain/kategori-tagihan/builder/KategoriTagihanHasManyPesertaMapelBuillder";
import MapperTagihanHasDataRespon from "./MapperTagihanHasDataRespon";
import type { DataTipeAssesmenMapper, MapelMapperInAllPublikasiPaket } from "../type/collection-kurikulum-in-all-publikasi/StrukturKurikulumMapper";
import type { KategoriTagihanHasManyPesertaMapelType } from "~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/KategoriTagihanHasManyPesertaMapelType";
import type { KategoriTagihanHasManyResponSiswaType } from "~/domain/kategori-tagihan/types";
import KategoriAssesmenClass from "~/domain/kategori-tagihan/services/KategoriAssesmenClass";
import AtMapperTagihanHasRespons from "~/domain/atp-mapper/AtMapperTagihanHasRespons";


/** 
 * @info Instansiasi pembuatan data KBM di fitur Guru _
 * TagihanPenilaianClass adalah class untuk menginstasiasi data pada sheet [bank_soal] dan tab [publikasi_paket];
 * Ini digunakan untuk mendata 
 */
export default class TagihanPenilaianClass extends DtoPaketSoalSheetClass{
    private tagihanHasResponse:TagihanHasDataResponse[]=[];
    private sebaranTagihanKurikulum: SebaranTagihanAssesmenKurikulumType[]=[];
    private defaultJsonSettingBaku:PraSettingBaku|undefined = undefined
    private colectionCountInstrumenSoalTiapAtpInPublikasiPaket: CollactionMapelInAllPublikasiPaketType[]=[];
    private memberMapel:DataSiswaHasMapelType[]=[]
    /**
     * @info:
     * kategori ini ini untuk satu item publikasi paket soal
     */
    private KategoriTagihanHasManyPesertaMapel:KategoriTagihanHasManyPesertaMapelType[]=[];
    private kategoriTagihanRaport:KategoriTagihanHasManyResponSiswaType[]=[];

    private rekapSkorPerKategoriAsessmmen:KategoriTagihanHasManyPesertaMapelType[]=[];
    constructor(
            dataSheet:PaketSoalSheetType[],
            atpHasBankSoal:AtpHasManySoalType[],
            rombel:string,
            publikasiPaket: PublikasiPaketAppType[],
            /** punya class ini sendiri */
            private readonly allSiswa:SiswaWithValidation[],
            private readonly responTagihan:NilaiSiswaAppType[],
            private readonly sheetRekapKd:DataSheetSkorKdSelectorType,
            private readonly mapelRaport:jp_mapelApp[]
        ){
            super(dataSheet,atpHasBankSoal,rombel,publikasiPaket)
        }
    
    get ataMapelRaport():jp_mapelApp[]{
        return this.mapelRaport
    }
    get dataTagihanHasResponse():TagihanHasDataResponse[]{
        return this.tagihanHasResponse;
    };
    /**
     * @deprecated ganti dengan property `dataCountInstrumenSoalTiapAtpInPublikasiPaket`
     */
    get dataSebaranTagihanKurikulum():SebaranTagihanAssesmenKurikulumType[]{
        return this.sebaranTagihanKurikulum
    }

    get dataCountInstrumenSoalTiapAtpInPublikasiPaket():CollactionMapelInAllPublikasiPaketType[]{
        // const data = CountInstrumenSoalTiapAtpInPublikasiPaket.build(this.tagihanHasResponse)
        return this.colectionCountInstrumenSoalTiapAtpInPublikasiPaket;
    }
    get koleksiKurikulumSemuaTagihan():AtpHasManySoalType[]{
        return [...new Set([...this.tagihanHasResponse.flatMap(m=>m.kurikulum_tagihan)])]
    }
    get koleksiSoalInAtp():BankSoalAppType[]{
        return this.atp.flatMap(m=>m.hasSoal)
    }
    // siswaInCurrentDate(tgl:Date):SiswaWithValidation[]{
    //     return this.allSiswa.filter(({data, validation})=> {
            
    //         const checkIn = getParseDateYYYYMMMDD(data.masuk_tgl);
    //         const checkOut =getParseDateYYYYMMMDD(data.keluar_tgl) === 0 ? Infinity: getParseDateYYYYMMMDD(data.keluar_tgl);
    //         const current = getParseDateYYYYMMMDD(tgl)
    //         return (checkIn <= current && checkOut >= current && data.jenjang === this.jenjang)
            
    //     })
    // }
    buildSebaranTagihanKurikulum():void{
        const instansiasi = new SebaranTagihanKurikulumClass(this.tagihanHasResponse).build();
        this.sebaranTagihanKurikulum = instansiasi.dataSebaran;
    }
    needValidasiRespon(bentukSoal: string[], respon: string): boolean {
        return respon === 'siswa'
        // if(bentukSoal.every(s=>s === 'pg')){
        //     return false
        // }else{
        //     return respon === 'siswa'

        // }

        
    }
    swtichSkorKdSheet(kategori:KategoriTagihanType):DataSheetSkorKdKategoriAsesmenAppType[]{
        switch(kategori){
            case 'harian':
                return this.sheetRekapKd.rekapHarian;
            case 'mid_semester':
                return this.sheetRekapKd.rekapMidSemester;
            case 'akhir_semester':
                return this.sheetRekapKd.rekapAkhirSemester;
            // case 'remedial_pengayaan':
            //     return this.sheetRekapKd.
            case 'ujian_sekolah':
                return this.sheetRekapKd.rekapUs;
            default:
                return this.sheetRekapKd.rekapHarian
        }
    }
    totalValidRespon(respon:RisponsePenilaianSiswa[]):number{
            return respon.filter(s=>s.respon !=='' && s.respon !== null).length
            // return respon.filter(s=>s.respon !=='').length
        }
    buildDetailPesertaRombel():void{
        
        this.tagihanHasResponse =  this.dataTagihanPenilaian.map(m=>{
                const jenisTagihan = m.jenis_tagihan
                
                const tipe_assesmen = new SwitchKategoriTagihan(jenisTagihan.kode).kategori;
                const dataSheetSkorKd = this.swtichSkorKdSheet(tipe_assesmen);
                const dataSkorKdSheet = dataSheetSkorKd.map(item=>({...item, data: item.data.filter(s=>s.publikasi_id === m.idbaris && s.jenisTagihan === jenisTagihan.kode && s.skor !== null)}));
                const detail_target:DetailTarget[] = DetailTargetBuilder.build(this.allSiswa, m, this.rombel);
                const kurikulum_tagihan     = m.setting_tagihan?.kurikulum ?? []
                const bank_soal_collections = m.source === 'Paket Soal'? BankSoalCollectionsBuilder.buildFromIdSoalCollection(m.id_bank_soal, this.koleksiSoalInAtp):BankSoalCollectionsBuilder.buildFromStrukturKurikulumPublikasi(kurikulum_tagihan);
                const StruturNaskah:PaketSoalStruktur[] = PaketSoalStrukturBuilder.buildFromCountBentukSoalPaket(bank_soal_collections, m.setting_tagihan?.count_bentuk_soal ?? []);
                const sebaran_kurikulum_by_bentuk_soal = GroupingSebaranInPaketSoal.build(StruturNaskah);
                const SkorKdCreated = SkorKdSebaranBuilder.build(sebaran_kurikulum_by_bentuk_soal,[]);
                const SkorKdTemplate = SkorKdBuilder.build(SkorKdCreated.data);
                const keySkorKD:string[] = Object.keys(SkorKdTemplate);
                const keyLabelSkorKd = keySkorKD.map(key=>({key, label:key, type:'number'}))
                const keyLabelRekapSkorKdSheet: KeyLabelTemplateImport[] = [
                    {key:'index', label:'No', type:'number'},
                    {key:'siswa_id', label:'Token Siswa', type:'number'},
                    {key:'nama_siswa', label:'Nama Siswa', type:'string'},
                    {key:'rombel', label:'Kelas', type:'string'},
                    ...keyLabelSkorKd
                ];
                const isMultiple            = Boolean(m.setting_tagihan?.koleksi_mapel?.isMultiple);
                const koleksi_mapelName     = m.setting_tagihan?.koleksi_mapel?.data ?? [];
                
                const peserta               = detail_target.flatMap(item=>item.data_siswa);//this.siswaInCurrentDate(m.end_time).map(siswa=>siswa.data).filter(s=> s.nama_rombel === this.rombel);
                const count_instrumen       = m.setting_tagihan?.count_bentuk_soal?.map(cbt=>cbt.count) ?? []
                const total_instrumen       = count_instrumen.length > 0 ? count_instrumen?.reduce((a, b)=>a+Number(b)):0;
                const data_respons          =  this.responTagihan.filter(s=>s.publikasi_id === m.idbaris && s.siswa_id).map(nilaiSiswa=>{
                    const sumber_respon = nilaiSiswa.sumber_respon
                    const respon:RisponsePenilaianSiswa[] = RisponseNilaiSiswaBuilder.build(StruturNaskah, nilaiSiswa.respon);
                    const templateKoreksiSiswa = TemplateKoreksiSiswaBuilder.build(StruturNaskah, respon)
                    const mapBentukSoal = respon.map(bs=>bs.bentuk_soal);
                    const needValidate = this.needValidasiRespon(mapBentukSoal, sumber_respon);
                    const siswa =peserta.find(s=>s.id === nilaiSiswa.siswa_id)
                    const durasiPengerjaan = ( nilaiSiswa.start_time &&  nilaiSiswa.end_time )? durasiMenit(nilaiSiswa.start_time, nilaiSiswa.end_time): 0 ;
                    const totalResponValid = this.totalValidRespon(respon);
                    const skorKdSebaran = SkorKdSebaranBuilder.build(sebaran_kurikulum_by_bentuk_soal,respon )
                    const objekKdSebaran = SkorKdBuilder.build(skorKdSebaran.data);// skorKdSebaran.data.map(m=>m.objekSkorKd).reduce((a,b)=>({...a,...b}))

                    return {
                        ...nilaiSiswa, 
                        respon,//: nilaiSiswa.respon.slice(0,m.id_bank_soal.length),
                        siswa,
                        durasiPengerjaan,//:( nilaiSiswa.start_time &&  nilaiSiswa.end_time )? durasiMenit(nilaiSiswa.start_time, nilaiSiswa.end_time): 0 ,
                        totalResponValid,//:this.totalValidRespon(respon), 
                        publikasi: m,
                        needValidate,
                        templateKoreksiSiswa,
                        skorKdSebaran,
                        objekKdSebaran
                    }
                })
            
                const data_response_bySiswa = peserta.map(siswa=>{
                    const data = data_respons.filter(s=>s.siswa_id ===siswa.id)
                    return {
                        siswa,
                        data
                    }
                });
                

                const jumlahPeresponMap = new Map(data_respons.map(r=>([r.siswa_id, r])));
                const jumlahPerespon = [...jumlahPeresponMap.keys()].length;
                const jumlahDuplikat = data_respons.length> jumlahPerespon ? data_respons.length-jumlahPerespon: 0
                
                const dataSkorKd  : TemplateImportSkorToKd[] = TemplateImportSkorToKdBuilder.build(data_response_bySiswa, SkorKdTemplate, dataSkorKdSheet,jenisTagihan.kode, m.idbaris);
                const messageInvalid:string[] = [];// m.is_validPaketSoal?[]:['Sumber paket soal telah diubah, ini hanya peringatan saja'];
                koleksi_mapelName.forEach(mapel=>{
                    const foundMapelNotFound = this.mapelRaport.find(s=>s.nama_mapel === mapel);
                    if(!foundMapelNotFound){
                        messageInvalid.push(`Mapel ${mapel.toUpperCase()} tidak tersedia untuk rombel ini`)
                    }
                })
            
            return {
                ...m,
                // is_validPaketSoal:true,
                messageInvalid,
                detail_target,
                data_respons,
                isMultiple,
                koleksi_mapelName,
                kurikulum_tagihan,
                peserta,
                total_instrumen,
                bank_soal_collections,
                sebaran_kurikulum_by_bentuk_soal,
                // templateKoreksi,
                data_response_bySiswa,
                jumlahPerespon,
                jumlahDuplikat,
                keySkorKD,
                dataSkorKd,
                keyLabelRekapSkorKdSheet,
                tipe_assesmen,
                dataSkorKdSheet,
                sebaranNoSoalFromPropertyKurikulumWithScore:SkorKdCreated
            }
        }).sort((a,b)=>(b.start_time.getTime()-a.start_time.getTime()))
    }
    get dataSiswaHasMapel():DataSiswaHasMapelType[]{
        return this.memberMapel
    } 
    buildUtilitesJpMapel(){
        const siswaCurrentRombel = this.allSiswa.filter(s=>s.data.nama_rombel === this.rombel && s.data.aktif === 'aktif').map(m=>m.data);
        this.memberMapel = dataSiswaHasMapel(siswaCurrentRombel, this.mapelRaport);

    }
    buildCounstInstrumen(kategoriMapper:DataTipeAssesmenMapper, StrukturKurikulumMapper:Map<string, MapelMapperInAllPublikasiPaket>):void{
        // this.colectionCountInstrumenSoalTiapAtpInPublikasiPaket = CountInstrumenSoalTiapAtpInPublikasiPaket.build(this.tagihanHasResponse)
        // const source = CountInstrumenSoalTiapAtpInPublikasiPaket.build(this.tagihanHasResponse)
        const source = CountInstrumenSoalTiapAtpInPublikasiPaket.buildFromMapper(kategoriMapper, StrukturKurikulumMapper);
        const order = this.mapelRaport.map(m=>m.kode);
        const sanitizeMapel = SanitizerKodeMapelRaport(source,order)
        this.colectionCountInstrumenSoalTiapAtpInPublikasiPaket = SanitizerOrderMapelBasedOnMapelRaport<CollactionMapelInAllPublikasiPaketType>(sanitizeMapel, order);
    }
    get dataKategoriTagihanHasManyPesertaMapel():KategoriTagihanHasManyPesertaMapelType[]{
        return this.KategoriTagihanHasManyPesertaMapel;
    }
    get dataKategoriTagihanRaport():KategoriTagihanHasManyResponSiswaType[]{
        return this.kategoriTagihanRaport
    }
    builKategoriTagihan(kategoriMapper:DataTipeAssesmenMapper, StrukturKurikulumMapper:Map<string, MapelMapperInAllPublikasiPaket>):void{
        const kategoriTagihanRaport = KategoriTagihanRaportBuilder.buildFromMapper(kategoriMapper, StrukturKurikulumMapper);
        const koleksiMapel:string[] = this.mapelRaport.map(m=>m.kode);
            this.kategoriTagihanRaport = kategoriTagihanRaport;
            this.KategoriTagihanHasManyPesertaMapel = KategoriTagihanHasManyPesertaMapelBuillder.buildRaport(kategoriTagihanRaport,this.memberMapel ?? [],koleksiMapel)
            
    }
    get dataRekapPerKategoriAssesmen():KategoriTagihanHasManyPesertaMapelType[]{
        return this.rekapSkorPerKategoriAsessmmen;
    }
    buildKategoriTagihanMapper(){
        
        this.rekapSkorPerKategoriAsessmmen = new KategoriAssesmenClass(this.tagihanHasResponse,this.memberMapel,this.mapelRaport).init().result;
    }
    override init():this{
        super.init();
        this.buildDetailPesertaRombel();
        this.buildUtilitesJpMapel();
        this.buildSebaranTagihanKurikulum();
        const {mapperKategoriTagihanPerAtpSkor, mapperStrukturKurikulum} = MapperTagihanHasDataRespon(this.tagihanHasResponse)
        this.buildCounstInstrumen(mapperKategoriTagihanPerAtpSkor, mapperStrukturKurikulum);
        this.builKategoriTagihan(mapperKategoriTagihanPerAtpSkor, mapperStrukturKurikulum);
        this.buildKategoriTagihanMapper();
        return this;
    }
    
   
}