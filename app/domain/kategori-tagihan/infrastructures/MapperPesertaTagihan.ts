import NamaSiswa from "~/controllers/data-siswa-controller/forms/fields/nama-siswa";
import AtpMapperBankSoalCollections from "~/domain/atp-mapper/AtpMapperBanSoalCollections";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import getOrCreateMap from "~/lib/getOrCreateMapper";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { SiswaType } from "~/types/siswa";

export type TagihanMapperInMapperSiswaHasTagihanMapper = Map<number, {atpSoalMapper:Map<number, BankSoalAppType[]>, currentTagihan:TagihanHasDataResponse}>
export type MapperPesertaHasTagihanMapperType = Map<number, {namaSiswa:string, rombel:string, tagihanMapper:TagihanMapperInMapperSiswaHasTagihanMapper}>
export default class MapperPesertaTagihan{
    static buildMapperSiswaHasTagihanMapper(data:TagihanHasDataResponse[]):MapperPesertaHasTagihanMapperType{
        // const MapperSiswa = new Map<number, {namaSiswa:string, rombel:string, tagihanMapper:Map<number, TagihanHasDataResponse>}>;
        const MapperSiswa:MapperPesertaHasTagihanMapperType = new Map();
        const collectionPeserta = data.flatMap(m=>m.peserta);
        const MapperPeserta = new Map<number, SiswaType>(collectionPeserta.map(m=>([m.id, m])));

        for(const tagihan of data){
            const {peserta, idbaris, bank_soal_collections} = tagihan;
            const atpHasSoal = AtpMapperBankSoalCollections.build(bank_soal_collections);
            for(const siswa of peserta){
                const currentPeserta = getOrCreateMap(MapperSiswa, siswa.id, ()=>({
                    namaSiswa: siswa.pd_nama,
                    rombel: siswa.nama_rombel,
                    tagihanMapper: new Map()
                }));
                getOrCreateMap(currentPeserta.tagihanMapper, idbaris, ()=>({
                    atpSoalMapper:atpHasSoal,
                    currentTagihan: tagihan
                }))
            }
        }
        return MapperSiswa
    }
}