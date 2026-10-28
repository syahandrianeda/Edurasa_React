import type { InterfaceMapel } from "~/types/mapel/mapel";
import type { DataSiswaBasedMapelInResponAllKategoriTagihanInterface } from "./DataSiswaBasedMapelInResponAllKategoriTagihanInterface";
import type { RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan } from "./DataResponSiswaTiapKategoriTagihan";


export interface KoleksiMapelBasedSiswaInResponAllKategoriTagihan {
    mapel: InterfaceMapel['kode'];
    dataNilai: DataSiswaBasedMapelInResponAllKategoriTagihanInterface[];
    koleksiAtpInMapel?: RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan
}
