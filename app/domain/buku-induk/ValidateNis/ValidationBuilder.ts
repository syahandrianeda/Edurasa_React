import type { validationType } from "~/context-reduct/selectores/data-siswa-aktif";
import type { ValidationResult } from "./ValidationResult";

export default class ValidationBuilder {

    private validation: validationType = {
        isValid: true,

        errors: {},

        duplicate: {},
    };

    setNis(result: ValidationResult): this {

        if (!result.valid) {
        this.validation.errors.nis = result.message;
        this.validation.isValid = false;
        }

        return this;
    }

    setNisn(result: ValidationResult): this {

        if (!result.valid) {
        this.validation.errors.nisn = result.message;
        this.validation.isValid = false;
        }

        return this;
    }

    build(): validationType {
        return structuredClone(this.validation);
    }

}