import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";

export const ListBentukSoal:ListBentukSoalType[]=[
    {
        name:'pg',
        description:'Pilihan Ganda',
        way_correction:'auto'
    },
    {
        name:'isian_singkat',
        description:'Isian Singkat',
        way_correction:'semi-auto'
    },
    { 
        name:'essay',
        description:'Essay',
        way_correction:'manual'
    },
    {
        name:'pg_kompleks',
        description:'Pilihan Ganda Kompleks',
        way_correction:'auto'
    },
    {
        name:'menjodohkan',
        description:'Menjodohkan',
        way_correction:'manual'
    },
    {
        name:'benar_salah',
        description:'Benar Salah',
        way_correction:'auto'
    },
    {
        name:'rapih',
        description:'Menulis Rapih/Elok',
        way_correction:'manual'
    },

]