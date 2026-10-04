import type { ListBentukSoalType } from "../bank-soal/bentuk-soal-type";
import type { DataTemplateKoreksiSiswa } from "./DataTemplateKoreksiSiswa";

export interface TemplateKoreksiSiswaType {
    bentuk_soal: ListBentukSoalType;
    data: DataTemplateKoreksiSiswa[];
}
