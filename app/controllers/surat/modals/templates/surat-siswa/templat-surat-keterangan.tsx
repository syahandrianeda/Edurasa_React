import { SampleDefaultKontenKop } from "~/components/toolbars/kop-ttd/default-kop";
import { KomponenKop } from "~/components/toolbars/kop-ttd/kop-ttd";
import { KABUPATEN_KOTA } from "~/domain/identitas_aplikasi/identitas-aplikasi";
import type { TemplateSuratSiswa } from "~/domain/surat-orm/entity/template-surat-siswa";
import TabelIdentitasKepsek from "./tabel-identitas-kepsek";
import TabelIdentitasIntiSiswaByTgl, { type KeyIdentitasInti } from "./tabel-identitas-inti-siswa-by-riwayat-rombel";
import type { ReactNode } from "react";
import TandatanganAtasan from "../sppd-comp/tanda-tangan-atasan";

export interface TemplatSuratKeteranganProps extends TemplateSuratSiswa{
    children:ReactNode,
    title:string
    komponenIdentitas?:KeyIdentitasInti[]
}
export default function TemplateSuratKeterangan({data, surat_keluar, komponenIdentitas, title="Surat Keterangan", children}:TemplatSuratKeteranganProps){
    const dataKop = SampleDefaultKontenKop.find(s=>s.type === 'kop2');
    
    return (
        <div className="border print:border-0 h-[310mm] px-2 pt-7 pb-2">
            <KomponenKop {...dataKop!} />
            <h3 className="text-2xl text-centert underline font-extrabold text-center uppercase">{title}</h3>
            <p className="text-center mb-5">No. {surat_keluar?.nosurat}</p>
            <p className="mt-2 indent-7">Yang bertanda tangan di bawah ini, </p>
            <div className="ps-7 my-3">
                <TabelIdentitasKepsek tgl={surat_keluar.tglsurat!}/>
            </div>
            <p className="mt-2 indent-7 mb-3">menerangkan bahwa peserta didik berikut:</p>
            <div className="ps-7 my-3">
                <TabelIdentitasIntiSiswaByTgl data={data} komponenIdentitas={komponenIdentitas} tgl={surat_keluar.tglsurat!}/>
            </div>
            {
                children
            }
            <p className="mt-2 indent-7">
                Demikian {title} ini dibuat agar dapat dipergunakan sebagaimana mestinya.
            </p>
            <div className="w-full flex justify-end mt-14">
                <div className="w-1/2 flex flex-col gap-0 items-center">
                    <p>{KABUPATEN_KOTA}, {surat_keluar.tglsurat?.toLocaleDateString('id-ID',{dateStyle:'long'})}</p>
                    <TandatanganAtasan tgl={surat_keluar.tglsurat!} className="text-center"/>
                </div>
            </div>
        </div>
    )
}