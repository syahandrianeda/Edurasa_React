
import useDataAtasan, { type AtasanType } from "~/hooks/use-data-atasan";
import { cn } from "~/lib/utils";
import type { SppdAppType } from "~/types/surat/sppd-app-type";


export default function PenandaTanganSppd({atasan, includeJabatan=true,className}:{atasan:SppdAppType, includeJabatan?:boolean, className?:string}){
    // const kepsek = useAppSelector(InstanceRiwayatIdAkun).getAkunAktifInDate(atasan.ptk_starttgl)
    // const atasanPegawai = AtasanPegawai(atasan.ptk_jabatan,kepsek)
    const atasanPegawai = useDataAtasan(atasan.ptk_starttgl, atasan.ptk_jabatan as AtasanType)
    return(
        <div className={cn("flex flex-col justify-between h-36", className)}>
            <p>{includeJabatan ? atasanPegawai.jabatan:''}</p>
            <div className="text-nowrap">
                <p><u><strong>{atasanPegawai.name}</strong></u></p>
                {atasanPegawai.nip}
            </div>
        </div>
    )
}