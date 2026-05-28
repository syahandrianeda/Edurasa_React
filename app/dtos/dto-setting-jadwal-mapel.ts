import type { settingJadwalApp, settingJadwalSheet } from "~/types/setting_jadwal/setting_jadwal";
import { resolveDate, resolveNumber, resolveString, toBoolean } from "./_resolver";

export default class DtoSettingJadwalMapel{
    static fromSheet(data:settingJadwalSheet):settingJadwalApp{
        return {
            idbaris: data.idbaris,
            rombel: data.rombel,
            jam_awal: resolveDate(data.jam_awal)?.toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'}).replace('.', ':')||'06:30'  ,
            has_rest_time: toBoolean(data.has_rest_time),
            include_sabtu: toBoolean(data.include_sabtu),
            count_jp_hari: resolveNumber(data.count_jp_hari),
            interval_menit: resolveNumber(data.interval_menit)
        };
    }
    static arrayFromSheet(data:settingJadwalSheet[]):settingJadwalApp[]{
        return data.map(this.fromSheet);
    }
    static toSheet(data:settingJadwalApp):settingJadwalSheet{
        return {
            idbaris: data.idbaris,
            rombel: data.rombel,
            jam_awal: new Date(`1970-01-01T${data.jam_awal}:00`),
            has_rest_time: data.has_rest_time?1:0,
            include_sabtu: data.include_sabtu?1:0,
            count_jp_hari: data.count_jp_hari,
            interval_menit: data.interval_menit
        }
    }   
}