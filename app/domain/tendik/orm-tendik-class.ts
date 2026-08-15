import type { PangkatGolonganAppType } from "~/types/tendik/pangkat-golongan-app-type";
import type { RiwayatAkunAppType } from "~/types/tendik/riwayat-akun-app-type";
import type RiwayatIdAkunClass from "./riwayat-id-akun-class";
import type RiwayatGolonganPangkatClass from "./riwayat-golongan-pangkat";
import type { IdAkunDanPangkat } from "./entities/id-akun-dan-pangkat";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type { UserPtk } from "~/types";

export default class OrmTendik{
    constructor(
        private readonly IdAkun:RiwayatIdAkunClass,
        private readonly RiwayatJabatan:RiwayatGolonganPangkatClass
    ){}
    
    getIdDanPangkatCurrent(tgl:Date):IdAkunDanPangkat[]{
        const frends = getSessionApp<UserPtk>()?.friends;
        const akun = this.IdAkun.getAkunAktifInDate(tgl);
        const riwayat = this.RiwayatJabatan.getPangkatGolonganAktifInDate(tgl);
        const result:IdAkunDanPangkat[] = []
        akun.forEach(item=>{
            const currentRiwayatPangkat = riwayat.find(s=>s.user_id === item.user_id);
            const mainAkun = frends?.find(s=>s.id === item.user_id);
            const riwayatPangkat = riwayat.filter(s=>s.user_id === item.user_id);
            const dataItem:IdAkunDanPangkat = {
                ...mainAkun,
                idbaris                     : item.idbaris,
                nama_guru                   : item.nama_guru,
                /** user_id seharusnya sama dengan id pada akun, tapi jika parameter tgl diubah, id mungkin saja beda 
                 * hal ini karena `id` ptk tertentu digunakan ulang oleh `ptk` yang lain. conothnya: `Imron Rosadi` dengan `Neneng Yungingsih`, dan `A. Dasuki` dan `Sapuroh`. 
                */
                user_id                     : item.user_id,
                /** nip di sini diambil dari riwayat, mungkin saja beda dengan nip dari akun.
                 * nip dari akun menggunakan key `guru_nip`
                 */
                nip                         : mainAkun?.nip ?? item.nip,
                /**jabatan menimpa `jabatan` di akun; */
                jabatan                     : item.jabatan,
                start_at_school             : item.start_tgl,
                end_at_school               : item.end_tgl,
                asn                         : item.asn,
                duk                         : item.duk,
                current_golongan_pangkat    : currentRiwayatPangkat,
                riwayat_golongan_pangkat    : riwayatPangkat
            }
            result.push(dataItem);
        });
        
        return result.sort((a,b)=>a.duk! - b.duk!)
    }
    getDetailPtkInDate(tgl:Date, id:number){
        const check = this.getIdDanPangkatCurrent(tgl);
        return check?.find(s=>s.user_id === id)
    }
}