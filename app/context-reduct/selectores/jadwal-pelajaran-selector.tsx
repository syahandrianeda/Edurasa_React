
import DtoJadwalMapelToApp from "~/dtos/dto-jadwal-mapel-to-app";
import type { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { DtoSettingJadwalMapelSelector } from "./setting-jadwal-mapel";
import { CurrentMapelInActiveRombel, DtoMapellAllRombelSelector, DTOMapelRombelSelector } from "./mapel-rombel-selector";
import DtoJadwalPelajaranTable from "~/dtos/dto-jadwal-pelajaran-table";
import { DtoJadwalPembelajaranTo_jp_mapelApp } from "./jadwal-pembiasaan-kegiatan";

export const jadwalPelajaranPureSelector = (state:RootState) => state.jadwalPelajaran.data;//dataJadwalPelajaran;
export const jadwalPelajaranAppSelector = createSelector(
    [
        jadwalPelajaranPureSelector,
        (state:RootState)=>state.fokusRombel.value,
        CurrentMapelInActiveRombel,
        DtoJadwalPembelajaranTo_jp_mapelApp
    ],
    (jadwal,  fokusRombel,jp_mapel, nonKbm) => {
        const findData =  jadwal.filter((item) => item.namarombel === fokusRombel);
        
        if(findData.length === 0) return [];
        // return DtoJadwalMapelToApp.arrayFromSheet(findData);
        // return DtoJadwalPelajaranTable.toTableAppArray(findData, jp_mapel.data);
        return DtoJadwalPelajaranTable.toTableAppMapelAndNonKbm(findData, jp_mapel.data, nonKbm);
    }
)   
export const jadwalPelajaranAppSelectorAll = createSelector(
    [
        jadwalPelajaranPureSelector,
        DtoMapellAllRombelSelector,
        DtoJadwalPembelajaranTo_jp_mapelApp
    ],
    (jadwal,  jp_mapel, nonKbm) => {
        // const findData =  jadwal.filter((item) => item.namarombel === fokusRombel);
        
        // if(findData.length === 0) return [];
        // return DtoJadwalMapelToApp.arrayFromSheet(findData);
        // return DtoJadwalPelajaranTable.toTableAppArray(findData, jp_mapel.data);
        return DtoJadwalPelajaranTable.toTableAppMapelAndNonKbm(jadwal, jp_mapel, nonKbm);
    }
)   