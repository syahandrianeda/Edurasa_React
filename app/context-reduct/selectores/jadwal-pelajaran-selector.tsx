
import DtoJadwalMapelToApp from "~/dtos/dto-jadwal-mapel-to-app";
import type { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { DtoSettingJadwalMapelSelector } from "./setting-jadwal-mapel";
import { CurrentMapelInActiveRombel, DTOMapelRombelSelector } from "./mapel-rombel-selector";
import DtoJadwalPelajaranTable from "~/dtos/dto-jadwal-pelajaran-table";

export const jadwalPelajaranPureSelector = (state:RootState) => state.jadwalPelajaran.dataJadwalPelajaran;
export const jadwalPelajaranAppSelector = createSelector(
    [
        jadwalPelajaranPureSelector,
        
        (state:RootState)=>state.fokusRombel.value,
        CurrentMapelInActiveRombel
    ],
    (jadwal,  fokusRombel,jp_mapel) => {
        const findData =  jadwal.filter((item) => item.namarombel === fokusRombel);
        console.log('cek jadwal mapel', jadwal, jp_mapel, fokusRombel, jadwal, findData);
        if(findData.length === 0) return [];
        // return DtoJadwalMapelToApp.arrayFromSheet(findData);
        return DtoJadwalPelajaranTable.toTableAppArray(findData, jp_mapel.data);
    }
)   