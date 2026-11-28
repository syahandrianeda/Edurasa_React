import { KABUPATEN_KOTA } from "~/domain/identitas_aplikasi/identitas-aplikasi"
import ImgStempelCom from "./img-stempel-comp"
import ImgTtdKepsek from "./img-ttd-kepsek"
import { formatTanggalIndonesia } from "~/lib/date-helper"
import { getSessionApp } from "~/infrastructures/session-storage/app-session"
import type { UserPtk } from "~/types"
import { cn } from "~/lib/utils"
import type { KeteranganTtdTitimangsa } from "./keterangan-titimangsa-ttd.-comp"
import KeteranganTitimangsaComp from "./keterangan-titimangsa-ttd.-comp"
import KeteranganJabatanGuruTtdComp from "./keterangan-jabatan-guru-ttd"
import ImgTtdGuru from "./img-ttd-guru"

type Props = {
    showTtd:boolean,
    typeTitimangsa:KeteranganTtdTitimangsa,
    namaGuru:UserPtk['name'],
    nipGuru: UserPtk['nip']
    jabatan:UserPtk['jabatan']
    id_ttd:UserPtk['id_ttd']
    kode_mapel_ampu:UserPtk['kode_mapel_ampu']
    titimangsa?:Date,
    className?:string
}
export default function SelTtdGuru({showTtd, typeTitimangsa, namaGuru, nipGuru, id_ttd,  jabatan, kode_mapel_ampu, titimangsa, className}:Props){
    
    return (
        <div className={cn("flex flex-col justify-between w-full text-center relative min-h-42", className)}>
            {
                showTtd && ( <ImgTtdGuru idUrl={id_ttd} className="absolute top-0  border  left-1/6  w-80"/> )
            }
            <div className={cn('leading-5', typeTitimangsa === 'none'?'pt-5':'')}>
                <KeteranganTitimangsaComp type={typeTitimangsa} titimangsa={titimangsa}/>
                <KeteranganJabatanGuruTtdComp type="jabatan" jabatan={jabatan} kode_mapel_ampu={kode_mapel_ampu}/>

                {/* {
                    showTitimangsa && <p contentEditable={true}>{KABUPATEN_KOTA},  {formatTanggalIndonesia(new Date())}</p>
                }
                <p>{jabatan}</p> */}
            </div>
            <div className="leading-5">
                <p className="font-bold underline mb-0">{namaGuru}</p>
                {
                    nipGuru === ''? (
                        <p className="text-base text-center">-</p>
                    ):(
                        <p className="text-base">NIP. {nipGuru}</p>
                    )
                }
            </div>
        </div>
    )
}