import type {  ChangeEventHandler } from "react";
import type { InfoPersonalSiswa } from "~/types/siswa"

type KeyValue={
    key:keyof InfoPersonalSiswa,
    value?:string
    label:string,
}
export const OptionsPropertiesData:KeyValue[] = [
    {
        key     : 'pd_nama',
        label   : 'Nama'
    },
    {
        key     : 'nama_rombel',
        label   : 'Kelas (Rombel)'
    },
    {
        key     : 'jenjang',
        label   : 'Kelas (Jenjang/tingkat)'
    },
    {
        key     : 'nis',
        label   : 'Nomor Induk Siswa'
    },
    {
        key     : 'nisn',
        label   : 'NISN'
    },    
    {
        key     : 'tempat_tanggal_lahir',
        label   : 'Tempat, Tanggal Lahir'
    },
    {
        key     : 'orang_tua',
        label   : 'Orang Tua'
    },
    {
        key     : 'pd_namaayah',
        label   : 'Nama Ayah'
    },
    {
        key     : 'pd_namaibu',
        label   : 'Nama Ibu'
    },
    {
        key     : 'dapo_noseriijazah',
        label   : 'No Seri Ijazah'
    },
    {
        key     : 'no_transkip',
        label   : 'No Seri Transkip'
    }
];
export const OptionsPropertiesDataUI:KeyValue[] = [
    
    {
        key     : 'nama_rombel',
        label   : 'Kelas (Rombel)'
    },
    {
        key     : 'jenjang',
        label   : 'Kelas (Jenjang/tingkat)'
    },
    {
        key     : 'nis',
        label   : 'Nomor Induk Siswa'
    },
    {
        key     : 'nisn',
        label   : 'NISN'
    },    
    {
        key     : 'tempat_tanggal_lahir',
        label   : 'Tempat, Tanggal Lahir'
    },
    {
        key     : 'orang_tua',
        label   : 'Orang Tua'
    },
    {
        key     : 'pd_namaayah',
        label   : 'Nama Ayah'
    },
    {
        key     : 'pd_namaibu',
        label   : 'Nama Ibu'
    },
    {
        key     : 'dapo_noseriijazah',
        label   : 'No Seri Ijazah'
    },
    {
        key     : 'no_transkip',
        label   : 'No Seri Transkip'
    }
];
export const OptionsKeyUserFriends:KeyValue[] = [
    {
        key     : 'nama_rombel',
        label   : 'Kelas (Rombel)'
    },
    {
        key     : 'jenjang',
        label   : 'Kelas (Jenjang/tingkat)'
    },
    {
        key     : 'nis',
        label   : 'Nomor Induk Siswa'
    },
    {
        key     : 'nisn',
        label   : 'NISN'
    },    
    {
        key     : 'tempat_tanggal_lahir',
        label   : 'Tempat, Tanggal Lahir'
    },
    {
        key     : 'orang_tua',
        label   : 'Orang Tua'
    },
    {
        key     : 'pd_namaayah',
        label   : 'Nama Ayah'
    },
    {
        key     : 'pd_namaibu',
        label   : 'Nama Ibu'
    },
    {
        key     : 'dapo_noseriijazah',
        label   : 'No Seri Ijazah'
    },
    {
        key     : 'no_transkip',
        label   : 'No Seri Transkip'
    }
];
type OptionsCheckboxProps={
    property            : string[], 
    handleProperties    : ChangeEventHandler<HTMLInputElement> ,
    keyProperties       : string,
    label               : string
};
export default function OptionsCheckbox({property, handleProperties, keyProperties, label}:OptionsCheckboxProps){
    return (
        <label>
            <input type="checkbox" name="property" checked={property.includes(keyProperties)} value={keyProperties} onChange={handleProperties}/>
            {label}
        </label>
    )
}