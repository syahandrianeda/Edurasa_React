export interface ValidatedResponseSiswa{
    idbaris: number,
    siswa_id:number,
    nama_siswa:string,
    rombel:string,
    [key:string]:  number|string,
}
export interface HarianRekapSheetType extends ValidatedResponseSiswa{
    // [key:string]:  string
}
export interface MidSemesterRekapSheetType extends ValidatedResponseSiswa{
    // [key:string]:  string
}
export interface AkhirSemesterRekapSheetType extends ValidatedResponseSiswa{
    // [key:string]:  string
}
export interface RemedialPengayaanRekapSheetType extends ValidatedResponseSiswa{
    // [key:string]:  string
}
export interface UsRekapSheetType extends ValidatedResponseSiswa{
    // [key:string]:  string
}