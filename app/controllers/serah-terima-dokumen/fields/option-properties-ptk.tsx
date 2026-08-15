import type {  ChangeEventHandler } from "react";
import type { UserFriends } from "~/types";
import type { InfoPersonalPtk } from "~/types/akun-sheet";


export type KeyValue={
    key:keyof InfoPersonalPtk,
    value?:string
    label:string,
}
export const OptionsPropertiesDataPtk:KeyValue[] = [
    {
        key     : 'name',
        label   : 'Nama'
    },
    {
        key     : 'nip',
        label   : 'NIP'
    },{
        key     : 'jabatan',
        label   : 'Jabatan di sekolah'
    },{
        key     : 'kelas_ampu',
        label   : 'Kelas Ampu'
    },{
        key     : 'asn',
        label   : 'Status Ptk'
    },
    {
        key     :'gol_ruang',
        label   :'Golongan Ruang'
    },
    {
        key     :'pangkat',
        label   :'Jabatan ASN'
    },
    {
        key     :'pangkat_gol_ruang',
        label   :'Pangkat Gol/Ruang'
    }
];
export const OptionsPropertiesDataPtkUI:KeyValue[] = [
    {
        key     : 'nip',
        label   : 'NIP'
    },{
        key     : 'jabatan',
        label   : 'Jabatan di sekolah'
    },{
        key     : 'kelas_ampu',
        label   : 'Kelas Ampu'
    },{
        key     : 'asn',
        label   : 'Status Ptk'
    },
    {
        key     :'gol_ruang',
        label   :'Golongan Ruang'
    },
    {
        key     :'pangkat',
        label   :'Jabatan ASN'
    },
    {
        key     :'pangkat_gol_ruang',
        label   :'Pangkat Gol/Ruang'
    }
];
type OptionsCheckboxProps={
    property            : (keyof UserFriends)[], 
    handleProperties    : ChangeEventHandler<HTMLInputElement> ,
    keyProperties       : keyof UserFriends,
    label               : string
};
export default function OptionsCheckboxPtk({property, handleProperties, keyProperties, label}:OptionsCheckboxProps){
    return (
        <label>
            <input type="checkbox" name="property" checked={property.includes(keyProperties)} value={keyProperties} onChange={handleProperties}/>
            {label}
        </label>
    )
}