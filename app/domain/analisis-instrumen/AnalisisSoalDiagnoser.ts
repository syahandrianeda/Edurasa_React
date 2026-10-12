import type {
    AnalisisInstrumenConfig,
} from './AnalisisInstrumenConfig';

import {
    defaultAnalisisInstrumenConfig,
} from './AnalisisInstrumenConfig';

import type {
    AnalisisInstrumenResultDetail,
    AnalisisInstrumenSoalResult,
} from './AnalisisInstrumenResultType';
import type { AnalisisPengecohResult, AnalisisPengecohSoalResult } from './AnalisisPengecohOpsiResult';

// import type {
//     AnalisisPengecohResult,
//     AnalisisPengecohSoalResult,
// } from './AnalisisPengecohType';

import type {
    DiagnosisInstrumenResult,
    DiagnosisPengecoh,
    DiagnosisSoalResult,
    DayaPembedaDiagnosis,
    StatusDiagnosisSoal,
    TingkatKesukaranDiagnosis,
} from './AnalisisSoalDiagnoserType';

export class AnalisisSoalDiagnoser {

    static diagnose(
        analisis: AnalisisInstrumenResultDetail,
        pengecoh: AnalisisPengecohResult,
        config: AnalisisInstrumenConfig
    ): DiagnosisInstrumenResult {

        const pengecohMap = new Map<number, AnalisisPengecohSoalResult>();

        pengecoh.soal.forEach(item => {
            pengecohMap.set(item.soal_id, item);
        });


        const soal = analisis.soal.map(item => {

            const dataPengecoh =
                pengecohMap.get(item.soal_id);

            return this.diagnoseSoal(
                item,
                dataPengecoh,
                config
            );
        });


        return {
            publikasi_id: analisis.publikasi_id,
            jumlahPeserta: analisis.jumlahPeserta,
            jumlahSoal: analisis.jumlahSoal,
            soal,
        };
    }


    private static diagnoseSoal(
        item: AnalisisInstrumenSoalResult,
        pengecoh: AnalisisPengecohSoalResult | undefined,
        config: AnalisisInstrumenConfig
    ): DiagnosisSoalResult {

        /**
         * ======================================================
         * 1. DATA PESERTA TIDAK MENCUKUPI
         * ======================================================
         */

        if (
            item.jumlahPeserta <
            config.minimumPeserta
        ) {

            return {
                soal_id: item.soal_id,
                no_prefix: item.no_prefix,
                bentuk_soal: item.bentuk_soal,

                tingkatKesukaran:
                    'tidak_dapat_ditentukan',

                dayaPembeda:
                    'tidak_dapat_ditentukan',

                korelasiItemTotal:
                    item.korelasiItemTotal,

                pengecoh:
                    this.buildDiagnosisPengecoh(
                        pengecoh
                    ),

                status:
                    'tidak_dapat_dianalisis',

                alasan: [
                    `Jumlah peserta hanya ${item.jumlahPeserta}, sedangkan minimum analisis adalah ${config.minimumPeserta} peserta.`,
                ],
            };
        }


        /**
         * ======================================================
         * 2. DIAGNOSIS TINGKAT KESUKARAN
         * ======================================================
         */

        const tingkatKesukaran =
            this.diagnoseTingkatKesukaran(
                item.proporsiSkor,
                config
            );


        /**
         * ======================================================
         * 3. DIAGNOSIS DAYA PEMBEDA
         * ======================================================
         */

        const dayaPembeda =
            this.diagnoseDayaPembeda(
                item.korelasiItemTotal,
                config
            );


        /**
         * ======================================================
         * 4. DIAGNOSIS PENGECOH
         * ======================================================
         */

        const diagnosisPengecoh =
            this.buildDiagnosisPengecoh(
                pengecoh
            );


        /**
         * ======================================================
         * 5. TENTUKAN STATUS
         * ======================================================
         */

        const status =
            this.determineStatusSoal(
                dayaPembeda,
                item.korelasiItemTotal,
                diagnosisPengecoh
            );


        /**
         * ======================================================
         * 6. BUAT ALASAN
         * ======================================================
         */

        const alasan =
            this.buildAlasan(
                tingkatKesukaran,
                dayaPembeda,
                item.korelasiItemTotal,
                diagnosisPengecoh,
                status
            );


        return {
            soal_id: item.soal_id,
            no_prefix: item.no_prefix,
            bentuk_soal: item.bentuk_soal,

            tingkatKesukaran,

            dayaPembeda,

            korelasiItemTotal:
                item.korelasiItemTotal,

            pengecoh:
                diagnosisPengecoh,

            status,

            alasan,
        };
    }


