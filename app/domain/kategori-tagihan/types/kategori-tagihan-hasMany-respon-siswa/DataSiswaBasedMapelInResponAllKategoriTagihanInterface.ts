import type { CollectionNilaiMapel } from "./CollectionNilaiMapel";
import type { DataResponSiswaTiapKategoriTagihan, RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan } from "./DataResponSiswaTiapKategoriTagihan";

export interface DataSiswaBasedMapelInResponAllKategoriTagihanInterface {
    idSiswa: number;
    mapel?: CollectionNilaiMapel
    koleksiAtpInMapel?: RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan
    // mapelSheetSkorKd?:CollectionNilaiMapel
    namaSiswa:string, 
    rombel: string,
}
