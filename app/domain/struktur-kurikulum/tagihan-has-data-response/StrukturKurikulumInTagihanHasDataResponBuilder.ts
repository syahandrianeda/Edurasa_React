import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import type { StrukturKurikulumMapelMapperType, StrukturKurikulumMapelType, StrukturKurikulumMapelWithSlotType } from "~/domain/trees-struktur-kurikulum/struktur-kurikulum-type";
import StrukturKurikulumInKoleksiBankSoalBuilder from "../koleksi-bank-soal/StrukturKurikulumInKoleksiBankSoalBuilder";

export default class StrukturKurikulumInTagihanHasDataResponBuilder{

    static build(data:TagihanHasDataResponse[]):StrukturKurikulumMapelType[]{
         const bankSoal = data.flatMap(m=>m.bank_soal_collections);
        return StrukturKurikulumInKoleksiBankSoalBuilder.build(bankSoal)   
    }

    static buildWithSlot(data:TagihanHasDataResponse[]):StrukturKurikulumMapelWithSlotType[]{
         const bankSoal = data.flatMap(m=>m.bank_soal_collections);
        return StrukturKurikulumInKoleksiBankSoalBuilder.buildWithSlot(bankSoal)   
    }

    static buildMapper(data:TagihanHasDataResponse[]):StrukturKurikulumMapelMapperType{
        const bankSoal = data.flatMap(m=>m.bank_soal_collections)
        return StrukturKurikulumInKoleksiBankSoalBuilder.buildMapper(bankSoal)
    }
}