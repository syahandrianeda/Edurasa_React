import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { PaketSoalAppWithPublikasi } from "~/types/bank-soal/entities/paket-soal-app-type";
import { groupByToArray } from "~/lib/group-by";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import TriggerPaketSoal from "~/controllers/koleksi-paket-soal/triggers/trigger-paket";
import TriggerItemPublikasi from "~/controllers/koleksi-paket-soal/triggers/trigger-publikasi-paket";
import { useCallback } from "react";
import { useModal } from "~/components/modals/modal-provider";

export default function KoleksiPaketSoalPage({dataPaket}:{dataPaket:PaketSoalAppWithPublikasi[]}){
    const {actions} = useModal<PaketSoalAppWithPublikasi>()
    const showModal = useCallback((paket:PaketSoalAppWithPublikasi)=>{
        actions.open('ADD PUBLIKASI PAKET SOAL', paket, {closeOnOutsideClick:false})

    },[])
    return (
        <>
            <TableWithScrolling className="text-[10px]">
                <thead>
                    <TRowEdura>
                        <ThEdura className="text-wrap print:hidden">Aksi</ThEdura>
                        <ThEdura className="text-wrap text-center">No.</ThEdura>
                        <ThEdura className="text-wrap">Identitas Paket Soal</ThEdura>
                        <ThEdura className="text-wrap">Lintas Mata Pelajaran</ThEdura>
                        <ThEdura className="text-wrap">Tema / Muatan Pelajaran</ThEdura>
                        <ThEdura className="text-wrap">Kompetensi yang Diukur</ThEdura>
                        <ThEdura className="text-wrap">Jumlah Soal</ThEdura>
                        <ThEdura className="text-wrap">Tanggal</ThEdura>
                        <ThEdura className="text-wrap">Oleh</ThEdura>
                        <ThEdura className="text-wrap">Publikasi</ThEdura>
                    </TRowEdura>
                </thead> 
                <tbody>
                    {
                        dataPaket.length === 0 ? (
                            <TRowEdura><TdEdura colSpan={10} className="text-center">Belum ada data </TdEdura></TRowEdura>
                        ):(
                            dataPaket.map((paket, iPaket)=>{
                                    const kurikulum = groupByToArray(paket.json_setting?.kurikulum ?? [], (item)=>item.tp_as_cp_description!)
                                    return (
                                        <TRowEdura key={iPaket} className={`${!paket.is_complete?'text-rose-600':''}`}>
                                            <TdEdura>
                                                <TriggerPaketSoal data={paket}/>
                                            </TdEdura>
                                            <TdEdura className="text-center">{iPaket + 1}.</TdEdura>
                                            <TdEdura className="text-wrap">{paket.nama_paket}</TdEdura>
                                            <TdEdura className="text-wrap">{paket.lintas_mapel ?'Ya':'Tidak'}</TdEdura>
                                            <TdEdura className="text-wrap">{paket.kode_mapel}</TdEdura>
                                            <TdEdura className="text-wrap">
                                            
                                                <table className="w-full text-[8px]">
                                                    <thead>
                                                        <tr>
                                                            <td className="border border-black px-1 text-center font-bold">TP</td>
                                                            <td className="border border-black px-1 text-center font-bold">ATP</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            kurikulum.map((m, i)=>
                                                                m.data.map((mm, ii)=>
                                                                    <tr key={i+ii}>
                                                                        {
                                                                            ii === 0 && <td className="border border-black px-1 align-top" rowSpan={m.data.length}>{mm.tp_as_cp_description}</td>
                                                                        }
                                                                        <td className="border border-black px-1 align-top">{mm.atp_as_tp_description}</td>
                                                                    </tr>
                                                                )
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                            </TdEdura>
                                            <TdEdura className="text-[8px]">
                                                {
                                                    paket.json_setting && paket.json_setting.count_bentuk_soal.map((dataSesi, iSesi)=>
                                                        <p key={iSesi} className="w-full min-w-18 flex justify-between border-b"><span>{dataSesi.dataBentukSoal.shortName}</span><span>{dataSesi.count}</span></p>
                                                    )
                                                }
                                                {
                                                    <p className="w-full flex justify-between border-b"><strong>Total</strong><strong>{paket.id_banksoal.length}</strong></p>
                                                    
                                                }
                                            </TdEdura>
                                            <TdEdura className="text-[8px]">
                                                <p>
                                                    {paket?.start_time.toLocaleString('id-ID', {dateStyle:'full'})}
                                                </p>
                                                <p>Pkl.  : {paket.start_time.toLocaleString('id-ID', {timeStyle:'short'})} WIB. </p>
                                            </TdEdura>
                                            <TdEdura className="text-wrap">{paket.user}</TdEdura>
                                            <TdEdura>
                                                {
                                                    !paket.is_complete  ? 'Belum Lengkap, silakan edit' :

                                                    (
                                                        <div className="min-h-24 flex flex-col justify-between items-center">
                                                            <table className="w-full text-[7px]">
                                                                <thead>
                                                                    <tr>
                                                                        <th className="px-1 border border-black">Waktu</th>
                                                                        <th className="px-1 border border-black">Kelas</th>
                                                                        <th className="px-1 border border-black text-wrap">Jenis Tagihan</th>
                                                                        <th className="px-1 border border-black">Aksi</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                        {
                                                                            paket.data_publikasi.length === 0 ? (
                                                                                <tr>
                                                                                    <td colSpan={4} className="border bg-rose-300 border-black text-center p-1">Belum Dipublikasikan</td>
                                                                                </tr>
                                                                            ):(
                                                                                paket.data_publikasi.map((pub, iPub)=>
                                                                                    <tr key={iPub} className={pub.is_validPaketSoal?'':'text-rose-600'} title="Publikasi soal tidak valid dengan data paket soal">
                                                                                        <td className="border border-black p-1">
                                                                                            <p> { pub.start_time.toLocaleString('id-ID', {dateStyle:'full'}) } </p>
                                                                                            <p>Pkl: { pub.start_time.toLocaleString('id-ID', {timeStyle:'long'}) } </p>
                                                                                        </td>
                                                                                        <td className="border border-black p-1">
                                                                                            {
                                                                                                pub.target_rombel.join(', ')
                                                                                            }
                                                                                        </td>
                                                                                        <td className="border border-black p-1 text-center">
                                                                                            {
                                                                                                pub.jenis_tagihan
                                                                                            }
                                                                                        </td>
                                                                                        <td className="border border-black text-center p-1 align-middle">
                                                                                            <TriggerItemPublikasi data={pub}/>
                                                                                        </td>
                                                                                    </tr>
                                                                                )

                                                                            )
                                                                        }
                                                                </tbody>
                                                            </table>
                                                            <ButtonCommitAwesome className="px-2 py-0 text-[8px] mt-4 mb-1" labelButton="Publikasikan" onClick={()=>showModal(paket)}/>
                                                        </div>
                                                    )
                                                }
                                            </TdEdura>
                                        </TRowEdura>

                                    )
                                }
                            )
                        )
                    }
                </tbody>
            </TableWithScrolling>

        </>
    )
}