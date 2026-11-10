import type { KategoriTagihanType } from "~/domain/kategori-tagihan/types/entities/KategoriTagihanType";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import type { MapperSiswaOnDataResponType } from "~/domain/respon-tagihan-jenjang/mapper/MapperSiswaOnDataResponBuilder";
import type { StrukturAtpType, StrukturCpType, StrukturTpType } from "~/domain/trees-struktur-kurikulum";
import type { InterfaceMapel } from "~/types/mapel/mapel";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { SiswaType } from "~/types/siswa";

export type sourceResponAtp = {
    tagihan: TagihanHasDataResponse;
    currentResponAtp: RisponsePenilaianSiswa;
};
export type sourceResponTp = {
    tagihan: TagihanHasDataResponse;
    currentResponTp: RisponsePenilaianSiswa;
};
export type sourceResponCp = {
    tagihan: TagihanHasDataResponse;
    currentResponCp: RisponsePenilaianSiswa;
};
export type SourceResponAtpGroupTagihan = {
    
    tagihan: TagihanHasDataResponse;
    collectionCurrentTagihanAtp: RisponsePenilaianSiswa[];
};
export type SourceGroupResponseNilaiSiswa = {
    atp: StrukturAtpType;
    respon: RisponsePenilaianSiswa[];
    sourceRespon: sourceResponAtp[];
    sourceResponGroupTagihan: Map<number, SourceResponAtpGroupTagihan>;
    sourceResponGroupkategoriAssesmen: Map<KategoriTagihanType, Map<number, SourceResponAtpGroupTagihan[]>>;
    skorRespon:number|null
};
export type SourceGroupResponseMapelNilaiSiswa = {
    kodeMapel:string,
    namaMapel:string,
    respon: RisponsePenilaianSiswa[];
    sourceRespon: sourceResponAtp[];
    sourceResponGroupTagihan: Map<number, SourceResponAtpGroupTagihan>;
    sourceResponGroupkategoriAssesmen: Map<KategoriTagihanType, Map<number, SourceResponAtpGroupTagihan[]>>;
    skorRespon:number|null
};
export type SourceGroupResponseTpNilaiSiswa = {
    tp: StrukturTpType;
    respon: RisponsePenilaianSiswa[];
    sourceRespon: sourceResponTp[];
    sourceResponGroupTagihan: Map<number, SourceResponAtpGroupTagihan>;
    sourceResponGroupkategoriAssesmen: Map<KategoriTagihanType, Map<number, SourceResponAtpGroupTagihan[]>>;
    skorRespon:number|null
};
export type SourceGroupResponseCpNilaiSiswa = {
    cp: StrukturCpType;
    respon: RisponsePenilaianSiswa[];
    sourceRespon: sourceResponCp[];
    sourceResponGroupTagihan: Map<number, SourceResponAtpGroupTagihan>;
    sourceResponGroupkategoriAssesmen: Map<KategoriTagihanType, Map<number, SourceResponAtpGroupTagihan[]>>;
     skorRespon:number|null
};
export type MapperDataResponseAtp = Map<number, SourceGroupResponseNilaiSiswa>;
export type MapperDataResponseTp =  Map<number, SourceGroupResponseTpNilaiSiswa>;
export type MapperDataResponseCp =  Map<number, SourceGroupResponseCpNilaiSiswa>;
export type MapperDataResponseMapel =  Map<string, SourceGroupResponseMapelNilaiSiswa>;
export type mapperDetailNilaiResponType = {
    siswa: SiswaType;
    dataResponseMapel: MapperDataResponseMapel;//Map<number, SourceGroupResponseNilaiSiswa>;
    dataResponse: MapperDataResponseAtp;//Map<number, SourceGroupResponseNilaiSiswa>;
    dataResponseTp: MapperDataResponseTp;//Map<number, SourceGroupResponseTpNilaiSiswa>;
    dataResponseCp:  MapperDataResponseCp;
    hasDetailNilaiRespon: MapperSiswaOnDataResponType
};
export type mapperSiswaWithDetailNilaiResponAppType = Map<number, mapperDetailNilaiResponType>;
