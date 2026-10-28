import type { KategoriTagihanType } from "~/domain/kategori-tagihan/types/entities/KategoriTagihanType";
import type { DetailPublikasiWithResponSiswaType } from "./DetailPublikasiWithResponSiswaType";


export type DataPublikasiPerTipeAssesmenType = {
    tipe_assesmen: KategoriTagihanType;
    DetailPublikasiWithResponSiswa: DetailPublikasiWithResponSiswaType[];
};
