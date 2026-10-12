import SwitchKategoriTagihan from "~/domain/asesmen-penilaian/switch-kategori-tagihan-class";
import type { AtpHasManySoalType } from "~/domain/bank-soal/relational-soal/type";
import type { KategoriTagihanType } from "~/domain/penilaian/type/KategoriTagihanType";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import type { NilaiSiswaAppType } from "~/types/penilaian/nilai-siswa-app-type";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type";
import type { UserSiswa } from "~/types/user-siswa";

export default class BuildParanResponTagihanSiswa{
    private dataNilaiSiswaSheetType:NilaiSiswaSheetType|undefined = undefined;
    constructor(private readonly dataRespon:RisponsePenilaianSiswa[], private readonly dataSoal:TagihanHasDataResponse, private readonly user:UserSiswa, private readonly start:Date){}
    get dataNilaiSiswa(){
        return this.dataNilaiSiswaSheetType;
    }
    build():this{
        const obj = this.createSkorByAtp(this.dataRespon, this.dataSoal.kurikulum_tagihan);
        const sebaran = this.distributedKontenReespon(this.dataRespon,this.dataSoal.kurikulum_tagihan);
        const tipe_assesmen = new SwitchKategoriTagihan(this.dataSoal.jenis_tagihan.kode).kategori;
        this.dataNilaiSiswaSheetType = {
            idbaris: 0,
            publikasi_id: this.dataSoal.idbaris,
            siswa_id: this.user.id,
            jenis_tagihan: this.dataSoal.jenis_tagihan.kode,
            // tipe_assesmen: this.switchTagihan(this.dataSoal.jenis_tagihan.kode),
            tipe_assesmen,
            sumber_respon: 'siswa',
            rombel: this.user.rombel,
            start_time: this.start.toString(),
            end_time: new Date().toString(),
            skor_kd: JSON.stringify(obj),
            ...sebaran
       }
        return this;
    }
    distributedKontenReespon(
        data: RisponsePenilaianSiswa[],
        kurikulum_tagihan: AtpHasManySoalType[]
    ): Record<string, string | number> {
        const sebaran: Record<string, string | number> = {};
        
        for(const item of data){
            const value = item.respon;
            const bentukSoal = item.bentuk_soal;
            const noUrut = item.no_prefix;
            const keyDistributed = `${bentukSoal}_${noUrut}`;
            const skor_key = `skor_`+item.index;
            
            sebaran[keyDistributed] = value ?? '';
            sebaran[skor_key] = item.skor ?? '';
        }
        return sebaran;
    }
    // switchTagihan(kode:string):KategoriTagihanType{
    //        switch (kode){
    //            case 'Remedial':
    //                return 'remedial_pengayaan';
    //            case 'Pengayaan':
    //                return 'remedial_pengayaan';
    //            case 'PTS':
    //                return 'mid_semester';
    //            case 'PAS':
    //                return 'akhir_semester';
    //            case 'PAK':
    //                return 'akhir_semester';
    //            case 'PSAJ':
    //                return 'ujian_sekolah';
    //            default:
    //                return 'harian'
    //        }
           
    //    }
        createSkorByAtp(
            dataRespon: RisponsePenilaianSiswa[],
            kurikulum_tagihan: AtpHasManySoalType[]
        ): Record<string, number> {

            // atp_id -> kodemapel
            const atpMap = new Map<number, string>(
                kurikulum_tagihan
                    .filter((item): item is AtpHasManySoalType & { atp_as_tp_id: number; kodemapel: string } =>
                        typeof item.atp_as_tp_id === 'number' && typeof item.kodemapel === 'string'
                    )
                    .map(item => [item.atp_as_tp_id, item.kodemapel])
            );
            // atp_id -> kumpulan skor
            const skorMap = new Map<number, number[]>();

            for (const respon of dataRespon) {
                if (respon.atp == null || respon.skor == null) {
                    continue;
                }

                // Pastikan ATP tersebut memang ada di kurikulum
                if (!atpMap.has(respon.atp)) {
                    continue;
                }

                const skorSebelumnya = skorMap.get(respon.atp);

                if (skorSebelumnya) {
                    skorSebelumnya.push(respon.skor);
                } else {
                    skorMap.set(respon.atp, [respon.skor]);
                }
            }

            // Hasil akhir
            const result: Record<string, number> = {};

            for (const [atpId, daftarSkor] of skorMap) {
                const kodemapel = atpMap.get(atpId);

                if (!kodemapel) {
                    continue;
                }

                const total = daftarSkor.reduce(
                    (sum, skor) => sum + skor,
                    0
                );

                const rataRata = total / daftarSkor.length;

                result[`${kodemapel}_${atpId}`] = Number(rataRata.toFixed(2));
            }

            return result;
        }
   
}