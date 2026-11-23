import type { KategoriAssesmenTagihanApp, KategoriTagihanType } from "../types/entities/KategoriTagihanType";

export const KategoriAsseemenApp:KategoriAssesmenTagihanApp = {
    harian: 'Nilai Harian Siswa',
    mid_semester: 'Nilai Sumatif Tengah Semester',
    akhir_semester: 'Nilai Sumatif Akhir Semester',
    ujian_sekolah: 'Penilaian Sumatif Akhir Jenjang',
    remedial_pengayaan: 'Remedial/Pengayaan'
}

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
            return KategoriAsseemenApp.harian;//'Nilai Harian Siswa';
        case 'mid_semester':
            return KategoriAsseemenApp.mid_semester;//'Nilai Sumatif Tengah Semester';
        case 'akhir_semester':
            return KategoriAsseemenApp.akhir_semester;//'Nilai Sumatif Akhir Semester';
        case 'ujian_sekolah':
            return KategoriAsseemenApp.ujian_sekolah ;//Penilaian Sumatif Akhir Jenjang';
        case 'remedial_pengayaan':
            return KategoriAsseemenApp.remedial_pengayaan;//Remedial/Pengayaan';
        default:
            return null
    }
}

