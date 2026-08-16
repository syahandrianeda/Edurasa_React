import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DtoSerahTerimaDokumen from "~/dtos/dto-serah-terima-dokumen";
import OrmSerahTerimaTransaksi from "~/domain/serah-terima/service/orm-serah-terima-transaksi";
import { DtoTransaksiSerahTerimaSelector } from "./transaksi-serah-terima";

export const PureSerahTerimaSelector = (state:RootState)=>state.serahTerimaDokumen.data;

export const DtoSerahTerimaSelector = createSelector([
    PureSerahTerimaSelector
    ],(data)=> DtoSerahTerimaDokumen.arrayFromSheetToApp(data));

export const OrmSerahTerimaWithTransaksiSelector = createSelector(
    [
        DtoSerahTerimaSelector,
        DtoTransaksiSerahTerimaSelector 
    ],
    (serahTerima, transaksi)=> new OrmSerahTerimaTransaksi(serahTerima, transaksi).build().data
)