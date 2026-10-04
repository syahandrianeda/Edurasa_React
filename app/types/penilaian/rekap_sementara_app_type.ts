export interface ValidatedResponseSiswaApp{
    idbaris: number,
    siswa_id:number,
    nama_siswa:string,
    rombel:string,

}
export interface HarianRekapAppType extends ValidatedResponseSiswaApp{
    [key:string]:  number | string | null
}
export interface MidSemesterRekapAppType extends ValidatedResponseSiswaApp{
    [key:string]:  number | string | null
}
export interface AkhirSemesterRekapAppType extends ValidatedResponseSiswaApp{
    [key:string]:  number | string | null
}
export interface RemedialPengayaanSemesterRekapAppType extends ValidatedResponseSiswaApp{
    [key:string]:  number | string | null
}
export interface USRekapAppType extends ValidatedResponseSiswaApp{
    [key:string]:  number | string | null
}