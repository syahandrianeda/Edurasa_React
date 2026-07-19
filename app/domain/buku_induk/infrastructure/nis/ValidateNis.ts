
import type { ValidationResult } from "../../value-objects/ValidateResult";



export class ValidateNisValue{
        private readonly regex = /^\d{9}$/
        private dataValid:ValidationResult = {valid:true};
        constructor(readonly nis: string){}
        validate():this {
            if (this.regex.test(this.nis)) {
                this.dataValid = {
                    valid: true,
                };
                return this;
            }
    
            this.dataValid =  {
                valid: false,
                message: "NIS harus berupa angka sebanyak 9 digit.",
                };
                return this;
        }
        set validation(valid:ValidationResult) {
            this.dataValid = valid;
        }
        get validation():ValidationResult{
            return this.dataValid
        }
}