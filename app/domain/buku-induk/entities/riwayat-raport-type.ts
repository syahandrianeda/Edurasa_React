export interface RiwayatRaportIndukType{
    tahunPelajaran:string,
    namaRombel:string
    dataRaport?:DataRaportIndukType[]
    dataInduk?:string[]
}

export interface DataRaportIndukType{
    semester:1|2
    data:Record<string, any>
}