    private static diagnoseTingkatKesukaran(
        proporsiSkor: number,
        config: AnalisisInstrumenConfig
    ): TingkatKesukaranDiagnosis {

        if (
            proporsiSkor <
            config.batasKesukaranSulit
        ) {
            return 'sulit';
        }

        if (
            proporsiSkor <
            config.batasKesukaranMudah
        ) {
            return 'sedang';
        }

        return 'mudah';
    }


    private static diagnoseDayaPembeda(
        korelasi: number | null,
        config: AnalisisInstrumenConfig
    ): DayaPembedaDiagnosis {

        if (
            korelasi === null ||
            !Number.isFinite(korelasi)
        ) {
            return 'tidak_dapat_ditentukan';
        }

        if (
            korelasi <
            config.batasKorelasiSangatRendah
        ) {
            return 'sangat_rendah';
        }

        if (
            korelasi <
            config.batasKorelasiRendah
        ) {
            return 'rendah';
        }

        if (
            korelasi <
            config.batasKorelasiCukup
        ) {
            return 'cukup';
        }

        return 'baik';
    }


    private static buildDiagnosisPengecoh(
        pengecoh: AnalisisPengecohSoalResult | undefined
    ): DiagnosisPengecoh | null {

        if (!pengecoh) {
            return null;
        }


        /**
         * Soal non-PG Tunggal tidak memiliki
         * analisis pengecoh.
         */
        if (
            pengecoh.bentuk_soal !==
            'PG Tunggal'
        ) {
            return null;
        }


        const distractors =
            pengecoh.opsi.filter(
                opsi => !opsi.isKunci
            );


        if (distractors.length === 0) {
            return {
                jumlahPengecoh: 0,
                jumlahBerfungsi: 0,
                jumlahTidakBerfungsi: 0,
                jumlahBermasalah: 0,
                persentaseBerfungsi: 0,
            };
        }


        const jumlahBerfungsi =
            distractors.filter(
                opsi => opsi.berfungsi
            ).length;


        const jumlahTidakBerfungsi =
            distractors.filter(
                opsi =>
                    opsi.jumlahPemilih === 0
            ).length;


        const jumlahBermasalah =
            distractors.filter(
                opsi =>
                    opsi.jumlahPemilih > 0 &&
                    opsi.indeksPengecoh < 0
            ).length;


        return {
            jumlahPengecoh:
                distractors.length,

            jumlahBerfungsi,

            jumlahTidakBerfungsi,

            jumlahBermasalah,

            persentaseBerfungsi:
                distractors.length === 0
                    ? 0
                    : (
                        jumlahBerfungsi /
                        distractors.length
                    ) * 100,
        };
    }


