import { NAMA_SEKOLAH } from "~/domain/identitas_aplikasi/identitas-aplikasi";
import type { TemplateSuratSiswa } from "~/domain/surat-orm/entity/template-surat-siswa";
import { currentTapel } from "~/lib/current-tapel";
import TemplateSuratKeterangan from "./surat-siswa/templat-surat-keterangan";


export default function PrintSuketSiswaAktif({data, surat_keluar}:TemplateSuratSiswa){
    const tapel = currentTapel({variant:'full',date:surat_keluar.tglsurat});
    return (
    <TemplateSuratKeterangan
        title="Surat Keterangan Siswa Aktif" 
        data={data}
        surat_keluar={surat_keluar}
        komponenIdentitas={['nama','ttl','nis','nisn','kelas','orang_tua']}
        >
        <p className="mt-2 indent-7">
            Adalah <strong>benar</strong> siswa tersebut adalah siswa {NAMA_SEKOLAH} dan tercatat <strong>masih aktif</strong> sebagai siswa pada Tahun Pelajaran {tapel}.
        </p>
    </TemplateSuratKeterangan>
    )
}