import type { AtasanPegawaiType } from "~/domain/tendik/atasan-pegawai"
import useDataAtasan, { type AtasanType } from "~/hooks/use-data-atasan"
import { cn } from "~/lib/utils"

export type TandatanganAtasanProps={
    tgl:Date, 
    atasanDari?:AtasanType
    className?:string
    includeJabatan?:boolean
}
export default function TandatanganAtasan({tgl, atasanDari='Guru Kelas', className, includeJabatan=true}:TandatanganAtasanProps){
    const atasanPegawai = useDataAtasan(tgl, atasanDari)
    return (
        <div className={cn("flex flex-col justify-between min-w-1/2 h-36", className)}>
            <p className="text-nowrap">{includeJabatan ? atasanPegawai.jabatan:''}</p>
            <div className="text-nowrap">
                <p><u><strong>{atasanPegawai.name}</strong></u></p>
                <span>
                {atasanPegawai.nip}
                </span>
            </div>
        </div>
    )
}