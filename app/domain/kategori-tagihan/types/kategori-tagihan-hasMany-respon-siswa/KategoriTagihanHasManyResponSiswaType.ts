import type { KategoriTagihanType } from "../entities/KategoriTagihanType";
import type { DataResponSiswaTiapKategoriTagihan, RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan } from "./DataResponSiswaTiapKategoriTagihan";
import type { KoleksiPublikasiPaketPerMapel } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/StrukturKurikulumMapper";

export interface KategoriTagihanHasManyResponSiswaType{
    type:KategoriTagihanType,
    data: DataResponSiswaTiapKategoriTagihan[]
    koleksiPaketSoal:KoleksiPublikasiPaketPerMapel[]
    koleksiAtpInMapel: RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan[]
}



