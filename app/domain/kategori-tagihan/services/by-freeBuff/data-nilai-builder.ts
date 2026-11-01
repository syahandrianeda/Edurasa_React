/**
 * ============ data-nilai-builder ============
 * Helper pembentukan `dataNilai` (koleksi nilai seluruh siswa per mapel) yang sebelumnya
 * tertanam di badan method `KategoriAssesmenClass.init()`. Diletakkan di file terpisah
 * (satu directory dengan `KategoriAssesmenClass.ts`) karena memungkinkan dipakai oleh
 * class lain.
 */
import type { jp_mapelApp } from "~/types/mapel/jp_mapel";
import type { SiswaType } from "~/types/siswa";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import type { StrukturAtpType, StrukturCpType, StrukturTpType } from "~/domain/trees-struktur-kurikulum";
import type { StrukturKurikulumCpWithSlotType, StrukturKurikulumMapelWithSlotType } from "~/domain/trees-struktur-kurikulum/struktur-kurikulum-type";
import type { RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan } from "../../types";
import type { DataSiswaBasedMapelInResponAllKategoriTagihanInterface } from "../../types/kategori-tagihan-hasMany-respon-siswa/DataSiswaBasedMapelInResponAllKategoriTagihanInterface";
import type { KoleksiMapelBasedSiswaInResponAllKategoriTagihan } from "../../types/kategori-tagihan-hasMany-respon-siswa/KoleksiMapelBasedSiswaInResponAllKategoriTagihan";
import type { KonteksKategoriAsesmenType } from "./konteks-kategori-asesmen-builder";
import { collectionNilaiMapelBuilder } from "./collection-nilai-mapel-builder";

export type KoleksiMapelBasedSiswaBuilderResultType = {
    /** koleksi per mapel: `[dataNilai, mapel]` */
    data: KoleksiMapelBasedSiswaInResponAllKategoriTagihan[];
    koleksiAtpInMapel: RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan[];
};

/**
 * Merangkum struktur CP menjadi koleksi terpisah CP/TP/ATP (tanpa nilai),
 * untuk kebutuhan `RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan`.
 */
export function koleksiStrukturInMapelBuilder(dataCpStruktur: StrukturKurikulumCpWithSlotType[]): {
    collection_Cp: StrukturCpType[];
    collection_Tp: StrukturTpType[];
    collection_Atp: StrukturAtpType[];
} {
    const collection_Cp: StrukturCpType[] = dataCpStruktur.map(({ cp_id, cp_description }) => ({ cp_id, cp_description }));
    const collection_Tp: StrukturTpType[] = dataCpStruktur.flatMap(cp => cp.dataTp.map(({ tp_id, tp_description }) => ({ tp_id, tp_description })));
    const collection_Atp: StrukturAtpType[] = dataCpStruktur.flatMap(m => m.dataTp.flatMap(n => n.dataAtp.map(({ atp_id, atp_description }) => ({ atp_id, atp_description }))));

    return { collection_Cp, collection_Tp, collection_Atp };
}

/** mencari publikasi tagihan yang diikuti siswa ini dan menyertakan mapel terkait */
export function memberOfTagihanBuilder(
    dataPublikasiPaketWithRespon: TagihanHasDataResponse[],
    idSiswa: number,
    mapelNameStruktur: string
): TagihanHasDataResponse[] {
    return dataPublikasiPaketWithRespon.filter(
        s => s.peserta.some(siswa => siswa.id === idSiswa) && s.koleksi_mapelName.includes(mapelNameStruktur)
    );
}

export type DataNilaiBuilderParams = {
    data_students: SiswaType[];
    strukturMapel: StrukturKurikulumMapelWithSlotType;
    koleksiAtpInMapel: RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan;
    konteks: KonteksKategoriAsesmenType;
};

