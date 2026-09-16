import type { CountBentukSoalPaket } from "~/domain/paket-soal/entities/count-bentuk-soal-paket";
import type { DisplayFormatItemSoal } from "~/domain/paket-soal/result/display-format-item-soal";
import type { DataSoalDesign } from "~/domain/paket-soal/result/session-soal";

/**
 * Membuat satu slot soal kosong.
 *
 * index dan no_soal akan diisi ulang oleh
 * syncPaketSoalData().
 */
function createEmptySoal(): DisplayFormatItemSoal {
    return {
        index: -1,
        no_soal: 0,
        data_soal: undefined,
        format_display: undefined,
        bentuk_soal: undefined,
        showStimulus: false,
    };
}

/**
 * Sinkronisasi struktur jumlah soal dengan data desain paket.
 *
 * Aturan:
 *
 * 1. Urutan session mengikuti strukturSoal.
 * 2. Session yang sudah ada mempertahankan data soalnya.
 * 3. Count berkurang:
 *      dataSoal dipotong.
 * 4. Count bertambah:
 *      slot kosong ditambahkan.
 * 5. Session baru:
 *      dibuat dengan slot kosong.
 * 6. Session yang dihapus:
 *      otomatis tidak masuk hasil.
 * 7. index:
 *      selalu dihitung ulang secara GLOBAL dari 0.
 * 8. no_soal:
 *      dihitung berdasarkan backToOne.
 * 9. startNumber:
 *      mengikuti aturan nomor soal.
 */
export function syncPaketSoalData(
    currentData: DataSoalDesign[],
    strukturSoal: CountBentukSoalPaket[],
    backToOne: boolean,
): DataSoalDesign[] {
    let globalIndex = 0;
    let startNumber = 1;

    return strukturSoal.map((struktur) => {
        /*
         * Cari session lama berdasarkan bentuk soal.
         *
         * Kita tidak menggunakan index karena index adalah
         * index GLOBAL dan memang harus dihitung ulang ketika
         * session dipindahkan.
         */
        const existing = currentData.find(
            (item) =>
                item.bentukSoal.name ===
                struktur.dataBentukSoal.name,
        );

        const previousData = existing?.dataSoal ?? [];

        /*
         * Ambil data lama sesuai jumlah soal sekarang.
         *
         * Kalau count turun:
         *   data lama yang melebihi count dibuang.
         *
         * Kalau count naik:
         *   nanti slot kosong ditambahkan.
         */
        const dataSoal = previousData
            .slice(0, struktur.count)
            .map((soal) => ({
                ...soal,
            }));

        /*
         * Tambahkan slot kosong jika jumlah soal bertambah.
         *
         * Data soal yang sudah dibuang tidak dikembalikan.
         */
        while (dataSoal.length < struktur.count) {
            dataSoal.push(createEmptySoal());
        }

        /*
         * Bentuk session baru.
         *
         * Jika session sudah ada, property lain dari session
         * lama tetap dipertahankan.
         */
        const session: DataSoalDesign = {
            ...(existing ?? {
                startNumber: 1,
                bentukSoal: struktur.dataBentukSoal,
                petunjukPengisian:
                    struktur.description ??
                    struktur.dataBentukSoal.petunjukPengisian ??
                    "",
                dataSoal: [],
            }),

            /*
             * startNumber selalu dihitung ulang berdasarkan
             * posisi session saat ini.
             */
            startNumber,

            bentukSoal: struktur.dataBentukSoal,

            /*
             * Description berasal dari strukturSoal karena
             * toolbar adalah tempat description diedit.
             */
            petunjukPengisian: struktur.description,

            dataSoal: dataSoal.map(
                (soal, sessionIndex) => {
                    const result: DisplayFormatItemSoal = {
                        ...soal,

                        /*
                         * GLOBAL index.
                         *
                         * Tidak mempertahankan index lama.
                         */
                        index: globalIndex,

                        /*
                         * Nomor tampilan soal.
                         */
                        no_soal:
                            startNumber + sessionIndex,
                    };

                    globalIndex += 1;

                    return result;
                },
            ),
        };

        /*
         * Tentukan nomor awal session berikutnya.
         */
        if (backToOne) {
            startNumber = 1;
        } else {
            startNumber += struktur.count;
        }

        return session;
    });
}