import type { PangkatGolonganAppType } from "~/types/tendik/pangkat-golongan-app-type";
import type { RiwayatAkunAppType } from "~/types/tendik/riwayat-akun-app-type";
import type RiwayatIdAkunClass from "./riwayat-id-akun-class";
import type RiwayatGolonganPangkatClass from "./riwayat-golongan-pangkat";
import type { IdAkunDanPangkat } from "./entities/id-akun-dan-pangkat";

export default class OrmTendik{
    constructor(
        private readonly IdAkun:RiwayatIdAkunClass,
        private readonly RiwayatJabatan:RiwayatGolonganPangkatClass
    ){}
    
    getIdDanPangkatCurrent(tgl:Date):IdAkunDanPangkat[]{
        const akun = this.IdAkun.getAkunAktifInDate(tgl);
        const riwayat = this.RiwayatJabatan.getPangkatGolonganAktifInDate(tgl);
        const result:IdAkunDanPangkat[] = []
        akun.forEach(item=>{
            const currentRiwayatPangkat = riwayat.find(s=>s.user_id === item.user_id);
            const riwayatPangkat = riwayat.filter(s=>s.user_id === item.user_id);
            const dataItem:IdAkunDanPangkat = {
                idbaris                     : item.idbaris,
                nama_guru                   : item.nama_guru,
                user_id                     : item.user_id,
                nip                         : item.nip,
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
}