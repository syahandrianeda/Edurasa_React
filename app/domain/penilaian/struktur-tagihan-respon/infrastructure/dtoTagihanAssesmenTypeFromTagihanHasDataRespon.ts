import type { TagihanHasDataResponse, TagihanAsessmenType } from "../../type/tagihan-assesmen-type";

export default class dtoTagihanAssesmenTypeFromTagihanHasDataRespon {
    static fromTagihanHasDataResponse(data: TagihanHasDataResponse):TagihanAsessmenType{
        const { idbaris, paket_soal_id, start_time, end_time, durasi, target_type, target_person, target_rombel, status, id_file_setting, id_bank_soal, nama_publikasi, oleh, jenis_tagihan, is_validPaketSoal, setting_tagihan, id_file_paket, source } = data;
    
        return {
            idbaris, paket_soal_id, start_time, end_time, durasi, target_type,
            target_person, target_rombel, status, id_file_setting, id_bank_soal, nama_publikasi, oleh, jenis_tagihan,
            is_validPaketSoal, setting_tagihan, id_file_paket, source
        };

    }
    static arrayFromTagihanHasDataRespons(data:TagihanHasDataResponse[]):TagihanAsessmenType[]{
        return data.map(this.fromTagihanHasDataResponse);
    }
}
