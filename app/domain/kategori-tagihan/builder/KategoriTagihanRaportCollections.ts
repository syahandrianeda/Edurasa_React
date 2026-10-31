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

export function nameOfKategoriTagihan(type:KategoriTagihanType):string|null{
    switch(type){
        case 'harian':
            return 'Nilai Harian Siswa';
        case 'mid_semester':
            return 'Nilai Sumatif Tengah Semester';
        case 'akhir_semester':
            return 'Nilai Sumatif Akhir Semester';
        case 'ujian_sekolah':
            return 'Penilaian Sumatif Akhir Jenjang';
        case 'remedial_pengayaan':
            return 'Remedial/Pengayaan';
        default:
            return null
    }
}