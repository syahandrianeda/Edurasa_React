import type { PangkatGolonganAppType } from "~/types/tendik/pangkat-golongan-app-type";
import type { RiwayatAkunAppType } from "~/types/tendik/riwayat-akun-app-type";

export default class RiwayatIdAkunClass{
    
    constructor(
        private readonly riwayatTendikApp: RiwayatAkunAppType[] 
        // private readonly pangkatGolongan:PangkatGolonganAppType[]
    ){ }
    

    getAkunInDate(user_id:number, date:Date): RiwayatAkunAppType|undefined{
        return this.riwayatTendikApp.find((akun)=> {
            const start = akun.start_tgl;
            const end = akun.end_tgl;
            const akunUserId = akun.user_id;
            
            /** untuk para user yang tidak aktif */
            if(start && end){
                return start <= date && end >= date && akunUserId === user_id;
            }
            return akunUserId === user_id;

        });
    }
    getAkunAktifInDate( date:Date): RiwayatAkunAppType[]{
        return this.riwayatTendikApp.filter((akun)=> {
            const start = akun.start_tgl;
            const end = akun.end_tgl;
            
            
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