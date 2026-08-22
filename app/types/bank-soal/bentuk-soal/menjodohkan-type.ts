import type { JsonAlatJawab, OpsiPilihanJawabanType } from "./json-alat-jawab-type";

export interface MenjodohkanType extends JsonAlatJawab{
    valid: number[][],
    opsiKiri?:OpsiPilihanJawabanType[],
    opsiKanan?:OpsiPilihanJawabanType[],
}