import { createSelector} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DtoResponTagihanSiswa from "~/dtos/dto-resspon-tagihan";
import { getNumberFromString } from "~/lib/get-number";
import type { NilaiSiswaAppType } from "~/types/penilaian/nilai-siswa-app-type";

export const pureResponTagihan = (state:RootState)=> state.responTagihan;

export const responTagihanCurrentJenjang = createSelector(
    [
        pureResponTagihan,
        (state:RootState)=>state.fokusRombel.value
    ],
    (data, rombel)=>{
        if(!data||! rombel) return [];
        let result:NilaiSiswaAppType[]=[]
        const jenjang = getNumberFromString(rombel);
        const currentData = data.data.find(s=>s.jenjang === jenjang);
        if(currentData){
            result = DtoResponTagihanSiswa.arrayFromSheetToApp(currentData.data);
        }
        return result;
    }
)
export const responTagihanCurrentRombel = createSelector(
    [
        pureResponTagihan,
        (state:RootState)=>state.fokusRombel.value
    ],
    (data, rombel)=>{
        if(!data||! rombel) return [];
        let result:NilaiSiswaAppType[]=[]
        const jenjang = getNumberFromString(rombel);
        const currentData = data.data.find(s=>s.jenjang === jenjang);
        if(currentData){
            result = DtoResponTagihanSiswa.arrayFromSheetToApp(currentData.data.filter(s=>s.rombel === rombel));
        }
        return result;
    }
)