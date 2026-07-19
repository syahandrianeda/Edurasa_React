import { describe, expect, it } from "vitest";
import ValidationBuilder from "~/domain/buku-induk/ValidateNis/ValidationBuilder";


describe("ValidationBuilder", () => {

  it("valid jika nis dan nisn valid", () => {

    const validation = new ValidationBuilder()
      .setNis({
        valid: true,
      })
      .setNisn({
        valid: true,
      })
      .build();

    expect(validation.isValid).toBe(true);
    expect(validation.errors).toEqual({});
    expect(validation.duplicate).toEqual({});
  });

  it("invalid jika nis tidak valid", () => {

    const validation = new ValidationBuilder()
      .setNis({
        valid: false,
        message: "NIS salah",
      })
      .setNisn({
        valid: true,
      })
      .build();

    expect(validation.isValid).toBe(false);
    expect(validation.errors.nis).toBe("NIS salah");
    expect(validation.errors.nisn).toBeUndefined();
  });

  it("invalid jika nisn tidak valid", () => {

    const validation = new ValidationBuilder()
      .setNis({
        valid: true,
      })
      .setNisn({
        valid: false,
        message: "NISN salah",
      })
      .build();

    expect(validation.isValid).toBe(false);
    expect(validation.errors.nis).toBeUndefined();
    expect(validation.errors.nisn).toBe("NISN salah");
  });

  it("invalid jika keduanya tidak valid", () => {

    const validation = new ValidationBuilder()
      .setNis({
        valid: false,
        message: "NIS salah",
      })
      .setNisn({
        valid: false,
        message: "NISN salah",
      })
      .build();

    expect(validation.isValid).toBe(false);

    expect(validation.errors).toEqual({
      nis: "NIS salah",
      nisn: "NISN salah",
    });
  });

});