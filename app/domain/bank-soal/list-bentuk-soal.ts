import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";


export const ListBentukSoal:ListBentukSoalType[]=[
    {
        name:'pg',
        shortName:'PG',
        description:'Pilihan Ganda',
        way_correction:'auto',
        petunjukPengisian:'Berilah tanda silang (X) pada huruf A, B, C, atau D di depan jawaban yang benar!'
    },
    {
        name:'isian_singkat',
        shortName:'Isian',
        description:'Isian Singkat',
        way_correction:'semi-auto',
        petunjukPengisian:'Jawab singkat pertanyaan berikut dengan tepat dan jelas!'
    },
    { 
        name:'essay',
        shortName:'Essay',
        description:'Essay',
        way_correction:'manual',
        petunjukPengisian:'Essay'
    },
    {
        name:'pg_kompleks',
        shortName:'PG Kompleks',
        description:'Pilihan Ganda Kompleks',
        way_correction:'auto',
        petunjukPengisian:'Berilah tanda ceklis (✓) pada kotak yang merupakan jawaban. Opsi jawaban bisa lebih dari satu!'
    },
    {
        name:'menjodohkan',
        shortName:'Menjodohkan',
        description:'Menjodohkan',
        way_correction:'manual',
        petunjukPengisian:'Tariklah sebuah garis yang merupakan pasangan antara pernyataan/ilustrasi di sebelah kiri dengan pernyataan/ilustrasi sebelah kanan!'
    },
    {
        name:'benar_salah',
        shortName:'Benar Salah',
        description:'Benar Salah',
        way_correction:'auto',
        petunjukPengisian:`Pilihlah jawaban 'Benar' atau 'Salah' dari pernyatan yang disajikan!`
    },
    {
        name:'rapih',
        shortName:'Menulis Rapi',
        description:'Menulis Rapi/Elok',
        way_correction:'manual',
        petunjukPengisian:'Tulislah dalam bentuk huruf bersambung (Tulisan Elok)!'

    },

]