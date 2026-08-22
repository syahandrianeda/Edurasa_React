import type { JsonAlatJawab, OpsiPilihanJawabanType } from "./json-alat-jawab-type";

export interface BenarSalahType extends JsonAlatJawab{
    valid: number[],
    listPernyataan:OpsiPilihanJawabanType[]
}