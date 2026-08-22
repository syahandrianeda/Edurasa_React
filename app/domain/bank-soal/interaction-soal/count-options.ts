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

export const countOpsion:OptionsInListBentuSoal[]=[
    {
        name:'pg',
        prepareOptionsCount:{
            default:4,
            min:3,
            max:5
        },
        decision:4
    },
    {
        name:'pg_kompleks',
        prepareOptionsCount:{
            default:4,
            min:3,
            max:10
        },
        decision:4
    },
    {
        name:'menjodohkan',
        prepareOptionsCount:{
            default:4,
            min:1,
            max:10
        },
        decision:4
    },
    {
        name:'benar_salah',
        prepareOptionsCount:{
            default:4,
            min:1,
            max:10
        },
        decision:4
    },
    {
        name:'rapih',
        prepareOptionsCount:{
            default:4,
            min:1,
            max:10
        },
        decision:4
    },
]