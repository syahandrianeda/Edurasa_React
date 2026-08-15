export type JenisSerahTerimaType=
| 'Penyerahan'
| 'Penerimaan'
| 'Pengembalian'
| 'Penyerahan dan Penerimaan'
| 'Penyerahan dan Pegembalian';

export const JenisSerahTerimaEnum ={
    SERAH: 'Penyerahan',
    TERIMA: 'Penerimaan',
    KEMBALI: 'Pengembalian',
    SERAH_TERIMA: "Penyerahan dan Penerimaan",
    SERAH_KEMBALI: "Penyerahan dan Pengembalian"
} as const

export type JenisSerahTerimaEnum = typeof JenisSerahTerimaEnum[keyof typeof JenisSerahTerimaEnum];


export const GetValueJenisSerahTerima = (v:keyof typeof JenisSerahTerimaEnum)=>{
    switch(v){
        case "SERAH":
            return JenisSerahTerimaEnum.SERAH;
        case "TERIMA":
            return JenisSerahTerimaEnum.TERIMA;
        case "KEMBALI":
            return JenisSerahTerimaEnum.KEMBALI;
        case "SERAH_TERIMA":
            return JenisSerahTerimaEnum.SERAH_TERIMA;
        case "SERAH_KEMBALI":
            return JenisSerahTerimaEnum.SERAH_KEMBALI;
        default:
            return '';
    }
}
