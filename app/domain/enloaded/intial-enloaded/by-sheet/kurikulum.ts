
import { namaTab } from "~/lib/nama-tab-environment";
import type { DataSheetNeeeded } from "../../data-sheet-needed-type";

/** Penamaan objek berdasarkan:
 *  nama sheet dan nama tab
 *  contoh: sheetKurikulum_Kurikulum, sheetKurikulum_taksonomiBloom
 */
const sheet = 'kurikulum';
export const sheetKurikulum_mapel:DataSheetNeeeded          = {sheet, tab: namaTab('mapel')};
export const sheetKurikulum_jpMapel:DataSheetNeeeded        = {sheet, tab: namaTab('jp_mapel')};

// terkait fitur jadwal pelajaran
export const sheetKurikulum_jadwalMapel:DataSheetNeeeded        = {sheet, tab: namaTab('jadwal_mapel')};
export const sheetKurikulum_settingJadwal:DataSheetNeeeded      = {sheet, tab: namaTab('setting_jadwal')};
export const sheetKurikulum_kegiatanNonKbm:DataSheetNeeeded     = {sheet, tab: namaTab('kegiatan_nonkbm')};

// terkait property kurikulum
export const sheetKurikulum_atp:DataSheetNeeeded                = {sheet, tab: namaTab('Atp')};
export const sheetKurikulum_elemenCp:DataSheetNeeeded           = {sheet, tab: namaTab('elemen_cp')};
export const sheetKurikulum_faseA:DataSheetNeeeded              = {sheet, tab: namaTab('faseA')};
export const sheetKurikulum_faseB:DataSheetNeeeded              = {sheet, tab: namaTab('faseB')};
export const sheetKurikulum_faseC:DataSheetNeeeded              = {sheet, tab: namaTab('faseC')};

// terkait KKM/ KKTP
export const sheetKurikulum_kktp:DataSheetNeeeded              = {sheet, tab: namaTab('kkmkktp')};

// terkati dengan Prota
export const sheetKurikulum_prota:DataSheetNeeeded              = {sheet, tab: namaTab('prota')};

/** ada 12 tab di sheet kurikulum, cek di spreadsheet-nya */
export const sheetKurikulum:DataSheetNeeeded[] = [
    sheetKurikulum_mapel,
    sheetKurikulum_jpMapel,

    sheetKurikulum_jadwalMapel,
    sheetKurikulum_settingJadwal,
]  