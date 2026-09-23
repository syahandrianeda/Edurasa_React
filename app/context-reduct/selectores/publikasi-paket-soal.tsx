import { createSelector} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DtoPublikasiPaket from "~/dtos/dto-publikasi-paket";
import DtoPublikasiPaketStatic from "~/dtos/dto-publlikasi-paket-static";
import TagihanPenilaianClass from "~/domain/penilaian/infrastucture/tagihan-penilian-class";

export const InstancePublikasiPaketSoalSelector = createSelector(
    [
        (state:RootState)=>state.publikasiPaket.data
    ],
    (dto)=> new DtoPublikasiPaket(dto).buildPublikasiPaketApp()
);

export const PublikasiPaketSoalAppSelector = createSelector(
    [
        InstancePublikasiPaketSoalSelector
    ],
    (instance)=> {
        if(!instance) return [];
        return instance.dataArrayPublikasiAppType
    }
)

export const PublikasiPaketSoalAppStaticSelector = createSelector(
    [
        (state:RootState)=> state.publikasiPaket.data
    ],
    (dto) => DtoPublikasiPaketStatic.arrayFromSheetToApp(dto)
)

// export const InstanceDataTagihanPenilaianSector = createSelector(
//     [
//         PublikasiPaketSoalAppStaticSelector,
//         (state:RootState)=>state.fokusRombel.value,
//         /** di sini seluruh respon pengerjaan */
//     ],
//     (dto, rombel)=>{
//         if(!rombel) return
//         return new TagihanPenilaianClass(dto, rombel).init();
//     }
// )