import type { KoleksiPublikasiPaketPerMapel } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/StrukturKurikulumMapper";
import type { CollectionNilaiMapel } from "./CollectionNilaiMapel";
import type { InterfaceMapel } from "~/types/mapel/mapel";
import type { StrukturAtpType, StrukturCpType, StrukturTpType } from "~/domain/trees-struktur-kurikulum";

export interface RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan{
    kodeMapel:InterfaceMapel['kode'],
    collection_Atp: StrukturAtpType[]
    collection_Tp: StrukturTpType[]
    collection_Cp: StrukturCpType[]
}
export interface DataResponSiswaTiapKategoriTagihan {
    idSiswa: number;
    mapel: CollectionNilaiMapel[];
    koleksiAtpInMapel: RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan[]
}


