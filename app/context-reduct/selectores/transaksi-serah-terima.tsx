import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DtoTransaksiSerahTerimaDokumen from "~/dtos/dto-transaksi-serah-terima";

export const PureTransaksiSerahTerima = (state:RootState)=>state.transaksiSerahterimaDokumen.data;

export const DtoTransaksiSerahTerimaSelector = createSelector(
    [PureTransaksiSerahTerima],
    (data)=>DtoTransaksiSerahTerimaDokumen.arrayFromSheetToApp(data)
)