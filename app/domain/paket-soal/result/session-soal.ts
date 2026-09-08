import type { ReactNode } from "react";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { DisplayFormatItemSoal } from "./display-format-item-soal";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";

export interface DataSoalDesign{
    startNumber:number,
    bentukSoal:ListBentukSoalType
    petunjukPengisian:string,
    dataSoal:DisplayFormatItemSoal[]
}
export interface SectionSoal{
    index: number,
    label: ReactNode,
    data_section:DisplayFormatItemSoal[]
}
