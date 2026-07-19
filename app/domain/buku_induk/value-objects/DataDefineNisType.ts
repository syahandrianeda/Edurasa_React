/** NIS berupa angka 9 digit, atau `kosong` jika nis `<SiswaType.nis>` = "" */
// export type NisType = string |'kosong';

// export type NisnType = string

export interface DefineNisType{
    prefix:string,
    jenjang:number,
    jenjangString:string,
    sufix:string;
    indexNis:number
}