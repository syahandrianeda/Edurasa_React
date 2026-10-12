import type { CountBentukSoalPaket } from "../entities/count-bentuk-soal-paket";
import type { StrukturItemInstrumenGlobal } from "../entities/StrukturItemInstrumenGlobalType";

/** type untuk membuat paket Saol */
export interface PaketSoalStruktur extends CountBentukSoalPaket {
    soal: StrukturItemInstrumenGlobal[];
}
