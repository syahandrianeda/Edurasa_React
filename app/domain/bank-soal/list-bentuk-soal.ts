import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";


export const ListBentukSoal:ListBentukSoalType[]=[
    {
        name:'pg',
        shortName:'PG',
        description:'Pilihan Ganda',
        way_correction:'auto'
    },
    {
        name:'isian_singkat',
        shortName:'Isian',
        description:'Isian Singkat',
        way_correction:'semi-auto'
    },
    { 
        name:'essay',
        shortName:'Essay',
        description:'Essay',
        way_correction:'manual'
    },
    {
        name:'pg_kompleks',
        shortName:'PG Kompleks',
        description:'Pilihan Ganda Kompleks',
        way_correction:'auto'
    },
    {
        name:'menjodohkan',
        shortName:'Menjodohkan',
        description:'Menjodohkan',
        way_correction:'manual'
    },
    {
        name:'benar_salah',
        shortName:'Benar Salah',
        description:'Benar Salah',
        way_correction:'auto'
    },
    {
        name:'rapih',
        shortName:'Menulis Rapi',
        description:'Menulis Rapi/Elok',
        way_correction:'manual'
    },

]