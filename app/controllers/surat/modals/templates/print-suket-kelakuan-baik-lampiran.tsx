import type { TemplateSuratSiswa } from "~/domain/surat-orm/entity/template-surat-siswa";
import { currentTapel } from "~/lib/current-tapel";
import TemplateFormatLampiranSuratKeterangan from "./surat-siswa/templat-format-lampiran-suket";


export default function PrintSuketKelakuanBaikFormatLampiran({data, surat_keluar}:TemplateSuratSiswa){
    const tapel = currentTapel({variant:'full',date:surat_keluar.tglsurat});
    
    return (
    <TemplateFormatLampiranSuratKeterangan
        title="Surat Keterangan Berkelakuan Baik" 
        data={data}
        surat_keluar={surat_keluar}
        komponenIdentitas={['nama','ttl','nis','nisn','kelas','orang_tua']}
        >
        <div className="mt-2 indent-7">
            Sepanjang pengetahuan/Pemantauan kami selama Tahun Pelajaran {tapel}, peserta didik tersebut: 
            <ul className="list-decimal list-inside w-full">
                <li className="list-item">Berakhlak dan berperilaku baik</li>
                <li className="list-item">Tidak terlibat masalah dalam penyalahgunaan obat-obatan terlarang</li>
                <li className="list-item">Tidak terlibat masalah dalam penyimpangan perilaku dan moral</li>
                <li className="list-item">dan Tidak pernah tersangkut pelanggaran hukum lainnya</li>
            </ul>
        </div>
    </TemplateFormatLampiranSuratKeterangan>
    )
}