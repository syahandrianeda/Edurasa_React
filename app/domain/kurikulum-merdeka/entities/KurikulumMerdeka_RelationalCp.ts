import type { ElemenCpType } from "~/types/kurikulum/elemen-cp";

/**
 * contoh data: RelationalElemenCpType[]=[
 *  {
 *      namaMapel:'Pendidikan Pancasila',
 *      kodeMapel:'PKN',
 *      elemenCP:[
 *              {
 *                  idbaris:0,
                    kodemapel:string,
                    fase:string,
                    elemen:string,
                    cp_utama:string,
                    kode_elemen:number,
                    cp_kunci:string,
                    taksonomibloom:string,
                    status?:string
 *                  
 *              }
 *       ]
 *  }
 * ]
 */
export interface RelationalElemenCpType{
    namaMapel:string,
    kodeMapel:string,
    elemen_cp:ElemenCpType[]
}
