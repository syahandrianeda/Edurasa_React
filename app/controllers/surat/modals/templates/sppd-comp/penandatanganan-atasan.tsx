
import useDataAtasan, { type AtasanType } from "~/hooks/use-data-atasan";
import { cn } from "~/lib/utils";
import type { SppdAppType } from "~/types/surat/sppd-app-type";
import TandatanganAtasan from "./tanda-tangan-atasan";

interface TtdSppdProps{
    atasan:SppdAppType,
    includeJabatan?:boolean,
    className?:string
}
export default function PenandaTanganAtasan({atasan, includeJabatan=true,className}:TtdSppdProps){
    
    
    return <TandatanganAtasan 
                tgl={atasan.ptk_starttgl} 
                atasanDari={atasan.ptk_jabatan as AtasanType}
                includeJabatan={includeJabatan}
                className={className}
                />
}