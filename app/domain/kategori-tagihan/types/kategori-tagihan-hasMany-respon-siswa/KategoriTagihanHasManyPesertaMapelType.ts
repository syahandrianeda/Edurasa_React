import type { KoleksiPublikasiPaketPerMapel } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/StrukturKurikulumMapper";
import type { KategoriTagihanType } from "../entities/KategoriTagihanType";
import type { KoleksiMapelBasedSiswaInResponAllKategoriTagihan } from "./KoleksiMapelBasedSiswaInResponAllKategoriTagihan";
import type { DataSiswaBasedMapelInResponAllKategoriTagihanInterface } from "./DataSiswaBasedMapelInResponAllKategoriTagihanInterface";
import type { RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan } from "./DataResponSiswaTiapKategoriTagihan";



export interface KategoriTagihanHasManyPesertaMapelType {
    type: KategoriTagihanType;
    data: KoleksiMapelBasedSiswaInResponAllKategoriTagihan[],//DataSiswaBasedMapelInResponAllKategoriTagihanInterface[],
    koleksiPaketSoal: KoleksiPublikasiPaketPerMapel[];
    koleksiAtpInMapel: RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan[]
}


