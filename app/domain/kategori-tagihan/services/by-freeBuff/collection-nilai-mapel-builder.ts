/**
 * ============ collection-nilai-mapel-builder ============
 * Helper pembentukan `CollectionNilaiMapel` (nilai satu siswa pada satu mapel),
 * diambil dari badan method `KategoriAssesmenClass.init()` agar method tersebut tidak
 * terlalu panjang. Diletakkan di file terpisah (satu directory dengan
 * `KategoriAssesmenClass.ts`) karena memungkinkan dipakai oleh class lain.
 *
 * Alur kalkulasi dipertahankan persis seperti implementasi aslinya:
 *   level ATP (sheet KD + respon) -> TP -> CP -> Mapel.
 * Penjumlahan/perkalian melewati `jmlAman`/`kaliAman` (tanpa artefak floating-point),
 * pembagian melewati `desimalFormat`.
 */
import desimalFormat from "~/lib/desimal-format";
import { jmlAman, kaliAman } from "~/lib/helper-aritmetika-desimal";
import type { SkorKdNullableType } from "~/domain/penilaian/type/SkorKdType";
import type { DataSkorSiswaByInstrumenType } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/DataSkorSiswaByInstrumenType";
import type { RefrensiTabResponTagihanJenjangType } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/RefrensiTabResponTagihanJenjangType";
import type { DataRefrensiPerBentukSoal } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/DataRefrensiPerBentukSoal";
import type { StrukturKurikulumMapelWithSlotType } from "~/domain/trees-struktur-kurikulum/struktur-kurikulum-type";
import type { ResponAtpMapperType } from "~/domain/respon-tagihan-jenjang/mapper/MapperSiswaOnDataResponBuilder";
import type { detailNilaiSiswaAppType } from "~/types/penilaian/nilai-siswa-app-type";
import type { DataKdSheetApp } from "~/types/penilaian/DataKdSheetAppType";
import type { DataSheetSkorKdKategoriAsesmenAppType } from "~/types/penilaian/DataSheetSkorKdKategoriAsesmenAppType";
import type { SiswaType } from "~/types/siswa";
import type { TagihanMapperInMapperSiswaHasTagihanMapper } from "../../infrastructures/MapperPesertaTagihan";
import type { CollectionNilaiMapel } from "../../types";
import type { CollectionNilaiCp } from "../../types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiCp";
import type { CollectionNilaiTp } from "../../types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiTp";
import type { CollectionNilaiAtp } from "../../types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiAtp";
import type { CollectionNilaiCpSheet } from "../../types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiCpSheet";
import type { CollectionNilaiTpSheet } from "../../types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiTpSheet";
import type { CollectionNilaiAtpSheet } from "../../types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiAtpSheet";

/** hasil `siswaHasDataResponMapper.get(idSiswa)` */
export type RefrensiResponSiswaType = {
    siswa: SiswaType;
    responAtpMapper: ResponAtpMapperType;
};

/** hasil `mapperDataSkorKdSheet.mapperSiswaHasDataSkorKdSheet.get(idSiswa)` */
export type SiswaHasDataSkorKdSheetType = DataSheetSkorKdKategoriAsesmenAppType & {
    dataKdSheetMapper: Map<number, { dataSkorKd: DataKdSheetApp[] }>;
};

/** hasil `siswaAsPesertaTagihan.get(idSiswa)` */
export type PesertaTagihanType = {
    namaSiswa: string;
    rombel: string;
    tagihanMapper: TagihanMapperInMapperSiswaHasTagihanMapper;
};

export type CollectionNilaiMapelBuilderParams = {
    strukturMapel: StrukturKurikulumMapelWithSlotType;
    namaSiswa: string;
    rombel: string;
    refrensiResponTagihan?: RefrensiResponSiswaType;
    refrensiSkorKdSheet?: SiswaHasDataSkorKdSheetType;
    siswaPeserta?: PesertaTagihanType;
};

