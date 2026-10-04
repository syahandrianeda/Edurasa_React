import type { BankSoalAppType } from "../bank-soal/bank-soal-type";
import type { RisponsePenilaianSiswa } from "./nilai-siswa-app-type";

export interface DataTemplateKoreksiSiswa {
    soal: BankSoalAppType;
    no_prefix: number;
    respon: RisponsePenilaianSiswa | undefined;
}
