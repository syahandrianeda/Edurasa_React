import type { KategoriTagihanType } from "../penilaian/type/KategoriTagihanType";

export default class SwitchKategoriTagihan{
    
    constructor(private readonly namaTagihan:string){}
    
    get kategori():KategoriTagihanType{
        return this.switchTagihan(this.namaTagihan)
    }
    
    switchTagihan(kode:string):KategoriTagihanType{
               switch (kode){
                   case 'Remedial':
                       return 'remedial_pengayaan';
                   case 'Pengayaan':
                       return 'remedial_pengayaan';
                   case 'PTS':
                       return 'mid_semester';
                   case 'PAS':
                       return 'akhir_semester';
                   case 'PAK':
                       return 'akhir_semester';
                   case 'PSAJ':
                       return 'ujian_sekolah';
                   default:
                       return 'harian'
               }
               
           }
}