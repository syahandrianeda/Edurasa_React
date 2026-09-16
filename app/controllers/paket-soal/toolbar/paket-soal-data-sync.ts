import type { CountBentukSoalPaket } from "~/domain/paket-soal/entities/count-bentuk-soal-paket";
import type { DisplayFormatItemSoal } from "~/domain/paket-soal/result/display-format-item-soal";
import type { DataSoalDesign } from "~/domain/paket-soal/result/session-soal";



/**
 * Membuat slot soal kosong.
 *
 * `index` akan diisi ulang oleh `rebuildPresentation()`.
 * Karena index adalah posisi global saat ini, bukan ID permanen.
 */
export const createEmptySoal = (): DisplayFormatItemSoal => ({
    index: -1,
    no_soal: 0,
    data_soal: undefined,
    format_display: 'vertical',
    bentuk_soal: undefined,
    showStimulus: true,
});


/**
 * Membuat sejumlah slot soal kosong.
 */
const createEmptyDataSoal = (
    count: number,
): DisplayFormatItemSoal[] =>
    Array.from(
        { length: count },
        () => createEmptySoal(),
    );


/**
 * Membuat DataSoalDesign baru.
 */
const createNewSession = (
    setting: CountBentukSoalPaket,
): DataSoalDesign => ({
    startNumber: 1,
    bentukSoal: setting.dataBentukSoal,
    petunjukPengisian: setting.description,
    dataSoal: createEmptyDataSoal(setting.count),
});


/**
 * Resize data soal pada satu session.
 *
 * Rules:
 *
 * count turun:
 *   10 -> 7
 *   soal index 7, 8, 9 dibuang.
 *
 * count naik:
 *   7 -> 10
 *   slot 7, 8, 9 dibuat kosong.
 *
 * Data soal yang masih berada dalam range count
 * tetap dipertahankan.
 */
const resizeSession = (
    existing: DataSoalDesign | undefined,
    setting: CountBentukSoalPaket,
): DataSoalDesign => {
    const dataSoal = existing
        ? existing.dataSoal.slice(0, setting.count)
        : [];

    while (dataSoal.length < setting.count) {
        dataSoal.push(createEmptySoal());
    }

    return {
        ...(existing ?? createNewSession(setting)),

        bentukSoal: setting.dataBentukSoal,

        petunjukPengisian:
            setting.description,

        dataSoal,
    };
};


/**
 * Membangun ulang:
 *
 * - global index
 * - startNumber
 * - no_soal
 *
 * berdasarkan urutan struktur soal saat ini.
 *
 * `index`
 *   = posisi GLOBAL dataSoal.
 *
 * `no_soal`
 *   = nomor yang tampil pada naskah.
 */
const rebuildPresentation = (
    data: DataSoalDesign[],
    strukturSoal: CountBentukSoalPaket[],
    backToOne: boolean,
): DataSoalDesign[] => {
    let globalIndex = 0;
    let startNumber = 1;

    return strukturSoal.map((setting) => {

        const session = data.find(
            (item) =>
                item.bentukSoal.name ===
                setting.dataBentukSoal.name,
        );

        /**
         * Secara normal kondisi ini tidak terjadi karena
         * session sudah dibuat pada proses resize.
         *
         * Tetapi fallback ini membuat function tetap aman.
         */
        if (!session) {
            const newSession =
                createNewSession(setting);

            const currentStartNumber =
                startNumber;

            newSession.startNumber =
                currentStartNumber;

            newSession.dataSoal =
                newSession.dataSoal.map(
                    (soal, indexDalamSesi) => ({
                        ...soal,

                        index: globalIndex++,

                        no_soal:
                            currentStartNumber +
                            indexDalamSesi,

                        bentuk_soal:
                            setting.dataBentukSoal,
                    }),
                );

            if (backToOne) {
                startNumber = 1;
            } else {
                startNumber +=
                    newSession.dataSoal.length;
            }

            return newSession;
        }

        const currentStartNumber =
            startNumber;

        const dataSoal =
            session.dataSoal.map(
                (soal, indexDalamSesi) => ({
                    ...soal,

                    /**
                     * GLOBAL position.
                     *
                     * Akan berubah jika session
                     * dipindahkan.
                     */
                    index: globalIndex++,

                    /**
                     * Presentation number.
                     */
                    no_soal:
                        currentStartNumber +
                        indexDalamSesi,

                    bentuk_soal:
                        setting.dataBentukSoal,
                }),
            );

        /**
         * Jika nomor soal kembali ke 1,
         * session berikutnya mulai dari 1 lagi.
         *
         * Jika tidak,
         * nomor diteruskan.
         */
        if (backToOne) {
            startNumber = 1;
        } else {
            startNumber +=
                dataSoal.length;
        }

        return {
            ...session,

            startNumber:
                currentStartNumber,

            bentukSoal:
                setting.dataBentukSoal,

            petunjukPengisian:
                setting.description,

            dataSoal,
        };
    });
};


/**
 * Fungsi utama sinkronisasi PaketSoalDesign.
 *
 * Input:
 *
 *   data
 *      data soal lama
 *
 *   strukturSoal
 *      urutan + jumlah setiap session
 *
 *   backToOne
 *      aturan nomor soal
 *
 * Output:
 *
 *   DataSoalDesign[] baru
 */
export const syncPaketSoalData = (
    data: DataSoalDesign[],
    strukturSoal: CountBentukSoalPaket[],
    backToOne: boolean,
): DataSoalDesign[] => {

    /**
     * 1. Susun session berdasarkan strukturSoal.
     *
     * Session yang sudah tidak ada di strukturSoal
     * otomatis hilang.
     */
    const resizedSessions =
        strukturSoal.map((setting) => {

            const existing =
                data.find(
                    (item) =>
                        item.bentukSoal.name ===
                        setting.dataBentukSoal.name,
                );

            return resizeSession(
                existing,
                setting,
            );
        });


    /**
     * 2. Setelah urutan session benar,
     *    hitung ulang index global dan
     *    nomor soal presentation.
     */
    return rebuildPresentation(
        resizedSessions,
        strukturSoal,
        backToOne,
    );
};