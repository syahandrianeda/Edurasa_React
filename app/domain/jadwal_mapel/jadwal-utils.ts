import { formatJam } from "~/lib/format-jam";
import type { jadwalMapelAccordTableApp } from "~/types/setting_jadwal/jadwal_mapel";
import type { settingJadwalApp } from "~/types/setting_jadwal/setting_jadwal";

/**
 * Inisialisasi setting default jika data tidak ditemukan di server
 */
export const getInitialSetting = (rombel: string): settingJadwalApp => ({
  idbaris: 0,
  rombel,
  jam_awal: '06:30',
  has_rest_time: true,
  include_sabtu: false,
  count_jp_hari: 7,
  interval_menit: 35,
  menit_istirahat: 30,
  index_jam_istirahat: 4,
  show_type: 'kode'
});

/**
 * Menghasilkan grid jadwal berdasarkan setting.
 * Logika ini menangani sinkronisasi antara jumlah slot di setting vs data yang sudah ada di server.
 */
export function generateScheduleGrid(
  setting: settingJadwalApp,
  serverData: jadwalMapelAccordTableApp[],
  rombel: string
): jadwalMapelAccordTableApp[] {
  const { 
    jam_awal, count_jp_hari, interval_menit, 
    has_rest_time, menit_istirahat, index_jam_istirahat 
  } = setting;

  
  
  // Setup waktu awal
  const [hour, minute] = jam_awal.split(':').map(Number);
  const currentTime = new Date();
  currentTime.setHours(hour, minute, 0, 0);

  // Hitung total baris yang dibutuhkan (JP + Istirahat jika ada)
  const totalRequiredRows = count_jp_hari + (has_rest_time ? 1 : 0);
  
  // Iterasi sebanyak yang terbesar antara kebutuhan setting vs data yang sudah tersimpan
  const maxRows = Math.max(totalRequiredRows, serverData.length!);
  const grid: jadwalMapelAccordTableApp[] = [];
  for (let i = 0; i < maxRows; i++) {
    const isRestRow = has_rest_time && i === index_jam_istirahat;
    const isExtraRow = i >= totalRequiredRows; // Baris yang harus dihapus karena melebihi limit setting

    const jamAwalStr = formatJam(new Date(currentTime));
    const duration = isRestRow ? menit_istirahat : interval_menit;
    currentTime.setMinutes(currentTime.getMinutes() + (duration || 0));
    const jamAkhirStr = formatJam(new Date(currentTime));

    const existingData = serverData[i];
    const shouldKeepData = !isRestRow && !isExtraRow && existingData?.status !== 'hapus';

    grid.push({
      idbaris: existingData?.idbaris ?? 0,
      jam_ke: i + 1,
      waktu: `${jamAwalStr} - ${jamAkhirStr}`,
      namarombel: rombel,
      sn: shouldKeepData ? existingData?.sn : undefined,
      sl: shouldKeepData ? existingData?.sl : undefined,
      rb: shouldKeepData ? existingData?.rb : undefined,
      km: shouldKeepData ? existingData?.km : undefined,
      jm: shouldKeepData ? existingData?.jm : undefined,
      sb: shouldKeepData ? existingData?.sb : undefined,
      status: isExtraRow ? 'hapus' : '',//(existingData?.status ?? ''),
      type_row: isRestRow ? 'istirahat' : '',
    });
  }

  return grid;
}