import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { DTOSiswaDapodikSheetToApp } from "~/dtos/dto-dapodiksheet-to-app";

export const selectSiswaDapodik = (state: RootState) => state.dapodik.data;//.siswaDapodik;

export const selectSiswaDapodikDTO = createSelector(
  [selectSiswaDapodik],
  (dtos) => DTOSiswaDapodikSheetToApp.fromSheetArray(dtos)
  
);
