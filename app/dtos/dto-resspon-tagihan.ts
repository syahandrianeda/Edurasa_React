import type { KategoriTagihanType } from "~/domain/penilaian/infrastucture/KategoriTagihanType";
import type { NilaiSiswaAppType, RisponsePenilaianSiswa } from "~/types/penilaian/nilai-siswa-app-type";
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type";
import { resolveDate } from "./_resolver";
import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";

export default class DtoResponTagihanSiswa{
    static fromSheetToApp(data:NilaiSiswaSheetType):NilaiSiswaAppType{
        const respon = DtoResponTagihanSiswa.creatResponAppFromSheet(data);
        return {
            idbaris         : Number(data.idbaris),//number,	
            siswa_id        : Number(data.siswa_id),//number,
            publikasi_id    : Number(data.publikasi_id),//number,
            jenis_tagihan   : String(data.jenis_tagihan),//JenisTagihanPenilaiantype['kode'],
            tipe_assesmen   : String(data.tipe_assesmen) as KategoriTagihanType,
            sumber_respon   : String(data.sumber_respon),
            rombel          : String(data.rombel),//string,
            start_time      : resolveDate(data.start_time),//Date,
            end_time        : resolveDate(data.end_time),
            respon          
        }
    }
    static creatResponAppFromSheet(data:NilaiSiswaSheetType):RisponsePenilaianSiswa[]{
        const result:RisponsePenilaianSiswa[]=[];
        const keyPrefix = ListBentukSoal.map(m=>m.name);
        let index = 0;
        for(const key in data){
            
            console.log({keyPrefix, key})
            /** key itu mengandung prefix 'pg_', 'isian_singkat_' */
            if(keyPrefix.some(item=>key.includes(item))){
                let obj:RisponsePenilaianSiswa = Object.create(null);
                const split = key.split("_");
                
                const number = split.pop()
                obj.index = index;
                obj.no_soal = Number(number);
                obj.respon = data[key] as string;
                obj.bentuk_soal = split.join('_')

                result.push(obj);
                index++;
            }
        }

        return result;
    }
    static arrayFromSheetToApp(data:NilaiSiswaSheetType[]):NilaiSiswaAppType[]{
        return data.map(this.fromSheetToApp);
    }

}