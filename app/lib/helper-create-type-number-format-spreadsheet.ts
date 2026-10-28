import { store } from "~/context-reduct/redux-provider";
import type { KategoriTagihanType } from "~/domain/kategori-tagihan/types/entities/KategoriTagihanType";
import { getNumberFromString } from "./get-number";

export default function helperCreateTypeNumberFormatSpreadsheet(tipe_assesmen:KategoriTagihanType, paramLanjutan:Record<string, any>){
        const st = store.getState();
        const rombel = paramLanjutan.rombel;
        const jenjang = getNumberFromString(rombel);
        switch (tipe_assesmen){
            case 'harian' :{
                const found = st.harian.data.find(s=>s.jenjang === jenjang)?.objekKosong;
                return found ? {...found, ...paramLanjutan}:paramLanjutan;
            }
            case 'mid_semester' :{
                const found = st.midSemester.data.find(s=>s.jenjang === jenjang)?.objekKosong;
                return found ? {...found, ...paramLanjutan}:paramLanjutan;
            }
            case 'akhir_semester' :{
                const found = st.akhirSemester.data.find(s=>s.jenjang === jenjang)?.objekKosong;
                return found ? {...found, ...paramLanjutan}:paramLanjutan;
            }
            case 'ujian_sekolah' :{
                const found = st.us.data.find(s=>s.jenjang === jenjang)?.objekKosong;
                return found ? {...found, ...paramLanjutan}:paramLanjutan;
            }
            case 'remedial_pengayaan' :{
                const found = st.remdialPengayaan.data.find(s=>s.jenjang === jenjang)?.objekKosong;
                return found ? {...found, ...paramLanjutan}:paramLanjutan;
            }
            // default:{
            //      const found = st.harian.data.find(s=>s.jenjang === jenjang)?.objekKosong;
            //     return found ? {...found, ...paramLanjutan}:paramLanjutan;
            // }
        }
    }