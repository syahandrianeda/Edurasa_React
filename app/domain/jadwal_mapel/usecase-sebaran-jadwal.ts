import type { jp_mapelApp } from "~/types/mapel/jp_mapel";
import type { jadwalMapelAccordTable, jadwalMapelApp } from "~/types/setting_jadwal/jadwal_mapel"
import type { settingJadwalApp } from "~/types/setting_jadwal/setting_jadwal";

interface warningSebaranJadwal{
    warning:boolean,
    message:string,
}
interface resultSebaranJadwal extends warningSebaranJadwal{
    data:jadwalMapelAccordTable[]
}
const DataWarning:warningSebaranJadwal[] = [
    {
        warning:true,
        message:"There are some warnings in the schedule distribution."
    }
];

export default function createSebaranJadwal(
    setting:settingJadwalApp, 
    mapel:jp_mapelApp[], 
    jadwalServer:jadwalMapelAccordTable[]):resultSebaranJadwal {
    
    // check jika jadwal Server kosong
    // check jika jadwal server tidak sesuai dengan setting jadwal
    // check jika jadwal server tidak sesuai dengan mapel yang ada
    

    return {
        warning:true,
        message:"This is a placeholder message for sebaran jadwal.",
        data:[]
    }
}
    
