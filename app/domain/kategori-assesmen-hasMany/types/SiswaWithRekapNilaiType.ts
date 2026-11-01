import type { CollectionNilaiMapel } from "../../kategori-tagihan/types";


export interface SiswaWithRekapNilai {
    idSiswa: number;
    namaSiswa: string;
    rombel: string;
    mapel: CollectionNilaiMapel[];
}

export interface SiswaWithRekapNilaiCurrentMapel {
    idSiswa: number;
    namaSiswa: string;
    rombel: string;
    mapel?: CollectionNilaiMapel;
}

export interface SiswaMapRekapNilai extends Omit<SiswaWithRekapNilai,'mapel'>{
    mapelMapper:Map<string, CollectionNilaiMapel>
}