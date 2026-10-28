import type { StrukturAtpType } from "./struktur-atp-type";
import type { StrukturCpType } from "./struktur-cp-type";
import type { StrukturTpType } from "./struktur-tp-type";
import type { StrukturMapeltype } from "./sturktur-mapel-type";

/** sturkturKurikulum hanya relasi kodeMapel, cp_id, tp_id, dan atp_id saja! */
export type StrukturKurikulumMapelType = StrukturMapeltype & {dataCp: StrukturKurikulumCpType[] };
export type StrukturKurikulumCpType = StrukturCpType & { dataTp: StrukturKurikulumTpType[]};
export type StrukturKurikulumTpType = StrukturTpType & {dataAtp: StrukturAtpType[]};


export type StrukturKurikulumMapelWithSlotType = StrukturMapeltype & {slotMapel:number, dataCp: StrukturKurikulumCpType[] };
export type StrukturKurikulumCpWithSlotType = StrukturCpType & {slotCp:number,  dataTp: StrukturKurikulumTpType[]};
export type StrukturKurikulumTpWithSlotType = StrukturTpType & {slotTp:number, dataAtp: StrukturAtpType[]};


export type StrukturKurikulumMapelMapperType = Map<string, StrukturMapeltype & {dataCpMapper:StrukturKurikulumCpMapperType}>
export type StrukturKurikulumCpMapperType = Map<number, StrukturCpType & {dataTpMapper:StrukturKurikulumTpMapperType}>
export type StrukturKurikulumTpMapperType = Map<number, StrukturTpType & {dataAtpMapper: StrukturKurikulumAtpMapperType}>
export type StrukturKurikulumAtpMapperType = Map<number, StrukturAtpType>

export type StrukturKurikulumMapelAtpNonUniqueMapperType = Map<string, StrukturMapeltype & {dataCpMapper:StrukturKurikulumCpMapperAtpNotUniqueType}>
export type StrukturKurikulumCpMapperAtpNotUniqueType = Map<number, StrukturCpType & {dataTpMapper:StrukturKurikulumTpMapperAtpNotUniqueType}>
export type StrukturKurikulumTpMapperAtpNotUniqueType = Map<number, StrukturTpType & {dataAtp: StrukturAtpType[]}>
