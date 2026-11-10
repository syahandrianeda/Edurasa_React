import type { SkorNilaiFromRespon } from "~/domain/kategori-tagihan/types";
import type { KategoriTagihanType } from "~/domain/kategori-tagihan/types/entities/KategoriTagihanType";
import type { CollectionNilaiAtp } from "~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiAtp";
import type { CollectionNilaiCp } from "~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiCp";
import type { CollectionNilaiTp } from "~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiTp";
import type { SourceResponAtpGroupTagihan, SourceGroupResponseTpNilaiSiswa, SourceGroupResponseCpNilaiSiswa, SourceGroupResponseNilaiSiswa } from "../sumber-nilai/mapperSiswaWithDetailNilaiResponAppType";

export type SourceKategoriAssesmenWithTagihanRespon = {
    type: KategoriTagihanType;
    tagihanWithRespon: SourceResponAtpGroupTagihan[];
};
export type KoleksiAtpWithSource = CollectionNilaiAtp & {
    sourcesByGroupTagihan: SourceResponAtpGroupTagihan[];
    sourcesByGroupKategoriAssesmen: SourceKategoriAssesmenWithTagihanRespon[];
};
export type KoleksiTpWithSource = CollectionNilaiTp & {
    sourcesByGroupTagihan: SourceResponAtpGroupTagihan[];
    sourcesByGroupKategoriAssesmen: SourceKategoriAssesmenWithTagihanRespon[];
    koleksiAtpWithSource: KoleksiAtpWithSource[];
};
export type DataCpWithSource = CollectionNilaiCp & {
    sourcesByGroupTagihan: SourceResponAtpGroupTagihan[];
    sourcesByGroupKategoriAssesmen: SourceKategoriAssesmenWithTagihanRespon[];
    koleksiTpWithSource: KoleksiTpWithSource[];
};

export type SkorNilaiFromResponWithSource = SkorNilaiFromRespon & {
    sourceResponGroupTagihan: SourceResponAtpGroupTagihan[];
    sourcesByGroupKategoriAssesmen: SourceKategoriAssesmenWithTagihanRespon[];
    sourceResponGroupTagihanLevelTp: SourceGroupResponseTpNilaiSiswa[];
    sourceResponGroupTagihanLevelCp: SourceGroupResponseCpNilaiSiswa[];
    sourceResponGroupTagihanLevelAtp: SourceGroupResponseNilaiSiswa[];
    // sourceResponGroupTagihanLevelAtp: {atp_id:number, source:SourceResponAtpGroupTagihan[]}
    // sourceResponGroupTagihanLevelCp: {cp_id:number, source:SourceResponAtpGroupTagihan[]}
    dataCpWithSource: DataCpWithSource[];
};


