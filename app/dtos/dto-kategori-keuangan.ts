import type { KategoriKeuanganAppType } from "~/types/tabungan/kategori-keuangan-type";
import { resolveNumber, resolveString } from "./_resolver";

export default class DtoKategoriKeuangan{
    static fromSheet (dto:Record<string, any>):KategoriKeuanganAppType{
        return {
            idbaris: resolveNumber(dto.idbaris),
            user_id: resolveNumber(dto.user_id),
            nama_user:resolveString(dto.nama_user),
            kategori: resolveString(dto.kategori),
            akses_kelas: dto.akses_kelas === ""?[] : dto.akses_kelas.toString().split(',').map((m:string)=>resolveString(m)),
        }
    }

    static toArray(dto:Record<string, any>[]):KategoriKeuanganAppType[]{
        return dto.map(DtoKategoriKeuangan.fromSheet)
    }
}