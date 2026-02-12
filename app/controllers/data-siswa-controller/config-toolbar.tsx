

import { useEffect, useMemo } from "react";
import { Fields, SelectField } from "~/components/fields/fields";
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { useAppSelector } from "~/context-reduct/hook";
import { selectAllSiswaDTO } from "~/context-reduct/selectores/data-siswa-aktif";
import { KoleksiTahunMasuk, StatistikPerJenjang, StatistikPerRombel } from "~/domain/kesiswaan/kesiswaan-statistik";
import { DataRombelUI } from "~/domain/rombel/data-rombel";
import { currentTapelProperties } from "~/lib/current-tapel";
import { formatBackendISO, formatStringBulanTahun, getBulanTapel } from "~/lib/date-helper";
import type { Agama } from "~/types/enums/agama";
import { Gender } from "~/types/enums/gender";

export function InfoToolbarDataSiswa(){
    const allSiswa = useAppSelector(selectAllSiswaDTO);
    const rombel = useAppSelector(state=>state.fokusRombel.value);
    const data = useMemo(()=>{
        if(!rombel) return null
        return StatistikPerRombel(allSiswa, rombel);
        
    },[
        allSiswa,rombel
    ]) 
    
    
    return (
        <div className="bg-linear-to-br text-xs from-sky-300 to-sky-200  dark:from-sky-800 dark:to-sky-700 px-2 py-2">
            <p>Menampilkan data siswa di Rombel Anda yang Anda ampu. </p>
            <table className="border-collapse w-ful md:w-4/5 md:mx-auto">
                <tbody>
                    <tr>
                        <td className="border-b-[0.5pt] border-sky-900 border-dashed w-32">Nama Rombel</td>
                        <td className="border-b-[0.5pt] border-sky-900 border-dashed w-1">:</td>
                        <td colSpan={4} className="border-b-[0.5pt] border-sky-900 border-dashed px-3">{rombel}</td>
                    </tr>
                    <tr>
                        <td rowSpan={2} className="border-b-[0.5pt] border-sky-900 border-dashed text-center bg-sky-300 dark:bg-sky-600">Data</td>
                        <td colSpan={3} className="border-b-[0.5pt] border-s-[0.5pt] text-center border-sky-900 border-dashed bg-sky-300 dark:bg-sky-600">Gender</td>
                        <td rowSpan={2} className="border-b-[0.5pt] border-s-[0.5pt] text-center border-sky-900 border-dashed bg-sky-300 dark:bg-sky-600 w-12">Total</td>
                        <td rowSpan={2} className="border-b-[0.5pt] border-s-[0.5pt] text-center border-sky-900 border-dashed bg-sky-300 dark:bg-sky-600">Keterangan</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="border-[0.5pt] border-sky-900 border-dashed text-center bg-sky-300 dark:bg-sky-600">Laki-laki</td>
                        <td className="border-[0.5pt] border-sky-900 border-dashed text-center bg-sky-300 dark:bg-sky-600">Perempuan</td>
                    </tr>
                    <tr>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">Gender</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countGender(Gender.LAKI_LAKI)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countGender(Gender.PEREMPUAN)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countGender(Gender.UNKNOWN)?"Periksa Data Gender":"✔️"}</td>
                    </tr>
                    <tr>
                        <td colSpan={6} className="text-center border-b-[0.5pt] border-s-0 border-e-0 bg-sky-300 border-sky-900 border-dashed dark:bg-sky-600">Agama Siswa</td>
                    </tr>
                    {
                        data?.collectAgama.map((agama,index)=>(
                            <tr key={index}>
                                <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{agama}</td>
                                <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAgamaGender(Gender.LAKI_LAKI, agama as Agama)}</td>
                                <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAgamaGender(Gender.PEREMPUAN, agama as Agama)}</td>
                                <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAgamaGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN], agama as Agama)}</td>
                                <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAgamaGender(Gender.UNKNOWN, agama as Agama)}</td>
                            </tr>
                        ))
                    }
                    <tr>
                        <td colSpan={6} className="text-center border-b-[0.5pt] border-s-0 border-e-0 bg-sky-300 border-sky-900 border-dashed dark:bg-sky-600">Nomor Induk Siswa</td>
                    </tr>
                    <tr>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">NIS Valid</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countValidNisGender(Gender.LAKI_LAKI)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countValidNisGender(Gender.PEREMPUAN)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countValidNisGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countValidNisGender(Gender.UNKNOWN)}</td>
                    </tr>
                    <tr className={`text-small ${data?.countInvalidNisGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN,Gender.UNKNOWN])!==0?'text-red-500 font-medium':'text-black'}`}>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">NIS Tidak Valid</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countInvalidNisGender(Gender.LAKI_LAKI)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countInvalidNisGender(Gender.PEREMPUAN)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countInvalidNisGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countInvalidNisGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN,Gender.UNKNOWN])}</td>
                    </tr>
                    
                    <tr className={`text-small ${data?.countDuplicateNisGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN,Gender.UNKNOWN])!==0?'text-red-500 font-medium':'text-black'}`}>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">NIS Duplikat</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countDuplicateNisGender(Gender.LAKI_LAKI)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countDuplicateNisGender(Gender.PEREMPUAN)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countDuplicateNisGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countDuplicateNisGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN,Gender.UNKNOWN])}</td>
                    </tr>
                    <tr className={`text-small ${data?.countNisKosongGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN,Gender.UNKNOWN])!==0?'text-red-500 font-medium':'text-black'}`}>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">NIS Belum diisi</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countNisKosongGender(Gender.LAKI_LAKI)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countNisKosongGender(Gender.PEREMPUAN)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countNisKosongGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countNisKosongGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN,Gender.UNKNOWN])}</td>
                    </tr>
                    
                    <tr>
                        <td colSpan={6} className="text-center border-b-[0.5pt] border-s-0 border-e-0 bg-sky-300 border-sky-900 border-dashed dark:bg-sky-600">N I S N</td>
                    </tr>
                    <tr>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">NIS Valid</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countValidNisnGender(Gender.LAKI_LAKI)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countValidNisnGender(Gender.PEREMPUAN)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countValidNisnGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countValidNisnGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN,Gender.UNKNOWN])}</td>
                    </tr>
                    <tr className={`text-small ${data?.countInvalidNisnGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN,Gender.UNKNOWN])!==0?'text-red-500 font-medium':'text-black'}`}>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">NISN Tidak Valid</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countInvalidNisnGender(Gender.LAKI_LAKI)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countInvalidNisnGender(Gender.PEREMPUAN)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countInvalidNisnGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countInvalidNisnGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN,Gender.UNKNOWN])}</td>
                    </tr>
                    <tr className={`text-small ${data?.countDuplicateNisnGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN,Gender.UNKNOWN])!==0?'text-red-500 font-medium':'text-black'}`}>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">NISN Duplikat</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countDuplicateNisnGender(Gender.LAKI_LAKI)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countDuplicateNisnGender(Gender.PEREMPUAN)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countDuplicateNisnGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countDuplicateNisnGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN,Gender.UNKNOWN])}</td>
                    </tr>
                    <tr className={`text-small ${data?.countNisnKosongGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN,Gender.UNKNOWN])!==0?'text-red-500 font-medium':'text-black'}`}>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">NISN Belum diisi</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countNisnKosongGender(Gender.LAKI_LAKI)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countNisnKosongGender(Gender.PEREMPUAN)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countNisnKosongGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countNisnKosongGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN,Gender.UNKNOWN])}</td>
                    </tr>
                    <tr>
                        <td colSpan={6} className="text-center border-b-[0.5pt] border-s-0 border-e-0 bg-sky-300 border-sky-900 border-dashed dark:bg-sky-600">Kepemilikan Dokumen di Aplikasi</td>
                    </tr>
                    <tr>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">Akte Kelahiran</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAkteGender(Gender.LAKI_LAKI)}<br/>({data?.countUnuploadAkteGender(Gender.LAKI_LAKI)} belum upload)</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAkteGender(Gender.PEREMPUAN)}<br/>({data?.countUnuploadAkteGender(Gender.PEREMPUAN)} belum upload)</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAkteGenders([Gender.PEREMPUAN, Gender.LAKI_LAKI])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countUnuploadAkteGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN, Gender.UNKNOWN])} Belum upload</td>
                    </tr>
                    <tr>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">Kartu Keluarga</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countKkGender(Gender.LAKI_LAKI)}<br/>({data?.countUnploadKkGender(Gender.LAKI_LAKI)} belum upload)</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countKkGender(Gender.PEREMPUAN)}<br/>({data?.countUnploadKkGender(Gender.PEREMPUAN)} belum upload)</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countKkGenders([Gender.PEREMPUAN, Gender.LAKI_LAKI])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countUnploadKkGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN])} belum upload</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}
