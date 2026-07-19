import type { ValidationResult } from "./ValidationResult";

export default class ValidateNisn {
  private readonly regex = /^\d{10}$/;

  validate(nisn: string): ValidationResult {
    if (this.regex.test(nisn)) {
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