    private static determineStatusSoal(
        dayaPembeda: DayaPembedaDiagnosis,
        korelasi: number | null,
        pengecoh: DiagnosisPengecoh | null
    ): StatusDiagnosisSoal {

        /**
         * Korelasi negatif adalah indikator serius.
         */
        if (
            korelasi !== null &&
            korelasi < 0
        ) {
            return 'bermasalah';
        }


        /**
         * Daya pembeda sangat rendah.
         */
        if (
            dayaPembeda ===
            'sangat_rendah'
        ) {
            return 'bermasalah';
        }


        /**
         * Daya pembeda rendah.
         */
        if (
            dayaPembeda ===
            'rendah'
        ) {
            return 'perlu_ditinjau';
        }


        /**
         * Pengecoh bermasalah atau tidak berfungsi
         * menjadi alasan untuk review, bukan otomatis
         * membuat soal bermasalah.
         */
        if (
            pengecoh &&
            (
                pengecoh.jumlahBermasalah > 0 ||
                pengecoh.jumlahTidakBerfungsi > 0
            )
        ) {
            return 'perlu_ditinjau';
        }


        /**
         * Daya pembeda cukup.
         */
        if (
            dayaPembeda ===
            'cukup'
        ) {
            return 'cukup';
        }


        /**
         * Daya pembeda baik.
         */
        if (
            dayaPembeda ===
            'baik'
        ) {
            return 'baik';
        }


        return 'perlu_ditinjau';
    }


    private static buildAlasan(
        tingkatKesukaran: TingkatKesukaranDiagnosis,
        dayaPembeda: DayaPembedaDiagnosis,
        korelasi: number | null,
        pengecoh: DiagnosisPengecoh | null,
        status: StatusDiagnosisSoal
    ): string[] {

        const alasan: string[] = [];


        /**
         * ======================================================
         * TINGKAT KESUKARAN
         * ======================================================
         */

        switch (tingkatKesukaran) {

            case 'sulit':
                alasan.push(
                    'Tingkat kesukaran soal tergolong sulit.'
                );
                break;

            case 'sedang':
                alasan.push(
                    'Tingkat kesukaran soal tergolong sedang.'
                );
                break;

            case 'mudah':
                alasan.push(
                    'Tingkat kesukaran soal tergolong mudah.'
                );
                break;

            case 'tidak_dapat_ditentukan':
                alasan.push(
                    'Tingkat kesukaran tidak dapat ditentukan.'
                );
                break;
        }


        /**
         * ======================================================
         * DAYA PEMBEDA
         * ======================================================
         */

        switch (dayaPembeda) {

            case 'sangat_rendah':
                alasan.push(
                    'Daya pembeda soal sangat rendah.'
                );
                break;

            case 'rendah':
                alasan.push(
                    'Daya pembeda soal tergolong rendah.'
                );
                break;

            case 'cukup':
                alasan.push(
                    'Daya pembeda soal tergolong cukup.'
                );
                break;

            case 'baik':
                alasan.push(
                    'Daya pembeda soal tergolong baik.'
                );
                break;

            case 'tidak_dapat_ditentukan':
                alasan.push(
                    'Daya pembeda tidak dapat ditentukan.'
                );
                break;
        }


        /**
         * ======================================================
         * KORELASI NEGATIF
         * ======================================================
         */

        if (
            korelasi !== null &&
            korelasi < 0
        ) {
            alasan.push(
                'Korelasi item-total bernilai negatif sehingga soal perlu diperiksa kembali.'
            );
        }


        /**
         * ======================================================
         * PENGECOH
         * ======================================================
         */

        if (pengecoh) {

            if (
                pengecoh.jumlahTidakBerfungsi > 0
            ) {
                alasan.push(
                    `${pengecoh.jumlahTidakBerfungsi} pengecoh tidak dipilih oleh peserta.`
                );
            }


            if (
                pengecoh.jumlahBermasalah > 0
            ) {
                alasan.push(
                    `${pengecoh.jumlahBermasalah} pengecoh lebih banyak dipilih kelompok tinggi dibandingkan kelompok rendah.`
                );
            }


            if (
                pengecoh.jumlahBerfungsi ===
                pengecoh.jumlahPengecoh &&
                pengecoh.jumlahPengecoh > 0
            ) {
                alasan.push(
                    'Seluruh pengecoh berfungsi dengan baik.'
                );
            }
        }


        /**
         * ======================================================
         * PENJELASAN STATUS
         * ======================================================
         */

        if (status === 'bermasalah') {

            alasan.push(
                'Soal menunjukkan indikator masalah yang serius dan sebaiknya diperiksa sebelum digunakan kembali.'
            );

        } else if (
            status === 'perlu_ditinjau'
        ) {

            alasan.push(
                'Soal perlu ditinjau kembali sebelum digunakan pada asesmen berikutnya.'
            );

        } else if (
            status === 'cukup'
        ) {

            alasan.push(
                'Soal masih dapat digunakan, tetapi kualitasnya dapat ditingkatkan.'
            );

        } else if (
            status === 'baik'
        ) {

            alasan.push(
                'Soal memiliki karakteristik yang baik berdasarkan hasil analisis.'
            );
        }


        return alasan;
    }
}
// export class AnalisisSoalDiagnoser {

