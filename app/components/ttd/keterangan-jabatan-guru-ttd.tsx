import type { UserPtk } from "~/types";


export type KeteranganJabatanGuru =
    | 'jabatan'
    | 'none';
type Props = {
    jabatan:UserPtk['jabatan'];
    kode_mapel_ampu:UserPtk['kode_mapel_ampu']
    type?:KeteranganJabatanGuru,
}
export default function KeteranganJabatanGuruTtdComp({type, jabatan, kode_mapel_ampu}:Props){
    let jabatanString:string = ''
    
    if(jabatan === kode_mapel_ampu){
        jabatanString = jabatan ?? '';
    }else{
        jabatanString = jabatan + ' ' + kode_mapel_ampu;
    }

    switch(type){
        case 'none':
            return null;
        case 'jabatan':
            return <p className="text-center">{jabatanString}</p>;
        default:
            return null;
    }
}