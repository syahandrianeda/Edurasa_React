import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DTOMapel from "~/dtos/dto-mapel";

export const MapelPureSelector = (state:RootState)=>state.mapel.dataMapel;
export const DtoMapelSelector = createSelector(
    [MapelPureSelector],
    (dto)=>DTOMapel.arrayFromSheet(dto)
)
export const DtoMapelAllSelector = createSelector(
    [MapelPureSelector],
    (dto)=>DTOMapel.arrayFromSheet(dto)
)