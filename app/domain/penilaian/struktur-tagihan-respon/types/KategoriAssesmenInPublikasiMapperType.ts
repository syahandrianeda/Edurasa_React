import type { KategoriTagihanType } from "~/domain/kategori-tagihan/types/entities/KategoriTagihanType";
import type { TagihanAsessmenType, TagihanHasDataResponse } from "../../type/tagihan-assesmen-type";

export type KategoriAssesmenInPublikasiMapperType= Map<KategoriTagihanType,{ dataPublikasiPaket:TagihanAsessmenType[], dataPublikasiPaketWithRespon: TagihanHasDataResponse[]}> 