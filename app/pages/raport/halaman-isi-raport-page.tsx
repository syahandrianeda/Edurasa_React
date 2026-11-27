import { useAppSelector } from "~/context-reduct/hook"
import { DataSiswaAktifRombel } from "~/context-reduct/selectores/data-siswa-aktif"
import { useState } from "react";
import type { SiswaType } from "~/types/siswa";
import { useExportTarget } from "~/layouts/exports/export-target-provider";
import ButtonPrintModal from "~/controllers/modal-cetak/control-export-print";
import { Field, FieldContent, FieldGroup } from "~/components/ui/field";
import { SelectionNavigator } from "~/components/selects/selection-navigator";
import DataProfilRaport from "./comp-isi/data-profil-raport";
import DataNilaiRaport from "./comp-isi/data-nilai-raport";
import DataKokurikuler from "./comp-isi/data-kokurikuler";
import DataEkstraKurikuler from "./comp-isi/data-ekstrakurikuler";
import DataTinggiBeratBadan from "./comp-isi/data-tinggi-berat-badan";
import DataKesehatan from "./comp-isi/data-kesehatan";
import DataPrestasi from "./comp-isi/data-prestasi";
import DataAbsensiRaport from "./comp-isi/data-absensi";
import KeputusanKenaikanKelulusan from "./comp-isi/keputusan-kenaikan-kelulusan";
import DataSaran from "./comp-isi/data-Saran";
import DataTanggapanOrangTua from "./comp-isi/data-tanggapan-orangtua";

export default function HalamanIsiRaportPage(){
    const exportRef = useExportTarget('print-area-modal') as React.Ref<HTMLDivElement>;;
    const dataSiswa = useAppSelector(DataSiswaAktifRombel);
    
    const [showTtd, setShowTtd] = useState<boolean>(true)
    const [showStempel, setShowStempel] = useState<boolean>(true)
    const [siswa, setSiswa] = useState<SiswaType|null>(dataSiswa[0]??null);
    

    return (
        <>
            <div ref={exportRef}  className="flex flex-col gap-1 mb-5">
                <div className="border w-[210mm] print:w-[210mm] mb-12 break-inside-avoid print:border-0 min-h-[297mm] p-2 flex flex-col justify-start mx-auto" >
                    <h3 className="font-extrabold text-center text-2xl uppercase mb-7">Laporan Hasil Belajar</h3>
                    <DataProfilRaport siswa={siswa}/>
                    <ol className="list-[upper-alpha] list-outside pl-5 mt-3 marker:font-bold">
                        <li className="list-item flex-col mb-2">
                            <p className="font-bold">Nilai dan Capaian Kompetensi</p>
                            <DataNilaiRaport siswa={siswa}/>
                        </li>
                        <li className="list-item flex-col mb-2">
                            <p className="font-bold">Kokurikuler</p>
                            <DataKokurikuler/>
                        </li>
                        <li className="list-item flex-col mb-2">
                            <p className="font-bold">Ekstrakurikuler</p>
                            <DataEkstraKurikuler/>
                        </li>
                        <li className="list-item flex-col mb-2">
                            <p className="font-bold">Perkembangan Fisik (Tinggi dan Berat Badan)</p>
                            <DataTinggiBeratBadan/>
                        </li>
                        <li className="list-item flex-col mb-2">
                            <p className="font-bold">Perkembangan Kondisi Kesehatan</p>
                            <DataKesehatan/>
                        </li>
                        <li className="list-item flex-col mb-2">
                            <p className="font-bold">Prestasi</p>
                            <DataPrestasi/>
                        </li>
                        <li className="list-item flex-col mb-2">
                            <p className="font-bold">Ketidakhadiran</p>
                            <DataAbsensiRaport/>
                        </li>
                        <li className="list-item flex-col mb-2">
                            <p className="font-bold">Catatan Wali Kelas</p>
                            <DataSaran/>
                        </li>
                    </ol>
                    <KeputusanKenaikanKelulusan namaSiswa={siswa?.pd_nama ?? ''} keputusan="Naik Ke kelas 6"/>
                    <DataTanggapanOrangTua/>
                </div>
            </div>
            <div className="border sticky bottom-0 flex flex-row items-center rounded-t-xl p-2 bg-linear-to-b from-sky-300 to-sky-200 gap-2">
                <FieldGroup className="w-1/3 p-1 bg-sky-100 rounded-xl">
                    <FieldContent>
                        <Field orientation={'horizontal'} className="text-[10px] w-fit">
                            <input
                                type="checkbox"
                                checked={showTtd}
                                onChange={()=>setShowTtd(val=>!val)}
                                id="showTtd"
                                />
                            <label htmlFor="showTtd" className="text-nowrap">
                                Tampilkan Ttd Kepsek
                            </label>
                        </Field>
                        <Field orientation={'horizontal'} className="text-[10px] w-fit">
                            <input
                                type="checkbox"
                                checked={showStempel}
                                onChange={()=>setShowStempel(val=>!val)}
                                id="showStempel"
                                />
                            <label htmlFor="showStempel" className="text-nowrap">
                                Tampilkan Stempel
                            </label>
                        </Field>

                    </FieldContent>
                </FieldGroup>
                <SelectionNavigator
                    options={dataSiswa?? []}
                    value={siswa}
                    getValue={(item)=>String(item?.id)}
                    getLabel={(item=>item?.pd_nama ?? '')}
                    onValueChange={setSiswa}
                />
                <ButtonPrintModal className="m-0 px-4 py-0" type="portrait"/>
                    
                
            </div>
        </>
    )
}