/** merangkum `skorKd` -> `undefined` jika tidak punya key sama sekali (seperti aslinya) */
export function skorKdNullableBuilder(skorKd: SkorKdNullableType): SkorKdNullableType | undefined {
    return Object.keys(skorKd).length === 0 ? undefined : skorKd;
}

/**
 * Membentuk `detail` (data per publikasi respon) pada level ATP:
 * - menyaring respon milik `atp_id` berjalan,
 * - memetakan template koreksi siswa ke referensi respon,
 * - mengakumulasi `total` skor detail tanpa artefak floating-point.
 */
export function dataDetailAtpBuilder(params: {
    itemRef: detailNilaiSiswaAppType;
    atp_id: number;
    keySkorKdAtpSheet: string;
    namaSiswa: string;
    rombel: string;
}): DataSkorSiswaByInstrumenType {
    const { itemRef, atp_id, keySkorKdAtpSheet, namaSiswa, rombel } = params;
    const { publikasi, siswa_id, respon, idbaris, templateKoreksiSiswa, objekKdSebaran } = itemRef;

    const dataRefrensiTabResponTagihanJenjang: RefrensiTabResponTagihanJenjangType[] = respon.filter(s => s.atp === atp_id).map(m => {
        return {
            responId: idbaris,
            noSoal: m.no_prefix,
            skor: m.skor ?? null,
            bentukSoal: m.bentuk_soal,
            atp_id,
            kunciJawabanPg: m.bentuk_soal === 'pg' ? (m.soal?.jawaban as string[])?.[0] ?? '' : '',
            dataPublikasi: publikasi,
            responJawaban: m.respon ?? '',
        };
    });

    const dataPerBentukSoal: DataRefrensiPerBentukSoal[] = templateKoreksiSiswa.map(m => {
        return {
            bentukSoal: m.bentuk_soal.name,
            data: m.data.map(mm => dataRefrensiTabResponTagihanJenjang.find(s => s.noSoal === mm.no_prefix && s.bentukSoal === mm.soal?.bentuk_soal)!)
        };
    });

    const skor = objekKdSebaran[keySkorKdAtpSheet];
    let totalDetail: number | null = 0;

    for (const itemDetail of dataRefrensiTabResponTagihanJenjang) {
        /** aritmetika aman: akumulasi detail skor tanpa artefak floating-point */
        totalDetail = jmlAman(totalDetail ?? 0, itemDetail.skor ?? 0);
    }

    return {
        siswa_id,
        namaSiswa,
        rombel,
        total: totalDetail,
        countSoal: dataRefrensiTabResponTagihanJenjang.length,
        dataRefrensiTabResponTagihanJenjang,
        dataPerBentukSoal,
        dataSumberPublikasiPaket: publikasi,
        skor,
        skorKd: { [keySkorKdAtpSheet]: skor }
    };
}

/**
 * Mengakumulasi skor satu ATP dari sheet skor KD milik siswa:
 * `totalAtp_sheet` = jumlah (skor * jumlah soal siswa sebagai peserta) dan
 * `countSoalAtp_sheet` = jumlah soal terkait. Keduanya menjadi dasar pembagian
 * `skorAtp_sheet` dan akumulasi naik ke level TP/CP/Mapel oleh pemanggil.
 */
export function akumulasiSkorAtpSheetBuilder(params: {
    refrensiSkorKdSheet?: SiswaHasDataSkorKdSheetType;
    siswaPeserta?: PesertaTagihanType;
    atp_id: number;
}): { totalAtp_sheet: number | null; countSoalAtp_sheet: number } {
    const { refrensiSkorKdSheet, siswaPeserta, atp_id } = params;

    let totalAtp_sheet: number | null = null;
    let countSoalAtp_sheet: number = 0;

    const currentAllSkorAtp = refrensiSkorKdSheet?.dataKdSheetMapper.get(atp_id)?.dataSkorKd;
    if (currentAllSkorAtp) {
        for (const dataTabKd of currentAllSkorAtp) {
            const { atp_id, publikasi_id, skor } = dataTabKd;
            const CountSoalThatSiswaAsPesertaInCurrentTegahan = siswaPeserta?.tagihanMapper.get(publikasi_id)?.atpSoalMapper?.get(atp_id)?.length ?? 0;
            if (skor !== null) {
                /** aritmetika aman: akumulasi skor * jumlah soal tanpa artefak floating-point */
                totalAtp_sheet = jmlAman(totalAtp_sheet ?? 0, kaliAman(skor ?? 0, CountSoalThatSiswaAsPesertaInCurrentTegahan));
                countSoalAtp_sheet += CountSoalThatSiswaAsPesertaInCurrentTegahan;
            }
        }
    }

    return { totalAtp_sheet, countSoalAtp_sheet };
}

