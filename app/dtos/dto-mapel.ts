import type { InterfaceMapel, InterfaceMapelSheet } from "~/types/mapel/mapel";
import { resolveAgama, resolveNumber, resolveString } from "./_resolver";

export default class DTOMapel{
    static fromSheet(data:InterfaceMapelSheet):InterfaceMapel{
        return {
            id:resolveNumber(data.id),
            nama:resolveString(data.nama),
            kode:resolveString(data.kode),
            kode_umum:resolveString(data.kode_umum),
            kelompok:resolveString(data.kelompok),
            grup:resolveString(data.grup),
            penganut:resolveAgama(data.penganut),
            muatan:resolveString(data.muatan),
            kurikulum:resolveString(data.kurikulum)
        }
    }
    static arrayFromSheet(dto:InterfaceMapelSheet[]):InterfaceMapel[]{
        return dto.map(this.fromSheet);
    }
   
}