import type { SiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif";
import { currentTapel } from "~/lib/current-tapel";
import type { RiwayatRombelSheetType } from "~/types/buku-induk/riwayat-rombel";
import type { SiswaType } from "~/types/siswa";

export class ValidationDataRombel{
    /**
     * rombel valid jika:
     * jika siswa aktif, tapelnya sekarang maka data diambil dari `nama_rombel`
     * jika siswa aktif, tapelnya `bukan` tapel sekarang, maka ada perhitungan khusus
     */

    private statusValidation:'checked'|'unchecked'='unchecked';
    private _lastRombel:string='';
    private _firstRombel:string='';
    
    constructor(private readonly dataCurrent:SiswaType, private readonly dataRiwayatRombelInduk:RiwayatRombelSheetType){}

    shortTapelAtDate(tgl:Date = new Date){
        return currentTapel({variant:'short',date:tgl});
    }

    isSameTapel(tgl:Date=new Date()){
        const tapelNow = currentTapel({variant:'short'});
        return tapelNow === this.shortTapelAtDate(tgl);
    }
    
    checkValidAt(tgl:Date = new Date()){
        if(this.isSameTapel(tgl)){
            this._lastRombel = this.dataCurrent.nama_rombel;
        }else{
            
            this._lastRombel = this.dataRiwayatRombelInduk['tapel_'+ this.shortTapelAtDate]
        }
    }
    
    get lastRombel(){
        return this._lastRombel;
    }


}