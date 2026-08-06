import type { RiwayatAkunAppType } from "~/types/tendik/riwayat-akun-app-type";
import type { RiwayatAkunSheetType } from "../types/tendik/riwayat-akun-sheet-type";

export default class DtoRiwayatIdAkun{
    
    static normalizeResponse(respon:Record<string, any>):RiwayatAkunSheetType{
        return {
            idbaris             : Number(respon.idbaris),
            user_id             : Number(respon.user_id),
            nama_guru           : String(respon.nama_guru),
            jabatan             : String(respon.jabatan),
            type_ptk            : String(respon.type_ptk),
            start_tgl           : String(respon.start_tgl),
            end_tgl             : String(respon.end_tgl),
            nip                 : String(respon.nip),
            tgl_nip_start       : String(respon.tgl_nip_start),
            asn                 : String(respon.asn),
        }
    }

    static arrayFromSheet(data:Record<string, any>[]):RiwayatAkunSheetType[]{
        return data.map(this.normalizeResponse);
    }

    static toApp(data:RiwayatAkunSheetType):RiwayatAkunAppType{
        return {
            idbaris             : data.idbaris,
            user_id             : data.user_id,
            nama_guru           : data.nama_guru,
            jabatan             : data.jabatan,
            type_ptk            : data.type_ptk,
            start_tgl           : data.start_tgl==''?undefined:new Date(data.start_tgl),
            end_tgl             : data.end_tgl==''?undefined:new Date(data.end_tgl),
            nip                 : data.nip,
            tgl_nip_start       : data.tgl_nip_start==''?undefined:new Date(data.tgl_nip_start),
            asn                 : data.asn,
        }
    }

    static arrayToApp(data:RiwayatAkunSheetType[]):RiwayatAkunAppType[]{
        return data.map(this.toApp);
    }

    static normalizeResponseToApp(respon:Record<string, any>):RiwayatAkunAppType{
        const sheetData = DtoRiwayatIdAkun.normalizeResponse(respon);
        return DtoRiwayatIdAkun.toApp(sheetData);
    }

    static arrayNormalizeResponseToApp(data:Record<string, any>[]):RiwayatAkunAppType[]{
        return data.map(DtoRiwayatIdAkun.normalizeResponseToApp);
    }

}