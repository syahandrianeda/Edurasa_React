import type { ValidationResult } from "./validation-result";

export interface Validator<T> {
    validate(data: T): ValidationResult;
}