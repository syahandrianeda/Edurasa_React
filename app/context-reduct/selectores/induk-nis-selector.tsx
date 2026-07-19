import { createSelector } from "@reduxjs/toolkit";
import { selectAllSiswaDTO } from "./data-siswa-aktif";
import { GroupingNisInduk } from "~/domain/buku-induk";
import { GroupingIndukBuilder } from "~/domain/buku_induk/services/GroupingIndukBuilder";


export const GroupNisInduk = createSelector([
    selectAllSiswaDTO
],(siswa)=>{
    // return new GroupingNisInduk(siswa).group()
    const fil = siswa.filter(s=>s.pd_nama !=='' )
    return new GroupingIndukBuilder(fil).build()
})