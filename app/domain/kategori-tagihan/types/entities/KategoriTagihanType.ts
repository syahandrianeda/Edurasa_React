export type KategoriTagihanType = 
    'harian' |
    'mid_semester' |
    'akhir_semester' |
    'remedial_pengayaan' |
    'ujian_sekolah';

export type KategoriAssesmenTagihanApp = {
    [key in KategoriTagihanType]: string
}