export function InfoToolbarDataSiswaJenjang(){
    const allSiswa = useAppSelector(selectAllSiswaDTO);
    const rombel = useAppSelector(state=>state.fokusRombel.value);
    const data = useMemo(()=>{
        if(!rombel) return null
        return StatistikPerJenjang(allSiswa, rombel);
        
    },[
        allSiswa,rombel
    ]) 
    
    const anggotaRombel = DataRombelUI.filter(s=> s.active && s.jenjang === parseInt(rombel as string)).map(m=> m.rombelName).join(', ')
    return (
        <div className="bg-linear-to-br text-xs from-sky-300 to-sky-200  dark:from-sky-800 dark:to-sky-700 px-2 py-2">
            <p>Menampilkan data siswa di Rombel Anda yang Anda ampu. </p>
            <table className="border-collapse w-ful md:w-4/5 md:mx-auto">
                <tbody>
                    <tr>
                        <td className="border-b-[0.5pt] border-sky-900 border-dashed w-32">Nama Jenjang</td>
                        <td className="border-b-[0.5pt] border-sky-900 border-dashed w-1">:</td>
                        <td colSpan={4} className="border-b-[0.5pt] border-sky-900 border-dashed px-3">{parseInt(rombel as string)}</td>
                    </tr>
                    <tr>
                        <td className="border-b-[0.5pt] border-sky-900 border-dashed w-32">Anggota Rombel</td>
                        <td className="border-b-[0.5pt] border-sky-900 border-dashed w-1">:</td>
                        <td colSpan={4} className="border-b-[0.5pt] border-sky-900 border-dashed px-3">{anggotaRombel}</td>
                    </tr>
                    <tr>
                        <td rowSpan={2} className="border-b-[0.5pt] border-sky-900 border-dashed text-center bg-sky-300 dark:bg-sky-600">Data</td>
                        <td colSpan={3} className="border-b-[0.5pt] border-s-[0.5pt] text-center border-sky-900 border-dashed bg-sky-300 dark:bg-sky-600">Gender</td>
                        <td rowSpan={2} className="border-b-[0.5pt] border-s-[0.5pt] text-center border-sky-900 border-dashed bg-sky-300 dark:bg-sky-600 w-12">Total</td>
                        <td rowSpan={2} className="border-b-[0.5pt] border-s-[0.5pt] text-center border-sky-900 border-dashed bg-sky-300 dark:bg-sky-600">Keterangan</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="border-[0.5pt] border-sky-900 border-dashed text-center bg-sky-300 dark:bg-sky-600">Laki-laki</td>
                        <td className="border-[0.5pt] border-sky-900 border-dashed text-center bg-sky-300 dark:bg-sky-600">Perempuan</td>
                    </tr>
                    <tr>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">Gender</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countGender(Gender.LAKI_LAKI)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countGender(Gender.PEREMPUAN)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countGender(Gender.UNKNOWN)?"Periksa Data Gender":"✔️"}</td>
                    </tr>
                    <tr>
                        <td colSpan={6} className="text-center border-b-[0.5pt] border-s-0 border-e-0 bg-sky-300 border-sky-900 border-dashed dark:bg-sky-600">Agama Siswa</td>
                    </tr>
                    {
                        data?.collectAgama.map((agama,index)=>(
                            <tr key={index}>
                                <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{agama}</td>
                                <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAgamaGender(Gender.LAKI_LAKI, agama as Agama)}</td>
                                <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAgamaGender(Gender.PEREMPUAN, agama as Agama)}</td>
                                <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAgamaGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN], agama as Agama)}</td>
                                <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAgamaGender(Gender.UNKNOWN, agama as Agama)}</td>
                            </tr>
                        ))
                    }
                    <tr>
                        <td colSpan={6} className="text-center border-b-[0.5pt] border-s-0 border-e-0 bg-sky-300 border-sky-900 border-dashed dark:bg-sky-600">Nomor Induk Siswa</td>
                    </tr>
                    <tr>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">NIS Valid</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countValidNisGender(Gender.LAKI_LAKI)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countValidNisGender(Gender.PEREMPUAN)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countValidNisGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countValidNisGender(Gender.UNKNOWN)}</td>
                    </tr>
                    <tr className={`text-small ${data?.countInvalidNisGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN,Gender.UNKNOWN])!==0?'text-red-500 font-medium':'text-black'}`}>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">NIS Tidak Valid</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countInvalidNisGender(Gender.LAKI_LAKI)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countInvalidNisGender(Gender.PEREMPUAN)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countInvalidNisGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countInvalidNisGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN,Gender.UNKNOWN])}</td>
                    </tr>
                    
                    <tr className={`text-small ${data?.countDuplicateNisGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN,Gender.UNKNOWN])!==0?'text-red-500 font-medium':'text-black'}`}>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">NIS Duplikat</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countDuplicateNisGender(Gender.LAKI_LAKI)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countDuplicateNisGender(Gender.PEREMPUAN)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countDuplicateNisGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countDuplicateNisGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN,Gender.UNKNOWN])}</td>
                    </tr>
                    <tr className={`text-small ${data?.countNisKosongGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN,Gender.UNKNOWN])!==0?'text-red-500 font-medium':'text-black'}`}>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">NIS Belum diisi</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countNisKosongGender(Gender.LAKI_LAKI)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countNisKosongGender(Gender.PEREMPUAN)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countNisKosongGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countNisKosongGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN,Gender.UNKNOWN])}</td>
                    </tr>
                    
                    <tr>
                        <td colSpan={6} className="text-center border-b-[0.5pt] border-s-0 border-e-0 bg-sky-300 border-sky-900 border-dashed dark:bg-sky-600">N I S N</td>
                    </tr>
                    <tr>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">NIS Valid</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countValidNisnGender(Gender.LAKI_LAKI)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countValidNisnGender(Gender.PEREMPUAN)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countValidNisnGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countValidNisnGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN,Gender.UNKNOWN])}</td>
                    </tr>
                    <tr className={`text-small ${data?.countInvalidNisnGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN,Gender.UNKNOWN])!==0?'text-red-500 font-medium':'text-black'}`}>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">NISN Tidak Valid</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countInvalidNisnGender(Gender.LAKI_LAKI)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countInvalidNisnGender(Gender.PEREMPUAN)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countInvalidNisnGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countInvalidNisnGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN,Gender.UNKNOWN])}</td>
                    </tr>
                    <tr className={`text-small ${data?.countDuplicateNisnGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN,Gender.UNKNOWN])!==0?'text-red-500 font-medium':'text-black'}`}>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">NISN Duplikat</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countDuplicateNisnGender(Gender.LAKI_LAKI)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countDuplicateNisnGender(Gender.PEREMPUAN)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countDuplicateNisnGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countDuplicateNisnGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN,Gender.UNKNOWN])}</td>
                    </tr>
                    <tr className={`text-small ${data?.countNisnKosongGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN,Gender.UNKNOWN])!==0?'text-red-500 font-medium':'text-black'}`}>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">NISN Belum diisi</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countNisnKosongGender(Gender.LAKI_LAKI)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countNisnKosongGender(Gender.PEREMPUAN)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countNisnKosongGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countNisnKosongGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN,Gender.UNKNOWN])}</td>
                    </tr>
                    <tr>
                        <td colSpan={6} className="text-center border-b-[0.5pt] border-s-0 border-e-0 bg-sky-300 border-sky-900 border-dashed dark:bg-sky-600">Kepemilikan Dokumen di Aplikasi</td>
                    </tr>
                    <tr>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">Akte Kelahiran</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAkteGender(Gender.LAKI_LAKI)}<br/>({data?.countUnuploadAkteGender(Gender.LAKI_LAKI)} belum upload)</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAkteGender(Gender.PEREMPUAN)}<br/>({data?.countUnuploadAkteGender(Gender.PEREMPUAN)} belum upload)</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAkteGenders([Gender.PEREMPUAN, Gender.LAKI_LAKI])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countUnuploadAkteGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN, Gender.UNKNOWN])} Belum upload</td>
                    </tr>
                    <tr>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">Kartu Keluarga</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countKkGender(Gender.LAKI_LAKI)}<br/>({data?.countUnploadKkGender(Gender.LAKI_LAKI)} belum upload)</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countKkGender(Gender.PEREMPUAN)}<br/>({data?.countUnploadKkGender(Gender.PEREMPUAN)} belum upload)</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countKkGenders([Gender.PEREMPUAN, Gender.LAKI_LAKI])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countUnploadKkGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN])} belum upload</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export const ConfigToolbarDataSiswa:TabsConfigProps =  {
    
    tabList:[
        {
            value: 'tab1',
            label: 'Info'
        },
        ...TabConfigKopTtd.tabList
    ],
    contentList:[
        {
            value: 'tab1',
            element: <InfoToolbarDataSiswa/>
        },
        ...TabConfigKopTtd.contentList
    ]
}
export const ConfigToolbarDataSiswaJenjang:TabsConfigProps =  {
    
    tabList:[
        {
            value: 'tab1',
            label: 'Info'
        },
        ...TabConfigKopTtd.tabList
    ],
    contentList:[
        {
            value: 'tab1',
            element: <InfoToolbarDataSiswaJenjang/>
        },
        ...TabConfigKopTtd.contentList
    ]
}
export const ConfigToolbarMutasi:TabsConfigProps =  {
    defaultValue:'tab1',
    tabList:[
        {
            value: 'tab1',
            label: 'Info'
        },
        ...TabConfigKopTtd.tabList
    ],
    contentList:[
        {
            value: 'tab1',
            element: <InfoToolbarMutasiTahunMasuk/>
        },
        ...TabConfigKopTtd.contentList
    ]
}
export const ConfigToolbarLaporan:TabsConfigProps =  {
    defaultValue: 'tab1',
    tabList:[
        {
            value: 'tab1',
            label: 'Info'
        },
        ...TabConfigKopTtd.tabList
    ],
    contentList:[
        {
            value: 'tab1',
            element: <InfoToolbarMutasiLaporan/>
        },
        ...TabConfigKopTtd.contentList
    ]
}

