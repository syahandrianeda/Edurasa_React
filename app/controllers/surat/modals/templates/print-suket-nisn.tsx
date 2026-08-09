import { NAMA_SEKOLAH } from "~/domain/identitas_aplikasi/identitas-aplikasi";
import type { TemplateSuratSiswa } from "~/domain/surat-orm/entity/template-surat-siswa";
import { currentTapel } from "~/lib/current-tapel";
import TemplateSuratKeterangan from "./surat-siswa/templat-surat-keterangan";
import { namaTab } from "~/lib/nama-tab-environment";

export default function PrintSuketNisn({data, surat_keluar}:TemplateSuratSiswa){
    const tapel = currentTapel({variant:'full',date:surat_keluar.tglsurat});
    return (
    <TemplateSuratKeterangan
        title="Surat Keterangan NISN" 
        data={data}
        surat_keluar={surat_keluar}
        komponenIdentitas={['nama','ttl','nis','kelas','orang_tua']}
        >
        <p className="mt-2 indent-7">
            Adalah <strong>benar</strong> siswa tersebut adalah siswa {NAMA_SEKOLAH} dan tercatat <strong>masih aktif</strong> sebagai siswa pada Tahun Pelajaran {tapel} dengan <strong>Nomor Induk Siswa Nasional (NISN)</strong> yang terdata di DAPODIK adalah:
        </p>
        <div className="border flex p-4 my-4 gap-2 w-fit mx-auto rounded-xl font-bold text-center text-2xl border-black">
            {
                data.nisn.toString().match(/.{1,3}/g) ?.map((m, i) => 
                    <div key={i} className="px-2">
                        {
                            m.split("").map((t,ii)=><span key={i+ii} className="px-2 border border-gray-500 rounded mx-1">{t}</span>)
                        }
                    </div>
                )
            }
        </div>
    </TemplateSuratKeterangan>
    )
}