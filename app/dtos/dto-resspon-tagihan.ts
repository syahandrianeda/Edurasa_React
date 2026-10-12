import type { KategoriTagihanType } from "~/domain/penilaian/type/KategoriTagihanType";
import type { DataSkorMapel, KeyScore, NilaiSiswaAppType, SkorKdResponSiswaType } from "~/types/penilaian/nilai-siswa-app-type";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
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
        
        const bentukSoal = new Map<string,RisponsePenilaianSiswa[]>()
        for(const key in data){
            /** key itu mengandung prefix 'pg_', 'isian_singkat_' */
            if(keyPrefix.some(item=>key.includes(item))){
                let obj:RisponsePenilaianSiswa = Object.create(null);
                /** misal key = "isian_singkat_1" */
                const split = key.split("_");
                /** split dengan denominator "_", maka akan menghasilkan array: ['isian', 'singkat', '1'] */
                /** ambil yang terakhir, berarti mengambil= '1' */
                const number = split.pop();
                const no = Number(number);
                const bentuk_soal = split.join('_');
                // obj.index = index;
                obj.index = (no-1);
                obj.no_prefix = no
                // obj.no_prefix = Number(number);
                obj.respon = data[key] as string;
                /** split saat ini mengalami mutasi, sehingga yang tersisa = ['isian', 'singkat'] */
                obj.bentuk_soal = bentuk_soal;

                // result.push(obj);
                if(!bentukSoal.has(bentuk_soal)){
                    bentukSoal.set(bentuk_soal, [])
                }
                
                bentukSoal.get(bentuk_soal)?.push(obj);
            }
        };

        /** perbaiki index secara global; */
        let index = 0;
        for(const [bentuk_soal, respon] of bentukSoal.entries()){
            respon.sort((a, b)=>a.no_prefix - b.no_prefix)
            for(const itemRespon of respon){
                const newRespon = {...itemRespon, index}
                result.push(newRespon)
                index++;
            }
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
            // const found= keySkor[m.index]
            if(found){
                return {...m, skor:found.skor}
            }
            return m
        }).sort((a,b)=>a.index - b.index);

        return finalResult;
    }
    static arrayFromSheetToApp(data:NilaiSiswaSheetType[]):NilaiSiswaAppType[]{
        return data.map(this.fromSheetToApp);
    }

}