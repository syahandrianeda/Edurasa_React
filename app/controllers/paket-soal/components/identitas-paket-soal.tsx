import type { IdentitasKontenPaket } from "~/domain/paket-soal/entities/identitas-paket";
import type { KoleksiMapelPaketSoal } from "~/domain/paket-soal/entities/koleksi-mapel-paket-soal";

export default function IdentitasPaketSoal({data, mapel}:{data:IdentitasKontenPaket, mapel:KoleksiMapelPaketSoal}){
    const isTematik = data.dataIdentitas && data.dataIdentitas !=="";

    const keyTematik = isTematik?'Tema':'Muatan Pelajaran';
    return (
        <table className="w-6/12 mb-4 mx-auto leading-5">
            <tbody>
                <tr>
                    <td className="text-nowrap w-1/12 px-2 align-top">{keyTematik}</td>
                    <td className="w-1 px-2 align-top">:</td>
                    <td className="px-2 align-top">
                        {mapel.isMultiple 
                            ? (
                                
                                isTematik ?
                                    (
                                        data.dataIdentitas
                                    ):(
                                        <ol className="list-decimal list-inside">
                                            {
                                                mapel.data.map((m, i)=>
                                                    <li key={i}>{m}</li>
                                                )
                                            }
                                        </ol>

                                    )

                                
                            ):(
                                mapel.data.map((m, i)=>
                                            <p key={i}>{m}</p>
                                        )
                            )
                        }
                    </td>
                </tr>
                <tr>
                    <td className="px-2">Kurikulum</td>
                    <td className="px-2">:</td>
                    <td className="px-2">Kurikulum Merdeka</td>
                </tr>
                <tr>
                    <td className="px-2">Kelas</td>
                    <td className="px-2">:</td>
                    <td className="px-2">{data.kelas}</td>
                </tr>
                <tr>
                    <td className="px-2 text-nowrap">Hari, Tanggal</td>
                    <td className="px-2">:</td>
                    <td className="px-2">{data.start_time.toLocaleDateString('id-ID', {dateStyle:'full'})}</td>
                </tr>
                <tr>
                    <td className="px-2">Waktu</td>
                    <td className="px-2">:</td>
                    <td className="px-2">Pukul {data.start_time.toLocaleString('id-ID', {timeStyle:'short'})} ({data.durasi} Menit)</td>
                </tr>
            </tbody>
        </table>
    )
}