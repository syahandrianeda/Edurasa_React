import { describe, expect, it } from "vitest";
import ValidateNis from "~/domain/buku-induk/ValidateNis/ValidateNis";


describe("ValidateNis", () => {
  const validator = new ValidateNis();

  it("valid jika terdiri dari 9 digit angka", () => {
    const result = validator.validate("123456789");

    expect(result.valid).toBe(true);
    expect(result.message).toBeUndefined();
  });

  it("invalid jika kosong", () => {
    const result = validator.validate("");

    expect(result.valid).toBe(false);
    expect(result.message).toBeDefined();
  });

  it("invalid jika kurang dari 9 digit", () => {
    const result = validator.validate("12345678");

    expect(result.valid).toBe(false);
  });

  it("invalid jika lebih dari 9 digit", () => {
    const result = validator.validate("1234567890");

    expect(result.valid).toBe(false);
  });

  it("invalid jika mengandung huruf", () => {
    const result = validator.validate("12345ABCD");

    expect(result.valid).toBe(false);
  });

  it("invalid jika mengandung spasi", () => {
    const result = validator.validate("12345 789");

    expect(result.valid).toBe(false);
  });

  it("invalid jika mengandung simbol", () => {
    const result = validator.validate("12345-789");

    expect(result.valid).toBe(false);
  });
});