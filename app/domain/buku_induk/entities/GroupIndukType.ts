import type { SiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif"
import type { SummaryGroupIndukType } from "../value-objects/SummaryGroupIndukType"


export interface GroupIndukType{
    groupNis:string
    data:SiswaWithValidation[]
    dataOrderedInduk:SiswaWithValidation[]
    dataNisIndex:dataNisIndexType[]//number[]
    summary:SummaryGroupIndukType
}
export interface dataNisIndexType{
    index:number
    data:SiswaWithValidation;
}