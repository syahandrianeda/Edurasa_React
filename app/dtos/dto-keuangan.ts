import type { KeuanganSheetType } from "~/types/tabungan/keuangan-sheet-type";
import { resolveDate, resolveNumber, resolveString } from "./_resolver";
import type { KeuanganAppType, SnapshotKeuangan } from "~/types/tabungan/keuangan-app-type";



export default class DtoKeuangan{
    static fromSheet(data:Record<string, any>):KeuanganAppType{
        return {
            idbaris     : resolveNumber(data.idbaris),//number;
            time_stamp  : new Date(data.time_stamp),
            penginput   : resolveString(data.penginput),
            siswa_id    : resolveNumber(data.siswa_id),
            nama_siswa  : resolveString(data.nama_siswa),
            masuk       : data.masuk === ""?undefined:resolveNumber(data.masuk),//number,
            keluar      : data.keluar === ""?undefined: resolveNumber(data.keluar),//number,
            status      : resolveString(data.status),
            kategori    : resolveString(data.kategori),//string,
            keterangan  : resolveString(data.keterangan),//string,
            snapshot    : data.snpashot === ""?undefined: this.parseSnapshot(data.snapshot),// SnapshotKeuangan[],
        }
    }
    static toArrayFromSheet(data:Record<string, any>):KeuanganAppType[]{
        return data.map(this.fromSheet);
    }
    static parseSnapshot(raw:any):SnapshotKeuangan[]{
        if (!raw) return []

        // 1️⃣ Sudah array object
        if (Array.isArray(raw) && typeof raw[0] === "object") {
            return raw.map(this.snapshotKeuanganNormalizer)
        }

        // 2️⃣ JSON string
        if (typeof raw === "string") {
        try {
            const parsed = JSON.parse(raw)
            if (Array.isArray(parsed)) {
                return parsed.map(this.snapshotKeuanganNormalizer)
            }
        } catch {
            // 3️⃣ CSV / pipe string fallback
            return []
        }
        }

        return []

        
    }
    static snapshotKeuanganNormalizer(data:Record<string, any>):SnapshotKeuangan{
        return {
            time_stamp      : new Date(data.time_stamp),
            penginput       : resolveString(data.penginput),
            kategori        : resolveString(data.kategori),//string,
            keterangan      : resolveString(data.keterangan),//string,
            nominal         : resolveNumber(data.nominal),//number
            kolom           : resolveString(data.kolom) as keyof KeuanganAppType,
            status          : resolveString(data.status),//string
        }
    }
}