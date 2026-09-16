import type { IdentitasKontenPaket } from "~/domain/paket-soal/entities/identitas-paket";
import type { KoleksiMapelPaketSoal } from "~/domain/paket-soal/entities/koleksi-mapel-paket-soal";
import type { countBentukSoalPaketBaku } from "./countBentukSoalPaketBaku";


export interface PraSettingBaku {
    identitas?: IdentitasKontenPaket;
    dataKopCustom: string[];
    koleksi_mapel?: KoleksiMapelPaketSoal;
    data_target: string[];
    count_bentuk_soal: countBentukSoalPaketBaku[];
    kurikulum: number[]; //AtpAsOrm[]
    nomorSoalUrut: boolean;
}
