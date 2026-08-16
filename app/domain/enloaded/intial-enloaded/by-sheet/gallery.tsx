import { namaTab } from "~/lib/nama-tab-environment";
import type { DataSheetNeeeded } from "../../data-sheet-needed-type";

const sheet= 'gallery';

export const sheetGallery_gallery:DataSheetNeeeded = {sheet, tab: namaTab('gallery')};
export const sheetGallery_serahTerimaDokumen:DataSheetNeeeded = {sheet, tab: namaTab('serah_terima_dokumen')};
export const sheetGallery_transaksiSerahTerimaDokumen:DataSheetNeeeded = {sheet, tab: namaTab('transaksi_serah_terima')};