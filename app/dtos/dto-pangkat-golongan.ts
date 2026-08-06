import type { PangkatGolonganAppType } from "~/types/tendik/pangkat-golongan-app-type";
import { resolveNumber, resolveString } from "./_resolver";
import type { PangkatGolonganSheetType } from "~/types/tendik/pangkat-golongan-sheet-type";

export default class DtoPangkatGolongan{
    static toApp(data:Record<string, any>):PangkatGolonganAppType{
        return {
            idbaris         : resolveNumber(data.idbaris),
            user_id         : resolveNumber(data.user_id),
            nama_user       : resolveString(data.nama_user),
            pangkat         : resolveString(data.pangkat),
            golongan        : resolveString(data.golongan),
            ruang           : resolveString(data.ruang),
            start_at        : data.start_at === ""?undefined:new Date(data.start_at),
            end_at          : data.end_at === ""?undefined:new Date(data.end_at),
            asn             : resolveString(data.asn),
        }
    }
    
    static fromSheet(data:Record<string, any>):PangkatGolonganSheetType{
        return {
            idbaris         : resolveNumber(data.idbaris),
            user_id         : resolveNumber(data.user_id),
            nama_user       : resolveString(data.nama_user),
            pangkat         : resolveString(data.pangkat),
            golongan        : resolveString(data.golongan),
            ruang           : resolveString(data.ruang),
            start_at        : resolveString(data.start_at),
            end_at          : resolveString(data.end_at),
            asn             : resolveString(data.asn),
        }
    }
    static arrayFromSheet(data:Record<string, any>[]):PangkatGolonganSheetType[]{
        return data.map(this.fromSheet);
    }
    
    static arrayToApp(data:Record<string, any>[]):PangkatGolonganAppType[]{
        return data.map(this.toApp);
    }
}