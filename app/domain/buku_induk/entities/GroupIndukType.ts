import type { SiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif"
import type { SummaryGroupIndukType } from "../value-objects/SummaryGroupIndukType"
import type { SiswaValidationWithPredictableRiwayatRaport } from "../value-objects/extends-siswa-with-validation-type"


export interface GroupIndukType{
    groupNis:string
    data:SiswaValidationWithPredictableRiwayatRaport[]//SiswaWithValidation[]
    dataOrderedInduk:SiswaWithValidation[]
    dataNisIndex:dataNisIndexType[]//number[]
    summary:SummaryGroupIndukType
}
export interface dataNisIndexType{
    index:number
    data:SiswaWithValidation;
}