import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { useModal } from "~/components/modals/modal-provider";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import SebaranTagihanKurikulum from "~/controllers/assesmen-penilaian/sebaran-kurikulum-tagihan";
import type TagihanPenilaianClass from "~/domain/penilaian/infrastucture/tagihan-penilian-class";
import TriggerEditTagihan from "../triggers/trigger-edit-tagihan";
import TriggerEditRespon from "../triggers/trigger-edit-respon";

export default function TableDaftarTagihanPenilaian({instanceClass}:{instanceClass?: TagihanPenilaianClass}){ 
    const dataTagihan = instanceClass ? instanceClass?.dataTagihanHasResponse ?? []:[];
    const {actions} = useModal()
    console.log({dataTagihan});
    return (
        <TableWithScrolling className="text-[10px]">
            <thead>
                <TRowEdura>
                    {/* <ThEdura className="print:hidden">Aksi</ThEdura> */}
                    <ThEdura className="text-nowrap capitalize print:hidden">Responden dan Aksi</ThEdura>
                    <ThEdura className="text-wrap capitalize">No.</ThEdura>
                    <ThEdura className="text-nowrap capitalize">Identitas Penilaian</ThEdura>
                    <ThEdura className="text-wrap capitalize">Jenis Penilaian</ThEdura>
                    <ThEdura className="text-wrap capitalize">Lintas Mata Pelajaran</ThEdura>
                    <ThEdura className="text-nowrap capitalize">Muatan Pelajaran</ThEdura>
                    <ThEdura className="text-wrap capitalize">Kompetensi Yang Diukur</ThEdura>
                    <ThEdura className="text-wrap capitalize">Sumber dan Jumlah Instrumen</ThEdura>
                    <ThEdura className="text-wrap capitalize">Pelaksanaan</ThEdura>
                    <ThEdura className="text-wrap capitalize">Tipe dan Jumlah Peserta</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                {
                    dataTagihan.length ? (
                        dataTagihan.map((item, iItem)=>
                            <TRowEdura key={iItem} className={`${item.source === 'Non Paket Soal'?"text-rose-600":""}`}>
                                {/* <TdEdura>-</TdEdura> */}
                                <TdEdura className="print:hidden text-wrap">
                                    <div className="flex flex-col gap-2 min-h-14 mb-2 justify-center items-center">
                                        
                                        <TriggerEditTagihan actions={actions} data={item}/>
                                        <TriggerEditRespon actions={actions} data={item}/>
                                        {
                                            !item.is_validPaketSoal && (
                                                <p className="text-[8px] text-amber-600">Sumber paket soal telah diubah, periksa Paket Soal yang telah dipublikasikan.</p>
                                            )
                                        }

                                    </div>
                                </TdEdura>
                                <TdEdura>{iItem + 1}</TdEdura>
                                <TdEdura className="text-wrap">
                                    {
                                        item.is_validPaketSoal ? (
                                            item.nama_publikasi
                                        ):(
                                            <>
                                                <p className="line-through text-rose-600">{item.nama_publikasi}</p>
                                                <p className="text-[8px] text-amber-800">Sumber paket soal telah diubah</p>
                                            </>

                                        )
                                            
                                    }
                                </TdEdura>
                                <TdEdura className="text-wrap">{item.jenis_tagihan.name}</TdEdura>
                                <TdEdura className="text-center">{item.isMultiple ? 'Ya':'Tidak'}</TdEdura>
                                <TdEdura className="text-wrap">
                                    {
                                        item.isMultiple ?
                                        (
                                            <ol className="list-decimal">
                                                {
                                                    item.koleksi_mapelName.map((mapel, iMapel)=>
                                                            <li key={iMapel}>{mapel}</li>
                                                        )
                                                        
                                                }
                                            </ol>
                                        ):(
                                            item.koleksi_mapelName.map((mapel, iMapel)=>
                                                <p key={iMapel}>{mapel}</p>
                                            )
                                        )
                                    }
                                </TdEdura>
                                <TdEdura className="text-nowrap text-[8px]">
                                    {
                                        item.setting_tagihan?.kurikulum && <SebaranTagihanKurikulum kurikulum={item.kurikulum_tagihan} isMultiple={item.setting_tagihan?.koleksi_mapel?.isMultiple!!}/>

                                    }
                                </TdEdura>
                                <TdEdura className="text-nowrap">{item.source}
                                    {item.setting_tagihan?.count_bentuk_soal.map((tg, iTg)=>
                                        <p key={iTg} className="flex justify-between border-b"><span>{tg.dataBentukSoal.shortName}</span><span>= {tg.count}</span></p>
                                    )}
                                    <p className="flex justify-between mt-2 border-b"><strong>Total</strong><span>{item.total_instrumen}</span></p>
                                </TdEdura>
                                <TdEdura>
                                    <div className="flex flex-col gap-2 text-[8px]">
                                        <div>
                                            <p>{item.start_time.toLocaleString('id-ID', {dateStyle:'full'})} </p>
                                            <p>Pukul: {item.start_time.toLocaleString('id-ID', {timeStyle:'long'})}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold">Batas Akses Online</p>
                                            <p>{item.end_time.toLocaleString('id-ID', {dateStyle:'full'})}</p>
                                            <p>{item.end_time.toLocaleString('id-ID', {timeStyle:'long'})}</p>

                                        </div>
                                    </div>
                                </TdEdura>
                                <TdEdura className="text-nowrap">
                                    <p>{item.target_type === 'rombel'? 'Semua Siswa di Rombel:':'Siswa Tertentu:'}</p>
                                    <ol>
                                        {
                                            item.detail_target.map((rombel, iRombel)=>
                                                <li key={iRombel} className={`${rombel.current_rombel?"font-extrabold text-green-600":"font-normal"} flex w-full justify-between border-b`}>
                                                    <p>{rombel.rombel}</p>
                                                    <p>{rombel.count} siswa</p>
                                                </li>
                                            )
                                        }
                                    </ol>
                                    <div className={`flex w-full justify-between gap-2 text-[8px] mt-2 font-bold ${item.data_respons.length === item.peserta.length ?"text-green-600" : "text-amber-600"}`}>
                                        <p>{item.data_respons.length}/{item.peserta.length}</p>
                                        <p>Peserta Merespon</p>

                                    </div>
                                    <div className={`flex w-full justify-between gap-2 text-[8px] font-bold ${item.data_respons.length === item.peserta.length ?"text-green-600" : "text-amber-600"}`}>
                                        <p>{item.data_respons.filter(s=>s.sumber_respon !== 'siswa').length}/{item.peserta.length}</p>
                                        <p>Telah divalidasi</p>

                                    </div>
                                </TdEdura>
                            </TRowEdura>

                        )
                    ):(
                        <TRowEdura>
                            <TdEdura colSpan={11} className="text-center text-wrap">Belum ada Tagihan Penilaian, Kini Anda bisa membuat data tagihan tanpa harus membuat paket soal. Silakan Buat data Tagihan penilaian</TdEdura>
                        </TRowEdura>
                    )
                }
                {/* <TRowEdura>
                    <TdEdura></TdEdura>
                    <TdEdura>1.</TdEdura>
                    <TdEdura>Sampel Identitas</TdEdura>
                    <TdEdura>Penilaian Harian</TdEdura>
                    <TdEdura>Tidak</TdEdura>
                    <TdEdura>{new Date(2027,7,10).toLocaleString('id-ID', {dateStyle:'full'})}</TdEdura>
                    <TdEdura>Rombel <br/>32 Siswa</TdEdura>
                    <TdEdura>ATP description</TdEdura>
                    <TdEdura>PG: 10, isian: 5</TdEdura>
                    <TdEdura>Paket Soal</TdEdura>
                    <TdEdura>5 Siswa belum dikoreksi</TdEdura>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura></TdEdura>
                    <TdEdura>2.</TdEdura>
                    <TdEdura>Sampel Identitas 2</TdEdura>
                    <TdEdura>Remedial</TdEdura>
                    <TdEdura>Ya</TdEdura>
                    <TdEdura>{new Date(2027,7,11).toLocaleString('id-ID', {dateStyle:'full'})}</TdEdura>
                    <TdEdura>Sebagian Siswa <br/>18 Siswa</TdEdura>
                    <TdEdura>ATP description</TdEdura>
                    <TdEdura>PG: 10, isian: 5</TdEdura>
                    <TdEdura>Paket Soal</TdEdura>
                    <TdEdura>5 Siswa belum dikoreksi</TdEdura>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura></TdEdura>
                    <TdEdura>3.</TdEdura>
                    <TdEdura>Sampel Identitas 3</TdEdura>
                    <TdEdura>Proyek</TdEdura>
                    <TdEdura>Ya</TdEdura>
                    <TdEdura>{new Date(2027,11,15).toLocaleString('id-ID', {dateStyle:'full'})}</TdEdura>
                    <TdEdura>Rombel <br/>32 Siswa</TdEdura>
                    <TdEdura className="text-wrap">ATP description 1, ATP description 2, dst</TdEdura>
                    <TdEdura>Essay: 5</TdEdura>
                    <TdEdura>Nonpaket soal</TdEdura>
                    <TdEdura>5 Siswa belum dikoreksi</TdEdura>
                </TRowEdura> */}
            </tbody>
        </TableWithScrolling>
    )
}