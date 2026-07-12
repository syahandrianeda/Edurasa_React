import type { ValidationError } from "./validation-error";

export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
}