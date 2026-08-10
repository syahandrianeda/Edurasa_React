import { useAppSelector } from "~/context-reduct/hook";
import { InstanceRiwayatIdAkun } from "~/context-reduct/selectores/riwayat-id-akun-selector";
import { NAMA_SEKOLAH } from "~/domain/identitas_aplikasi/identitas-aplikasi";
import AtasanPegawai from "~/domain/tendik/atasan-pegawai";
import { getEndDate } from "~/lib/date-helper";
import type { SppdAppType } from "~/types/surat/sppd-app-type";

export default function TableSppdHalSatu({data}:{data:SppdAppType}){
    const kepsek = useAppSelector(InstanceRiwayatIdAkun).getAkunAktifInDate(data.ptk_starttgl)
    const atasanPegawai = AtasanPegawai('Guru Kelas',kepsek)
    
    return (
        <table className="w-full leading-normal mt-5">
            <tbody>
                <tr className="border-t-4 border-black">
                    <td className="p-2">1.</td>
                    <td className="p-2 border-e border-black w-6/12">Pejabat Pengguna Anggaran</td>
                    <td colSpan={2} className="p-2 w-6/12">{atasanPegawai.jabatan}</td>
                </tr>
                <tr className="border-t border-black">
                    <td className="p-2 align-top">2.</td>
                    <td className="px-2 pt-3 border-e border-black leading-4 align-top">Nama/NIP Pegawai yang melaksanakan perjalanan dinas	</td>
                    <td colSpan={2} className="p-2 text-nowrap">
                        <ul className="w-full">
                            <li className="border-b">
                                {data.ptk_nama}
                            </li>
                            <li className="border-b">
                                {data.ptk_nip}
                            </li>
                        </ul>
                    </td>
                </tr>
                <tr className="border-t border-black">
                    <td className="p-2 align-top">3.</td>
                    <td className="p-2 align-top border-e border-black">
                        <ol className="list-[lower-alpha] list-inside mt-0 pt-0">
                            <li className="list-item">Pangkat dan Golongan</li>
                            <li className="list-item">Jabatan/Instansi</li>
                            <li className="list-item">Tingkat Biaya Perjalanan Dinas</li>
                        </ol>
                    </td>
                    <td colSpan={2} className="p-2 text-nowrap">
                        <ul className="list-inside list-none w-full">
                            <li className="border-b border-dotted border-gray-400">{data.ptk_golongan}</li>
                            <li className="border-b border-dotted border-gray-400">{data.ptk_jabatan}</li>
                            <li className="border-b border-dotted border-gray-400">-</li>
                        </ul>
                    </td>
                </tr>
                
                <tr className="border-t border-black">
                    <td className="p-2 align-top">4.</td>
                    <td className="p-2 align-top border-e text-nowrap border-black">Maksud perjalanan Dinas</td>
                    <td colSpan={2} className="p-2">{data.ptk_maksudsppd}</td>
                </tr>
                <tr className="border-t border-black">
                    <td className="p-2 align-top">5.</td>
                    <td className="p-2 align-top border-e border-black">Alat angkut yang dipergunakan</td>
                    <td colSpan={2} className="p-2 text-nowrap">-</td>
                </tr>
                <tr className="border-t border-black">
                    <td className="p-2 align-top">6.</td>
                    <td className="p-2 align-top border-e border-black">
                        <ol className="list-[lower-alpha] list-inside mt-0 pt-0">
                            <li className="list-item">Tempat Berangkat</li>
                            <li className="list-item">Tempat Tujuan</li>
                        </ol>
                    </td>
                    <td colSpan={2} className="p-2">
                        <ul className="list-inside list-none w-full">
                            <li className="border-b border-dotted border-gray-400">{NAMA_SEKOLAH}</li>
                            <li className="border-b border-dotted border-gray-400">{data.ptk_tempatsppd}</li>
                        </ul>
                    </td>
                </tr>
                <tr className="border-t border-black">
                    <td className="p-2 align-top">7.</td>
                    <td className="p-2 align-top border-e border-black">
                        <ol className="list-[lower-alpha] list-inside mt-0 pt-0">
                            <li className="list-item">Lamanya perjalanan dinas</li>
                            <li className="list-item">Tanggal Berangkat</li>
                            <li className="list-item">Tanggal harus kembali/tiba di tempat baru</li>
                        </ol>
                    </td>
                    <td colSpan={2} className="p-2 text-nowrap">
                        <ul className="list-inside list-none w-full">
                            <li className="border-b border-dotted border-gray-400">{data.ptk_durasisppd ?? 1} hari</li>
                            <li className="border-b border-dotted border-gray-400">{data.ptk_starttgl?.toLocaleDateString('id-ID', {dateStyle:'long'})}</li>
                            <li className="border-b border-dotted border-gray-400">{data.ptk_starttgl && getEndDate(data.ptk_starttgl, data.ptk_durasisppd).toLocaleDateString('id-ID', {dateStyle:'long'})}</li>
                        </ul>
                    </td>
                </tr>
                <tr className="border-t border-black">
                    <td className="p-2 align-top">8.</td>
                    <td className="p-2 align-top border-e border-black">Pengikut: Nama
                    </td>
                    <td className="p-2 border-e border-black">Tanggal Lahir</td>
                    <td className="p-2 text-nowrap">Keterangan</td>
                </tr>
                <tr className="border-t border-black">
                    <td className="leading-2 p-2 align-top"></td>
                    <td className="leading-2 p-2 align-top border-e border-black">-</td>
                    <td className="leading-2 p-2 border-e border-black">-</td>
                    <td className="leading-2 p-2 text-nowrap">-</td>
                </tr>
                <tr className="border-t border-black">
                    <td className="p-2 align-top">9.</td>
                    <td className="p-2 align-top border-e border-black">Pembeban Anggaran
                        
                        <ol className="list-[lower-alpha] list-inside mt-0 pt-0">
                            <li className="list-item">Instansi</li>
                            <li className="list-item">Akun</li>
                        </ol>
                    </td>
                    <td colSpan={2} className="px-2 pt-6">
                        
                        <ul className="list-inside list-none w-full">
                            <li className="border-b border-dotted border-gray-400">UPTD {NAMA_SEKOLAH}</li>
                            <li className="border-b border-dotted border-gray-400">-</li>
                        </ul>
                    </td>
                </tr>
                <tr className="border-t border-b-4 border-black">
                    <td className="p-2 align-top">10.</td>
                    <td className="p-2 align-top border-e border-black">Keterangan Lain-lain</td>
                    <td colSpan={2} className="p-2 text-nowrap">Terlampir</td>
                </tr>
            </tbody>
        </table>
    )
}