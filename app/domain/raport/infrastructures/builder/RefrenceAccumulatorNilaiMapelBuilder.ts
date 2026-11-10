import type { RefrenceAccumulatorNilaiMapelRespon, RefrenceAccumulatorNilaiMapelSkorKdSheet } from "~/domain/kategori-tagihan/types";

export default class RefrenceAccumulatorNilaiMapelBuilder{
    
    getAccumulatorRespon():RefrenceAccumulatorNilaiMapelRespon{
        return {
            totalMapel:null,
            skorMapel:null,
            countSoalMapel: 0
        }
    }
    getAccumulatorSheetKd():RefrenceAccumulatorNilaiMapelSkorKdSheet{
        return {
            totalMapel_sheet:null,
            skorMapel_sheet:null,
            countSoalMapel_sheet: 0
        }
    }
}