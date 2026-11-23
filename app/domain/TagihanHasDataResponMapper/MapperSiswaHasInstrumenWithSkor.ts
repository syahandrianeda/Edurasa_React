import type { SiswaType } from "~/types/siswa";
import type { TagihanHasDataResponse } from "../penilaian/type/tagihan-assesmen-type";
import type { StrukturAtpType } from "../trees-struktur-kurikulum";
import type { DataBentukSoalWithScore, PrediksiNoSoal } from "../penilaian/model/grouping-kurikulum-by-bentuksoal";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { DataKdSheetApp } from "~/types/penilaian/DataKdSheetAppType";

export type TagihanInstrumenSoalCurrentAtp ={tagihan:TagihanHasDataResponse, soalSkor: DataBentukSoalWithScore[], koleksiSkor:(number|null)[]}
export type DataMapperSiswaHasAtpContainSourceInstrumen = { atp:StrukturAtpType, 
                                                            tagihan:TagihanHasDataResponse[], 
                                                            sourceRespon: RisponsePenilaianSiswa[], 
                                                            sourceSheetKd: DataKdSheetApp[] 
                                                            // instrumenSoal: {tagihan:TagihanHasDataResponse, soalSkor: TemplateKoreksiSiswaType[]}[]
                                                            instrumenSoal:  TagihanInstrumenSoalCurrentAtp[],
                                                            instrumenSoalSheet:TagihanInstrumenSoalCurrentAtp[],
                                                }
export type MapperSiswaHasAtpContainSourceInstrumen = Map<number, DataMapperSiswaHasAtpContainSourceInstrumen>;
export type MapperAtpWithInstrumen = Map<number, { atp:StrukturAtpType, 
                                            dataInstrumen:DataBentukSoalWithScore[],
                                             koleksiSkor:(number|null)[]
                                }>;
export type MapperSiswaHasSourceAtpInstrumen = Map<number, {  tagihan:TagihanHasDataResponse, 
                                                        atpMapperWithInstrumen:MapperAtpWithInstrumen, 
                                                        sourceRespon:Map<number, {refrence:RisponsePenilaianSiswa[]}>, 
                                                        sourceSheetKd:Map<number, {refrence:DataKdSheetApp[]}>
                                                }>;
export type MapperSiswaHasInstrumenSoalWithSkor = Map<number, {
                                            siswa:SiswaType,
                                            tagihanMapper:MapperSiswaHasSourceAtpInstrumen,
                                            atpMapperTagihanWithInstrumen: MapperSiswaHasAtpContainSourceInstrumen
                                            }>