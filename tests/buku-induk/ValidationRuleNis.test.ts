import { describe, expect, it } from "vitest";
import { ValidationRulesNis } from "~/domain/buku-induk/validation-rules/ValidationRulesNis";

describe("ValidationRulesNis",()=>{
    const inst = new ValidationRulesNis();
    const nis = "252603056";
    const result = inst.getSufix(nis);
    const resultIndex=inst.indexNis(result);
    const jenjang = inst.getJenjang(nis);

    it("getSufix result string",()=>{
        expect(result).toBeTypeOf('string')
    });

    it(`nis = ${nis}, getSufix(nis)="056" dan type string`,()=>{
        expect(result).toEqual("056")
        expect(result).toBeTypeOf("string")
    })

    it(`nis = ${nis}, jenjang=3 and type number`,()=>{
        expect(jenjang).toEqual(3)
    })

    
    it(`nis = ${nis}, index=56 and type number`,()=>{
        expect(resultIndex).toEqual(56);
        expect(resultIndex).toBeTypeOf('number')
    })

    
})