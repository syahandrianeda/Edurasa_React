import type { SiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif";
import type { SummaryValidateIndukType } from "./summary-validation-induk-type";

export interface GropPefixNisType{
	groupNis:string,
	data:SiswaWithValidation[],
	summary:SummaryValidateIndukType

}