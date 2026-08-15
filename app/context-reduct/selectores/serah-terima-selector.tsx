import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DtoSerahTerimaDokumen from "~/dtos/dto-serah-terima-dokumen";

export const PureSerahTerimaSelector = (state:RootState)=>state.serahTerimaDokumen.data;

export const DtoSerahTerimaSelector = createSelector([
    PureSerahTerimaSelector
    ],(data)=> DtoSerahTerimaDokumen.arrayFromSheetToApp(data))