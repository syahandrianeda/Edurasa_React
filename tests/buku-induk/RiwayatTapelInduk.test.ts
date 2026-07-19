import ValidateNis from "~/domain/buku-induk/ValidateNis/ValidateNis";
import { currentTapel } from "~/lib/current-tapel"

describe("RiwayatTapelIndukHandler", () => {
    const tapel = currentTapel({variant:'short'});
    const validate = new ValidateNis();
    const indukSekarang = ("262701001").substring(0,4)
    const indukKosong = "";
    const currentTapelParamDate = currentTapel({variant:'short', date: new Date(2022,6,10)})
    const currentTapelParamDateSemester2 = currentTapel({variant:'short', date: new Date(2022,3,10)})

    it("currentTapel menampikan 4 angka",()=>{
        expect(tapel).toBe('2627')
        expect(tapel).toEqual('2627')
        expect(tapel).toBeTypeOf('string')
    })
    it("current short Tapel bisa dibuat number",()=>
        expect(Number(tapel)).toBeTypeOf("number")
    )
    it("jika tapel sekarang === groupNis siswa baru",()=>{
        expect(tapel).toEqual(indukSekarang)
    })
    it("induk kosong itu false",()=>{
        expect(indukKosong).toBeFalsy()
    })
    it("induk tidak kosong itu true, boleh dipake boolean",()=>{
        expect(indukSekarang).toBeTruthy()
    })
    it("currentTapel Param 10/07/2022 itu tapel 2223",()=>{
        expect(currentTapelParamDate).toBe("2223")
    })
    it("currentTapel Param 10/01/2022 itu tapel 2122",()=>{
        expect(currentTapelParamDateSemester2).toBe("2122")
    })
})