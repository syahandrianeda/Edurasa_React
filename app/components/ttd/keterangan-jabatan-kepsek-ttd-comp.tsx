import { UPTD_NAMASEKOLAH } from "~/domain/identitas_sekolah/identitas-sekolah";


export type KeteranganJabatanKepsek =
    | 'useSchool'
    | 'common'
    | 'none';
type Props = {
    type?:KeteranganJabatanKepsek,
}
export default function KeteranganJabatanKepsekTtdComp({type}:Props){
    switch(type){
        case 'none':
            return null;
        case 'useSchool':
            return <p className="text-center">Kepala {UPTD_NAMASEKOLAH}</p>;
        case 'common':
            return <p className="text-center">Kepala Sekolah</p>
        default:
            return null;
    }
}