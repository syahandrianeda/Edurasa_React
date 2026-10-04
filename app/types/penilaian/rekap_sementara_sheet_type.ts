export interface ValidatedResponseSiswa{
    idbaris: string,
    siswa_id:string,
    nama_siswa:string,
    rombel:string,
    // [key:string]:  string,
}
export interface HarianRekapSheetType extends ValidatedResponseSiswa{
    [key:string]:  string
}
export interface MidSemesterRekapSheetType extends ValidatedResponseSiswa{
    [key:string]:  string
}
export interface AkhirSemesterRekapSheetType extends ValidatedResponseSiswa{
    [key:string]:  string
}
export interface RemedialPengayaanRekapSheetType extends ValidatedResponseSiswa{
    [key:string]:  string
}
export interface UsRekapSheetType extends ValidatedResponseSiswa{
    [key:string]:  string
}