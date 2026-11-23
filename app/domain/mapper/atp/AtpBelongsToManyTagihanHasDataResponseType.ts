import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";


export type AtpBelongsToManyTagihanHasDataResponseType = {
    atp_id: number;
    data: TagihanHasDataResponse[];
};
