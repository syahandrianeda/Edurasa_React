export interface AtpKurikulumType {
    idbaris:number,
    foreignkey_elemencp:number,
    foreignkey_tp:number,
    atp:string,
    kelas:number[],
    profilpancasila?:string,
    penjelasan_profil?:string,
    status?:string

}
export interface AtpKurikulumSheetType {
    idbaris:number,
    foreignkey_elemencp:number,
    foreignkey_tp:number,
    atp:string,
    kelas:string,
    profilpancasila?:string,
    penjelasan_profil?:string,
    status?:string
    // fase:string

}