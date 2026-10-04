import SwitchKategoriTagihan from "~/domain/asesmen-penilaian/switch-kategori-tagihan-class";
import { formatDateTimeSheet } from "~/lib/date-helper";
import type { detailNilaiSiswaAppType, RisponsePenilaianSiswa } from "~/types/penilaian/nilai-siswa-app-type";
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type";

export default class DtoKoreksiToResponseSheet{
    static fromGuruMengUpdateRespon(jawabanAsliSiswa:detailNilaiSiswaAppType, responUpdate:RisponsePenilaianSiswa[], skorKd:Record<string, number>):Partial<NilaiSiswaSheetType>{
        const jenis_tagihan   = jawabanAsliSiswa.publikasi.jenis_tagihan.kode
        const tipe_assesmen = new SwitchKategoriTagihan(jenis_tagihan).kategori;
        const sebaranRespon = DtoKoreksiToResponseSheet.buildResponseDistribution(responUpdate);
        const sebaranSkor = DtoKoreksiToResponseSheet.buildSkorDistribution(responUpdate);
        return {
            idbaris         : jawabanAsliSiswa.idbaris,    //  number,	
            siswa_id        : jawabanAsliSiswa.siswa_id,     // number,
            publikasi_id    : jawabanAsliSiswa.publikasi_id,    // number,
            jenis_tagihan, 
            tipe_assesmen,
            sumber_respon   : 'guru',
            rombel          : jawabanAsliSiswa.rombel,       // string,
            start_time      : formatDateTimeSheet(jawabanAsliSiswa.start_time) ?? '', //string,
            end_time        : formatDateTimeSheet(jawabanAsliSiswa.end_time) ?? '',   //string,
            skor_kd         : JSON.stringify(skorKd),       //:string,
            ...sebaranRespon,
            ...sebaranSkor

        }
    }

    private static buildResponseDistribution(responUpdate:RisponsePenilaianSiswa[]): Record<string, string> {
        return responUpdate.reduce((acc, m) => {
            const key = m.bentuk_soal + "_" + m.no_prefix;
            acc[key] = m.respon ?? '';
            return acc;
        }, {} as Record<string, string>);
    }
    private static buildSkorDistribution(responUpdate:RisponsePenilaianSiswa[]): Record<string, number> {
        return responUpdate.reduce((acc, m) => {
            const key = "skor_" + m.no_prefix;
            acc[key] = m.skor ?? 0;
            return acc;
        }, {} as Record<string, number>);
    }
}