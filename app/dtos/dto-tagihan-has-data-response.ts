import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import type { PublikasiPaketSheetType } from "~/types/bank-soal/entities/publikasi-paket-sheet-type";
import { numberArrayToString, resolveDate, resolveNumber, stringArrayToString } from "./_resolver";
import DtoPraSetingPaket from "./dto-praseting";

export default class DtoTagihanHasDataResponse{
    static fromTagihanHasDataResponseToPublikasiSheetType(data:TagihanHasDataResponse):PublikasiPaketSheetType{
        const json_setting = data.setting_tagihan ?  JSON.stringify(DtoPraSetingPaket.praSettingPaketToPraSettingBaku(data.setting_tagihan)):'';
        return {
                idbaris         : data.idbaris,
                paket_soal_id   : data.paket_soal_id,
                start_time      : data.start_time.toString(),
                end_time	    : data.end_time.toString(),
                durasi          : resolveNumber(data.durasi),
                target_type     : data.target_type,
                target_person   : numberArrayToString(data.target_person),
                target_rombel   : stringArrayToString(data.target_rombel),
                jenis_tagihan   : data.jenis_tagihan.kode,
                status          : data.status,
                id_file_setting : data.id_file_setting,
                id_bank_soal    : numberArrayToString(data.id_bank_soal),
                nama_publikasi  : data.nama_publikasi,
                oleh            : data.oleh,
                json_setting               ,
        }
    }
}