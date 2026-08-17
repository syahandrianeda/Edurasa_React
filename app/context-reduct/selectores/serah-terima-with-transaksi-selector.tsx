import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { OrmSerahTerimaWithTransaksiSelector } from "./serah-terima-selector";

export const FokusDataOrmSerahTerimaWithTransaksi = createSelector([
    OrmSerahTerimaWithTransaksiSelector,
    (s:RootState)=>s.uiFokusToolbar.data.serahTerimaDokumen
],(orm, key)=> orm.find(s=>s.idbaris === key))