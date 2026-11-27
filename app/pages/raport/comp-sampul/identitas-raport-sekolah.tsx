import { INSTANSI_INDUK, KABUPATEN_KOTA } from "~/domain/identitas_aplikasi/identitas-aplikasi";
import { ALAMAT_JALAN, EMAIL_SEKOLAH, IDENTITAS_SEKOLAH, INSTANSI_PEMERINTAH, KECAMATAN_SEKOLAH, KELURAHAN_SEKOLAH, KODEPOS_SEKOLAH, NPSN_SEKOLAH, NSS_SEKOLAH, PROVINSI_SEKOLAH, WEB_SEKOLAH } from "~/domain/identitas_sekolah/identitas-sekolah";

export default function IdentitasRaportSekolah(){
    return (
        <div className="border w-[210mm] print:w-[210mm] break-inside-avoid print:border-0 min-h-[297mm] p-2 flex flex-col justify-start mx-auto gap-7" >
            <div className="fw-bold text-center leading-snug font-bold">
                <p>RAPORT PESERTA DIDIK</p>
                <p>JENJANG SEKOLAH DASAR</p>
            </div>
            <div>
                <table className="w-full leading-10">
                    <tbody>
                        <tr>
                            <td className="p-1">Nama Sekolah</td>
                            <td className="p-1 w-1">:</td>
                            <td className="p-1">{IDENTITAS_SEKOLAH}</td>
                        </tr>
                        <tr>
                            <td className="p-1">Nomor Pokok Sekolah Nasional(NPSN)</td>
                            <td className="p-1 w-1">:</td>
                            <td className="p-1">{NPSN_SEKOLAH}</td>
                        </tr>
                        <tr>
                            <td className="p-1">Nomor Statistik Sekolah</td>
                            <td className="p-1 w-1">:</td>
                            <td className="p-1">{NSS_SEKOLAH}</td>
                        </tr>
                        <tr>
                            <td className="p-1">Alamat Sekolah</td>
                            <td className="p-1 w-1">:</td>
                            <td className="p-1">{ALAMAT_JALAN}</td>
                        </tr>
                        <tr>
                            <td className="p-1">No. Telepon</td>
                            <td className="p-1 w-1">:</td>
                            <td className="p-1">-</td>
                        </tr>
                        <tr>
                            <td className="p-1">Kode Pos</td>
                            <td className="p-1 w-1">:</td>
                            <td className="p-1">{KODEPOS_SEKOLAH}</td>
                        </tr>
                        <tr>
                            <td className="p-1">Kelurahan/Desa</td>
                            <td className="p-1 w-1">:</td>
                            <td className="p-1">{KELURAHAN_SEKOLAH}</td>
                        </tr>
                        <tr>
                            <td className="p-1">Kecamatan</td>
                            <td className="p-1 w-1">:</td>
                            <td className="p-1">{KECAMATAN_SEKOLAH}</td>
                        </tr>
                        <tr>
                            <td className="p-1">Kabupaten/Kota</td>
                            <td className="p-1 w-1">:</td>
                            <td className="p-1">{KABUPATEN_KOTA}</td>
                        </tr>
                        <tr>
                            <td className="p-1">Provinsi</td>
                            <td className="p-1 w-1">:</td>
                            <td className="p-1">{PROVINSI_SEKOLAH}</td>
                        </tr>
                        <tr>
                            <td className="p-1">Surat Elektronik (email)</td>
                            <td className="p-1 w-1">:</td>
                            <td className="p-1">{EMAIL_SEKOLAH}</td>
                        </tr>
                        <tr>
                            <td className="p-1">Web Sekolah</td>
                            <td className="p-1 w-1">:</td>
                            <td className="p-1">{WEB_SEKOLAH}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}