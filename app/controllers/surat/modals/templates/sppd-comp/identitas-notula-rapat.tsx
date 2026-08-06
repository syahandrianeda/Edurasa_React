import type { AtasanPegawaiType } from "~/domain/tendik/atasan-pegawai";
import type { SppdAppType } from "~/types/surat/sppd-app-type";

export default function IdentitasNotulaRapat({atasan, data}:{atasan:AtasanPegawaiType, data:SppdAppType}){
    
    return(
        <div className="flex w-full gap-2">
            <div className="w-36 flag bg-sky-500">
                nota Dinas
            </div>
            <div className="w-full">
                <table className="leading-5 text-sm">
                    <tbody>
                        <tr>
                            <td className="px-2 align-top">Yth</td>
                            <td className="px-2 align-top">:</td>
                            <td className="px-2 align-top border-b border-gray-500">{atasan.jabatan}</td>
                        </tr>
                        <tr>
                            <td className="px-2 align-top">Dari</td>
                            <td className="px-2 align-top">:</td>
                            <td className="px-2 align-top border-b border-gray-500">{data.ptk_nama}</td>
                        </tr>
                        <tr>
                            <td className="px-2 align-top">Tembusan</td>
                            <td className="px-2 align-top">:</td>
                            <td className="px-2 align-top border-b border-gray-500 w-full"></td>
                        </tr>
                        <tr>
                            <td className="px-2 align-top">Hari/Tanggal</td>
                            <td className="px-2 align-top">:</td>
                            <td className="px-2 align-top border-b border-gray-500">{data.ptk_starttgl.toLocaleDateString('id-ID', {dateStyle:'full'})}</td>
                        </tr>
                        <tr>
                            <td className="px-2 align-top">Nomor</td>
                            <td className="px-2 align-top">:</td>
                            <td className="px-2 align-top border-b border-gray-500">{data.ptk_nosppd}</td>
                        </tr>
                        <tr>
                            <td className="px-2 align-top">Sifat</td>
                            <td className="px-2 align-top">:</td>
                            <td className="px-2 align-top border-b border-gray-500 w-full"></td>
                        </tr>
                        <tr>
                            <td className="px-2 align-top">Lampiran</td>
                            <td className="px-2 align-top">:</td>
                            <td className="px-2 align-top border-b border-gray-500">1</td>
                        </tr>
                        <tr>
                            <td className="px-2 align-top">Hal</td>
                            <td className="px-2 align-top">:</td>
                            <td className="px-2 align-top"><p className="garisbuku">{data.ptk_maksudsppd}</p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}