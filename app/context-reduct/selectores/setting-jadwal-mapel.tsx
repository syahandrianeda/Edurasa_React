import DtoSettingJadwalMapel from "~/dtos/dto-setting-jadwal-mapel";
import type { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import DtoJadwalPelajaranTable from "~/dtos/dto-jadwal-pelajaran-table";

export const settingJadwalMapelPureSelector = (state:RootState)=>state.settingJadwalMapel.data;//settingJadwal;
export const DtoSettingJadwalMapelSelector = createSelector(
    [settingJadwalMapelPureSelector],
    (dto)=>DtoSettingJadwalMapel.arrayFromSheet(dto)
)