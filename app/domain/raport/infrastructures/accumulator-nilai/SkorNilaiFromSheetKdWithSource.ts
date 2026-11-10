import type { SkorNilaiFromSkorKdSheet } from "~/domain/kategori-tagihan/types";
import type { SourceResponAtpGroupTagihan, SourceGroupResponseTpNilaiSiswa, SourceGroupResponseCpNilaiSiswa, SourceGroupResponseNilaiSiswa } from "../sumber-nilai/mapperSiswaWithDetailNilaiResponAppType";
import type { SourceKategoriAssesmenWithTagihanRespon, DataCpWithSource } from "./SkorNilaiFromResponWithSourceType";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import type { DataKdSheetApp } from "~/types/penilaian/DataKdSheetAppType";

export type SourceSheetAtpGroupTagihan = {
    tagihan: TagihanHasDataResponse;
    collectionCurrentTagihanAtp: DataKdSheetApp[];
}
export type SkorNilaiFromSheetKdWithSource = SkorNilaiFromSkorKdSheet & {
    sourceSheetKdGroupTagihan: SourceSheetAtpGroupTagihan[];
    // sourcesByGroupKategoriAssesmen: SourceKategoriAssesmenWithTagihanRespon[];
    // sourceSheetKdGroupTagihanLevelTp: SourceGroupResponseTpNilaiSiswa[];
    // sourceSheetKdGroupTagihanLevelCp: SourceGroupResponseCpNilaiSiswa[];
    // sourceSheetKdGroupTagihanLevelAtp: SourceGroupResponseNilaiSiswa[];
    // dataCpWithSource: DataCpWithSource[];
};
