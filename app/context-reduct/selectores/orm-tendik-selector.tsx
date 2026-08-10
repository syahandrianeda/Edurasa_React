import OrmTendik from "~/domain/tendik/orm-tendik-class";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { InstanceRiwayatIdAkun, RiwayatIdAkunSelector } from "./riwayat-id-akun-selector";
import { InstancePangkatGolonganSelector } from "./pangkat-golongan-selector";

export const OrmTendikInstance = createSelector(
    [
        InstanceRiwayatIdAkun,
        InstancePangkatGolonganSelector
    ],
    (idAkun, riwayatPangkat)=>new OrmTendik(idAkun, riwayatPangkat)
)