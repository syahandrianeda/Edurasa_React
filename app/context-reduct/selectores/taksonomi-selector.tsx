import { createSelector} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DtoTaksonomi from "~/dtos/dto-taksonom";


export const TaksonomiBloomPureSelector = (state:RootState) => state.taksonomiBloom.data;
export const TaksonomiBloomInstance = createSelector(
    [ TaksonomiBloomPureSelector ],
    (data)=> new DtoTaksonomi(data)
)