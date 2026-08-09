import { SampleDefaultKontenKop } from "~/components/toolbars/kop-ttd/default-kop";
import { KomponenKop } from "~/components/toolbars/kop-ttd/kop-ttd";
import { KABUPATEN_KOTA, NAMA_SEKOLAH } from "~/domain/identitas_aplikasi/identitas-aplikasi";
import type { TemplateSuratSiswa } from "~/domain/surat-orm/entity/template-surat-siswa";
import TabelIdentitasKepsek from "./tabel-identitas-kepsek";
import { useCallback, type ReactNode } from "react";
import TandatanganAtasan from "../sppd-comp/tanda-tangan-atasan";
import { initialIdentitasInti, type KeyIdentitasInti } from "./tabel-identitas-inti-siswa-by-riwayat-rombel";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";

export interface TemplatFormatLampiranSuratKeteranganProps extends TemplateSuratSiswa<DataOrmSuratKeluarType>{
    children:ReactNode,
    title:string
    komponenIdentitas?:KeyIdentitasInti[]
}
export default function TemplateFormatLampiranSuratKeterangan({data, surat_keluar, komponenIdentitas, title="Surat Keterangan", children}:TemplatFormatLampiranSuratKeteranganProps){
    const dataKop = SampleDefaultKontenKop.find(s=>s.type === 'kop2');
    const findKomponen = useCallback((key:KeyIdentitasInti)=>{
            const found = initialIdentitasInti.find(s=>s.key === key);
            if(found){
                return found
            }
            return null;
        },[])
    
    return (
        <>
            <div className="border print:border-0 h-[310mm] px-2 pt-7 pb-2">
                <KomponenKop {...dataKop!} />
                <h3 className="text-2xl text-centert underline font-extrabold text-center uppercase">{title}</h3>
                <p className="text-center mb-5">No. {surat_keluar?.nosurat}</p>
                <p className="mt-2 indent-7">Yang bertanda tangan di bawah ini, </p>
                <div className="ps-7 my-3">
                    <TabelIdentitasKepsek tgl={surat_keluar.tglsurat!}/>
                </div>
                <p className="mt-2 indent-7 mb-3">menerangkan bahwa peserta didik dalam lampiran {title} ini:</p>
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
            <div className="print:break-before-page border print:border-0 h-[310mm] px-2 pt-7 pb-2">
                <table className="mt-4 mb-7">
                    <tbody>
                        <tr>
                            <td className="pe-4">Lampiran</td>
                            <td className="pe-4">:</td>
                            <td className="pe-4">1</td>
                        </tr>
                        <tr>
                            <td className="pe-4">No. Surat</td>
                            <td className="pe-4">:</td>
                            <td className="pe-4">{surat_keluar.nosurat}</td>
                        </tr>
                        <tr>
                            <td className="pe-4">Perihal</td>
                            <td className="pe-4">:</td>
                            <td className="pe-4">{title}</td>
                        </tr>
                    </tbody>
                </table>
                <h3 className="text-xl mb-5 uppercase text-center font-extrabold">Daftar Siswa {NAMA_SEKOLAH}</h3>
                <TableWithScrolling inModal={true}>
                    <thead>
                        <TRowEdura>
                            <ThEdura>No</ThEdura>
                            {
                                komponenIdentitas && komponenIdentitas.map((m, i)=>{
                                    const konten = findKomponen(m);
                                    if(!konten) return;
                                    return (
                                        <ThEdura key={m}>{konten.labelShort}</ThEdura>
                                    )
                                }
                                )
                            }
                        </TRowEdura>
                    </thead>
                    <tbody>
                        {
                            surat_keluar.dataTemplate?.personalSiswaType?.map((m,i)=>
                                <TRowEdura key={m.id}>
                                    <TdEdura>{i+1}</TdEdura>
                                    {
                                        komponenIdentitas && komponenIdentitas.map((mm, i)=>{
                                            const konten = findKomponen(mm);
                                            if(!konten) return;
                                            return (
                                                <TdEdura key={mm} className="capitalize">{konten.value(m)}</TdEdura>
                                            )
                                        }
                                        )
                                    }
                                </TRowEdura>
                            )
                        }
                    </tbody>
                </TableWithScrolling>
                <div className="w-full flex justify-end mt-14">
                    <div className="w-1/2 flex flex-col gap-0 items-center">
                        <p>{KABUPATEN_KOTA}, {surat_keluar.tglsurat?.toLocaleDateString('id-ID',{dateStyle:'long'})}</p>
                        <TandatanganAtasan tgl={surat_keluar.tglsurat!} className="text-center"/>
                    </div>
                </div>
            </div>
        </>
    )
}