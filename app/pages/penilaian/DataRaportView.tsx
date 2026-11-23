import type { FormatKategoriAssesmenTable } from "~/controllers/rekap-tagihan-harian/toolbar/FormatKategoriAssesmenTable";
import type { SkorKdNullableType } from "~/domain/penilaian/type/SkorKdType";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import type { KoleksiStrukturInstrumenSkorUI } from "~/domain/raport/infrastructures/builder/KoleksiStrukturWithSourceSkor";
import type { RaportRombelAsal } from "~/domain/raport/RekapRaportAsal";
import type { NilaiRaportInterface, TypeStrukturRefrenceDescription } from "~/domain/raport/types/RaportIntarface";
import type { InterfaceMapel } from "~/types/mapel/mapel";
import type { SiswaType } from "~/types/siswa";


export type ListRaportSiswaUi = {
    siswa: SiswaType;
    data: NilaiRaportInterface;
    nilaiRaport:number|null;
    skor: SkorKdNullableType;
    keyKompetensi:KeyKompetensi[],
    sumberMaxMin:KoleksiStrukturInstrumenSkorUI[]
};
export type KeyKompetensi = {
    kompetensiSelected: TypeStrukturRefrenceDescription;
    idKompetensi: number;
    kodeMapel: InterfaceMapel['kode'];
    keyIndexRefrence: string;

};
export type DataRaportView = {
    raportSiswa: RaportRombelAsal[];
    keySelected: keyof RaportRombelAsal;
    listRaportSiswa: ListRaportSiswaUi[];
    keyKompetensi: KeyKompetensi[];
    keyStruktur: string;
    source: FormatKategoriAssesmenTable,
    // sourceRekap?:MapelWithNilaiRaportRombel
    sourceTagihan:TagihanHasDataResponse[]
    // sourceKeyKompetensiMaxMinRefrence: keyof MakMinRefrence

};
