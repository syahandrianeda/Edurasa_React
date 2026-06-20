
export type FormatElemen = 'table'|'square'|'list'|'landscape'|'vertical';


export interface PgTunggal {
    OpsiPilihanJawaban:OpsiPilihanJawaban[],
    formatOpsi:FormatElemen,
    type: 'radio'
}
export interface PgKompleks {
    OpsiPilihanJawaban:OpsiPilihanJawaban[],
    formatOpsi:FormatElemen,
    type:'checkbox'
}
export interface OpsiPilihanJawaban{
    label:string
    value:string|number
    index:number
}
export interface PilihanMenjodohkan{
    opsiKiri:OpsiPilihanJawaban[],
    opsiKanan:OpsiPilihanJawaban[],
}
export interface PilihanBenarSalahType{
    listPernyataan:OpsiPilihanJawaban[],
    formatTampilan:FormatElemen,
}
export interface JumlahBarisMenulisRapih{
    listPernyataan:OpsiPilihanJawaban[],
    formatTampilan:FormatElemen,
}
export interface ListBentukSoalType{
    name:string,
    description:string,
    way_correction:'auto'|'manual'|'semi-auto';
    

}