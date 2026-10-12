import type { PaketSoalStruktur } from "~/domain/paket-soal/paket-soal-struktur/PaketSoalStrukturType";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";


export default class RisponseNilaiSiswaBuilder {
    /**
     *
     * @param strukturPaketSoal | data ini diambil dari builder `PaketSoalStrukturBuilder`
     * @param responseSheet | index pada responsheet ini tidak sama dengan index pada paket Soal, sehingga perlu disesuaikan
     * @returns
     */
    static build(strukturPaketSoal: PaketSoalStruktur[], responseSheet: RisponsePenilaianSiswa[]): RisponsePenilaianSiswa[] {
        let globalIndex = 0;

        return strukturPaketSoal.reduce<RisponsePenilaianSiswa[]>((result, { soal }) => {
            const data = soal.map((currentSoal) => {
                const currentIndex =  currentSoal.index;// globalIndex;
                const matchedResponse = responseSheet.find((response) => response.no_prefix === currentSoal.no_prefix && response.bentuk_soal === currentSoal.bentuk_soal);
                const skor = responseSheet[currentIndex]?.skor ?? 0;
                // globalIndex++;

                return {
                    ...currentSoal,
                    // index: matchedResponse?.index ?? currentIndex,
                    respon: matchedResponse?.respon ?? '',
                    // skor: matchedResponse?.skor ?? 0
                    skor
                };
            });

            return result.concat(data);
        }, []);
    }
}
