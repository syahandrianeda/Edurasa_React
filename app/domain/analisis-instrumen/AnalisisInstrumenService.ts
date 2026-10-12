import type { TagihanHasDataResponse } from "../penilaian/type/tagihan-assesmen-type";
import { AnalisisInstrumenAnalyzer } from "./AnalisisInstrumenAnalyzer";
import { defaultAnalisisInstrumenConfig, type AnalisisInstrumenConfig } from "./AnalisisInstrumenConfig";
import { AnalisisInstrumenMatrixBuilder } from "./AnalisisInstrumenMatrixBuilder";
import type { AnalisisInstrumenResult, AnalisisInstrumenResultDetail, AnalisisInstrumenSoalFinal } from "./AnalisisInstrumenResultType";
import { AnalisisInstrumenSummaryBuilder } from "./AnalisisInstrumenSummaryBuilder";
import { AnalisisPengecohAnalyzer } from "./AnalisisPengecohAnalyzer";
import type { AnalisisPengecohResult, AnalisisPengecohSoalResult } from "./AnalisisPengecohOpsiResult";
import { AnalisisSoalDiagnoser } from "./AnalisisSoalDiagnoser";
import type { DiagnosisInstrumenResult, DiagnosisSoalResult } from "./AnalisisSoalDiagnoserType";
import DataSumberResponBuilder from "./DataSumberResponBuilder";

export class AnalisisInstrumenService {

    static analyze(
        tagihan: TagihanHasDataResponse,
        config: AnalisisInstrumenConfig =
            defaultAnalisisInstrumenConfig
    ): AnalisisInstrumenResult {

        /**
         * ======================================================
         * 1. BUILD MATRIX
         * ======================================================
         */

        const matrix = AnalisisInstrumenMatrixBuilder.build(tagihan);
        
        /**
         * ======================================================
         * 2. ANALISIS STATISTIK ITEM
         * ======================================================
         */

        const analisis =
            AnalisisInstrumenAnalyzer.analyze(matrix);


        /**
         * ======================================================
         * 3. ANALISIS PENGECOH
         * ======================================================
         */

        const pengecoh =
            AnalisisPengecohAnalyzer.analyze(matrix);


        /**
         * ======================================================
         * 4. DIAGNOSIS SOAL
         * ======================================================
         */

        const diagnosis =
            AnalisisSoalDiagnoser.diagnose(
                analisis,
                pengecoh,
                config
            );


        /**
         * ======================================================
         * 5. SUMMARY
         * ======================================================
         */

        const summary =
            AnalisisInstrumenSummaryBuilder.build(
                matrix,
                diagnosis
            );


        /**
         * ======================================================
         * 6. GABUNGKAN HASIL PER SOAL
         * ======================================================
         */

        const soal =
            this.buildFinalSoal(
                analisis,
                pengecoh,
                diagnosis
            );

        

        const sumberData = DataSumberResponBuilder.build(tagihan.data_response_bySiswa)
        /**
         * ======================================================
         * 7. FINAL RESULT
         * ======================================================
         */
        
        return {
            publikasi_id: matrix.publikasi_id,
            publikasi:tagihan, 
            sumberData,
            jumlahPeserta: matrix.siswa.length,
            jumlahSoal: matrix.soal.length,

            soal,

            summary,
        };
    }


    private static buildFinalSoal(
        analisis: AnalisisInstrumenResultDetail,
        pengecoh: AnalisisPengecohResult,
        diagnosis: DiagnosisInstrumenResult
    ): AnalisisInstrumenSoalFinal[] {

        /**
         * Gunakan Map supaya penggabungan berdasarkan soal_id
         * tidak menggunakan nested loop.
         */
        
        const pengecohMap = new Map<number, AnalisisPengecohSoalResult>();
        pengecoh.soal.forEach(item => {
            pengecohMap.set(
                item.soal_id,
                item
            );
        });


        const diagnosisMap = new Map<number, DiagnosisSoalResult>();

        diagnosis.soal.forEach(item => {
            diagnosisMap.set(
                item.soal_id,
                item
            );
        });


        return analisis.soal.map(item => {

            const dataDiagnosis =
                diagnosisMap.get(item.soal_id);

            return {
                soal_id: item.soal_id,

                no_prefix: item.no_prefix,

                // bentuk_soal: item.bentuk_soal,
                bentuk_soal: item.bentuk_soal,

                jumlahPeserta:
                    item.jumlahPeserta,

                jumlahTerjawab:
                    item.jumlahTerjawab,

                jumlahTidakTerjawab:
                    item.jumlahTidakTerjawab,

                persentaseTerjawab:
                    item.persentaseTerjawab,

                meanSkor:
                    item.meanSkor,

                proporsiSkor:
                    item.proporsiSkor,

                tingkatKesukaran:
                    item.tingkatKesukaran,

                korelasiItemTotal:
                    item.korelasiItemTotal,

                pengecoh:
                    pengecohMap.get(item.soal_id)
                    ?? null,

                tingkatKesukaranDiagnosis:
                    dataDiagnosis?.tingkatKesukaran
                    ?? 'tidak_dapat_ditentukan',

                dayaPembeda:
                    dataDiagnosis?.dayaPembeda
                    ?? 'tidak_dapat_ditentukan',

                status:
                    dataDiagnosis?.status
                    ?? 'tidak_dapat_dianalisis',

                alasan:
                    dataDiagnosis?.alasan
                    ?? [],
            };
        });
    }
}