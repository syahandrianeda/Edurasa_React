import { createSelector} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DtoPangkatGolongan from "~/dtos/dto-pangkat-golongan";
import RiwayatGolonganPangkatClass from "~/domain/tendik/riwayat-golongan-pangkat";

export const PurePangkatGolonganSelector = (state:RootState)=>state.pangkatGolongan.data;

export const DtoPangkatGolonganSelector = createSelector([
    PurePangkatGolonganSelector
],(data)=> DtoPangkatGolongan.arrayToApp(data));

export const InstancePangkatGolonganSelector = createSelector([
    DtoPangkatGolonganSelector
],(data)=>new RiwayatGolonganPangkatClass(data))