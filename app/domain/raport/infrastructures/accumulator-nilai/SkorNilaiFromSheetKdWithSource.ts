import type { SkorNilaiFromSkorKdSheet } from "~/domain/kategori-tagihan/types";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import type { DataKdSheetApp } from "~/types/penilaian/DataKdSheetAppType";
import type { StrukturAtpType, StrukturCpType, StrukturTpType } from "~/domain/trees-struktur-kurikulum";
import type { CollectionNilaiAtpSheet } from "~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiAtpSheet";
import type { CollectionNilaiTpSheet } from "~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiTpSheet";
import type { CollectionNilaiCpSheet } from "~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiCpSheet";
import type { KategoriTagihanType } from "~/domain/kategori-tagihan/types/entities/KategoriTagihanType";
import type { DataSheetKdWithRefrenceSoal } from "~/domain/TagihanHasDataResponMapper/MapperSiswaWithDetailNilaiSheetKdAppType";

export type SourceSheetAtpGroupTagihan = {
    atp:StrukturAtpType,
    tagihan: TagihanHasDataResponse;
    collectionCurrentTagihanAtp: DataKdSheetApp[];
    // countInstrumen:number|null
}

export type SourceKategoriAssesmenWithTagihanSheetKd = {
    type: KategoriTagihanType,
    tagihanWithSheetKd:  SourceSheetAtpGroupTagihan[]

}
export type SourceGroupKategoriAssesmenWithTagihanSheetKd = Map<KategoriTagihanType, SourceKategoriAssesmenWithTagihanSheetKd>;
// export type DataKdSheetAppWithCountSoalTagihan
// export type TagihanWithDataKdSheetAppDetail = {tagihan:TagihanHasDataResponse, collectionCurrentTagihanAtp:DataKdSheetApp[]};
// export type TagihanWithDataKdSheetAppDetailMapper = {tagihanMapper:Map<number, {collectionCurrentTagihanAtp: DataKdSheetApp[]}>}
export type TagihanWithDataKdSheetAppDetail = {tagihan:TagihanHasDataResponse, collectionCurrentTagihanAtp:DataSheetKdWithRefrenceSoal[]};
export type TagihanWithDataKdSheetAppDetailMapper = {tagihanMapper:Map<number, {collectionCurrentTagihanAtp: DataSheetKdWithRefrenceSoal[]}>}
// export type TagihanWithDataKdSheetAppDetail = {tagihan:TagihanHasDataResponse, collectionCurrentTagihanAtp:DataSheetRefrenceWithRealResponse[]};
// export type TagihanWithDataKdSheetAppDetailMapper = {tagihanMapper:Map<number, {collectionCurrentTagihanAtp: DataSheetRefrenceWithRealResponse[]}>}


export type SourceSheetAtpWithScore = CollectionNilaiAtpSheet & {
    sourceDataKdSheet: SourceSheetAtpGroupTagihan[],
    sourceTagihanDataKdSheetMapper: Map<number, TagihanWithDataKdSheetAppDetail>,
    sourceKategoriAssesmenDataKdSheetMapper: Map<KategoriTagihanType, TagihanWithDataKdSheetAppDetailMapper>

}
export type SourceSheetTpWithScore = StrukturTpType  & {
    totalTp:number|null,
    skorTp:number|null,
    countKeyTp:number,
    sourceDataKdSheet: SourceSheetAtpGroupTagihan[],
    sourceTagihanDataKdSheetMapper: Map<number, TagihanWithDataKdSheetAppDetail>,
    sourceKategoriAssesmenDataKdSheetMapper: Map<KategoriTagihanType, TagihanWithDataKdSheetAppDetailMapper>


}
export type SourceSheetCpWithScore = StrukturCpType & {
    totalCp:number|null,
    skorCp:number|null,
    countKeyCp:number,
    sourceDataKdSheet: SourceSheetAtpGroupTagihan[],
    sourceTagihanDataKdSheetMapper: Map<number, TagihanWithDataKdSheetAppDetail>,
    sourceKategoriAssesmenDataKdSheetMapper: Map<KategoriTagihanType, TagihanWithDataKdSheetAppDetailMapper>

}
export type KoleksiAtpSheetWithSource= CollectionNilaiAtpSheet & {
    
    sourceSheetKdGroupTagihan: SourceSheetAtpGroupTagihan[];
    sourcesByGroupKategoriAssesmen: SourceKategoriAssesmenWithTagihanSheetKd[]
}
export type KoleksiTpSheetWithSource= CollectionNilaiTpSheet & {
    koleksiAtpSheet: KoleksiAtpSheetWithSource[]
    sourceSheetKdGroupTagihan:  SourceSheetAtpGroupTagihan[];
    sourcesByGroupKategoriAssesmen: SourceKategoriAssesmenWithTagihanSheetKd[]
}
export type DataCpSheetWithSource = CollectionNilaiCpSheet & {
    // slotCp: number, 
    koleksiTpSheetWithSource: KoleksiTpSheetWithSource[]
    sourceSheetKdGroupTagihan:  SourceSheetAtpGroupTagihan[];
    sourcesByGroupKategoriAssesmen: SourceKategoriAssesmenWithTagihanSheetKd[]
}
export type SkorNilaiFromSheetKdWithSource = SkorNilaiFromSkorKdSheet & {
    sourceSheetKdGroupTagihan: SourceSheetAtpGroupTagihan[];
    sourcesByGroupKategoriAssesmen: SourceGroupKategoriAssesmenWithTagihanSheetKd;
    sourceSheetKdGroupTagihanLevelTp: SourceSheetTpWithScore[];
    sourceSheetKdGroupTagihanLevelCp: SourceSheetCpWithScore[];
    sourceSheetKdGroupTagihanLevelAtp: SourceSheetAtpWithScore[];
    dataCpSheetWithSource: DataCpSheetWithSource[];
};
