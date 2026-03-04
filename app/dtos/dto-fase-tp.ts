import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum";
import { resolveNumber, resolveString } from "./_resolver";

export default class DTOFaseTp{
    static fromSheet(data:Record<string, any>):FaseKurikulumType{
        return {
            idbaris:resolveNumber(data.idbaris),
            foreignkey_elemencp: resolveNumber(data.foreignkey_elemencp),
            tp:resolveString(data.tp),
            // atp:resolveString(data.atp)
            // tpcustom:resolveString(data.tpcustom)
            // atpcustom:resolveString(data.atpcustom)
            // jenjang:resolveString(data.jenjang)

        }
    }
    static arrayFromSheet(data:Record<string, any>[]):FaseKurikulumType[]{
        return data.map(this.fromSheet);
    }
    static toSheet(data:Record<string, any>):FaseKurikulumType{
        return {
            idbaris:resolveNumber(data.idbaris),
            foreignkey_elemencp: resolveNumber(data.foreignkey_elemencp),
            tp:resolveString(data.tp),
            // atp:resolveString(data.atp)
            // tpcustom:resolveString(data.tpcustom)
            // atpcustom:resolveString(data.atpcustom)
            // jenjang:resolveString(data.jenjang)

        }
    }
    static arrayToSheet(data:Record<string, any>[]):FaseKurikulumType[]{
        return data.map(this.toSheet);
    }
}