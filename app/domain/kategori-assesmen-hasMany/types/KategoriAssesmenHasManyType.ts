import type { InterfaceMapel } from "~/types/mapel/mapel";
import type { KategoriTagihanType } from "../../kategori-tagihan/types/entities/KategoriTagihanType";
import type { DataSiswaBasedMapelInResponAllKategoriTagihanInterface } from "../../kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/DataSiswaBasedMapelInResponAllKategoriTagihanInterface";
import type { RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan } from "../../kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/DataResponSiswaTiapKategoriTagihan";
import type { StrukturAtpType, StrukturCpType, StrukturTpType } from "~/domain/trees-struktur-kurikulum";
import type { SiswaWithRekapNilaiCurrentMapel } from "./SiswaWithRekapNilaiType";


type StrukturKurikulumKategoriAssesmen = RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan;

export interface RekapNilaiMapelKategoriAssesmen{
    mapel: InterfaceMapel['kode'];
    // dataNilai: DataNilaiSiswaHasServerDataPolymorphic
    dataNilai: SiswaWithRekapNilaiCurrentMapel[];
    strukturKurikulumMapel?: StrukturKurikulumKategoriAssesmen
}

export interface KategoriAssesmenWithRekapNilaiMapel{
    type: KategoriTagihanType;
    // data: KoleksiMapelBasedSiswaInResponAllKategoriTagiha[],
    data:RekapNilaiMapelKategoriAssesmen[]
    // koleksiPaketSoal: KoleksiPublikasiPaketPerMapel[];
    // koleksiAtpInMapel: RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan[]
    strukturKurikulumKategoriAssesmen:StrukturKurikulumKategoriAssesmen[];

}
