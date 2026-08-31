import type { BankSoalAppType, BankSoalSheetType, JsonAlatJawabTupple } from "~/types/bank-soal/bank-soal-type";
import { resolveNumber, resolveString } from "./_resolver";
import type { JsonAlatJawab } from "~/types/bank-soal/bentuk-soal/json-alat-jawab-type";
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";

export default class DtoBankSoal{
    static fromSheetToApp(data:BankSoalSheetType):BankSoalAppType{
        return {
            idbaris:resolveNumber(data.idbaris),
                /** fase soal ini merujuk pada atp, 
                 * jika atp digunakan di 2 kelas, maka  soal ini 
                 * berpotensi untuk digunakan di 2 kelas itu
                 * */
                fase_jenjang:data.fase_jenjang === ""?[]:data.fase_jenjang.toString().trim().split(',').map((m)=>resolveNumber(m)),
                /**
                 * meskipun `fase_jenjang` memungkinkan merujuk 2 kelas,
                 * property `jenjang_khusus` menandakan bahwa soal ini dikhususkan untuk kelas `jenjang_khusus`
                 */
                jenjang_khusus:resolveNumber(data.jenjang_khusus),
                /** kurikulum masih hardcode, nilai default: 'kurmer'
                 */
                kurikulum:resolveString(data.kurikulum),
                kode_mapel:resolveString(data.kode_mapel),
                mapel_name:resolveString(data.mapel_name),
                kd_id:resolveNumber(data.kd_id),
                kd_deskripsi:resolveString(data.kd_deskripsi),
                bentuk_soal:resolveString(data.bentuk_soal),
                materi_pokok:resolveString(data.materi_pokok),
                indikator_soal:resolveString(data.indikator_soal),
                lk:resolveString(data.lk),
                taksonomi:data.taksonomi===""?undefined:DtoBankSoal.parseJson(data.taksonomi),
                ruang_lingkup:resolveString(data.ruang_lingkup),
                stimulus:resolveString(data.stimulus),
                pertanyaan:resolveString(data.pertanyaan),
                jawaban:DtoBankSoal.parseJson(data.jawaban),
                pembahasan_penskoran:resolveString(data.pembahasan_penskoran),
                // json_alat_jawab?:PgTunggal|PgKompleks|PilihanBenarSalahType|PilihanMenjodohkan,
                // json_alat_jawab?: JsonAlatJawab
                json_alat_jawab:DtoBankSoal.parseJsonAlatJawab(data.json_alat_jawab),
                snapshot_kurikulum: DtoBankSoal.parseJsonSnapshotKurikulum(data.snapshot_kurikulum),//SnapshotAtpType,
                oleh:resolveString(data.oleh),
                refrensi:resolveString(data.refrensi),
                //-------
                auto_koreksi: resolveString(data.auto_koreksi),
                status: resolveString(data.status),
        }
        
    }
    static fromAppToSheet(data:BankSoalAppType):BankSoalSheetType{
        return {
            idbaris:resolveNumber(data.idbaris),
                /** fase soal ini merujuk pada atp, 
                 * jika atp digunakan di 2 kelas, maka  soal ini 
                 * berpotensi untuk digunakan di 2 kelas itu
                 * */
                fase_jenjang:Array.isArray(data.fase_jenjang)?data.fase_jenjang.join(', '):'',
                /**
                 * meskipun `fase_jenjang` memungkinkan merujuk 2 kelas,
                 * property `jenjang_khusus` menandakan bahwa soal ini dikhususkan untuk kelas `jenjang_khusus`
                 */
                jenjang_khusus:resolveNumber(data.jenjang_khusus),
                /** kurikulum masih hardcode, nilai default: 'kurmer'
                 */
                kurikulum:resolveString(data.kurikulum),
                kode_mapel:resolveString(data.kode_mapel),
                mapel_name:resolveString(data.mapel_name),
                kd_id:resolveNumber(data.kd_id),
                kd_deskripsi:resolveString(data.kd_deskripsi),
                bentuk_soal:resolveString(data.bentuk_soal),
                materi_pokok:resolveString(data.materi_pokok),
                indikator_soal:resolveString(data.indikator_soal),
                lk:resolveString(data.lk),
                taksonomi:data.taksonomi ? JSON.stringify(data.taksonomi):'',
                ruang_lingkup:resolveString(data.ruang_lingkup),
                stimulus:resolveString(data.stimulus),
                pertanyaan:resolveString(data.pertanyaan),
                jawaban:JSON.stringify(data.jawaban),
                pembahasan_penskoran:resolveString(data.pembahasan_penskoran),
                // json_alat_jawab?:PgTunggal|PgKompleks|PilihanBenarSalahType|PilihanMenjodohkan,
                // json_alat_jawab?: JsonAlatJawab
                json_alat_jawab:JSON.stringify(data.json_alat_jawab),
                snapshot_kurikulum: JSON.stringify(data.snapshot_kurikulum),//SnapshotAtpType,
                oleh:resolveString(data.oleh),
                refrensi:resolveString(data.refrensi),
                //-------
                auto_koreksi: resolveString(data.auto_koreksi),
                status: resolveString(data.status),
        }
        
    }
    static arrrayFromSheetToApp(data:BankSoalSheetType[]):BankSoalAppType[]{
        return data.map(this.fromSheetToApp);
    }
    static arrrayFromAppToSheet(data:BankSoalAppType[]):BankSoalSheetType[]{
        return data.map(this.fromAppToSheet);
    }
    static parseJsonSnapshotKurikulum (raw:any):AtpAsOrm|undefined{
        if (!raw) return undefined

        // 1️⃣ Sudah array object
        // if (Array.isArray(raw) && typeof raw[0] === "object") {
        //     // return raw.map(this.normalizeFriends)
        //     return raw;
        // }

        // 2️⃣ JSON string
        if (typeof raw === "string") {
            try {
                const parsed = JSON.parse(raw)
                // if (Array.isArray(parsed)) {
                //     return parsed.map(this.normalizeFriends)
                // }
                return parsed
            } catch {
                // 3️⃣ CSV / pipe string fallback
                return undefined
            }
        }

        return undefined
    }
    static parseJsonAlatJawab (raw:any):JsonAlatJawabTupple|undefined{
        if (!raw) return undefined

        // 1️⃣ Sudah array object
        // if (Array.isArray(raw) && typeof raw[0] === "object") {
        //     // return raw.map(this.normalizeFriends)
        //     return raw;
        // }

        // 2️⃣ JSON string
        if (typeof raw === "string") {
            try {
                const parsed = JSON.parse(raw)
                // if (Array.isArray(parsed)) {
                //     return parsed.map(this.normalizeFriends)
                // }
                return parsed
            } catch {
                // 3️⃣ CSV / pipe string fallback
                return undefined
            }
        }

        return undefined
    }
    static parseJson (raw:any){
        if (!raw) return ''

        // 1️⃣ Sudah array object
        if (Array.isArray(raw) && typeof raw[0] === "object") {
            // return raw.map(this.normalizeFriends)
            return raw;
        }

        // 2️⃣ JSON string
        if (typeof raw === "string") {
            try {
                const parsed = JSON.parse(raw)
                // if (Array.isArray(parsed)) {
                //     return parsed.map(this.normalizeFriends)
                // }
                return parsed
            } catch {
                // 3️⃣ CSV / pipe string fallback
                return ''
            }
        }

        return ''
    }
}