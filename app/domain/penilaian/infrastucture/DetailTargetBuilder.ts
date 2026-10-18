import type { SiswaType } from "~/types/siswa";
import type { DetailTarget } from "../type/DetailTarget";
import type { SiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif";
import type { TagihanAsessmenType } from "../type/tagihan-assesmen-type";
import { getParseDateYYYYMMMDD } from "~/lib/date-helper";
import { getNumberFromString } from "~/lib/get-number";
import type { TypePaketSoal } from "~/domain/paket-soal/entities/type-paket";


export default class DetailTargetBuilder{
    static build(allSiswa:SiswaWithValidation[], tagihanAsessmen:TagihanAsessmenType, currentRombel:string):DetailTarget[]{
        const result:DetailTarget[]=[];
        const targetTYpe:TypePaketSoal = tagihanAsessmen.target_type;
        const targetPerson:number[] = tagihanAsessmen.target_person;
        for(const rombel of tagihanAsessmen.target_rombel){
            // const jenjang = getNumberFromString(rombel);
            const current_rombel:boolean =  rombel === currentRombel;
            const siswaInCurrentDate = this.siswaExistInBetweenDate(allSiswa, tagihanAsessmen.end_time, rombel);
            const dataSiwaWithoutValidation = siswaInCurrentDate.map(m=>m.data);
            const data_siswa_invalid = siswaInCurrentDate.filter(s=>!s.validation.isValid)
            if(targetTYpe === 'rombel'){
                const detail:DetailTarget = {
                    rombel,
                    current_rombel,
                    data_siswa: dataSiwaWithoutValidation,
                    data_siswa_invalid,
                    count: dataSiwaWithoutValidation.length


                }
                result.push(detail)
            }else{
                const onlyTargetPerson = siswaInCurrentDate.filter(s=>targetPerson.includes(s.data.id));//targetPerson.map(siswaId=> siswaInCurrentDate.find(s=>s.data.id === siswaId)!)
                const onlyTargetPersonWithoutValidation = onlyTargetPerson.map(m=>m.data);
                const data_siswa_invalid = onlyTargetPerson.filter(s=>!s.validation.isValid)
                const detail:DetailTarget = {
                    rombel,
                    current_rombel,
                    data_siswa: onlyTargetPersonWithoutValidation,
                    count: onlyTargetPersonWithoutValidation.length,
                    data_siswa_invalid
                }
                result.push(detail);
            }
        }
        return result;
    }
    private static siswaExistInBetweenDate(siswa:SiswaWithValidation[], end_time:Date, rombel:string):SiswaWithValidation[]{
        return siswa.filter(({data, validation})=> {
                    
                    const checkIn = getParseDateYYYYMMMDD(data.masuk_tgl);
                    const checkOut =getParseDateYYYYMMMDD(data.keluar_tgl) === 0 ? Infinity: getParseDateYYYYMMMDD(data.keluar_tgl);
                    const current = getParseDateYYYYMMMDD(end_time)
                    return (checkIn <= current && checkOut >= current && data.nama_rombel === rombel)
                    
                })
    }
}