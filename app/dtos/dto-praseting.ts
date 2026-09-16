import type { AtpHasManySoalType } from "~/domain/bank-soal/relational-soal/type";
import type { CountBentukSoalPaket } from "~/domain/paket-soal/entities/count-bentuk-soal-paket";
import type { PraSettingPaket } from "~/domain/paket-soal/entities/pra-setting-paket";
import type { countBentukSoalPaketBaku } from "~/types/bank-soal/entities/countBentukSoalPaketBaku";
import type { PraSettingBaku } from "~/types/bank-soal/entities/PraSettingBaku";

export default class DtoPraSetingPaket{
    static praSettingPaketToPraSettingBaku(data:PraSettingPaket):PraSettingBaku{
        /**
         * prasetingPaket
           idbaris?            : number,
             identitas           : IdentitasKontenPaket,
             target_paket        : TypePaketSoal,
             dataKopCustom       : string[],
             koleksi_mapel       : KoleksiMapelPaketSoal, 
             data_target         : string[]
             count_bentuk_soal   : CountBentukSoalPaket[],
             kurikulum           : AtpHasManySoalType[];//AtpAsOrm[]
             nomorSoalUrut       : boolean
         */
        /** prasettingPaketbaku
         identitas?: IdentitasKontenPaket;
             dataKopCustom: string[];
             koleksi_mapel?: KoleksiMapelPaketSoal;
             data_target: string[];
             count_bentuk_soal: countBentukSoalPaketBaku[];
             kurikulum: number[]; //AtpAsOrm[]
             nomorSoalUrut: boolean;
         */
        const count_bentuk_soal = this.toCountBentukSoalPaket(data.count_bentuk_soal)
        const kurikulum= this.toKurikulumId(data.kurikulum)
        return {
            ...data, 
            count_bentuk_soal,
            kurikulum
        }
    }

    static toCountBentukSoalPaket(data:CountBentukSoalPaket[]):countBentukSoalPaketBaku[]{
        return data.map((m)=>{
            const dataBentukSoal = m.dataBentukSoal.name;
            return {
                ...m,
                dataBentukSoal
            }
        })
    }
    static toKurikulumId(data:AtpHasManySoalType[]):number[]{
        return data.map(m=>m.atp_as_tp_id)
    }
}