/**
 * Membangun `dataNilai` satu mapel: untuk tiap siswa membangun `CollectionNilaiMapel`
 * (via `collectionNilaiMapelBuilder`) dan merangkumnya beserta `memberOfTagihan`.
 */
export function dataNilaiBuilder(params: DataNilaiBuilderParams): DataSiswaBasedMapelInResponAllKategoriTagihanInterface[] {
    const { data_students, strukturMapel, koleksiAtpInMapel, konteks } = params;
    const { mapelName: mapelNameStruktur } = strukturMapel;

    const dataNilai: DataSiswaBasedMapelInResponAllKategoriTagihanInterface[] = [];

    /** registrasikan dataSiswa mapel ini */
    for (const siswa of data_students) {
        const { id: idSiswa, pd_nama: namaSiswa, nama_rombel: rombel } = siswa;

        const refrensiResponTagihan = konteks.siswaHasDataResponMapper.get(idSiswa);
        const refrensiSkorKdSheet = konteks.mapperDataSkorKdSheet.mapperSiswaHasDataSkorKdSheet.get(idSiswa);
        const siswaPeserta = konteks.siswaAsPesertaTagihan.get(idSiswa);

        /** proses kalkukasi */
        const mapel = collectionNilaiMapelBuilder({
            strukturMapel,
            namaSiswa,
            rombel,
            refrensiResponTagihan,
            refrensiSkorKdSheet,
            siswaPeserta
        });

        const memberOfTagihan = memberOfTagihanBuilder(konteks.dataPublikasiPaketWithRespon, idSiswa, mapelNameStruktur);

        const obDataNilai: DataSiswaBasedMapelInResponAllKategoriTagihanInterface = {
            idSiswa,
            namaSiswa,
            rombel,
            mapel,
            koleksiAtpInMapel,
            memberOfTagihan
        };
        dataNilai.push(obDataNilai);
    }

    return dataNilai;
}

/**
 * Looping utama `init()`: untuk tiap mapel rapor mencari struktur kurikulumnya pada
 * kategori assesmen berjalan, membangun `dataNilai` per mapel, lalu merangkum
 * `data` (koleksi per mapel) dan `koleksiAtpInMapel` (rekap ATP per mapel).
 */
export function koleksiMapelBasedSiswaBuilder(
    mapelRaport: jp_mapelApp[],
    konteks: KonteksKategoriAsesmenType
): KoleksiMapelBasedSiswaBuilderResultType {
    const data: KoleksiMapelBasedSiswaInResponAllKategoriTagihan[] = [];
    const koleksiAtpInMapel: RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan[] = [];

    for (const mapelRapor of mapelRaport) {
        const { kode, data_students } = mapelRapor;

        /** found Mapel in Struktur Kurikulum in current kategori assesmen */
        const foundCurrentMapelStruktur = konteks.strukturKurikulum.find(s => s.kodeMapel === kode);

        if (foundCurrentMapelStruktur) {
            const { dataCp: dataCpStruktur } = foundCurrentMapelStruktur;
            const { collection_Atp, collection_Tp, collection_Cp } = koleksiStrukturInMapelBuilder(dataCpStruktur);

            const koleksiAtpInMapelInCurrentMapel: RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan = {
                kodeMapel: kode,
                collection_Atp,
                collection_Tp,
                collection_Cp
            };

            const dataNilai = dataNilaiBuilder({
                data_students,
                strukturMapel: foundCurrentMapelStruktur,
                koleksiAtpInMapel: koleksiAtpInMapelInCurrentMapel,
                konteks
            });

            const koleksiMapel: KoleksiMapelBasedSiswaInResponAllKategoriTagihan = {
                mapel: kode,
                dataNilai,
                koleksiAtpInMapel: koleksiAtpInMapelInCurrentMapel
            };

            data.push(koleksiMapel);
            koleksiAtpInMapel.push(koleksiAtpInMapelInCurrentMapel);
        }
    }

    return { data, koleksiAtpInMapel };
}
