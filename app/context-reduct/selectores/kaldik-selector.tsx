import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { DTOKaldikSheetToApp } from "~/dtos/dto-kaldik-to-app";
import OrmKaldik from "~/domain/kaldik/orm-kaldik";

export const selectKaldik = (state: RootState) =>
    state.kaldik.data;

export const selectKaldikDTO = createSelector(
    [selectKaldik],
    (dtos) => DTOKaldikSheetToApp.fromSheetArray(dtos)
);
export const instanceOfKaldik = createSelector(
    [selectKaldik],
    (instance) => new OrmKaldik(instance)
        .filtering((item)=>item.hapus !=='hapus')
        .sortYoungest(),
)