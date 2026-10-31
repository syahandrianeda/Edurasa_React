import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import type { CollectionNilaiMapel } from "./CollectionNilaiMapel";
import type { DataResponSiswaTiapKategoriTagihan, RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan } from "./DataResponSiswaTiapKategoriTagihan";

export interface DataSiswaBasedMapelInResponAllKategoriTagihanInterface {
    idSiswa: number;
    mapel?: CollectionNilaiMapel
    koleksiAtpInMapel?: RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan
    // mapelSheetSkorKd?:CollectionNilaiMapel
    memberOfTagihan?:TagihanHasDataResponse[]
    namaSiswa:string, 
    rombel: string,
}
