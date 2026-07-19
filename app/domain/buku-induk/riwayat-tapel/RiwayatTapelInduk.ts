import { currentTapel } from "~/lib/current-tapel";
import type { SiswaType } from "~/types/siswa";

export default class RiwayatTapelInduk{
    detectRiwayatKelas(siswa:SiswaType){
        const {nis, masuk_tgl, nama_rombel:rombel, jenjang, aktif} = siswa;
        
        if(masuk_tgl instanceof Date){
            const siswaMasukDitapel = currentTapel({variant:'short', date:new Date(2023,6,13)})
            const tapelSaatIni = currentTapel({variant:'short'});
            const selisih = (Number(tapelSaatIni) - Number(siswaMasukDitapel));
            const riwayat = (selisih/101) ;
            const countRiwayat = riwayat + 1;

        }

        return [];
        /**
         * 
            {
                tapel:'',
                seharusnyaKelas:'',
                realKelasTapel:'',
                currentTapel:''
            }
        
         */
    }
    decidedKeyWhereRiwayatBuilded(frefixNis:string, tgl_masuk:Date){
        /** pertama tanggal masuk dan NIS */
        // jika nis dan short nis harus sama
        const shortNis = currentTapel({variant:"short", date:tgl_masuk})
        if(shortNis === frefixNis){
            //valid
        }
    }
    createPredicatable(count:number, jenjang:number){

        Array.from({length:count})
        /** cek tglMasuk, harusnya bisa dijadikan rujukan */
        
    }
}