//     static diagnose(
//         analisis: AnalisisInstrumenResultDetail,
//         pengecoh: AnalisisPengecohResult,
//         config: AnalisisInstrumenConfig =
//             defaultAnalisisInstrumenConfig
//     ): DiagnosisInstrumenResult {

//         const pengecohMap =
//             new Map<
//                 number,
//                 AnalisisPengecohSoalResult

//             >();

//         pengecoh.soal.forEach(
//             (item) => {
//                 pengecohMap.set(
//                     item.soal_id,
//                     item
//                 );
//             }
//         );

//         const soal =
//             analisis.soal.map(
//                 (item) =>
//                     this.diagnoseSoal(
//                         item,
//                         pengecohMap.get(
//                             item.soal_id
//                         ),
//                         analisis.jumlahPeserta,
//                         config
//                     )
//             );

//         return {
//             publikasi_id:
//                 analisis.publikasi_id,

//             jumlahPeserta:
//                 analisis.jumlahPeserta,

//             jumlahSoal:
//                 analisis.jumlahSoal,

//             soal,
//         };
//     }

//     private static diagnoseSoal(
//         item: AnalisisInstrumenSoalResult,
//         dataPengecoh:
//             AnalisisPengecohSoalResult | undefined,
//         jumlahPeserta: number,
//         config: AnalisisInstrumenConfig
//     ): DiagnosisSoalResult {

//         /**
//          * Peserta terlalu sedikit:
//          *
//          * statistik boleh tetap tersedia,
//          * tetapi diagnosis tidak dipaksakan.
//          */
//         if (
//             jumlahPeserta <
//             config.minimumPeserta
//         ) {

//             return {
//                 soal_id:
//                     item.soal_id,

//                 no_prefix:
//                     item.no_prefix,

//                 bentuk_soal:
//                     item.bentuk_soal,

//                 tingkatKesukaran:
//                     'tidak_dapat_ditentukan',

//                 dayaPembeda:
//                     'tidak_dapat_ditentukan',

//                 korelasiItemTotal:
//                     item.korelasiItemTotal,

//                 pengecoh:
//                     this.buildDiagnosisPengecoh(
//                         dataPengecoh
//                     ),

//                 status:
//                     'tidak_dapat_dianalisis',

//                 alasan: [
//                     `Jumlah peserta (${jumlahPeserta}) kurang dari minimum analisis (${config.minimumPeserta}).`,
//                 ],
//             };
//         }

//         const tingkatKesukaran =
//             this.diagnoseTingkatKesukaran(
//                 item.tingkatKesukaran,
//                 config
//             );

//         const dayaPembeda =
//             this.diagnoseDayaPembeda(
//                 item.korelasiItemTotal,
//                 config
//             );

//         const diagnosisPengecoh =
//             this.buildDiagnosisPengecoh(
//                 dataPengecoh
//             );

//         const status =
//             this.determineStatusSoal(
//                 dayaPembeda,
//                 item.korelasiItemTotal,
//                 diagnosisPengecoh
//             );

//         const alasan =
//             this.buildAlasan(
//                 tingkatKesukaran,
//                 dayaPembeda,
//                 item.korelasiItemTotal,
//                 diagnosisPengecoh,
//                 status
//             );

//         return {
//             soal_id:
//                 item.soal_id,

//             no_prefix:
//                 item.no_prefix,

