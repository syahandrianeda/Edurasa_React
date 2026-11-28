import { KABUPATEN_KOTA } from "~/domain/identitas_aplikasi/identitas-aplikasi"
import ImgStempelCom from "./img-stempel-comp"
import ImgTtdKepsek from "./img-ttd-kepsek"
import { formatTanggalIndonesia } from "~/lib/date-helper"
import { getSessionApp } from "~/infrastructures/session-storage/app-session"
import type { UserPtk } from "~/types"
import { cn } from "~/lib/utils"
import KeteranganTitimangsaComp, { type KeteranganTtdTitimangsa } from "./keterangan-titimangsa-ttd.-comp"
import KeteranganJabatanKepsekTtdComp, { type KeteranganJabatanKepsek } from "./keterangan-jabatan-kepsek-ttd-comp"


type Props = {
    showStempel:boolean,
    showTtd:boolean,
    typeTitimangsa:KeteranganTtdTitimangsa,
    typeJabatan?:KeteranganJabatanKepsek,
    titimangsa?:Date,
    className?:string
}
export default function SelTtdKepsek({showStempel, showTtd, typeTitimangsa, typeJabatan='useSchool', titimangsa, className}:Props){
    const user = getSessionApp<UserPtk>();
    console.log({user})
    return (
        <div className={cn("flex flex-col justify-between w-full text-center relative min-h-42", className)}>
            {
                showStempel && ( <ImgStempelCom className="absolute top-0 -left-8 w-50"/> ) }

            {
                showTtd && ( <ImgTtdKepsek className="absolute top-5 left-0 translate-x-1 w-80"/> )
            }

            <div className="leading-5">
                {/* <p contentEditable={true} suppressContentEditableWarning={true}>{KABUPATEN_KOTA},  {formatTanggalIndonesia(titimangsa ?? new Date())}</p> */}
                <KeteranganTitimangsaComp type={typeTitimangsa} titimangsa={titimangsa ?? new Date()}/>
                <KeteranganJabatanKepsekTtdComp type={typeJabatan}/>
            </div>
            <div className="leading-5">
                <p className="font-bold underline mb-0" contentEditable={true} suppressContentEditableWarning={true}>{user?.kepsek_name ?? '-'}</p>
                <p className="text-base" contentEditable={true} suppressContentEditableWarning={true}>NIP. {user?.kepsek_nip ?? ''}</p>
            </div>
        </div>
    )
}