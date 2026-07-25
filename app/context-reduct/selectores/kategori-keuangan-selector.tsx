import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import DtoKategoriKeuangan from "~/dtos/dto-kategori-keuangan";
import type { KategoriKeuanganAppType } from "~/types/tabungan/kategori-keuangan-type";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";

export const KategoriKeuanganPure = (state:RootState)=> state.kategoriKeuangan.data;

export const DataDtoKategoriKeuangan = createSelector([
    KategoriKeuanganPure
],
(dto)=>DtoKategoriKeuangan.toArray(dto)
)

/**
 * @info selector dengan result type KategoriKeuanganAppType[]
 */
export const KategoriKeuanganCurrentAkun = createSelector(
    [
        DataDtoKategoriKeuangan,
        (state:RootState)=>state.auth.user,
        (state:RootState)=>state.fokusRombel.value
    ],
    (kategori, user, kelasAmpu):KategoriKeuanganAppType[]=>{
        // return kategori.filter(s=>s.user_id === user?.id)
        const kategoriServer = kategori.filter(s=>s.user_id === user?.id)
        if(kategoriServer){
            /** user menyimpan data di `kategori_akses` */
            return kategori.filter(s=>s.user_id === user?.id);
        }else{
            /** user belum menyimpan data di `kategori_akses */

            /** Jika belum menyimpan `kategori_akses` untuk keuangan, selain user = `guru_kelas`, abaikan */
            if(user?.jabatan === 'Guru Kelas'){
                return [{
                    idbaris: 0,
                    user_id: user?.id,
                    nama_user: user?.name,
                    kategori: 'tabungan',
                    akses_kelas: [kelasAmpu ?? getSessionRombel()],
                }] 
            }
            return []
        }
    }
)