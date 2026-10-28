
import type { SppdAppType } from "~/types/surat/sppd-app-type";
import TandatanganAtasan from "./tanda-tangan-atasan";

interface TtdSppdProps{
    atasan:SppdAppType,
    includeJabatan?:boolean,
    className?:string
}
export default function PenandaTanganSppd({atasan, includeJabatan=true,className}:TtdSppdProps){
    
    
    return <TandatanganAtasan 
                tgl={atasan?.ptk_starttgl} 
                // atasanDari={atasan.ptk_jabatan as AtasanType}
                atasanDari={'Guru Kelas'}
                includeJabatan={includeJabatan}
                className={className}
                />
}