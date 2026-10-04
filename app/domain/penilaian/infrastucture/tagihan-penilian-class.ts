import type { PublikasiPaketAppType } from "~/types/bank-soal/entities/publikasi-paket-app-type";
import DtoPaketSoalSheetClass from "~/dtos/dto-paket-soal-sheet-class";
import type { PaketSoalSheetType } from "~/types/bank-soal/entities/paket-soal-sheet-type";
import type { AtpHasManySoalType } from "~/domain/bank-soal/relational-soal/type";
import type { TagihanHasDataResponse } from "../type/tagihan-assesmen-type";
import type { DetailTarget } from "../type/DetailTarget";
import type { SiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif";
import { durasiMenit, getParseDateYYYYMMMDD } from "~/lib/date-helper";
import SebaranTagihanKurikulumClass, { type SebaranTagihanAssesmenKurikulumType } from "./sebaran-tagihan-kurikulum-class";
import type { PraSettingBaku } from "~/types/bank-soal/entities/PraSettingBaku";
import type { NilaiSiswaAppType, RisponsePenilaianSiswa } from "~/types/penilaian/nilai-siswa-app-type";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import GroupingSebaranKurikulum from "./grouping-kurikulum-to-sebaran";
import type { templateResponseKoreksi } from "../type/templateResponseKoreksi";
import type { DataResponseKoreksi } from "../type/DataResponseKoreksi";

/** 
 * @info Instansiasi pembuatan data KBM di fitur Guru _
 * TagihanPenilaianClass adalah class untuk menginstasiasi data pada sheet [bank_soal] dan tab [publikasi_paket];
 * Ini digunakan untuk mendata 
 */
export default class TagihanPenilaianClass extends DtoPaketSoalSheetClass{
    private tagihanHasResponse:TagihanHasDataResponse[]=[];
    private sebaranTagihanKurikulum: SebaranTagihanAssesmenKurikulumType[]=[];
    private defaultJsonSettingBaku:PraSettingBaku|undefined = undefined
    constructor(
            dataSheet:PaketSoalSheetType[],
            atpHasBankSoal:AtpHasManySoalType[],
            rombel:string,
            publikasiPaket: PublikasiPaketAppType[],
            /** punya class ini sendiri */
            private readonly allSiswa:SiswaWithValidation[],
            private readonly responTagihan:NilaiSiswaAppType[]
        ){
            super(dataSheet,atpHasBankSoal,rombel,publikasiPaket)
        }
    
    
    get dataTagihanHasResponse():TagihanHasDataResponse[]{
        return this.tagihanHasResponse;
    };
    get dataSebaranTagihanKurikulum():SebaranTagihanAssesmenKurikulumType[]{
        return this.sebaranTagihanKurikulum
    }

    get koleksiKurikulumSemuaTagihan():AtpHasManySoalType[]{
        return [...new Set([...this.tagihanHasResponse.flatMap(m=>m.kurikulum_tagihan)])]
    }
    get koleksiSoalInAtp():BankSoalAppType[]{
        return this.atp.flatMap(m=>m.hasSoal)
    }
    siswaInCurrentDate(tgl:Date):SiswaWithValidation[]{
        return this.allSiswa.filter(({data, validation})=> {
            
            const checkIn = getParseDateYYYYMMMDD(data.masuk_tgl);
            const checkOut =getParseDateYYYYMMMDD(data.keluar_tgl) === 0 ? Infinity: getParseDateYYYYMMMDD(data.keluar_tgl);
            const current = getParseDateYYYYMMMDD(tgl)
            return (checkIn <= current && checkOut >= current && data.jenjang === this.jenjang)
            
        })
    }
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
    totalValidRespon(respon:RisponsePenilaianSiswa[]):number{
            return respon.filter(s=>s.respon !=='' && s.respon !== null).length
            // return respon.filter(s=>s.respon !=='').length
        }
    buildDetailPesertaRombel():void{
        
        this.tagihanHasResponse =  this.dataTagihanPenilaian.map(m=>{
            
            const detail_target:DetailTarget[] = m.target_rombel.map(rombel=>{
                const data_siswa = m.target_type === 'rombel' 
                                    ? this.siswaInCurrentDate(m.end_time).map(siswa=>siswa.data).filter(s=> s.nama_rombel === rombel)
                                    : this.siswaInCurrentDate(m.end_time).map(siswa=>siswa.data).filter(s=> m.target_person.includes(s.id))
                return {
                    rombel,
                    data_siswa,
                    count: data_siswa.length,
                    current_rombel: rombel === this.rombel,
                }
            })
            
            const bank_soal_collections = m.id_bank_soal.map(m=> this.koleksiSoalInAtp.find(s=>s.idbaris === m)!)
            const sebaran_kurikulum_by_bentuk_soal = GroupingSebaranKurikulum.buildGroupBentukSoalBasedOnKoleksiIdSoal( m.setting_tagihan?.kurikulum ?? [], m.id_bank_soal);
            

            const isMultiple            = Boolean(m.setting_tagihan?.koleksi_mapel?.isMultiple);
            const koleksi_mapelName     = m.setting_tagihan?.koleksi_mapel?.data ?? [];
            const kurikulum_tagihan     = m.setting_tagihan?.kurikulum ?? []
            const peserta               = detail_target.flatMap(item=>item.data_siswa);//this.siswaInCurrentDate(m.end_time).map(siswa=>siswa.data).filter(s=> s.nama_rombel === this.rombel);
            const count_instrumen       = m.setting_tagihan?.count_bentuk_soal?.map(cbt=>cbt.count) ?? []
            const total_instrumen       = count_instrumen.length > 0 ? count_instrumen?.reduce((a, b)=>a+Number(b)):0;
            
            const data_respons          =  this.responTagihan.filter(s=>s.publikasi_id === m.idbaris ).map(nilaiSiswa=>{
                const respon = nilaiSiswa.respon.slice(0,m.id_bank_soal.length).map((re,iRe)=>({...re, soal_id:bank_soal_collections[iRe].idbaris, atp:bank_soal_collections[iRe].kd_id}));
                const mapBentukSoal = respon.map(bs=>bs.bentuk_soal) 
                const sumber_respon = nilaiSiswa.sumber_respon
                const needValidate = this.needValidasiRespon(mapBentukSoal,sumber_respon);
                const templateKoreksiSiswa= sebaran_kurikulum_by_bentuk_soal.koleksiBentukSoal.map(bentuk_soal=>{
                    const data = bank_soal_collections.filter(s=>s.bentuk_soal === bentuk_soal.name).map((soal, iSoal)=>{
                        const frespon = respon.find(s=>s.bentuk_soal === bentuk_soal.name && s.no_prefix === (iSoal + 1))!
                        return {
                            soal,
                            no_prefix: (iSoal+1),
                            respon:frespon//{...frespon, soal_id:soal.idbaris, atp:soal.kd_id}
                        }
                    })
                    return {
                        bentuk_soal,
                        
                        data
                    }
                })



                return {
                    ...nilaiSiswa, 
                    respon,//: nilaiSiswa.respon.slice(0,m.id_bank_soal.length),
                    siswa: peserta.find(s=>s.id === nilaiSiswa.siswa_id),
                    durasiPengerjaan:( nilaiSiswa.start_time &&  nilaiSiswa.end_time )? durasiMenit(nilaiSiswa.start_time, nilaiSiswa.end_time): 0 ,
                    totalResponValid:this.totalValidRespon(respon), 
                    publikasi: m,
                    needValidate,
                    templateKoreksiSiswa
                }
            })
            const flatMapRespon = data_respons.flatMap(m=>m.respon);
            // const templateKoreksi:templateResponseKoreksi[] = []
            const templateKoreksi : templateResponseKoreksi[] = sebaran_kurikulum_by_bentuk_soal.koleksiBentukSoal.map((bentuk_soal)=>{
                const data:DataResponseKoreksi[] = bank_soal_collections.filter(s=>s.bentuk_soal === bentuk_soal.name).map((soal, iSoal)=>{
                    const respon = data_respons.map(res=>{
                        const found = res.respon.find(s=>s.bentuk_soal === bentuk_soal.name && s.no_prefix === (iSoal+1));
                        return {
                            ...res,
                            respon: found//{...found!, soal_id:soal.idbaris, atp:soal.kd_id} ,//;//
                        }
                    })
                    return {
                        soal,
                        no_prefix:(iSoal+1),
                        respon
                    }
                })
                return {
                    bentuk_soal,
                    data
                }
            })

            const data_response_bySiswa = peserta.map(siswa=>{
                const data = data_respons.filter(s=>s.siswa_id ===siswa.id)
                return {
                    siswa,
                    data
                }
            });
            /**
             *  const map = new Map(currentData.data_respons.map(m=>([m.siswa_id, m])));
        return [...map.values()];
             */
            const jumlahPeresponMap = new Map(data_respons.map(r=>([r.siswa_id, r])));
            const jumlahPerespon = [...jumlahPeresponMap.values()].length;
            const jumlahDuplikat = data_respons.length> jumlahPerespon ? data_respons.length-jumlahPerespon: 0
            
            return {
                ...m,
                detail_target,
                data_respons,
                isMultiple,
                koleksi_mapelName,
                kurikulum_tagihan,
                peserta,
                total_instrumen,
                bank_soal_collections,
                sebaran_kurikulum_by_bentuk_soal,
                templateKoreksi,
                data_response_bySiswa,
                jumlahPerespon,
                jumlahDuplikat
            }
        })
    } 

    override init():this{
        super.init();
        this.buildDetailPesertaRombel();
        this.buildSebaranTagihanKurikulum();
        return this;
    }
   
}