import { namaTab } from "~/lib/nama-tab-environment";
import type { DataSheetNeeeded } from "../../data-sheet-needed-type";

/** Penamaan objek berdasarkan:
 *  nama sheet dan nama tab
 *  contoh: sheetBankSoal_bankSoal, sheetBankSoal_taksonomiBloom
 */
const sheet = 'kalender';
export const sheetKaldik_kalender:DataSheetNeeeded        = {sheet, tab: namaTab('kalender')};

