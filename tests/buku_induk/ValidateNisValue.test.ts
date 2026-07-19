import { describe, expect, it } from "vitest";
import ValidateNis from "~/domain/buku-induk/ValidateNis/ValidateNis";
import { ValidateNisValue } from "~/domain/buku_induk/infrastructure/nis/ValidateNis";


describe("ValidateNisValue", () => {
  const validator = new ValidateNisValue("123456789").validate();
  const validatorkosong = new ValidateNisValue("").validate();

  it("valid jika terdiri dari 9 digit angka", () => {
    const result = validator.validation;

    expect(result.valid).toBe(true);
    expect(result.message).toBeUndefined();
  });

  it("invalid jika kosong", () => {
    const result = validatorkosong.validation;

    expect(result.valid).toBe(false);
    expect(result.message).toBeDefined();
  });

  it("invalid jika kurang dari 9 digit", () => {
    const result = new ValidateNisValue("12345678").validate().validation;

    expect(result.valid).toBe(false);
  });

  it("invalid jika lebih dari 9 digit", () => {
    const result = new ValidateNisValue("1234567890").validate().validation;

    expect(result.valid).toBe(false);
  });

  it("invalid jika mengandung huruf", () => {
    const result = new ValidateNisValue("12345ABCD").validate().validation;

    expect(result.valid).toBe(false);
  });

  it("invalid jika mengandung spasi", () => {
    const result = new ValidateNisValue("12345 789").validate().validation;

    expect(result.valid).toBe(false);
  });

  it("invalid jika mengandung simbol", () => {
    const result = new ValidateNisValue("12345-789").validate().validation;

    expect(result.valid).toBe(false);
  });
});