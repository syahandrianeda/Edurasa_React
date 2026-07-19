import { describe, expect, it } from "vitest";
import { DefineNis } from "~/domain/buku_induk/infrastructure/nis/DefineNis";

describe("DefineNis", ()=>{
    const nis = "262701002"
    const inst = new DefineNis(nis);

    it("prefix nis harus 4 digit",()=>{
        const result = inst.prefix
        expect(result).toHaveLength(4);
        expect(result).toEqual("2627")
        expect(result).toBeTypeOf('string')
    });

    it("jenjang berupa number, diambil dari index 4 - 6",()=>{
        const result = inst.jenjang;
        expect(result).toEqual(1)
        expect(result).toBeTypeOf('number')
    })
    it("jenjang string punya 2 karakter='01'",()=>{
        const result = inst.jenjangString
        expect(result).toHaveLength(2)
        expect(result).toBe('01')
        
    })

})