import type { JenisTagihanPenilaiantype } from "~/domain/asesmen-penilaian/jenis-tagihan-type";
import SwitchKategoriTagihan from "~/domain/asesmen-penilaian/switch-kategori-tagihan-class";
import type { KategoriTagihanType } from "~/domain/penilaian/type/KategoriTagihanType";
import { formatDateTimeSheet } from "~/lib/date-helper";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { detailNilaiSiswaAppType, RisponsePenilaianSiswa } from "~/types/penilaian/nilai-siswa-app-type";
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type";
import type { ValidatedResponseSiswa } from "~/types/penilaian/rekap_sementara_sheet_type";

export default class DtoKoreksiToKategoriAssesmenTab{
    static fromGuruMengUpdateRespon(jawabanAsliSiswa:detailNilaiSiswaAppType, responUpdate:RisponsePenilaianSiswa[], skorKd:Record<string, number>):ValidatedResponseSiswa{
        const jenis_tagihan = jawabanAsliSiswa.jenis_tagihan;
        const publikasiId = jawabanAsliSiswa?.publikasi_id;
        const nextProperty = DtoKoreksiToKategoriAssesmenTab.buildRekapDistribution(publikasiId, jenis_tagihan, skorKd);
        return {
            idbaris: 0,
            siswa_id: jawabanAsliSiswa.siswa_id,
            nama_siswa: jawabanAsliSiswa.siswa?.pd_nama ?? '',
            rombel: jawabanAsliSiswa.rombel,
            ...nextProperty
        }
        
    }

    private static buildRekapDistribution(publikasi_id:number, jenis_tagihan:JenisTagihanPenilaiantype['kode'], skorKd:Record<string, number>): Record<string, number>{
            /**
             * pola:
             * JenisTagihan_Mapel_Atp_publikasiId
             * contoh: ph_PKN_35_41
             */
        const result = Object.create(null);
        const dataKd = Object.entries(skorKd);
        for(const [key, value] of dataKd){
            /**
             *  key sudah pola <KodeMapel>_<idbaris_ATP>
             *  contoh: PKN_34
             */
            const newKey = `${jenis_tagihan}_${key}_${publikasi_id}`;
            result[newKey] = value

        }
        return result
    }
   
}