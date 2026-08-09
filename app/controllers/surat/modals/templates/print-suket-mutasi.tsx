import { NAMA_SEKOLAH } from "~/domain/identitas_aplikasi/identitas-aplikasi";
import type { TemplateSuratSiswa } from "~/domain/surat-orm/entity/template-surat-siswa";
import { currentTapel } from "~/lib/current-tapel";
import TemplateSuratKeterangan from "./surat-siswa/templat-surat-keterangan";


export default function PrintSuketMutasi({data, surat_keluar}:TemplateSuratSiswa){
    const tapel = currentTapel({variant:'full',date:data.keluar_tgl});
    return (
    <TemplateSuratKeterangan
        title="Surat Keterangan Mutasi/Pindah Sekolah" 
        data={data}
        surat_keluar={surat_keluar}
        komponenIdentitas={['nama','ttl','nis','nisn']}
        >
        <p className="mt-2 indent-7">Sesuai dengan Surat Permohonan Pindah yang diajukan oleh:</p>
        <div className="ps-7 my-3">
            <table>
                <tbody>
                    <tr>
                        <td className="pe-4">Nama</td>
                        <td className="pe-4">:</td>
                        <td className="pe-4">{data.pd_namaayah}</td>
                    </tr>
                    <tr>
                        <td className="pe-4">Pekerjaan</td>
                        <td className="pe-4">:</td>
                        <td className="pe-4">{data.dapo_pekerjaanayah}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p className="mt-2 indent-7">Telah mengajukan pindah ke:</p>
        <div className="ps-7 my-3">
            <table>
                <tbody>
                    <tr>
                        <td className="pe-4">Sekolah Tujuan</td>
                        <td className="pe-4">:</td>
                        <td className="pe-4">{data.pindah_ke}</td>
                    </tr>
                    <tr>
                        <td className="pe-4">ke kelas</td>
                        <td className="pe-4">:</td>
                        <td className="pe-4">{data.kelas_pindah_ke_kelas}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </TemplateSuratKeterangan>
    )
}