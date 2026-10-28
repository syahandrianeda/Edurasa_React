import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type"
import getOrCreateMap from "~/lib/getOrCreateMapper"
import type { PublikasiPaketAppType } from "~/types/publikasi-paket-soal/publikasi-paket-app-type"
import type { SiswaType } from "~/types/siswa"

export type MemberOfPublikasiPaket = {
    publikasi_id:number,
    publikasi:TagihanHasDataResponse
    dataSiswa: SiswaType[]
}
export type MemberOfPublikasiPaketMapper = Map<number, {publikasi:TagihanHasDataResponse, dataSiswaMapper:Map<number, SiswaType>}>

export default class MemberOfPublikasiPaketBuilder{
    static build(source:TagihanHasDataResponse[]){

    }
    static buildMapper(source:TagihanHasDataResponse[]):MemberOfPublikasiPaketMapper{
        const mapper:MemberOfPublikasiPaketMapper = new Map();
        for(const tagihan of source){
            const {data_respons, peserta, idbaris} = tagihan;
            const currentTagihan = getOrCreateMap(mapper, idbaris, ()=>({
                publikasi:tagihan,
                dataSiswaMapper:new Map()
            }));
            for(const siswa of peserta){
                getOrCreateMap(currentTagihan.dataSiswaMapper, siswa.id, ()=>siswa)
            }

        }
        return mapper;
    }
}
