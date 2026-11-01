/**
 * ============ konteks-kategori-asesmen-builder ============
 * Helper pembangun "konteks" satu kategori assesmen (mapper respon, mapper sheet KD,
 * struktur kurikulum, peserta tagihan, dan koleksi paket soal) yang sebelumnya tertanam
 * di badan method `KategoriAssesmenClass.init()`.
 * Diletakkan di file terpisah (satu directory dengan `KategoriAssesmenClass.ts`) karena
 * memungkinkan dipakai ulang oleh class/class lain.
 */
import type { TagihanAsessmenType, TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import type { KoleksiPublikasiPaketPerMapel } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/StrukturKurikulumMapper";
import StrukturKurikulumInTagihanHasDataResponBuilder from "~/domain/struktur-kurikulum/tagihan-has-data-response/StrukturKurikulumInTagihanHasDataResponBuilder";
import MapperSiswaOnDataResponBuilder, { type MapperSiswaOnDataResponType } from "~/domain/respon-tagihan-jenjang/mapper/MapperSiswaOnDataResponBuilder";
import type { StrukturKurikulumMapelWithSlotType } from "~/domain/trees-struktur-kurikulum/struktur-kurikulum-type";
import type { KategoriTagihanType } from "../../types/entities/KategoriTagihanType";
import type { KategoriTagihanHasManyPesertaMapelType } from "../../types/kategori-tagihan-hasMany-respon-siswa/KategoriTagihanHasManyPesertaMapelType";
import SkorKdSheetMapper, { type SkorKdSheetMapperType } from "../../infrastructures/SkorKdSheetMapper";
import MapperPesertaTagihan, { type MapperPesertaHasTagihanMapperType } from "../../infrastructures/MapperPesertaTagihan";
import DataSheetSkorKdKategoriAsesmenMapper, { type DataSheetSkorKdKategoriAsesmenMapperType } from "../../infrastructures/DataSheetSkorKdKategoriAsesmenMapper";

/** nilai hasil `mapperKategoriAssesmen.get(type)` */
export type KoleksiJenisTagihanHasResponType = {
    dataPublikasiPaket: TagihanAsessmenType[];
    dataPublikasiPaketWithRespon: TagihanHasDataResponse[];
};

/** seluruh data/mapper per kategori assesmen yang dibutuhkan untuk membangun `dataNilai` */
export type KonteksKategoriAsesmenType = {
    dataPublikasiPaketWithRespon: TagihanHasDataResponse[];
    strukturKurikulum: StrukturKurikulumMapelWithSlotType[];
    siswaHasDataResponMapper: MapperSiswaOnDataResponType;
    mapperDataSkorKdSheet: SkorKdSheetMapperType;
    siswaAsPesertaTagihan: MapperPesertaHasTagihanMapperType;
    mapperSkorKd: DataSheetSkorKdKategoriAsesmenMapperType;
    koleksiPaketSoal: KoleksiPublikasiPaketPerMapel[];
};

/**
 * Membentuk "shell" result kategori tagihan: `type` sudah terisi,
 * `data`, `koleksiPaketSoal`, dan `koleksiAtpInMapel` masih kosong.
 * Object dibuat dengan `Object.create(null)` seperti implementasi asli `init()`.
 */
export function kategoriTagihanHasManyPesertaMapelBuilder(type: KategoriTagihanType): KategoriTagihanHasManyPesertaMapelType {
    const objKategoriTagihanHasManyPesertaMapelType: KategoriTagihanHasManyPesertaMapelType = Object.create(null);
    objKategoriTagihanHasManyPesertaMapelType.type = type;
    objKategoriTagihanHasManyPesertaMapelType.data = [];
    objKategoriTagihanHasManyPesertaMapelType.koleksiPaketSoal = [];
    objKategoriTagihanHasManyPesertaMapelType.koleksiAtpInMapel = [];
    return objKategoriTagihanHasManyPesertaMapelType;
}

/** merangkum tiap publikasi paket menjadi `KoleksiPublikasiPaketPerMapel` */
export function koleksiPaketSoalBuilder(dataPublikasiPaketWithRespon: TagihanHasDataResponse[]): KoleksiPublikasiPaketPerMapel[] {
    return dataPublikasiPaketWithRespon.map(m => {
        const { idbaris, data_response_bySiswa, nama_publikasi, koleksi_mapelName } = m;
        return {
            idbaris,
            namaPublikasi: nama_publikasi,
            koleksiMapel: koleksi_mapelName,
            countRespon: data_response_bySiswa.filter(s => s.data.length > 0).length,
            detail: m
        };
    });
}

/**
 * Membangun seluruh konteks per kategori assesmen sekaligus `koleksiPaketSoal`,
 * dalam urutan build yang sama persis dengan badan `KategoriAssesmenClass.init()`.
 */
export function konteksKategoriAsesmenBuilder(koleksiJenisTagihanHasRespon: KoleksiJenisTagihanHasResponType): KonteksKategoriAsesmenType {
    const { dataPublikasiPaketWithRespon } = koleksiJenisTagihanHasRespon;

    const data_respons = dataPublikasiPaketWithRespon.flatMap(m => m.data_respons);
    const dataSkorKdSheet = dataPublikasiPaketWithRespon.flatMap(m => m.dataSkorKdSheet);
    const strukturKurikulum = StrukturKurikulumInTagihanHasDataResponBuilder.buildWithSlot(dataPublikasiPaketWithRespon);

    const siswaHasDataResponMapper: MapperSiswaOnDataResponType = MapperSiswaOnDataResponBuilder.build(data_respons);
    const mapperDataSkorKdSheet = SkorKdSheetMapper.build(dataSkorKdSheet);
    const siswaAsPesertaTagihan = MapperPesertaTagihan.buildMapperSiswaHasTagihanMapper(dataPublikasiPaketWithRespon);
    /** belum dipakai oleh `init()`; dipertahankan agar urutan build identik dengan sebelum refactor */
    const mapperSkorKd = DataSheetSkorKdKategoriAsesmenMapper.build(dataSkorKdSheet, siswaAsPesertaTagihan);

    const koleksiPaketSoal = koleksiPaketSoalBuilder(dataPublikasiPaketWithRespon);

    return {
        dataPublikasiPaketWithRespon,
        strukturKurikulum,
        siswaHasDataResponMapper,
        mapperDataSkorKdSheet,
        siswaAsPesertaTagihan,
        mapperSkorKd,
        koleksiPaketSoal
    };
}
