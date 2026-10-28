import type { KategoriTagihanType } from "../types/entities/KategoriTagihanType";

export function koleksiKategoriTagihanRaport(jenjang:number, semester:number):KategoriTagihanType[]{
    if(jenjang === 6 && semester === 2){
        return [
            'harian',
            'mid_semester',
            'ujian_sekolah'
            //untuk remedial_pengayaan, adalah perbaikan untuk tipe 'harian'
        ]
    }
    return [
        'harian',
        'mid_semester',
        'akhir_semester'
    ]
}