/**
 * Mengakumulasi skor satu ATP dari respon siswa:
 * - `totalAtp` = jumlah skor seluruh respon siswa pada ATP ini,
 * - `countSoalAtpRespon` = jumlah respon,
 * - `detail` = data per publikasi respon (lihat `dataDetailAtpBuilder`).
 */
export function akumulasiSkorAtpResponBuilder(params: {
    refrensiResponTagihan?: RefrensiResponSiswaType;
    atp_id: number;
    keySkorKdAtpSheet: string;
    namaSiswa: string;
    rombel: string;
}): { totalAtp: number | null; countSoalAtpRespon: number; detail: DataSkorSiswaByInstrumenType[] } {
    const { refrensiResponTagihan, atp_id, keySkorKdAtpSheet, namaSiswa, rombel } = params;

    let totalAtp: number | null = null;
    let countSoalAtpRespon: number = 0;
    const detail: DataSkorSiswaByInstrumenType[] = [];

    const currentResponThisSiswa = refrensiResponTagihan?.responAtpMapper.get(atp_id);
    if (currentResponThisSiswa) {
        const { ref, rispon } = currentResponThisSiswa;
        for (const itemRispon of rispon) {
            const { skor } = itemRispon;
            if (skor !== null) {
                /** aritmetika aman: akumulasi skor respon tanpa artefak floating-point */
                totalAtp = jmlAman(totalAtp ?? 0, skor ?? 0);
            }
        }
        countSoalAtpRespon += rispon.length;

        for (const itemRef of ref) {
            detail.push(dataDetailAtpBuilder({ itemRef, atp_id, keySkorKdAtpSheet, namaSiswa, rombel }));
        }
    }

    return { totalAtp, countSoalAtpRespon, detail };
}

/**
 * Membentuk `CollectionNilaiMapel` untuk satu siswa pada satu mapel:
 * looping CP -> TP -> ATP, menghitung dua sumber skor (sheet KD dan respon),
 * lalu merangkumnya menjadi `dataCp`/`dataCp_sheet` beserta `skorKd_*`.
 */
