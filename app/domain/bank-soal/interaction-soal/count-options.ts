import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type"

export interface OptionsCountType {
    default:number,
    min:number
    max:number
}

export interface OptionsInListBentuSoal{
    name:ListBentukSoalType['name']
    prepareOptionsCount:OptionsCountType
    decision:number
}