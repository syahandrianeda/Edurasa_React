import type { ReactValidation }
from "./ReactValidation";

export interface ReactValidationResult{

    success:boolean;

    validation?:ReactValidation;

    message?:string;

}