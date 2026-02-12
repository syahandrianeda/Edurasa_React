export interface AbsensiSiswaType{
    Time_Stamp:Date,
    id:string,
    name:string,
    kelas:string,
    kehadiran:string,
    fileContent:string,
    resume:string,
    action:string,
    idbaris:number,
    tokensiswa:number,
}
export interface AbsensiSiswaSheetType{
    Time_Stamp:string,
    id:string,
    name:string,
    kelas:string,
    kehadiran:string,
    fileContent:string,
    resume:string,
    action:string,
    idbaris:number,
    tokensiswa:number,
}
/** nama action di sheet absen */
export type typeActionValueAppScriptAbsen = 'siswaabsensiswa' | 'guruNgabsensiSiswaEdurasa';

export interface DefineActionAppScript{
    key:string,
    description:string
}

export const valueActionAbsenAppScript: DefineActionAppScript[] = [
    
    {
        key: 'siswaabsensiswa',
        description: 'Siswa Sendiri'
    },
    {
        key: 'guruNgabsensiSiswaEdurasa',
        description: 'Di absen guru'
    },
];
export function defineDescriptionValueActionAbsen(key?: typeActionValueAppScriptAbsen){
    
    return valueActionAbsenAppScript.find(s=>s.key === key)?.description;
}

/** type data untuk absen  */
export type KehadiranType = 'Hadir'|'Sakit'|'Ijin'|'Alpa';

export interface KoleksiIdImgKehadiran{
    idFile: string,
    typeKehadiran: KehadiranType
};

/**
 * 
        this.idimg_Ijin = '1VOdeOa_vilNTwfGWn48VK56-v5IWzibb';
        this.idimg_Alpa = '1tDBZCBhUDs9eu3o9yc7FNImjPiHXKQR7';
        this.idimg_Sakit = '10sfjLCvGjOL0kG2sabg5OBQc8s3_JmNs';
 */
export const KoleksiIdFileByApp:KoleksiIdImgKehadiran[]=[
    {
        idFile:'',
        typeKehadiran:'Hadir',
    },
    {
        idFile:'10sfjLCvGjOL0kG2sabg5OBQc8s3_JmNs',
        typeKehadiran:'Sakit',
    },
    {
        idFile:'1VOdeOa_vilNTwfGWn48VK56-v5IWzibb',
        typeKehadiran:'Ijin',
    },
    {
        idFile:'1tDBZCBhUDs9eu3o9yc7FNImjPiHXKQR7',
        typeKehadiran:'Alpa',
    },
]

