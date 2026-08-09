import type { Updater } from "use-immer"
import type { SppdAppType } from "~/types/surat/sppd-app-type"
import { Input } from "~/components/ui/input";
import { useAppSelector } from "~/context-reduct/hook";
import { InstancePangkatGolonganSelector } from "~/context-reduct/selectores/pangkat-golongan-selector";
import { InstanceRiwayatIdAkun } from "~/context-reduct/selectores/riwayat-id-akun-selector";
import SelectRiwayatIdAkun from "~/controllers/surat/modals/fields/select-riwayat-id-akun";
import BuildSppd from "~/domain/surat/sppd/build-sppd";
import { Fragment, useEffect, useState } from "react";
import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";
import { SppdValueTemplate } from "~/domain/surat/klasifikasi-surat-permendagri";
import { TdEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";


interface SppdFormProps{
    suratKeluar:SuratKeluarAppType, 
    setSuratKeluar:Updater<SuratKeluarAppType>,
    sppd:SppdAppType[], 
    setSppd:Updater<SppdAppType[]>
}

export default function FormulirSppd({suratKeluar, setSuratKeluar, sppd, setSppd}:SppdFormProps){
    const pangkatGolonganSelector = useAppSelector(InstancePangkatGolonganSelector)
    const ptkAkun = useAppSelector(InstanceRiwayatIdAkun)
    const ptkAll = ptkAkun.getAkunAktifInDate(suratKeluar.tglsurat).sort((a, b)=>a.nama_guru.localeCompare(b.nama_guru))
    const pangkatGolongan = pangkatGolonganSelector.getPangkatGolonganAktifInDate(suratKeluar.tglsurat).sort((a, b)=>a.nama_user.localeCompare(b.nama_user))
    const [durasi, setDurasi] = useState<number>(1);
    const [tempatTugas, setTempatTugas] = useState<string>('');
    
    useEffect(()=>{
        if(sppd.length === 0){
            setTempatTugas('');
        }
    },[sppd.length])

    const onChangePtk = (e:React.ChangeEvent<HTMLInputElement>)=>{

        const {checked, value, dataset} = e.currentTarget;
        const collectionId = checked
                    ?[...new Set([...suratKeluar.target_ptk, Number(value)])]
                    : suratKeluar.target_ptk.filter(s=>s !== Number(value));
        const ptkSppd:SppdAppType[] = []
        for(const id of collectionId){
            // const durasi = durasi
            const foundSppd= sppd.find(s=>s.ptk_diperintah === id);
            const foundRiwayat = ptkAll.find(s=>s.user_id === id);
            const foundPangkat = pangkatGolongan.find(s=>s.user_id === id);//oundRiwayat?.user_id && s.idbaris === foundRiwayat?.idbaris)
            const textPangkat = foundPangkat?.asn === 'pns' ?
                                    `${foundPangkat?.pangkat} - ${foundPangkat?.golongan}/${foundPangkat?.ruang}`
                                    : foundPangkat?.asn ===""?
                                        ""
                                        :`${foundPangkat?.pangkat} - ${foundPangkat?.golongan}` ;
            const data = new BuildSppd()
                        .setIdbaris(foundSppd?.idbaris ?? 0)
                        // .setRefrensiSuratKeluar(currentData?.idbaris ?? 0)
                        .setPtkId(id)
                        .setLamaPerjalanan(durasi)
                        
                        .setPtkNama(foundRiwayat?.nama_guru ?? '')
                        .setPtkNip(foundRiwayat?.nip ?? '')
                        .setPtkJabatan(foundSppd?.ptk_jabatan ?? foundRiwayat?.jabatan ?? '')
                        .setNoSuratSppd(suratKeluar.nosurat)
                        .setPtkGolongan(textPangkat)
                        .setTempatSppd(tempatTugas)
                        .setTglMulaiDinas(suratKeluar?.tglsurat)
                        .setMaksudSppd(suratKeluar.perihal)
                        .data as SppdAppType;
            ptkSppd.push(data);

        }
        // setIdPtk(collectionId);
        // setIdPtk(collectionId);
        setSuratKeluar(draft=>{
            draft.target_ptk = collectionId
            }
        )
        setSppd(ptkSppd);
    };

    const handleDurasi = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setDurasi(Number(e.currentTarget.value ?? 1))
    }

    return (
        <div className="relative border mt-7 bg-linear-to-tl from-sky-300 to-sky-200 rounded-2xl p-4">
            <h3 className="absolute -top-4 left-0 bg-sky-200 ps-2 pe-4 rounded-tr-2xl">SPPD</h3>
            <div className="relative mt-7 border-2 broder-dotted px-2 py-4 border-sky-300 shadow-lg shadow-sky-500 bg-linear-to-br from-sky-200 to-sky-300 rounded-tr-4xl md:grid-cols-12 gap-2">
                <p className="absolute -top-4 text-xs -left-0.5 bg-sky-200 ps-1 pe-4 rounded-tr-2xl border-s-2 border-t border-b-0 border-e border-sky-300">Tempat dan Maksud Perjalanan</p>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
                    <div className="md:col-span-2 ps-1 pe-4 relative shadow-lg shadow-sky-400  mt-4">
                        <label htmlFor="input_durasi" className="text-[10px] absolute -top-3 left-1 bg-sky-200 ps-1 pe-4 rounded-tr-2xl border-s-2 border-t border-b-0 border-e border-sky-300">Lama Dinas (hari)</label>
                        <Input  type="number" 
                                id="input_durasi" value={durasi} 
                                onChange={handleDurasi} 
                                className="w-full p-1  border-s-2 border-b-3 border-sky-300 rounded-s-none rounded-ee-none focus-visible:border-sky-300 outline-0 focus-visible:ring-0 focus-visible:outline-none bg-sky-100 focus-within:ring-0"/>
                    </div>
                    <div className="md:col-span-10 ps-1 pe-4 shadow-lg shadow-sky-400 relative mt-7">
                        <label htmlFor="maksud_sppd" className="text-[10px] absolute -top-3 left-1 bg-sky-200 ps-1 pe-4 rounded-tr-2xl border-s-2 border-t border-b-0 border-e border-sky-300">Maksud Perjalanan Dinas</label>
                        <Input  type="text" 
                                readOnly
                                disabled
                                id="maksud_sppd" value={suratKeluar.perihal} 
                                className="w-full p-1  border-s-2 border-b-3 border-sky-300 rounded-s-none rounded-ee-none focus-visible:border-sky-300 outline-0 focus-visible:ring-0 focus-visible:outline-none bg-sky-100 focus-within:ring-0"/>
                    </div>
                </div>
                <div className="w-full ps-1 pe-4 relative shadow-lg shadow-sky-400 mt-7">
                    <label htmlFor="input_tempat" className="text-[10px] absolute -top-3 left-1 bg-sky-200 ps-1 pe-4 rounded-tr-2xl border-s-2 border-t border-b-0 border-e border-sky-300">Tempat Perjalanan</label>
                    <Input  type="text" 
                            id="input_tempat" value={tempatTugas} 
                            onChange={(e)=>setTempatTugas(e.currentTarget.value)} 
                            className="w-full p-1  border-s-2 border-b-3 border-sky-300 rounded-s-none rounded-ee-none focus-visible:border-sky-300 outline-0 focus-visible:ring-0 focus-visible:outline-none bg-sky-100 focus-within:ring-0"/>
                </div>
                
            </div>
            <div className="flex flex-col md:flex-row gap-2">
                <div className="relative border-2 w-full mt-7 p-4 border-dotted rounded-md border-sky-200 shadow-lg shadow-sky-500 bg-linear-to-br from-sky-200 to-sky-300">
                    <span className="md:absolute -top-4 left-0 bg-sky-200 pe-4 rounded-tr-2xl text-xs">Ptk Aktif di tanggal ini:</span>
                    <SelectRiwayatIdAkun activeDate={suratKeluar.tglsurat} values={suratKeluar.target_ptk} setValues={onChangePtk}/>
                </div>
                
                <div className="relative border mt-7 w-full pt-4 rounded-b-2xl rounded-tr-2xl px-4 shadow-lg shadow-sky-500 bg-linear-to-br from-sky-200 to-sky-300">
                    <span className="absolute -top-4 left-0 transnlate-y-1/2 bg-sky-200 pe-4 rounded-tr-2xl text-xs">Ptk yang diperintah:</span>
                    <div className="max-h-100 overflow-y-auto scrol-h-custom">
                        <TableWithScrolling className="border-0">
                            <tbody>
                                {
                                sppd.length? sppd.map((m, i)=>
                                    <Fragment key={i}>
                                        <TRowEdura>
                                            <td className="align-top px-2" rowSpan={4}>{i+1}.</td>
                                            <td className="px-2">Nama</td>
                                            <td className="px-2">:</td>
                                            <td className="px-2">{m.ptk_nama}</td>
                                        </TRowEdura>
                                        <TRowEdura>
                                            <td className="px-2">Pangkat/Golongan</td>
                                            <td className="px-2">:</td>
                                            <td className="px-2">{m.ptk_golongan}</td>
                                        </TRowEdura>
                                        <TRowEdura>
                                            <td className="px-2">NIP</td>
                                            <td className="px-2">:</td>
                                            <td className="px-2">{m.ptk_nip}</td>
                                        </TRowEdura>
                                        <TRowEdura>
                                            <td className="px-2">Jabatan</td>
                                            <td className="px-2">:</td>
                                            <td className="px-2">{m.ptk_jabatan}</td>
                                        </TRowEdura>
                                        <TRowEdura><td colSpan={4} className="h-4"> </td></TRowEdura>

                                    </Fragment>
                                ):(
                                    <TRowEdura>
                                        <TdEdura colSpan={4} className="text-center border-0">Tidak ada PTK yang dipilih, silakan klik nama PTK di kolom sebelumnya</TdEdura>
                                    </TRowEdura>
                                )
                                }
                            </tbody>
                        </TableWithScrolling>
                    </div>
                </div>
            </div>
        </div>
    )
}