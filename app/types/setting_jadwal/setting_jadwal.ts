export interface settingJadwalSheet {
    idbaris:number,
    rombel:string,
    jam_awal:Date,
    has_rest_time:number,
    include_sabtu:number,
    count_jp_hari:number,
    interval_menit:number
}
export interface settingJadwalApp {
    idbaris:number,
    rombel:string,
    jam_awal:string,
    has_rest_time:Boolean,
    include_sabtu:Boolean,
    count_jp_hari:number,
    interval_menit:number

}