//             bentuk_soal:
//                 item.bentuk_soal,

//             tingkatKesukaran,

//             dayaPembeda,

//             korelasiItemTotal:
//                 item.korelasiItemTotal,

//             pengecoh:
//                 diagnosisPengecoh,

//             status,

//             alasan,
//         };
//     }

//     /**
//      * ============================================================
//      * TINGKAT KESUKARAN
//      * ============================================================
//      */

//     private static diagnoseTingkatKesukaran(
//         value: number,
//         config: AnalisisInstrumenConfig
//     ): TingkatKesukaranDiagnosis {

//         if (!Number.isFinite(value)) {
//             return 'tidak_dapat_ditentukan';
//         }

//         if (
//             value <
//             config.batasKesukaranSulit
//         ) {
//             return 'sulit';
//         }

//         if (
//             value <
//             config.batasKesukaranMudah
//         ) {
//             return 'sedang';
//         }

//         return 'mudah';
//     }

//     /**
//      * ============================================================
//      * DAYA PEMBEDA
//      * ============================================================
//      *
//      * Menggunakan corrected item-total correlation.
//      */

//     private static diagnoseDayaPembeda(
//         korelasi: number | null,
//         config: AnalisisInstrumenConfig
//     ): DayaPembedaDiagnosis {

//         if (
//             korelasi === null ||
//             !Number.isFinite(korelasi)
//         ) {
//             return 'tidak_dapat_ditentukan';
//         }

//         if (
//             korelasi <
//             config.batasKorelasiSangatRendah
//         ) {
//             return 'sangat_rendah';
//         }

//         if (
//             korelasi <
//             config.batasKorelasiRendah
//         ) {
//             return 'rendah';
//         }

//         if (
//             korelasi <
//             config.batasKorelasiCukup
//         ) {
//             return 'cukup';
//         }

//         return 'baik';
//     }

//     /**
//      * ============================================================
//      * PENGECOH
//      * ============================================================
//      */

//     private static buildDiagnosisPengecoh(
//         data:
//             AnalisisPengecohSoalResult | undefined
//     ): DiagnosisPengecoh | null {

//         /**
//          * Non-PG Tunggal memang tidak mempunyai
//          * analisis pengecoh.
//          */
//         if (!data) {
//             return null;
//         }

//         const pengecoh =
//             data.opsi.filter(
//                 option =>
//                     !option.isKunci
//             );

//         const jumlahPengecoh =
//             pengecoh.length;

//         const jumlahBerfungsi =
//             pengecoh.filter(
//                 option =>
//                     option.berfungsi
//             ).length;

//         const jumlahTidakBerfungsi =
//             pengecoh.filter(
//                 option =>
//                     option.jumlahPemilih === 0
//             ).length;

//         const jumlahBermasalah =
//             pengecoh.filter(
//                 option =>
//                     option.jumlahPemilih > 0 &&
//                     option.indeksPengecoh < 0
//             ).length;

//         const persentaseBerfungsi =
//             jumlahPengecoh === 0
//                 ? 0
//                 : (
//                     jumlahBerfungsi /
//                     jumlahPengecoh
//                 ) * 100;

//         return {
//             jumlahPengecoh,
//             jumlahBerfungsi,
//             jumlahTidakBerfungsi,
//             jumlahBermasalah,
//             persentaseBerfungsi,
//         };
//     }

//     /**
//      * ============================================================
//      * STATUS
//      * ============================================================
//      */

//     private static determineStatusSoal(
//         dayaPembeda:
//             DayaPembedaDiagnosis,

//         korelasi:
//             number | null,

//         pengecoh:
//             DiagnosisPengecoh | null
//     ): StatusDiagnosisSoal {

//         /**
//          * Korelasi negatif adalah red flag
//          * yang paling serius.
//          */
//         if (
//             korelasi !== null &&
//             korelasi < 0
//         ) {
//             return 'bermasalah';
//         }

//         if (
//             dayaPembeda ===
//             'sangat_rendah'
//         ) {
//             return 'bermasalah';
//         }

