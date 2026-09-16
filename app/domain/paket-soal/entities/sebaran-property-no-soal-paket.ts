export interface SebaranPropertyKurikulumNoSoalPaket{
    mapelName           : string, 
    koleksiBentukSoal   : string[],
    dataCp              : DataCpSebaranPaketSoalType[],
    countRowMapel       : number,
}

export interface DataCpSebaranPaketSoalType{
    cp_description      : string, 
    elemen              : string,
    cp_id               : number,
    countRowCp          : number,
    dataTp              : DataTpSebaranPaketSoalType[]
}

export interface DataTpSebaranPaketSoalType{
    tp_id               : number, 
    countRowTp          : number,
    tp_description      : string, 
    dataAtp             : DataAtpSebaranPaketSoalType[];
}

export interface DataAtpSebaranPaketSoalType{
    atp_id              : number, 
    atp_description     : string, 
    dataBentukSoal      : DataBentukSoalPaketSoalType[]
    skorMaksimalAtp     : number
}

export interface DataBentukSoalPaketSoalType{
    nameBentukSoal      : string,
    noSoal              : number[]
}