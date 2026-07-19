
import type { ValidationResult } from "../../value-objects/ValidateResult";


export class ValidateNisnValue{
    
    private readonly regex = /^\d{10}$/;
        validate(nis: string): ValidationResult {
            if (this.regex.test(nis)) {
                return {
                    valid: true,
                };
            }
    
            return {
                valid: false,
                message: "NISN harus berupa angka sebanyak 10 digit.",
                };
        }
}