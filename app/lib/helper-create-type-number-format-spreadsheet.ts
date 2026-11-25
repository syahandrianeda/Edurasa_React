import { store } from "~/context-reduct/redux-provider";
import type { KategoriTagihanType } from "~/domain/kategori-tagihan/types/entities/KategoriTagihanType";
import { getNumberFromString } from "./get-number";
import { useAppSelector } from "~/context-reduct/hook";
import type { RekapKategoriSementaraType } from "~/context-reduct/global-state/respon-siswa/RekapKategoriSementaraType";
import type { HarianRekapSheetType, ValidatedResponseSiswa } from "~/types/penilaian/rekap_sementara_sheet_type";

/**
 * @deprecated
 * @param tipe_assesmen 
 * @param paramLanjutan 
 * @returns 
 */
export default function helperCreateTypeNumberFormatSpreadsheet(tipe_assesmen:KategoriTagihanType, paramLanjutan:Record<string, any>){
        // const st = store.getState();
        const harian = useAppSelector(state=>state.midSemester.data)
        const midSemester = useAppSelector(state=>state.midSemester.data)
        const akhirSemester = useAppSelector(state=>state.akhirSemester.data)
        const ujianSekolah = useAppSelector(state=>state.us.data)
        const remedialPengayaan = useAppSelector(state=>state.remdialPengayaan.data)

        const rombel = paramLanjutan.rombel;
        const jenjang = getNumberFromString(rombel);
        
        switch (tipe_assesmen){
            case 'harian' :{
                const found = harian.find(s=>s.jenjang === jenjang)?.objekKosong;
                return found ? {...found, ...paramLanjutan}:paramLanjutan;
            }
            case 'mid_semester' :{
                const found = midSemester.find(s=>s.jenjang === jenjang)?.objekKosong;
                
                return found ? {...found, ...paramLanjutan}:paramLanjutan;
            }
            case 'akhir_semester' :{
                const found = akhirSemester.find(s=>s.jenjang === jenjang)?.objekKosong;
                return found ? {...found, ...paramLanjutan}:paramLanjutan;
            }
            case 'ujian_sekolah' :{
                const found = ujianSekolah.find(s=>s.jenjang === jenjang)?.objekKosong;
                return found ? {...found, ...paramLanjutan}:paramLanjutan;
            }
            case 'remedial_pengayaan' :{
                const found = remedialPengayaan.find(s=>s.jenjang === jenjang)?.objekKosong;
                return found ? {...found, ...paramLanjutan}:paramLanjutan;
            }
            // default:{
            //      const found = st.harian.data.find(s=>s.jenjang === jenjang)?.objekKosong;
            //     return found ? {...found, ...paramLanjutan}:paramLanjutan;
            // }
        }
    }
type ResultStoreKategoriAssesmenRespurce = {
    data: ValidatedResponseSiswa[],
    objekKosong?:Record<string, string>
}
export function getStoreKategoriAssesmenResource(tipe_assesmen:KategoriTagihanType, jenjang:number):ResultStoreKategoriAssesmenRespurce{
    const state = store.getState();
    let objekKosong: Record<string, string> | undefined;
    let data: ValidatedResponseSiswa[] = []
    switch (tipe_assesmen) {
        case "harian":
            objekKosong = state.harian.data.find(item => item.jenjang === jenjang)?.objekKosong
            data = state.harian.data.find(item => item.jenjang === jenjang)?.data ?? []  ;
            break;
        case "mid_semester":
            objekKosong = state.midSemester.data.find(item => item.jenjang === jenjang)?.objekKosong;
            data = state.midSemester.data.find(item => item.jenjang === jenjang)?.data ?? []  ;
            break;
        case "akhir_semester":
            objekKosong = state.akhirSemester.data.find(item => item.jenjang === jenjang)?.objekKosong;
            data = state.akhirSemester.data.find(item => item.jenjang === jenjang)?.data ?? []  ;
            break;
        case "ujian_sekolah":
            objekKosong = state.us.data.find(item => item.jenjang === jenjang)?.objekKosong;
            data = state.us.data.find(item => item.jenjang === jenjang)?.data ?? []  ;
            break;
            break;
        case "remedial_pengayaan":
            objekKosong = state.remdialPengayaan.data.find(item => item.jenjang === jenjang)?.objekKosong;
            data = state.remdialPengayaan.data.find(item => item.jenjang === jenjang)?.data ?? []  ;
            break;
        default:
            objekKosong = undefined
            data = []
            
    }
    return {
        data,
        objekKosong
    }
}
export function helperCreateTypeNumberFormatSpreadsheetFromStore(
    tipe_assesmen: KategoriTagihanType,
    paramLanjutan: Record<string, any>
) {
    const state = store.getState();
    const jenjang = getNumberFromString(paramLanjutan.rombel);
    // let objekKosong: Record<string, string> | undefined;
    const resource = getStoreKategoriAssesmenResource(tipe_assesmen, jenjang);
    let objekKosong = resource.data.at(-1); 
        // switch (tipe_assesmen) {
        //     case "harian":
        //         objekKosong = state.harian.data.find(item => item.jenjang === jenjang)?.data
        //         break;
        //     case "mid_semester":
        //         objekKosong = state.midSemester.data.find(item => item.jenjang === jenjang)?.objekKosong;
        //         break;
        //     case "akhir_semester":
        //         objekKosong = state.akhirSemester.data.find(item => item.jenjang === jenjang)?.objekKosong;
        //         break;
        //     case "ujian_sekolah":
        //         objekKosong = state.us.data.find(item => item.jenjang === jenjang)?.objekKosong;
        //         break;
        //     case "remedial_pengayaan":
        //         objekKosong = state.remdialPengayaan.data.find(item => item.jenjang === jenjang)?.objekKosong;
        //         break;
        //     default:
        //         return paramLanjutan;
        // }
        
            console.log({tipe_assesmen,jenjang, paramLanjutan, objekKosong})
    return objekKosong ? { ...objekKosong, ...paramLanjutan } : paramLanjutan;
}