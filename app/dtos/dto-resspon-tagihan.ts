import type { KategoriTagihanType } from "~/domain/penilaian/type/KategoriTagihanType";
import type { DataSkorMapel, KeyScore, NilaiSiswaAppType, RisponsePenilaianSiswa, SkorKdResponSiswaType } from "~/types/penilaian/nilai-siswa-app-type";
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type";
import { resolveDate } from "./_resolver";
import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";

export default class DtoResponTagihanSiswa{
    static needValidasi(bentukSoal: string[], respon: string): boolean {
        if(bentukSoal.every(s=>s === 'pg')){
            return false
        }else{
            return respon === 'siswa'

        }

        
    }
    static fromSheetToApp(data:NilaiSiswaSheetType):NilaiSiswaAppType{
        
        const respon = DtoResponTagihanSiswa.creatResponAppFromSheet(data);
        const skor_kd = DtoResponTagihanSiswa.createSkorKd(data.skor_kd);
        const bentukSoalArray = respon.map(m=>m.bentuk_soal);
        const needValidate = DtoResponTagihanSiswa.needValidasi(bentukSoalArray, data.sumber_respon) ;//data.sumber_respon === 'siswa'? respon.every(m=>m.bentuk_soal==='pg'):true
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
            respon,
            skor_kd,
            needValidate
        }
    }
    private static createSkorKd(data:string):SkorKdResponSiswaType[]{
        const result = DtoResponTagihanSiswa.parsedJson(data);
        
        if (!result || typeof result !== "object" || Array.isArray(result)) return [];
        const skor:SkorKdResponSiswaType[]=[]
        const mapelMap = new Map<string, DataSkorMapel[]>();
        for (const [key, rawValue] of Object.entries(result)) {
            const value = rawValue as SkorKdResponSiswaType;
            const kode_mapel = key.trim().split('_')[0];
            const atp_id = Number(key.trim().split('_')[1]);
            if(!mapelMap.has(kode_mapel)){
                mapelMap.set(kode_mapel, [{
                    atp_id,
                    skor: Number(value),
                }])
                continue;
            }
            const nextMap = mapelMap.get(kode_mapel);
            nextMap?.push({atp_id, skor: Number(value)})
        }
        
        return [...mapelMap.entries()].map(([kode_mapel, valueMap])=>({
            kode_mapel,
            data:valueMap
        }))
        // return result;
    }
    private static parsedJson(value:string):unknown{
        
        if (!value?.trim()) {
            return
            // throw new Error(
            //     `tidak boleh kosong.`
            // );
        }

        try {
            return JSON.parse(value);
        } catch (error) {
            return;
            // throw new Error(
            //     ` bukan JSON yang valid.`,
            //     {
            //         cause: error
            //     }
            // );
        }

    }
    private static creatResponAppFromSheet(data:NilaiSiswaSheetType):RisponsePenilaianSiswa[]{
        const result:RisponsePenilaianSiswa[]=[];
        const keyPrefix = ListBentukSoal.map(m=>m.name);
        const keySkor:KeyScore[]=[]
        let index = 0;
        for(const key in data){
            
            
            /** key itu mengandung prefix 'pg_', 'isian_singkat_' */
            if(keyPrefix.some(item=>key.includes(item))){
                let obj:RisponsePenilaianSiswa = Object.create(null);
                /** misal key = "isian_singkat_1" */
                const split = key.split("_");
                /** split dengan denominator "_", maka akan menghasilkan array: ['isian', 'singkat', '1'] */
                /** ambil yang terakhir, berarti mengambil= '1' */
                const number = split.pop()
                obj.index = index;
                obj.no_prefix = Number(number);
                obj.respon = data[key] as string;
                /** split saat ini mengalami mutasi, sehingga yang tersisa = ['isian', 'singkat'] */
                obj.bentuk_soal = split.join('_')

                result.push(obj);
                index++;
            }

            // if(key.includes('skor_')){
           
        }

        for(const key in data){
             if (/^skor_\d+$/.test(key)) {
                if(data[key]==="") continue;
                const spliting = key.replace('skor_','');
                const indexSkor = Number(spliting);
                const skor = Number(data[key])
                keySkor.push({index:indexSkor,skor })

            }
        }

        const finalResult = result.map(m=>{
            const found= keySkor.find(s=>s.index === m.index);
            if(found){
                return {...m, skor:found.skor}
            }
            return m
        })
        return finalResult;
    }
    static arrayFromSheetToApp(data:NilaiSiswaSheetType[]):NilaiSiswaAppType[]{
        return data.map(this.fromSheetToApp);
    }

}