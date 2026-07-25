import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { DataDtoKategoriKeuangan, KategoriKeuanganCurrentAkun } from "./kategori-keuangan-selector";
import type { fokusKategoriKeuanganType } from "../global-state/tabungan/ui-akses-keuangan-slice";
import type { KategoriKeuanganAppType } from "~/types/tabungan/kategori-keuangan-type";

export const FokusKategoriKeuangan = (state:RootState)=>state.fokusKategoriKeuangan.value

export const FokusRombelKeuangan = createSelector(
    [
        FokusKategoriKeuangan,
        KategoriKeuanganCurrentAkun,
        (state:RootState)=>state.fokusRombel.value

    ],
    (
        kelasFokus?:fokusKategoriKeuanganType , 
        aksesKategoriUser?:KategoriKeuanganAppType[]
    ):fokusKategoriKeuanganType|undefined =>{
        
        /** jika kelasFokus belum didispatch, bisanya tidak punya data */
        if(!kelasFokus){ // kelasFokus bernilai `undefined`
            /** jika benar `undefined`, cek kategoriKeuangan di server untuk akun ini */
            if(aksesKategoriUser && aksesKategoriUser?.length > 0){
                /** jika tidak ada, di `KategoriKeuanganCurrentAkun` untuk user `Guru kelas` secara 
                * default itu dibuatkan fokusRombel bayangan (belum disimpan di server)
                */
                return {
                    kategori: aksesKategoriUser[0].kategori,
                    rombel : aksesKategoriUser[0].akses_kelas[0]
                }
            }
            /** jika tidak ada, fokusKategori Tabungan tidak dibuat undefined*/
            return;

        }

        return kelasFokus;
    }
)