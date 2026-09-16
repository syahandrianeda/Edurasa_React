
import { namaTab } from "~/lib/nama-tab-environment";
import type { DataSheetNeeeded } from "../../data-sheet-needed-type";

/** Penamaan objek berdasarkan:
 *  nama sheet dan nama tab
 *  contoh: sheetBankSoal_bankSoal, sheetBankSoal_taksonomiBloom
 */
const sheet = 'bank_soal';
export const sheetBankSoal_bankSoal:DataSheetNeeeded        = {sheet, tab: namaTab('bank_soal')};
export const sheetBankSoal_taksonomiBloom:DataSheetNeeeded  = {sheet, tab: namaTab('taksonomi_bloom')};
export const sheetBankSoal_paketSoal:DataSheetNeeeded       = {sheet, tab: namaTab('paket_soal')};
export const sheetBankSoal_publikasiPaket:DataSheetNeeeded = {sheet, tab: namaTab('publikasi_paket')}

/** ada 2 tab di sheet bank_soal, cek di spreadsheet-nya */
export const sheetBankSoal:DataSheetNeeeded[] = [
    sheetBankSoal_bankSoal,
    sheetBankSoal_taksonomiBloom,
    sheetBankSoal_paketSoal,
    sheetBankSoal_publikasiPaket
]  