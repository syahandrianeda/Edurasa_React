import DtoPembiasaanToMapelType from "~/dtos/dto-pembiasaan-to-mapeltype";
import type { RootState } from "../store";

import { createSelector } from "@reduxjs/toolkit";

export const jadwalPembiasaanPureSelector = (state:RootState) => state.jadwalPembiasaan.data;//taJadwalPembiasaan;
export const DtoJadwalPembelajaranTo_jp_mapelApp= createSelector(
    [jadwalPembiasaanPureSelector],
    (pembiasaan) => {
        return DtoPembiasaanToMapelType.arrayToMapelType(pembiasaan);
    }
)
