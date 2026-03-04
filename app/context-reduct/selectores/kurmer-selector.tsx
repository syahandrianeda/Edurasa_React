import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DTOCp from "~/dtos/dto-cp";
import DTOFaseAtp from "~/dtos/dto-atp";
import DTOFaseTp from "~/dtos/dto-fase-tp";
import DTOAtp from "~/dtos/dto-atp";
import type { resourcesKurikulum } from "~/types/kurikulum/kurikulum-type";

export const KurmerPureSelector = (state:RootState)=>state.kurmer;

export const KurmerDtoSelector = createSelector(
    [
        (state:RootState)=>state.kurmer.dataCp,
        (state:RootState)=>state.kurmer.dataTpFaseA,
        (state:RootState)=>state.kurmer.dataTpFaseB,
        (state:RootState)=>state.kurmer.dataTpFaseC,
        (state:RootState)=>state.kurmer.dataAtp,
    ],
    (cp, faseA, faseB, faseC, atp)=>{
        return {
            cp:DTOCp.arrayFromSheet(cp),
            fase:[
                    {
                        fase:'A',
                        data:DTOFaseTp.arrayFromSheet(faseA),
                        memberJenjang:[1,2]
                    },
                    {
                        fase:'B',
                        data:DTOFaseTp.arrayFromSheet(faseB),
                        memberJenjang:[3,4]
                    },
                    {
                        fase:'C',
                        data:DTOFaseTp.arrayFromSheet(faseC),
                        memberJenjang:[5,6]
                    },
                ],
            atp: DTOAtp.arrayFromSheet(atp)
        } 
    }
)