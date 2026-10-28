import type { DataTipeAssesmenMapper, MapelMapperInAllPublikasiPaket } from "../type/collection-kurikulum-in-all-publikasi/StrukturKurikulumMapper";



export type MapperTagihanHasDataResponWithKategoriTagihan = {
    mapperKategoriTagihanPerAtpSkor: DataTipeAssesmenMapper;
    mapperStrukturKurikulum: Map<string, MapelMapperInAllPublikasiPaket>;
};
