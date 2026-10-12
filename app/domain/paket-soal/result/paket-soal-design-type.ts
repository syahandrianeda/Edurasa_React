import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { PraSettingPaket } from "../entities/pra-setting-paket";
import type { DisplayFormatItemSoal } from "./display-format-item-soal-type";
import type { DataSoalDesign } from "./section-soal-type";

export interface PaketSoalDesign{
    // draft: any;
    setting?:PraSettingPaket,
    data?:DataSoalDesign[] 
}