//         if (
//             dayaPembeda ===
//             'rendah'
//         ) {
//             return 'perlu_ditinjau';
//         }

//         /**
//          * Pengecoh bermasalah tidak otomatis
//          * membuat soal "bermasalah".
//          *
//          * Soal masih dapat dipertahankan,
//          * tetapi perlu ditinjau.
//          */
//         if (
//             pengecoh &&
//             (
//                 pengecoh.jumlahBermasalah > 0 ||
//                 pengecoh.jumlahTidakBerfungsi > 0
//             )
//         ) {
//             return 'perlu_ditinjau';
//         }

//         if (
//             dayaPembeda ===
//             'cukup'
//         ) {
//             return 'cukup';
//         }

//         if (
//             dayaPembeda ===
//             'baik'
//         ) {
//             return 'baik';
//         }

//         return 'perlu_ditinjau';
//     }

//     /**
//      * ============================================================
//      * ALASAN
//      * ============================================================
//      */

//     private static buildAlasan(
//         tingkatKesukaran:
//             TingkatKesukaranDiagnosis,

//         dayaPembeda:
//             DayaPembedaDiagnosis,

//         korelasi:
//             number | null,

//         pengecoh:
//             DiagnosisPengecoh | null,

//         status:
//             StatusDiagnosisSoal
//     ): string[] {

//         const alasan: string[] = [];

//         /**
//          * Kesukaran
//          */
//         if (
//             tingkatKesukaran ===
//             'sulit'
//         ) {
//             alasan.push(
//                 'Proporsi skor menunjukkan soal tergolong sulit.'
//             );
//         }

//         if (
//             tingkatKesukaran ===
//             'mudah'
//         ) {
//             alasan.push(
//                 'Proporsi skor menunjukkan soal tergolong mudah.'
//             );
//         }

//         /**
//          * Daya pembeda
//          */
//         if (
//             dayaPembeda ===
//             'sangat_rendah'
//         ) {
//             alasan.push(
//                 'Daya pembeda sangat rendah.'
//             );
//         }

//         if (
//             dayaPembeda ===
//             'rendah'
//         ) {
//             alasan.push(
//                 'Daya pembeda rendah dan soal perlu ditinjau.'
//             );
//         }

//         if (
//             dayaPembeda ===
//             'cukup'
//         ) {
//             alasan.push(
//                 'Daya pembeda cukup.'
//             );
//         }

//         if (
//             dayaPembeda ===
//             'baik'
//         ) {
//             alasan.push(
//                 'Daya pembeda baik.'
//             );
//         }

//         /**
//          * Korelasi negatif
//          */
//         if (
//             korelasi !== null &&
//             korelasi < 0
//         ) {
//             alasan.push(
//                 'Korelasi item-total negatif.'
//             );
//         }

//         /**
//          * Pengecoh
//          */
//         if (
//             pengecoh &&
//             pengecoh.jumlahTidakBerfungsi > 0
//         ) {
//             alasan.push(
//                 `${pengecoh.jumlahTidakBerfungsi} pengecoh tidak dipilih oleh peserta.`
//             );
//         }

//         if (
//             pengecoh &&
//             pengecoh.jumlahBermasalah > 0
//         ) {
//             alasan.push(
//                 `${pengecoh.jumlahBermasalah} pengecoh lebih banyak dipilih kelompok tinggi.`
//             );
//         }

//         /**
//          * Jika tidak ada masalah sama sekali,
//          * berikan alasan positif.
//          */
//         if (
//             alasan.length === 0 &&
//             status === 'baik'
//         ) {
//             alasan.push(
//                 'Soal memiliki daya pembeda baik dan tidak ditemukan masalah pengecoh.'
//             );
//         }

//         if (
//             alasan.length === 0
//         ) {
//             alasan.push(
//                 'Tidak ditemukan indikator diagnosis yang cukup untuk memberikan alasan khusus.'
//             );
//         }

//         return alasan;
//     }
// }