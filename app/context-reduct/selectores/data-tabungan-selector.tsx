import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DtoTabungan from "~/dtos/dto-tabungan";
import { FokusRombelKeuangan } from "./rombel-tabungan-selector";
import { createRekapBulananPerKelas } from "~/domain/tabungan/service/create-rekap-tabungan";
import { DataCustomerSiswaCurrentRombel } from "./data-siswa-aktif-keuangan";

export const PureDataTabunganAllRombel = (state:RootState)=>state.tabungan.data;

/**
 * @info data yang diambil dari sheet tabungan di kelas aksesnya, fokus pada kelas yang sedang
 * dikerjakan, 
 * @returns type TabunganAppType[]
 */
export const DtoDataTabunganCurrentRombel = createSelector(
    [ 
        PureDataTabunganAllRombel,
        FokusRombelKeuangan
    ],
    (sourceSheetTabungan, fokusKeuangan)=>{
        const found = sourceSheetTabungan.find(s=>s.nama_rombel === fokusKeuangan?.rombel);
        
        return found ? DtoTabungan.toArrayFromSheet(found.data) : []
    }
);

/**
 * @returns type  RekapBulananPerKelas[]
 */
export const DataTabunganRekapPenabungAktifCurrentRombel = createSelector([
    DtoDataTabunganCurrentRombel
],(tabunganKelas)=>{
    return createRekapBulananPerKelas(tabunganKelas)
})

/**
 * @returns type  RekapBulananPerKelas[]
 */
export const DataTabunganRekapCurrentRombel = createSelector([
    DataCustomerSiswaCurrentRombel,
    DataTabunganRekapPenabungAktifCurrentRombel
],(siswaKelas, penabungAktif)=>{
    return siswaKelas.map(m=>{
        const found = penabungAktif.find(tk=>tk.siswa_id === m.id);
        return found ?? {
                            siswa_id : m.id,
                            nama_siswa: m.pd_nama,
                            data_perbulan: [],
                            total: 0
                        }
    })
})
