
export interface keteranganLabelKaldik{
    idbaris:number,
    keterangan:string,
    labelTanggal:string,
    warnaLatar:string,
    warnaHuruf:string,
    memberTanggal:number[];
    className?:string
    start_tgl:Date, 
    end_tgl:Date
}
export interface LiburHeHebType {
    isLibur:boolean
    isHe:boolean,
    isHeb:boolean,
    style?:React.CSSProperties
    indexWeek:number,
}
export interface propertyTgl extends LiburHeHebType{
    tgl:number,
    date:Date,
    weekInMonth: number,
    weekInSemester?:number,
    eventYet:boolean,
    keteranganKaldik:keteranganLabelKaldik[],
};

export interface recapPropertyTgl{
    propertyTgl: propertyTgl,
    countDays: number,
    countLibur: number,
    countHe: number, 
    countHeb: number
}
export interface dataKaldikSemester{
    namaBulan:string,
    tahun?:number,
    semester:number,
    data: Record<any, propertyTgl[]>
    dataKeterangan:keteranganLabelKaldik[]
}
export interface propertiHariDalamBulan{
    namaBulan:string,
    propertiesHariEfektif:detailPropertiHari
    propertiesHariEfektifBelajar:detailPropertiHari
}
export interface dataSparatedKaldikKeterangan{
    includeKeterangan: dataKaldikSemester[],
    dataKeterangan:keteranganLabelKaldik[]
    dataPropertiHari:propertiHariDalamBulan[]
    totalPropertiHari:detailPropertiHari
    totalPropertiHariBelajar:detailPropertiHari
}
export interface detailPropertiHari{
    minggu:number,
    senin:number,
    selasa:number,
    rabu:number,
    kamis:number,
    jumat:number,
    sabtu:number,
    total:number,
    stateSabtuLibur?:boolean
}
export interface groupingDataKaldik{
    groupWeek:Record<any, propertyTgl[]>
    propertiesHariEfektif:detailPropertiHari
    propertiesHariEfektifBelajar:detailPropertiHari
}