export function collectionNilaiMapelBuilder(params: CollectionNilaiMapelBuilderParams): CollectionNilaiMapel {
    const { strukturMapel, namaSiswa, rombel, refrensiResponTagihan, refrensiSkorKdSheet, siswaPeserta } = params;
    const { kodeMapel: kodeMapelStruktur, mapelName: mapelNameStruktur, dataCp: dataCpStruktur, slotMapel } = strukturMapel;

    /** proses kalkukasi */
    let totalMapel: number | null = null;
    let countSoalMapel: number = 0;
    const dataCp: CollectionNilaiCp[] = [];
    let skorMapel: number | null = null;

    let skorMapel_sheet: number | null = null;
    let totalMapel_sheet: number | null = null;
    let countSoalMapel_sheet: number = 0;
    const dataCp_sheet: CollectionNilaiCpSheet[] = [];
    const skorKd_atp_sheet: SkorKdNullableType = Object.create(null);
    const skorKd_tp_sheet: SkorKdNullableType = Object.create(null);
    const skorKd_cp_sheet: SkorKdNullableType = Object.create(null);
    const skorKd_atp: SkorKdNullableType = Object.create(null);
    const skorKd_cp: SkorKdNullableType = Object.create(null);
    const skorKd_tp: SkorKdNullableType = Object.create(null);

    for (const CpCurrentMapel of dataCpStruktur) {
        const { cp_id, cp_description, dataTp: dataTpStruktur, slotCp } = CpCurrentMapel;

        const keyCpSheet = `${kodeMapelStruktur}_${cp_id}`;
        let totalCp_sheet: number | null = null;
        let countSoalCp_sheet: number = 0;
        let skorCp_sheet: number | null = null;

        let totalCp: number | null = null;
        let skorCp: number | null = null;
        let countSoalCp: number = 0;

        const koleksiTp: CollectionNilaiTp[] = [];
        const koleksiTpSheet: CollectionNilaiTpSheet[] = [];

        for (const TpCurrentMapel of dataTpStruktur) {
            const { tp_id, tp_description, slotTp, dataAtp: dataAtpStruktur } = TpCurrentMapel;
            const keyTpSheet = `${kodeMapelStruktur}_${tp_id}`;
            let totalTp_sheet: number | null = null;
            let countTpSoal_sheet: number = 0;
            let skorTp_sheet: number | null = null;
            /** counted respon siswa */
            let totalTp: number | null = null;
            let skorTp: number | null = null;
            let countSoalTp: number = 0;
            const koleksiAtp: CollectionNilaiAtp[] = [];
            const koleksiAtpSheet: CollectionNilaiAtpSheet[] = [];

            for (const atpCurrentMapel of dataAtpStruktur) {
                const { atp_id, atp_description } = atpCurrentMapel;

                /** skorKdSheet */
                const keySkorKdAtpSheet = `${kodeMapelStruktur}_${atp_id}`;
                const { totalAtp_sheet, countSoalAtp_sheet } = akumulasiSkorAtpSheetBuilder({
                    refrensiSkorKdSheet,
                    siswaPeserta,
                    atp_id
                });
                let skorAtp_sheet: number | null = null;

                skorKd_atp_sheet[keySkorKdAtpSheet] = null;
                if (totalAtp_sheet !== null) {
                    skorAtp_sheet = desimalFormat(totalAtp_sheet / countSoalAtp_sheet);
                    skorKd_atp_sheet[keySkorKdAtpSheet] = skorAtp_sheet;

                    totalTp_sheet = Math.round(jmlAman(totalTp_sheet ?? 0, totalAtp_sheet));
                    countTpSoal_sheet += countSoalAtp_sheet;

                    totalCp_sheet = Math.round(jmlAman(totalCp_sheet ?? 0, totalAtp_sheet));
                    countSoalCp_sheet += countSoalAtp_sheet;

                    totalMapel_sheet = Math.round(jmlAman(totalMapel_sheet ?? 0, totalAtp_sheet));
                    countSoalMapel_sheet += countSoalAtp_sheet;
                }

                /**skor respon */
                const { totalAtp, countSoalAtpRespon, detail } = akumulasiSkorAtpResponBuilder({
                    refrensiResponTagihan,
                    atp_id,
                    keySkorKdAtpSheet,
                    namaSiswa,
                    rombel
                });
                const skorAtp: number | null = null;

                skorKd_atp[keySkorKdAtpSheet] = null;
                if (totalAtp !== null) {
                    const skorAtpRispon = desimalFormat(totalAtp / countSoalAtpRespon);
                    skorKd_atp[keySkorKdAtpSheet] = skorAtpRispon;

                    /** aritmetika aman: akumulasi naik ke level TP tanpa artefak floating-point */
                    totalTp = jmlAman(totalTp ?? 0, totalAtp);
                    countSoalTp += countSoalAtpRespon;

                    totalCp = jmlAman(totalCp ?? 0, totalAtp);
                    countSoalCp += countSoalAtpRespon;

                    totalMapel = jmlAman(totalMapel ?? 0, totalAtp);
                    countSoalMapel += countSoalAtpRespon;
                }

                koleksiAtp.push({
                    atp_id,
                    atp_description,
                    totalAtp,
                    countSoalAtp: countSoalAtpRespon,
                    skorAtp,
                    detail
                });
                koleksiAtpSheet.push({
                    atp_id,
                    atp_description,
                    totalAtp: Math.round(totalAtp_sheet ?? 0),
                    countKeyAtp: countSoalAtp_sheet,
                    skorAtp: skorAtp_sheet,
                });
            };

            skorKd_tp_sheet[keyTpSheet] = null;
            if (totalTp_sheet !== null) {
                skorTp_sheet = desimalFormat(totalTp_sheet / countTpSoal_sheet);
                skorKd_tp_sheet[keyTpSheet] = skorTp_sheet;
            }
            skorKd_tp[keyTpSheet] = null;
            if (totalTp !== null) {
                skorTp = desimalFormat(totalTp / countSoalTp);
                skorKd_tp[keyTpSheet] = skorTp;
            }

            koleksiTp.push({
                tp_id,
                tp_description,
                totalTp,
                slotTp,
                countSoalTp,
                skorTp,
                koleksiAtp
            });
            koleksiTpSheet.push({
                tp_id,
                tp_description,
                totalTp: totalTp_sheet,
                countKeyTp: countTpSoal_sheet,
                skorTp: skorTp_sheet,
                slotTp,
                koleksiAtp: koleksiAtpSheet
            });
        }

        skorKd_cp_sheet[keyCpSheet] = null;
        if (totalCp_sheet !== null) {
            skorCp_sheet = desimalFormat(totalCp_sheet / countSoalCp_sheet);
            skorKd_cp_sheet[keyCpSheet] = skorCp_sheet;
        }

        skorKd_cp[keyCpSheet] = null;
        if (totalCp !== null) {
            skorCp = desimalFormat(totalCp / countSoalCp);
            skorKd_cp[keyCpSheet] = skorCp;
        }

        dataCp.push({
            cp_id,
            cp_description,
            countSoalCp,
            skorCp,
            slotCp,
            koleksiTp,
            totalCp
        });
        dataCp_sheet.push({
            cp_id,
            cp_description,
            slotCp,
            countKeyCp: countSoalCp_sheet,
            skorCp: skorCp_sheet,
            koleksiTp: koleksiTpSheet,
            totalCp: totalCp_sheet
        });
    }

    if (totalMapel_sheet !== null) {
        const skor = desimalFormat(totalMapel_sheet / countSoalMapel_sheet);
        skorMapel_sheet = skor;
    }
    if (totalMapel !== null) {
        const skor = desimalFormat(totalMapel / countSoalMapel);
        skorMapel = skor;
    }

    const mapel: CollectionNilaiMapel = Object.create(null);
    mapel.kodeMapel = kodeMapelStruktur;
    mapel.mapelName = mapelNameStruktur;
    mapel.totalMapel_sheet = totalMapel_sheet;
    mapel.countSoalMapel_sheet = countSoalMapel_sheet;
    mapel.skorMapel_sheet = skorMapel_sheet;
    mapel.dataCp_sheet = dataCp_sheet;
    mapel.skorKd_cp_sheet = skorKdNullableBuilder(skorKd_cp_sheet);
    mapel.skorKd_tp_sheet = skorKdNullableBuilder(skorKd_tp_sheet);
    mapel.skorKd_atp_sheet = skorKdNullableBuilder(skorKd_atp_sheet);
    mapel.slotMapel = slotMapel;
    mapel.totalMapel = totalMapel;
    mapel.countSoalMapel = countSoalMapel;
    mapel.dataCp = dataCp;
    mapel.skorKd_atp = skorKdNullableBuilder(skorKd_atp);
    mapel.skorKd_tp = skorKdNullableBuilder(skorKd_tp);
    mapel.skorKd_cp = skorKdNullableBuilder(skorKd_cp);
    mapel.skorMapel = skorMapel;

    return mapel;
}
