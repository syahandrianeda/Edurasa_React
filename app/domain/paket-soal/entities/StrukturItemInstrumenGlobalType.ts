import type { AtpHasManySoalType } from "~/domain/bank-soal/relational-soal/type";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";

/** tiap item soal itu punya data */
export interface StrukturItemInstrumenGlobal {

    index: number;
    no_prefix: number;
    bentuk_soal: ListBentukSoalType['name']; //ini striing

    soal_id: number;
    atp: number;

    /** soal_id = 0, jika `soal` undefined */
    soal?: BankSoalAppType;
    atp_soal?: AtpAsOrm;
    bentuk_soal_detail?:ListBentukSoalType

}