export function InfoToolbarMutasiTahunMasuk() {
  const allSiswa = useAppSelector(selectAllSiswaDTO)
  const rombel = useAppSelector(state => state.fokusRombel.value)
  const { setValue, value } = useFilterContext()

  const data = useMemo(() => {
    if (!rombel) return []
    return KoleksiTahunMasuk(allSiswa, rombel)
  }, [allSiswa, rombel])

  useEffect(() => {
    if (data.length === 0) return

    if (value.tahun == null || !data.includes(value.tahun)) {
      setValue({ tahun: data[0] })
    }
  }, [data, value.tahun, setValue])

  if (data.length === 0) {
    return (
      <div className="bg-linear-to-br text-xs px-2 py-2">
        <p>Pilih Data Per Tahun</p>
        <p className="italic text-muted">Data tahun tidak tersedia</p>
      </div>
    )
  }

  return (
    <div className="bg-linear-to-br text-xs from-sky-300 to-sky-200 dark:from-sky-800 dark:to-sky-700 px-2 py-2">
      <p>Pilih Data Per Tahun</p>

      <Fields className="mt-3 w-50 mx-auto">
        <SelectField
          labelSelect="Tahun Pelajaran"
          value={value.tahun ?? data[0]}
          onChange={(e) => setValue({ tahun: Number(e.target.value) })}
        >
          {data.map((m, i) => (
            <option key={i} value={m}>
              {m}/{m + 1}
            </option>
          ))}
        </SelectField>
      </Fields>
    </div>
  )
}
export function InfoToolbarMutasiLaporan() {
    const { setValue, value } = useFilterContext()

    const firstYear = useMemo(() => {
        return currentTapelProperties({ variant: 'firstYear' })
    }, [])

    useEffect(() => {
        if (value.tahun == null) {
        setValue({ tahun: firstYear as number })
        }
    }, [firstYear, value.tahun, setValue])

    const bulanOptions = useMemo(() => {
        if (!value.tahun) return []
        return getBulanTapel(firstYear as number)
    }, [value.tahun])

    const isSameMonthYear = (a: Date, b: Date) =>
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth()

    useEffect(() => {
        if (!bulanOptions.length) return
        if (!value.bulan) {
        setValue({ bulan: bulanOptions[0] })
        return
        }

        const isValid = bulanOptions.some(d =>
        isSameMonthYear(d, value.bulan!)
        )

        if (!isValid) {
        setValue({ bulan: bulanOptions[0] })
        }
    }, [bulanOptions, value.bulan, setValue])

    const handleChangeBulan = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const iso = e.target.value
        if (!iso) return

        setValue({ bulan: new Date(iso) })
    }

    if (bulanOptions.length === 0) {
        return (
        <div className="bg-linear-to-br text-xs px-2 py-2">
            <p className="text-center">Pilih Data Per Bulan</p>
            <p className="italic text-muted">Data tahun tidak tersedia</p>
        </div>
        )
    }

    return (
        <div className="bg-linear-to-br text-xs from-sky-300 to-sky-200 dark:from-sky-800 dark:to-sky-700 px-2 py-2">
        <p className="text-center">Pilih Data Per Bulan</p>

        <Fields className="mt-3 w-50 mx-auto">
            <SelectField
            labelSelect="Bulan"
            value={value.bulan ? formatBackendISO(value.bulan) : ''}
            onChange={handleChangeBulan}
            >
            {bulanOptions.map((date, i) => (
                <option
                key={i}
                value={formatBackendISO(date)}
                >
                {formatStringBulanTahun(date)}
                </option>
            ))}
            </SelectField>
        </Fields>
        </div>
    )
}
