
import { useMemo } from "react";
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";
import { useAppSelector } from "~/context-reduct/hook";
import { selectAllSiswaDTO } from "~/context-reduct/selectores/data-siswa-aktif";
import { StatistikPerJenjang, StatistikPerRombel } from "~/domain/kesiswaan/kesiswaan-statistik";
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
                        <td colSpan={4} className="border-b-[0.5pt] border-sky-900 border-dashed px-3">data</td>
                    </tr>
                    <tr>
                        <td rowSpan={2} className="border-b-[0.5pt] border-sky-900 border-dashed text-center bg-sky-300">Data</td>
                        <td colSpan={3} className="border-b-[0.5pt] border-s-[0.5pt] text-center border-sky-900 border-dashed bg-sky-300">Gender</td>
                        <td rowSpan={2} className="border-b-[0.5pt] border-s-[0.5pt] text-center border-sky-900 border-dashed bg-sky-300 w-12">Total</td>
                        <td rowSpan={2} className="border-b-[0.5pt] border-s-[0.5pt] text-center border-sky-900 border-dashed bg-sky-300">Keterangan</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="border-[0.5pt] border-sky-900 border-dashed text-center bg-sky-300">Laki-laki</td>
                        <td className="border-[0.5pt] border-sky-900 border-dashed text-center bg-sky-300">Perempuan</td>
                    </tr>
                    <tr>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">Gender</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countGender(Gender.LAKI_LAKI)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countGender(Gender.PEREMPUAN)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countGender(Gender.UNKNOWN)?"Periksa Data Gender":"✔️"}</td>
                    </tr>
                    <tr>
                        <td colSpan={6} className="text-center border-b-[0.5pt] border-s-0 border-e-0 bg-sky-300 border-sky-900 border-dashed">Agama Siswa</td>
                    </tr>
                    {
                        data?.collectAgama.map((agama,index)=>(
                            <tr key={index}>
                                <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{agama}</td>
                                <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAgamaGender(Gender.LAKI_LAKI, agama)}</td>
                                <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAgamaGender(Gender.PEREMPUAN, agama)}</td>
                                <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAgamaGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN], agama)}</td>
                                <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAgamaGender(Gender.UNKNOWN, agama)}</td>
                            </tr>
                        ))
                    }
                    <tr>
                        <td colSpan={6} className="text-center border-b-[0.5pt] border-s-0 border-e-0 bg-sky-300 border-sky-900 border-dashed">Nomor Induk Siswa</td>
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
                        <td colSpan={6} className="text-center border-b-[0.5pt] border-s-0 border-e-0 bg-sky-300 border-sky-900 border-dashed">N I S N</td>
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
                        <td colSpan={6} className="text-center border-b-[0.5pt] border-s-0 border-e-0 bg-sky-300 border-sky-900 border-dashed">Kepemilikan Dokumen di Aplikasi</td>
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
    
    
    return (
        <div className="bg-linear-to-br text-xs from-sky-300 to-sky-200  dark:from-sky-800 dark:to-sky-700 px-2 py-2">
            <p>Menampilkan data siswa di Rombel Anda yang Anda ampu. </p>
            <table className="border-collapse w-ful md:w-4/5 md:mx-auto">
                <tbody>
                    <tr>
                        <td className="border-b-[0.5pt] border-sky-900 border-dashed w-32">Nama Rombel</td>
                        <td className="border-b-[0.5pt] border-sky-900 border-dashed w-1">:</td>
                        <td colSpan={4} className="border-b-[0.5pt] border-sky-900 border-dashed px-3">data</td>
                    </tr>
                    <tr>
                        <td rowSpan={2} className="border-b-[0.5pt] border-sky-900 border-dashed text-center bg-sky-300">Data</td>
                        <td colSpan={3} className="border-b-[0.5pt] border-s-[0.5pt] text-center border-sky-900 border-dashed bg-sky-300">Gender</td>
                        <td rowSpan={2} className="border-b-[0.5pt] border-s-[0.5pt] text-center border-sky-900 border-dashed bg-sky-300 w-12">Total</td>
                        <td rowSpan={2} className="border-b-[0.5pt] border-s-[0.5pt] text-center border-sky-900 border-dashed bg-sky-300">Keterangan</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="border-[0.5pt] border-sky-900 border-dashed text-center bg-sky-300">Laki-laki</td>
                        <td className="border-[0.5pt] border-sky-900 border-dashed text-center bg-sky-300">Perempuan</td>
                    </tr>
                    <tr>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">Gender</td>
                        <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countGender(Gender.LAKI_LAKI)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countGender(Gender.PEREMPUAN)}</td>
                        <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN])}</td>
                        <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countGender(Gender.UNKNOWN)?"Periksa Data Gender":"✔️"}</td>
                    </tr>
                    <tr>
                        <td colSpan={6} className="text-center border-b-[0.5pt] border-s-0 border-e-0 bg-sky-300 border-sky-900 border-dashed">Agama Siswa</td>
                    </tr>
                    {
                        data?.collectAgama.map((agama,index)=>(
                            <tr key={index}>
                                <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{agama}</td>
                                <td colSpan={2} className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAgamaGender(Gender.LAKI_LAKI, agama)}</td>
                                <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAgamaGender(Gender.PEREMPUAN, agama)}</td>
                                <td className="border-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAgamaGenders([Gender.LAKI_LAKI,Gender.PEREMPUAN], agama)}</td>
                                <td className="border-b-[0.5pt] border-dashed border-sky-900 text-center">{data?.countAgamaGender(Gender.UNKNOWN, agama)}</td>
                            </tr>
                        ))
                    }
                    <tr>
                        <td colSpan={6} className="text-center border-b-[0.5pt] border-s-0 border-e-0 bg-sky-300 border-sky-900 border-dashed">Nomor Induk Siswa</td>
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
                        <td colSpan={6} className="text-center border-b-[0.5pt] border-s-0 border-e-0 bg-sky-300 border-sky-900 border-dashed">N I S N</td>
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
                        <td colSpan={6} className="text-center border-b-[0.5pt] border-s-0 border-e-0 bg-sky-300 border-sky-900 border-dashed">Kepemilikan Dokumen di Aplikasi</td>
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