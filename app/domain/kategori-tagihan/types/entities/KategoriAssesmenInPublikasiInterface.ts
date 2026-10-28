import type { KategoriTagihanType } from "~/domain/kategori-tagihan/types/entities/KategoriTagihanType";
import type { TagihanAsessmenType, TagihanHasDataResponse } from "../../../penilaian/type/tagihan-assesmen-type";

export interface KategoriAssesmenInPublikasiInterface{
    type: KategoriTagihanType,
    dataPublikasiPaket:TagihanAsessmenType[]
    dataPublikasiPaketWithRespon: TagihanHasDataResponse[]
}