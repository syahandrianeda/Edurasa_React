import type { detailNilaiSiswaAppType } from "~/types/penilaian/nilai-siswa-app-type";

export default class StrukturResponTagihanBuilder{
    static build(data_respons:detailNilaiSiswaAppType[]){

    }
    static buildMapper(data_respons:detailNilaiSiswaAppType[]){
        for(const respons of data_respons){
            const {respon}=respons
        }
    }
}