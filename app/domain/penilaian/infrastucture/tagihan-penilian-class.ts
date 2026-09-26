import type { PublikasiPaketAppType } from "~/types/bank-soal/entities/publikasi-paket-app-type";
import type { TagihanPenilaianType } from "../type/tagihan-penilaian-type";
import { ListJenisTagihan } from "~/domain/asesmen-penilaian/list-jenis-tagihan";
import DtoPaketSoalSheetClass from "~/dtos/dto-paket-soal-sheet-class";
import type { PaketSoalAppType } from "~/types/bank-soal/entities/paket-soal-app-type";
import type { PaketSoalSheetType } from "~/types/bank-soal/entities/paket-soal-sheet-type";
import type { AtpHasManySoalType } from "~/domain/bank-soal/relational-soal/type";
import type { PublikasiPaketSheetType } from "~/types/bank-soal/entities/publikasi-paket-sheet-type";
import type { SiswaType } from "~/types/siswa";
import type { DetailTarget, TagihanHasDataResponse } from "../type/tagihan-assesmen-type";
import type { SiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif";
import { getParseDateYYYYMMMDD } from "~/lib/date-helper";
import SebaranTagihanKurikulumClass, { type SebaranTagihanAssesmenKurikulumType } from "./sebaran-tagihan-kurikulum-class";
import type { PraSettingBaku } from "~/types/bank-soal/entities/PraSettingBaku";
import type { NilaiSiswaAppType } from "~/types/penilaian/nilai-siswa-app-type";


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

            const isMultiple            = Boolean(m.setting_tagihan?.koleksi_mapel?.isMultiple);
            const koleksi_mapelName     = m.setting_tagihan?.koleksi_mapel?.data ?? [];
            const kurikulum_tagihan     = m.setting_tagihan?.kurikulum ?? []
            const peserta               = detail_target.flatMap(item=>item.data_siswa);//this.siswaInCurrentDate(m.end_time).map(siswa=>siswa.data).filter(s=> s.nama_rombel === this.rombel);
            const count_instrumen       = m.setting_tagihan?.count_bentuk_soal?.map(cbt=>cbt.count) ?? []
            const total_instrumen       = count_instrumen.length > 0 ? count_instrumen?.reduce((a, b)=>a+Number(b)):0;
            const data_respons        =  this.responTagihan.filter(s=>s.publikasi_id === m.idbaris )
            
            return {
                ...m,
                detail_target,
                data_respons,
                isMultiple,
                koleksi_mapelName,
                kurikulum_tagihan,
                peserta,
                total_instrumen
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