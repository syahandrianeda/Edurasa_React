import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DTOMapelRombel from "~/dtos/dto-mapel-rombel";
import { DataSiswaAktifRombel } from "./data-siswa-aktif";
import OrmMapel from "~/domain/mapel/orm-mapel";
import { DtoMapelSelector } from "./mapel-selector";
import OrmMapelRefactored from "~/domain/mapel/orm-mapel-refactored";


export const MapelRombelPureSelector = (state:RootState)=>state.jpMapel.data;//MapelRombel;
export const DTOMapelRombelSelector = createSelector(
    [MapelRombelPureSelector],
    (dto)=>DTOMapelRombel.arrayFromSheet(dto)
)
export const DtoMapellAllRombelSelector =createSelector(
    [DTOMapelRombelSelector],
    (dto)=>DTOMapelRombel.arrayFromSheet_to_jp_mapelApp(dto)
    
)
export const CurrentMapelInActiveRombel = createSelector(
    [
        DataSiswaAktifRombel,
        DtoMapelSelector,
        DTOMapelRombelSelector,
        (state:RootState)=>state.fokusRombel.value

    ],
    (siswaCurrentRombel, mapel, mapelRombel,rombel)=>{
        // const orm = new OrmMapel(mapel, mapelRombel,siswaCurrentRombel,rombel='1A');
        // const test = orm.defaultMapelInActiveRombel();
        // console.log('test orm', test);
        // return orm.defaultMapelInActiveRombel();
        // return new OrmMapel(mapel, mapelRombel,siswaCurrentRombel,rombel).defaultMapelInActiveRombel()
        return new OrmMapelRefactored(mapel, mapelRombel,siswaCurrentRombel,rombel).defaultMapelInActiveRombel()
    }
) 
export const OrmMapelSelector = createSelector(
    [
        DataSiswaAktifRombel,
        DtoMapelSelector,
        DTOMapelRombelSelector,
        (state:RootState)=>state.fokusRombel.value

    ],
    (siswaCurrentRombel, mapel, mapelRombel,rombel)=>{
        // const orm = new OrmMapel(mapel, mapelRombel,siswaCurrentRombel,rombel='1A');
        // const test = orm.defaultMapelInActiveRombel();
        // console.log('test orm', test);
        // return orm.defaultMapelInActiveRombel();
        // return new OrmMapel(mapel, mapelRombel,siswaCurrentRombel,rombel);//.defaultMapelInActiveRombel()
        return new OrmMapelRefactored(mapel, mapelRombel,siswaCurrentRombel,rombel);//.defaultMapelInActiveRombel()
    }
) 