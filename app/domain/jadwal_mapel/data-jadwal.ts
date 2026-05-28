import type { jp_mapelApp } from "~/types/mapel/jp_mapel"
import type { jadwalMapelAccordTable, jadwalMapelAccordTableApp, jadwalMapelApp } from "~/types/setting_jadwal/jadwal_mapel"
import type { settingJadwalApp } from "~/types/setting_jadwal/setting_jadwal"

type jenis_kegiatan_jadwal ='kbm'|'istirahat'|'pembiasaan'
type dataJadwalType = {
    jam_ke:number,
    waktu:string,
    sn:string,
    sl:string,
    rb:string,
    km:string,
    jm:string,
    sb:string,
    type_row:jenis_kegiatan_jadwal
}
type dataJadwal = {
    warning:boolean,
    message:string[],
    data: dataJadwalType[]
}
 

export function generateDataJadwal(setting:settingJadwalApp, mapel: jp_mapelApp[], jadwalServer:jadwalMapelAccordTableApp[]):dataJadwalType[]{
    const result = [];
    if(!setting){
        return [];
    }
    const intervalMenit:number = setting.interval_menit??35;
    const [hour, minute] = setting.jam_awal.split(':').map(Number);
    const jumlahJamJadwal = setting.has_rest_time ? setting.count_jp_hari + 1 : setting.count_jp_hari;
     // tanggal dummy
    const current = new Date();
    current.setHours(hour);
    current.setMinutes(minute);
    current.setSeconds(0);
    current.setMilliseconds(0);

    for(let i=0; i<jumlahJamJadwal; i++){
        const jamAwal = new Date(current);
        const jamAkhir = new Date(current);
        jamAkhir.setMinutes(jamAkhir.getMinutes() + intervalMenit);
        if(jadwalServer.length>0){
            if(i===4 && setting.has_rest_time){
                const dataJadwalIstirahat: dataJadwalType = {
                    jam_ke: i+1,
                    waktu: `${formatJam(jamAwal)} - ${formatJam(jamAkhir)}`,
                    sn: 'Istirahat',
                    sl: 'Istirahat',
                    rb: 'Istirahat',
                    km: 'Istirahat',
                    jm: 'Istirahat',
                    sb: '',
                    type_row: 'istirahat'
                }
                result.push(dataJadwalIstirahat);
            }else{
                const dataJadwal: dataJadwalType = {
                        jam_ke: i+1,
                        waktu: `${formatJam(jamAwal)} - ${formatJam(jamAkhir)}`,
                        sn: jadwalServer[i]?.sn?.source?.kode_umum==='PA'? jadwalServer[i]?.sn?.nama_mapel_ijazah??'' : jadwalServer[i]?.sn?.nama_mapel??'',
                        sl: jadwalServer[i]?.sl?.source?.kode_umum==='PA'? jadwalServer[i]?.sl?.nama_mapel_ijazah??'' : jadwalServer[i]?.sl?.nama_mapel??'',
                        rb: jadwalServer[i]?.rb?.source?.kode_umum==='PA'? jadwalServer[i]?.rb?.nama_mapel_ijazah??'' : jadwalServer[i]?.rb?.nama_mapel??'',
                        km: jadwalServer[i]?.km?.source?.kode_umum==='PA'? jadwalServer[i]?.km?.nama_mapel_ijazah??'' : jadwalServer[i]?.km?.nama_mapel??'',
                        jm: jadwalServer[i]?.jm?.source?.kode_umum==='PA'? jadwalServer[i]?.jm?.nama_mapel_ijazah??'' : jadwalServer[i]?.jm?.nama_mapel??'',
                        sb: jadwalServer[i]?.sb?.source?.kode_umum==='PA'? jadwalServer[i]?.sb?.nama_mapel_ijazah??'' : jadwalServer[i]?.sb?.nama_mapel??'',
                        type_row: 'kbm'
                    }
                    result.push(dataJadwal);
            }
            
        }else{
            if(i===4 && setting.has_rest_time){
                const dataJadwalIstirahat: dataJadwalType = {
                    jam_ke: i+1,
                    waktu: `${formatJam(jamAwal)} - ${formatJam(jamAkhir)}`,
                    sn: 'Istirahat',
                    sl: 'Istirahat',
                    rb: 'Istirahat',
                    km: 'Istirahat',
                    jm: 'Istirahat',
                    sb: '',
                    type_row: 'istirahat'
                }
                result.push(dataJadwalIstirahat);
            }else{
                const dataJadwalKosong: dataJadwalType = {
                    jam_ke: i+1,
                    waktu: `${formatJam(jamAwal)} - ${formatJam(jamAkhir)}`,
                    sn: '',
                    sl: '',
                    rb: '',
                    km: '',
                    jm: '',
                    sb: '',
                    type_row: 'kbm'
                }
                result.push(dataJadwalKosong);
            }
        }
        current.setMinutes(current.getMinutes() + intervalMenit);
    }
    return result;
}
function formatJam(date: Date): string {
    const jam = String(date.getHours()).padStart(2, '0');
    const menit = String(date.getMinutes()).padStart(2, '0');

    return `${jam}:${menit}`;
}
