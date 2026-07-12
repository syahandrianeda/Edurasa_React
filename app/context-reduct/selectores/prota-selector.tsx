import { createSelector} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { KurmerDtoSelector } from "./kurmer-selector";
import DtoProta from "~/dtos/dto-prota";

export const ProtaSelector = (state:RootState)=> state.prota.data;//Prota;

export const DtoProtaSelector = createSelector(
    [
        ProtaSelector,
        KurmerDtoSelector
    ],
    (prota,res)=>DtoProta.arrayToSheetApp(prota)
)