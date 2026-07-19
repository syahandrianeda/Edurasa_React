import { describe, expect, it } from "vitest";
import ValidateNisn from "~/domain/buku-induk/ValidateNis/ValidateNisn";


describe("ValidateNisn", () => {
  const validator = new ValidateNisn();

  it("valid jika terdiri dari 10 digit angka", () => {
    const result = validator.validate("1234567890");

    expect(result.valid).toBe(true);
    expect(result.message).toBeUndefined();
  });

  it("invalid jika kosong", () => {
    const result = validator.validate("");

    expect(result.valid).toBe(false);
    expect(result.message).toBeDefined();
  });

  it("invalid jika kurang dari 10 digit", () => {
    const result = validator.validate("123456789");

    expect(result.valid).toBe(false);
  });

  it("invalid jika lebih dari 10 digit", () => {
    const result = validator.validate("12345678901");

    expect(result.valid).toBe(false);
  });

  it("invalid jika mengandung huruf", () => {
    const result = validator.validate("12345ABCDE");

    expect(result.valid).toBe(false);
  });

  it("invalid jika mengandung spasi", () => {
    const result = validator.validate("12345 7890");

    expect(result.valid).toBe(false);
  });

  it("invalid jika mengandung simbol", () => {
    const result = validator.validate("12345-7890");

    expect(result.valid).toBe(false);
  });
});