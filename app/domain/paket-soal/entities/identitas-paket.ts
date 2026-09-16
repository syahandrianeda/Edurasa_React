export interface IdentitasKontenPaket{
   
    nama:string,
    start_time:Date,
    end_time?:Date,
    kelas:string,
    dataIdentitas:string,
    durasi:number,
    dataKop?:string,
    showKop:boolean
    showKolom:boolean,
    showIdentitas:boolean,
    showPetunjuk:boolean
    showSebaranTp:boolean
}