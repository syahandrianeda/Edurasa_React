import { createSelector} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DTOSheetRekapSkorKdAsli from "~/dtos/dto-sheet-rekap-skor-kd-asli";
import type { DataSheetSkorKdKategoriAsesmenAppType } from "~/types/penilaian/DataSheetSkorKdKategoriAsesmenAppType";

export const pureSheetRekapAsliHarian          = (state:RootState)=>state.harian.data;
export const pureSheetRekapAsliMidSemester     = (state:RootState)=>state.midSemester.data;;
export const pureSheetRekapAsliAkhirSemester   = (state:RootState)=>state.akhirSemester.data;;
export const pureSheetRekapAsliUs              = (state:RootState)=>state.akhirSemester.data;;
export type DataSheetSkorKdSelectorType = {
    rekapHarian: DataSheetSkorKdKategoriAsesmenAppType[],
    rekapMidSemester: DataSheetSkorKdKategoriAsesmenAppType[],
    rekapUs: DataSheetSkorKdKategoriAsesmenAppType[],
    rekapAkhirSemester: DataSheetSkorKdKategoriAsesmenAppType[],
}
export const dtoSheetRekapAsli = createSelector(
    [
        pureSheetRekapAsliHarian,       
        pureSheetRekapAsliMidSemester,  
        pureSheetRekapAsliAkhirSemester,
        pureSheetRekapAsliUs           
    ],
    (harian, midSemester, akhirSemester, us):DataSheetSkorKdSelectorType=>{
        const rekapHarian = DTOSheetRekapSkorKdAsli.arrayFromSheet(harian.flatMap(m=>m.data));
        const rekapMidSemester = DTOSheetRekapSkorKdAsli.arrayFromSheet(midSemester.flatMap(m=>m.data));
        const rekapAkhirSemester = DTOSheetRekapSkorKdAsli.arrayFromSheet(akhirSemester.flatMap(m=>m.data));
        const rekapUs = DTOSheetRekapSkorKdAsli.arrayFromSheet(us.flatMap(m=>m.data));
        return {
            rekapHarian,
            rekapMidSemester,
            rekapUs,
            rekapAkhirSemester,
        }
    }
)