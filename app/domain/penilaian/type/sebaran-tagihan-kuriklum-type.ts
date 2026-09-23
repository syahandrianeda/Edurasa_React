export interface SebaranTagihanAssesmenKurikulumType{
    mapelName           : string, 
    mapelKode            : string,
    slotMapel           : number,
    dataCp              : dataCp[]
}
interface dataCp{
    cp_id               : number,
    cp_description      : string,
    slotCp              : number,
    dataTp              : dataTp[]
}
interface dataTp{
    tp_id               : number,
    tp_description      : string,
    slotTp              : number,
    dataAtp             : dataAtp[];
}
interface dataAtp{
    atp_id              : number,
    atp_description      : string,
    slotAtp             : number,
    dataTagihan         : dataTagihan[]
}
interface dataTagihan{
    kategori            : 'harian'|'mid_semester'|'akhir_semester'
    dataInstrumen       : dataInstrumen[]
}
interface dataInstrumen{
    identitas           : string
    countInstrumen      : number
    indexInstrumen      : number[]
    skor                : number
}