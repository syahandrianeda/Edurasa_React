import type { SnapshotTabungan, TabunganAppType } from "~/types/tabungan/tabungan-app-type";
import { resolveDate, resolveNumber, resolveString } from "./_resolver";
import type { TabunganSheetType } from "~/types/tabungan/tabungan-sheet-type";

export default class DtoTabungan{
    static fromSheet(data:TabunganSheetType):TabunganAppType{
        return {
            idbaris     : resolveNumber(data.idbaris),//number;
            time_stamp  : new Date(data.time_stamp),
            penginput   : resolveString(data.penginput),
            siswa_id    : resolveNumber(data.siswa_id),
            nama_siswa  : resolveString(data.nama_siswa),
            masuk       : data?.masuk === 0?undefined:resolveNumber(data?.masuk),//number,
            keluar      : data?.keluar === 0?undefined: resolveNumber(data?.keluar),//number,
            status      : resolveString(data.status),
            kategori    : resolveString(data.kategori),//string,
            keterangan  : resolveString(data.keterangan),//string,
            snapshot    : data.snapshot === ""?undefined: DtoTabungan.parseSnapshot( data.snapshot),// SnapshotTabungan[],
        }
    }
    static toArrayFromSheet(data:Record<string, any>):TabunganAppType[]{
        return data.map(this.fromSheet);
    }
    static toSheet(data:TabunganAppType):TabunganSheetType{
        return {
            idbaris         : resolveNumber(data.idbaris),
            time_stamp      : new Date(data.time_stamp).toString(),//.toLocaleDateString(),
            penginput       : resolveString(data.penginput),
            siswa_id        : resolveNumber(data.siswa_id),
            nama_siswa      : resolveString(data.nama_siswa),//string,
            masuk           : resolveNumber(data.masuk),
            keluar          : resolveNumber(data.keluar),//number,
            status          : data.status,
            kategori        : resolveString(data.kategori),
            keterangan      : resolveString(data.keterangan),
            snapshot        : JSON.stringify(data.snapshot)
        }

    }
    static arrayToSheet(data:TabunganAppType[]):TabunganSheetType[]{
        return data.map(this.toSheet)
    }
    static parseSnapshot(raw:any):SnapshotTabungan[]{
        if (!raw) return []

        // 1️⃣ Sudah array object
        if (Array.isArray(raw) && typeof raw[0] === "object") {
            return raw.map(this.snapshotTabunganNormalizer)
        }

        // 2️⃣ JSON string
        if (typeof raw === "string") {
        try {
            const parsed = JSON.parse(raw)
            if (Array.isArray(parsed)) {
                return parsed.map(this.snapshotTabunganNormalizer)
            }
        } catch {
            // 3️⃣ CSV / pipe string fallback
            return []
        }
        }

        return []

        
    }
    static snapshotTabunganNormalizer(data:Record<string, any>):SnapshotTabungan{
        return {
            time_stamp      : new Date(data.time_stamp),
            penginput       : resolveString(data.penginput),
            kategori        : resolveString(data.kategori),//string,
            keterangan      : resolveString(data.keterangan),//string,
            nominal         : resolveNumber(data.nominal),//number
            kolom           : resolveString(data.kolom) as keyof TabunganAppType,
            status          : resolveString(data.status),//string
        }
    }
}