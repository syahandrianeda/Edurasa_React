import { KABUPATEN_KOTA } from "~/domain/identitas_aplikasi/identitas-aplikasi";
import { formatTanggalIndonesia } from "~/lib/date-helper";

export type KeteranganTtdTitimangsa = 
    | 'none'
    | 'titimangsa'
    | 'mengetahui';
// type KeteranganJabatanKepsek =
//     | 'useSchool'
//     | 'common'
//     | 'none';
type Props = {
    type:KeteranganTtdTitimangsa,
    titimangsa?:Date
}
export default function KeteranganTitimangsaComp({type, titimangsa}:Props){
    switch(type){
        case 'none':
            return null;
        case 'mengetahui':
            return <p className="text-center">Mengetahui,</p>;
        case 'titimangsa':
            return <p contentEditable={true} suppressContentEditableWarning={true}>{KABUPATEN_KOTA},  {formatTanggalIndonesia(titimangsa ?? new Date())}</p>
        default:
            return null;
    }
}