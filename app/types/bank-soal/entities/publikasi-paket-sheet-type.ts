import type { TypePaketSoal } from "~/domain/paket-soal/entities/type-paket";
import type { SiswaType } from "~/types/siswa";
import type { BankSoalAppType } from "../bank-soal-type";

export interface PublikasiPaketSheetType{
    idbaris             : number,
    paket_soal_id	    : number,
    start_time          : string,
    end_time	        : string, 
    durasi              : number,
    target_type         : TypePaketSoal,
    target_person       : string,
    target_rombel       : string,
    jenis_tagihan       : string,
    status              : string,
    id_file_setting     : string,
    id_bank_soal        : string
    nama_publikasi      : string,
    oleh                : string,
    json_setting        : string;
}