import type { HookValidation }
from "./HookValidation";

export interface HookValidationResult{

    success:boolean;

    validation?:HookValidation;

    message?:string;

}