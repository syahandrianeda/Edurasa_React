import type { PangkatGolonganAppType } from "~/types/tendik/pangkat-golongan-app-type";

export default class RiwayatGolonganPangkatClass{
    
    constructor(
        private readonly riwayatGolonganApp: PangkatGolonganAppType[]
    ){ }
    

    getPangkatGolonganInDate(user_id:number, date:Date): PangkatGolonganAppType|undefined{
        return this.riwayatGolonganApp.find((akun)=> {
            const start = akun.start_at;
            const end = akun.end_at;
            const akunUserId = akun.user_id;
            
            /** untuk para user yang tidak aktif */
            if(start && end){
                return start <= date && end >= date && akunUserId === user_id;
            }
            return akunUserId === user_id;

        });
    }
    getPangkatGolonganAktifInDate( date:Date): PangkatGolonganAppType[]{
        return this.riwayatGolonganApp.filter((akun)=> {
            const start = akun.start_at;
            const end = akun.end_at;
            
            
            /** untuk para user yang tidak aktif */
            if(start && end){
                return start <= date && end >= date 
            }
            if(end){
                return end >= date;
            }
            return start! <= date || end! >= date 

        });
    }
}