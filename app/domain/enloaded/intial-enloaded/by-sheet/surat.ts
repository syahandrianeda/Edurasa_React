import { namaTab } from "~/lib/nama-tab-environment";
import type { DataSheetNeeeded } from "../../data-sheet-needed-type";

const sheet = 'surat';
export const sheetSurat_suratKeluar:DataSheetNeeeded         = {sheet, tab: namaTab('surat_keluar')};
export const sheetSurat_suratMasuk:DataSheetNeeeded          = {sheet, tab: namaTab('surat_masuk')};