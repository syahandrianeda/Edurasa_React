import type { ValidationResult } from "./ValidationResult";

export default class ValidateNis {
    private readonly regex = /^\d{9}$/;

    validate(nis: string): ValidationResult {
        if (this.regex.test(nis)) {
        return {
            valid: true,
        };
        }

        return {
        valid: false,
        message: "NIS harus berupa angka sebanyak 9 digit.",
        };
    }
}