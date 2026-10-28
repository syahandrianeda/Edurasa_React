import type { JenisTagihanPenilaiantype } from "~/domain/asesmen-penilaian/jenis-tagihan-type";
import type { SkorKdResponSiswaType } from "~/types/penilaian/nilai-siswa-app-type";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { KategoriTagihanType } from "../../kategori-tagihan/types/entities/KategoriTagihanType";
import type { SiswaType } from "~/types/siswa";
import type { TagihanAsessmenType } from "./tagihan-assesmen-type";


export interface DetailNilaiSiswaUntukKoreksi {
    idbaris: number;
    siswa_id: number;
    publikasi_id: number;
    jenis_tagihan: JenisTagihanPenilaiantype['kode'];
    tipe_assesmen: KategoriTagihanType;
    sumber_respon: string;
    rombel: string;
    start_time: Date | null;
    end_time: Date | null;
    respon?: RisponsePenilaianSiswa;
    skor_kd?: SkorKdResponSiswaType[];
    needValidate: boolean;
    siswa?: SiswaType;
    totalResponValid: number;
    durasiPengerjaan: number;

    publikasi: TagihanAsessmenType;
}
