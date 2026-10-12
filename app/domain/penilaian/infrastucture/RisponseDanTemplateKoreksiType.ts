import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { TemplateKoreksiSiswaType } from "~/types/penilaian/TemplateKoreksiSiswaType";


export interface RisponseDanTemplateKoreksiType {
    respon: RisponsePenilaianSiswa[];
    sebaran: TemplateKoreksiSiswaType[];
}
