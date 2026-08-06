import { NAMA_SEKOLAH } from "~/domain/identitas_aplikasi/identitas-aplikasi";
import type { SppdAppType } from "~/types/surat/sppd-app-type";
import PenandaTanganSppd from "./penandatanganan-sppd";
import { getEndDate } from "~/lib/date-helper";
import RowBlankSppd from "./row-blank-sppd";

export default function TableSppdHalDua({data}:{data:SppdAppType}){
    return (
        <table className="w-full text-sm">
            <tbody>
                <tr>
                    <td className="border w-1/2 border-black"></td>
                    <td className="border w-1/2 border-black px-2">
                        <div className="flex flex-col justify-between min-h-24">
                            <table className="w-fit leading-4">
                                <tbody>
                                    <tr>
                                        <td className="align-top ps-1">I.</td>
                                        <td className="align-top ps-2">Berangkat Dari (tempat kedudukan)</td>
                                        <td className="align-top ps-2">:</td>
                                        <td className="align-top ps-2">{NAMA_SEKOLAH}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className="align-top ps-2">Ke</td>
                                        <td className="align-top ps-2">:</td>
                                        <td className="align-top ps-2">{data.ptk_tempatsppd}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className="align-top ps-2">Pada Tanggal</td>
                                        <td className="align-top ps-2">:</td>
                                        <td className="align-top ps-2">{data.ptk_starttgl.toLocaleDateString('id-ID',{dateStyle:'long'})}</td>
                                    </tr>
                                    <tr>
                                        <td/>
                                        <td className="ps-2" colSpan={3}>
                                            <PenandaTanganSppd atasan={data} className="h-22" includeJabatan={false}/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="border border-black px-2">
                        
                        <div className="flex flex-col justify-between items-center min-h-37">
                            <table className="w-fit leading-4">
                                <tbody>
                                    <tr>
                                        <td className="align-top ps-1">II.</td>
                                        <td className="align-top ps-2">Tiba di</td>
                                        <td className="align-top ps-2">:</td>
                                        <td className="align-top ps-2">{data.ptk_tempatsppd}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className="align-top ps-2">Pada Tanggal</td>
                                        <td className="align-top ps-2">:</td>
                                        <td className="align-top ps-2">{data.ptk_starttgl.toLocaleDateString('id-ID',{dateStyle:'long'})}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="border-t border-gray-600 ms-2 w-11/12">NIP. </div>
                        </div>
                    </td>
                    <td className="border border-black px-2">
                        <div className="flex flex-col justify-between min-h-38">
                            <table className="w-fit leading-4">
                                <tbody>
                                    <tr>
                                        <td className="align-top ps-2">Berangkat Dari</td>
                                        <td className="align-top ps-2">:</td>
                                        <td className="align-top ps-2">{data.ptk_tempatsppd}</td>
                                    </tr>
                                    <tr><td className="align-top ps-2">Ke</td>
                                        <td className="align-top ps-2">:</td>
                                        <td className="align-top ps-2">{NAMA_SEKOLAH}</td>
                                    </tr>
                                    <tr>
                                        <td className="align-top ps-2">Pada Tanggal</td>
                                        <td className="align-top ps-2">:</td>
                                        <td className="align-top ps-2">{getEndDate(data.ptk_starttgl, data.ptk_durasisppd).toLocaleDateString('id-ID',{dateStyle:'long'})}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="border-t border-gray-600 ms-2 w-11/12">NIP. </div>
                        </div>
                    </td>
                </tr>
                <RowBlankSppd romawi="III"/>
                <RowBlankSppd romawi="IV"/>
                <RowBlankSppd romawi="V"/>
                <tr>
                    <td className="border border-black px-2">
                        
                        <div className="flex flex-col justify-between min-h-28">
                            <table className="w-fit leading-4">
                                <tbody>
                                    <tr>
                                        <td className="align-top ps-1">VI.</td>
                                        <td className="align-top ps-2">Tiba kembali di</td>
                                        <td className="align-top ps-2">:</td>
                                        <td className="align-top ps-2">{NAMA_SEKOLAH}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className="align-top ps-2">Pada Tanggal</td>
                                        <td className="align-top ps-2">:</td>
                                        <td className="align-top ps-2">{getEndDate(data.ptk_starttgl, data.ptk_durasisppd).toLocaleDateString('id-ID',{dateStyle:'long'})}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="ps-8">
                                <PenandaTanganSppd atasan={data} className="h-28"/>
                            </div>
                        </div>
                    </td>
                    <td className="border border-black px-2 align-top text-xs">
                        Telah diperiksa, dengan keterangan bahwa perjalanan tersebut diatas benar dilakukan atas perintahnya dan semata-mata untuk kepentingan jabatan dalam waktu yang sesingkat-singkatnya.
                    </td>
                </tr>
                <tr>
                    <td className="border border-black p-2" colSpan={2}>CATATAN LAIN-LAIN</td>
                </tr>
                <tr>
                    <td className="border border-black p-2" colSpan={2}>
                        <p>PERHATIAN</p>
                        <p>
                            Pejabat yang berwenang menerbitkan SPPD, pegawai yang melakukan perjalanan dinas, para pejabat yang mengesahkan tanggal berangkat/tiba serta Bendaharawan bertanggung jawab berdasarkan peraturan-peraturan Keuangan Negara apabila Negara mendapat rugi akibat kesalahan, kealpaannya.
                        </p>
                    </td>
                </tr>

            </tbody>
        </table>
    )
}