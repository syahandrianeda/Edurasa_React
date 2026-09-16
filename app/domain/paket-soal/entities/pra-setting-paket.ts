import type { AtpAsOrm } from "~/types/kurikulum/prota-orm"
import type { CountBentukSoalPaket } from "./count-bentuk-soal-paket"
import type { IdentitasKontenPaket } from "./identitas-paket"
import type { TypePaketSoal } from "./type-paket"
import type { KoleksiMapelPaketSoal } from "./koleksi-mapel-paket-soal"
import type { kopColumn, kopKontentType } from "~/components/toolbars/kop-ttd/config-kop"
import type { AtpHasManySoalType, GroupingAtpHasManySoalType } from "~/domain/bank-soal/relational-soal/type"

export interface PraSettingPaket {
    idbaris?            : number,
    identitas           : IdentitasKontenPaket,
    target_paket        : TypePaketSoal,
    dataKopCustom       : string[],
    koleksi_mapel       : KoleksiMapelPaketSoal, 
    data_target         : string[]
    count_bentuk_soal   : CountBentukSoalPaket[],
    kurikulum           : AtpHasManySoalType[];//AtpAsOrm[]
    nomorSoalUrut       : boolean
}
