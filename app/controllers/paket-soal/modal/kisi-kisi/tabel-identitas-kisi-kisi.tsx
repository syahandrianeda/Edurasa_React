import type { IdentitasKontenPaket } from "~/domain/paket-soal/entities/identitas-paket"
import type DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import { currentTapel, currentTapelProperties } from "~/lib/current-tapel";
import type { UserPtk } from "~/types";


type Props = {
    identitas: IdentitasKontenPaket,
    isMultiple: boolean;
    koleksiMapel:string[],
    KisiKisiInstance:DataKisiKisi,
    isKisi:boolean
}
export default function TableIdentitasKisikisi ({identitas, isMultiple, koleksiMapel, KisiKisiInstance, isKisi=true}:Props){
    const Penyusun = getSessionApp<UserPtk>()?.name ?? '-';
    return (
        <div className={`flex justify-between mt-7 ${isKisi?"text-[12px]":"text-[10px]"}`}>
            <div className="w-full p-1">
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="px-2 text-nowrap w-5">Tingkat</td>
                            <td className="px-2 w-1">:</td>
                            <td className="px">Sekolah Dasar</td>
                        </tr>
                        <tr>
                            <td className="px-2 text-nowrap">Tahun Pelajaran</td>
                            <td className="px-2">:</td>
                            <td className="px">{currentTapel({variant:'onlyTapel', date:identitas.start_time ?? new Date()})}</td>
                        </tr>
                        <tr>
                            <td className="px-2 text-nowrap">Kelas/semester</td>
                            <td className="px-2">:</td>
                            <td className="px">{identitas.kelas} / {currentTapelProperties({variant:'getSemesterWithGanjilGenap', tgl:identitas.start_time ?? new Date()})}</td>
                        </tr>
                        <tr>
                            <td className="px-2 text-nowrap">Kurikulum</td>
                            <td className="px-2">:</td>
                            <td className="px">Kurikulum Merdeka</td>
                        </tr>
                        <tr>
                            <td className="px-2 text-nowrap align-top">
                                { 
                                    isMultiple ?'Tema':'Muatan Pelajaran'
                                }
                            </td>
                            <td className="px-2 align-top">:</td>
                            <td className="px align-top">
                                {
                                    isMultiple ? (
                                        <>
                                            {identitas.dataIdentitas}
                                            <ol className="list-decimal ps-4">
                                                {
                                                    koleksiMapel.map((mapel, index)=>
                                                        <li key={index}>{mapel}</li>
                                                    )
                                                }
                                            </ol>
                                        </>
                                    ):(
                                        
                                        koleksiMapel.map((mapel, index)=>
                                            <span key={index}>{mapel}</span>
                                        )
                                                
                                    )
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className="px-2 text-nowrap">Penyusun</td>
                            <td className="px-2">:</td>
                            <td className="px">{Penyusun}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="w-full p-1 flex justify-end items-start">
                <table className={isKisi?"w-9/12":"w-11/12"}>
                    <tbody>
                        <tr>
                            <td className="px-2 text-nowrap w-5 align-top">Pelaksanaan</td>
                            <td className="px-2 w-1 align-top">:</td>
                            <td className="px-2 align-top">{identitas.start_time?.toLocaleDateString('id-ID', {dateStyle:'full'})}</td>
                        </tr>
                        <tr>
                            <td className="px-2 align-top text-nowrap">Alokasi Waktu</td>
                            <td className="px-2 align-top">:</td>
                            <td className="px-2 align-top">{identitas.durasi} menit</td>
                        </tr>
                        <tr>
                            <td className="px-2 align-top text-nowrap">Jumlah Butir Soal</td>
                            <td className="px-2 align-top">:</td>
                            <td className="px-2 align-top">{KisiKisiInstance?.dataSoal?.length}</td>
                        </tr>
                        <tr>
                            <td className="px-2 text-nowrap align-top">Rincian Butir Soal</td>
                            <td className="px-2 align-top">:</td>
                            <td className="px-2 align-top">
                                <ol>
                                    {
                                        KisiKisiInstance?.dataKontenSoal?.map((m, index)=>
                                                <li className="flex justify-between pe-2" key={index}><span>{m.bentukSoal?.description}</span><span>: {m.dataSoal.length} butir soal</span></li>
                                            )
                                        
                                    }
                                </ol>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}