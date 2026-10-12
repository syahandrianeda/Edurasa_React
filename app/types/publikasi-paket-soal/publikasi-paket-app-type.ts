import type { TypePaketSoal } from "~/domain/paket-soal/entities/type-paket";
import type { SiswaType } from "~/types/siswa";
import type { BankSoalAppType } from "../bank-soal/bank-soal-type";
import type PaketSoalDesignClass from "~/domain/paket-soal/infrastructure/paket-soal-design-class";
import type { PraSettingBaku } from "../bank-soal/entities/PraSettingBaku";

export interface PublikasiPaketAppType  {
    idbaris             : number,
    paket_soal_id	    : number,
    start_time          : Date,
    end_time	        : Date, 
    durasi              : number,
    target_type         : TypePaketSoal,
    target_person       : number[],
    target_rombel       : string[],
    jenis_tagihan       : string,
    status              : string,
    id_file_setting     : string,
    id_bank_soal        : number[],
    nama_publikasi      : string,
    oleh                : string
    json_setting?       : PraSettingBaku,
    
    // bankSoal            : BankSoalAppType[]
}


export interface PublikasiPaketAppValidWithPaketSoal extends PublikasiPaketAppType{
    is_validPaketSoal :boolean;
    id_file_paket:string
}
