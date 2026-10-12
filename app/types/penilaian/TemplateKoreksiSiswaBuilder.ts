import RisponsePenilaianSiswaBuilder from "~/domain/penilaian/infrastucture/rispon-penilaian-siswa-builder"
import RisponseNilaiSiswaBuilder from "~/domain/penilaian/infrastucture/RisponseNilaiSiswaBuilder"
import type { RisponsePenilaianSiswa } from "./RisponsePenilaianSiswaType"
import type { TemplateKoreksiSiswaType } from "./TemplateKoreksiSiswaType"
import type { PaketSoalStruktur } from "~/domain/paket-soal/paket-soal-struktur/PaketSoalStrukturType"
import type { DataTemplateKoreksiSiswa } from "./DataTemplateKoreksiSiswa"

export default class TemplateKoreksiSiswaBuilder{
    static build (data:PaketSoalStruktur[], responseSheet:RisponsePenilaianSiswa[]): TemplateKoreksiSiswaType[]{
        return data.map(m=>{
            const data:DataTemplateKoreksiSiswa[] = m.soal.map(soal=>{
                const respon = responseSheet.find(s=>s.no_prefix && s.bentuk_soal === m.dataBentukSoal.name);
                const skor = responseSheet[soal.index]?.skor ?? 0;
                return {
                    ...soal,
                    // soal: soal.soal,
                    // no_prefix: soal.no_prefix,
                    respon: respon ?? undefined,
                    skor
                }
            })
            const bentuk_soal = m.dataBentukSoal
            return {
                bentuk_soal,
                data
            }
        })
    }
}