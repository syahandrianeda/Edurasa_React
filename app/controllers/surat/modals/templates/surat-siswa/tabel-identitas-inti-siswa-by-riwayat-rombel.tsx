import { useCallback, type ReactNode } from "react";
import type { SiswaType } from "~/types/siswa";

interface TabelIdentitasIntiSiswaProps{
    data:SiswaType, 
    tgl:Date
    komponenIdentitas?:KeyIdentitasInti[]
}
export type KeyIdentitasInti =
    | 'nama'
    | 'ttl'
    | 'nis'
    | 'nisn'
    | 'kelas'
    | 'orang_tua'
    | 'ayah'
    | 'ibu'
    | 'awal_kelas'
    ;

;
export interface IdentitasIntiSiswaType{
    key:KeyIdentitasInti,
    label:string,
    labelShort:string,
    value:(data:SiswaType)=>ReactNode
}

export const initialIdentitasInti:IdentitasIntiSiswaType[]=[
    {
        key:'nama',
        label:'Nama Lengkap',
        labelShort:'Nama',
        value:(data)=>data.pd_nama
    },
    {
        key:'ttl',
        label:'Tempat, tanggal lahir',
        labelShort:'Tempat, tanggal lahir',
        value:(data)=>`${data.pd_tl.toLowerCase()}, ${data.pd_tanggallahir.toLocaleDateString('id-ID', {dateStyle:'long'})}`
    },
    {
        key:'kelas',
        label:'Kelas',
        labelShort:'Kelas',
        value:(data)=>data.nama_rombel
    },
    {
        key:'nis',
        label:'Nomor Induk Siswa',
        labelShort:'NIS',
        value:(data)=>data.nis
    },
    {
        key:'nisn',
        label:'Nomor Induk Siswa Nasional',
        labelShort:'NISN',
        value:(data)=>data.nisn
    },
    {
        key:'orang_tua',
        label:'Nama Orang Tua',
        labelShort:'Nama Orang Tua',
        value:(data)=>(<ul className="list-disc list-inside">
                            <li className="list-item capitalize">
                                Ayah : {data.pd_namaayah.toLowerCase()}
                            </li>
                            <li className="list-item capitalize">
                                Ibu : {data.pd_namaibu.toLowerCase()}
                            </li>
                        </ul>)
    },
    {
        key:'ayah',
        label: 'Nama Ayah',
        labelShort: 'Nama Ayah',
        value: (data)=>data.pd_namaayah
    },
    {
        key:'ibu',
        label: 'Nama Ibu',
        labelShort: 'Nama Ibu',
        value: (data)=>data.pd_namaibu
    },
    {
        key:'awal_kelas',
        label: 'Diterima di kelas',
        labelShort: 'Diterima di kelas',
        value: (data)=>data.awal_kelas
    }

]
export default function TabelIdentitasIntiSiswaByTgl({data,komponenIdentitas=['nama','ttl','nis','nisn','orang_tua'], tgl}:TabelIdentitasIntiSiswaProps){
    const findKomponen = useCallback((key:KeyIdentitasInti)=>{
        const found = initialIdentitasInti.find(s=>s.key === key);
        if(found){
            return found
        }
        return null;
    },[])
    return (
        <table>
            <tbody>
                {
                    komponenIdentitas.map((m, i)=>{
                        const konten = findKomponen(m);
                        if(!konten) return;
                        return (
                            <tr key={m}>
                                <td className="pe-2 align-top">{konten.label}</td>
                                <td className="pe-2 align-top">:</td>
                                <td className="pe-2 capitalize align-top">{konten.value(data)}</td>
                            </tr>
                            )
                    }
                        
                    )
                }
            </tbody>
        </table>
    )
}
/**
 * <tr>
                    <td className="pe-2">Nama</td>
                    <td className="pe-2">:</td>
                    <td className="pe-2">{data.pd_nama}</td>
                </tr>
                <tr>
                    <td className="pe-2">Tempat, tanggal lahir</td>
                    <td className="pe-2">:</td>
                    <td className="pe-2 capitalize">{data.pd_tl.toLowerCase()}, {data.pd_tanggallahir.toLocaleDateString('id-ID', {dateStyle:'long'})}</td>
                </tr>
                <tr>
                    <td className="pe-2">Nomor Induk Siswa</td>
                    <td className="pe-2">:</td>
                    <td className="pe-2">{data.nis}</td>
                </tr>
                <tr>
                    <td className="pe-2">Kelas</td>
                    <td className="pe-2">:</td>
                    <td className="pe-2">{data.nama_rombel}</td>
                </tr>
                <tr>
                    <td className="pe-2 align-top">Nama Orang Tua</td>
                    <td className="pe-2 align-top">:</td>
                    <td className="pe-2 align-top">
                        <ul className="list-disc list-inside">
                            <li className="list-item capitalize">
                                Ayah : {data.pd_namaayah.toLowerCase()}
                            </li>
                            <li className="list-item capitalize">
                                Ibu : {data.pd_namaibu.toLowerCase()}
                            </li>
                        </ul>
                    </td>
                </tr>
 */