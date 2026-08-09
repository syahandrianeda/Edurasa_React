import { NAMA_SEKOLAH } from "~/domain/identitas_aplikasi/identitas-aplikasi";
import type { TemplateSuratSiswa } from "~/domain/surat-orm/entity/template-surat-siswa";
import { currentTapel } from "~/lib/current-tapel";
import TemplateSuratKeterangan from "./surat-siswa/templat-surat-keterangan";


export default function PrintSuketDiterimaPindahan({data, surat_keluar}:TemplateSuratSiswa){
    const tapel = currentTapel({variant:'full',date:data.masuk_tgl});
    return (
    <TemplateSuratKeterangan
        title="Surat Keterangan Diterima" 
        data={data}
        surat_keluar={surat_keluar}
        komponenIdentitas={['nama','ttl','nisn','kelas']}
        >
        <p className="mt-2 indent-7">telah diterima di {NAMA_SEKOLAH}:</p>
        <div className="ps-7 my-3">
            <table>
                <tbody>
                    <tr>
                        <td className="pe-4">Diterima pada tanggal</td>
                        <td className="pe-4">:</td>
                        <td className="pe-4">{data.masuk_tgl.toLocaleDateString('id-ID', {dateStyle:'long'})}</td>
                    </tr>
                    <tr>
                        <td className="pe-4">Diterima di kelas</td>
                        <td className="pe-4">:</td>
                        <td className="pe-4">{data.awal_kelas}</td>
                    </tr>
                    <tr>
                        <td className="pe-4">Priode Pembelajaran</td>
                        <td className="pe-4">:</td>
                        <td className="pe-4">{tapel}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p className="mt-2 indent-7">Sesuai dengan Surat Keterangan Pindah Sekolah yang Bapak/Ibu kirimkan kepada Kami</p>
    </TemplateSuratKeterangan>
    )
}