import { NAMA_SEKOLAH } from "~/domain/identitas_aplikasi/identitas-aplikasi"
import { ALAMAT_JALAN } from "~/domain/identitas_sekolah/identitas-sekolah"
import type { SiswaType } from "~/types/siswa"
import {useMemo} from 'react';
import getFaseByRombel from "~/lib/get-fase-by-rombel";
import { currentTapel, currentTapelProperties } from "~/lib/current-tapel";

type Props = {
    siswa:SiswaType|null
}
export default function DataProfilRaport({siswa}:Props){
    const tapel = currentTapel({variant:'onlyTapel'})
    const semester = currentTapelProperties({variant:'getSemesterWithGanjilGenap'})
    return (
            <div className="flex gap-2 flex-row border-b-2 border-black border-double text-sm">
                <table className="w-full leading-3">
                    <tbody>
                        <tr>
                            <td className="p-1 align-top w-1/6 text-nowrap">Nama Murid</td>
                            <td className="p-1 align-top w-1">:</td>
                            <td className="p-1 align-top">{siswa?.pd_nama}</td>
                        </tr>
                        <tr>
                            <td className="p-1 align-top text-nowrap">NIS/NISN</td>
                            <td className="p-1 align-top">:</td>
                            <td className="p-1 align-top">{siswa?.nis || '-'}/{siswa?.nisn || '-'}</td>
                        </tr>
                        <tr>
                            <td className="p-1 align-top text-nowrap">Sekolah</td>
                            <td className="p-1 align-top">:</td>
                            <td className="p-1 align-top">{NAMA_SEKOLAH}</td>
                        </tr>
                        <tr>
                            <td className="p-1 align-top text-nowrap">Alamat</td>
                            <td className="p-1 align-top">:</td>
                            <td className="p-1 align-top">{ALAMAT_JALAN}</td>
                        </tr>
                    </tbody>
                </table>
                <table className="w-5/12 leading-3">
                    <tbody>
                        <tr>
                            <td className="p-1 align-top w-1/6 text-nowrap">Kelas</td>
                            <td className="p-1 align-top w-1">:</td>
                            <td className="p-1 align-top">{siswa?.nama_rombel}</td>
                        </tr>
                        <tr>
                            <td className="p-1 align-top text-nowrap">Fase</td>
                            <td className="p-1 align-top">:</td>
                            <td className="p-1 align-top">{getFaseByRombel(siswa?.nama_rombel ?? '')}</td>
                        </tr>
                        <tr>
                            <td className="p-1 align-top text-nowrap">Semester</td>
                            <td className="p-1 align-top">:</td>
                            <td className="p-1 align-top text-nowrap">{semester}</td>
                        </tr>
                        <tr>
                            <td className="p-1 align-top text-nowrap">Tahun Ajaran</td>
                            <td className="p-1 align-top">:</td>
                            <td className="p-1 align-top text-nowrap">{tapel}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        
    )
}