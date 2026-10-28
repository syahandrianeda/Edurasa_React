import getOrCreateMap from "~/lib/getOrCreateMapper";
import type { TagihanHasDataResponse } from "../../penilaian/type/tagihan-assesmen-type";
import type { KategoriAssesmenInPublikasiInterface } from "../types/entities/KategoriAssesmenInPublikasiInterface";
import type { KategoriAssesmenInPublikasiMapperType } from "../../penilaian/struktur-tagihan-respon/types/KategoriAssesmenInPublikasiMapperType";
import dtoTagihanAssesmenTypeFromTagihanHasDataRespon from "../../penilaian/struktur-tagihan-respon/infrastructure/dtoTagihanAssesmenTypeFromTagihanHasDataRespon";

export default class KategoriAsessmenInPublikasiBuilder{
    static build(data:TagihanHasDataResponse[]):KategoriAssesmenInPublikasiInterface[]{
        const mapperKategoriAssemen = this.buildMapper(data);
        return [...mapperKategoriAssemen.entries()].map(([type,koleksi])=>({
            type,
            dataPublikasiPaket: koleksi.dataPublikasiPaket,
            dataPublikasiPaketWithRespon: koleksi.dataPublikasiPaketWithRespon
        }))
    }
    static buildMapper(data:TagihanHasDataResponse[]):KategoriAssesmenInPublikasiMapperType{
        const result:KategoriAssesmenInPublikasiMapperType = new Map();
        for(const tagihan of data){
            const type = tagihan.tipe_assesmen;
            const currentType = getOrCreateMap(result, type,()=>({
                dataPublikasiPaket:[],
                dataPublikasiPaketWithRespon:[]
            }));
            const dataTagihanAssesmen = dtoTagihanAssesmenTypeFromTagihanHasDataRespon.fromTagihanHasDataResponse(tagihan);
            currentType.dataPublikasiPaket.push(dataTagihanAssesmen);;
            currentType.dataPublikasiPaketWithRespon.push(tagihan)
        }
        return result;
    }
}