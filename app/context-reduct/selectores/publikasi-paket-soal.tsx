import { createSelector} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DtoPublikasiPaket from "~/dtos/dto-publikasi-paket";
import DtoPublikasiPaketStatic from "~/dtos/dto-publlikasi-paket-static";

export const InstancePublikasiPaketSoalSelector = createSelector(
    [
        (state:RootState)=>state.publikasiPaket.data
    ],
    (dto)=> new DtoPublikasiPaket(dto).buildPublikasiPaketApp()
);

export const PublikasiPaketSoalAppSelector = createSelector(
    [
        InstancePublikasiPaketSoalSelector
    ],
    (instance)=> {
        if(!instance) return [];
        return instance.dataArrayPublikasiAppType
    }
)

export const PublikasiPaketSoalAppStaticSelector = createSelector(
    [
        (state:RootState)=> state.publikasiPaket.data
    ],
    (dto) => DtoPublikasiPaketStatic.arrayFromSheetToApp(dto)
)