import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { PraSettingPaket } from "../entities/pra-setting-paket";
import type { DisplayFormatItemSoal } from "./display-format-item-soal";
import type { DataSoalDesign } from "./session-soal";

export interface PaketSoalDesign{
    setting?:PraSettingPaket,
    data:DataSoalDesign[]
}

