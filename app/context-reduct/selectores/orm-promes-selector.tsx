import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { instanceOfKaldik } from "./kaldik-selector";
import { KurmerDtoSelector } from "./kurmer-selector";
import { jadwalPelajaranAppSelector } from "./jadwal-pelajaran-selector";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { DtoProtaSelector } from "./prota-selector";
import OrmPromes from "~/domain/kurikulum/orm-promes";


export const OrmPromesInstanceSelector = createSelector([
    instanceOfKaldik,
    KurmerDtoSelector,
    jadwalPelajaranAppSelector,
    (state:RootState)=>state.fokusMapel.data,
    (state:RootState)=>state.fokusRombel.value,
    (state:RootState)=>state.auth.user,
    DtoProtaSelector
    ],(
        kaldik,
        cpFaseAtp,
        jadwal,
        fokusMapel,
        rombel,
        user,
        prota
    )=> user && new OrmPromes(cpFaseAtp,jadwal,kaldik,fokusMapel,rombel ?? getSessionRombel(),user,prota).init());

export const FokusAtpMapelInCurrentRombel = createSelector([
    OrmPromesInstanceSelector
    ],(instance?)=>{
        if(!instance) return;
        return instance.dataAtpValidInRombel
    })