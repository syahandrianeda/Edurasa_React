import { type Dispatch, type SetStateAction } from "react"
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type"
import type { ListBentukSoalType, OpsiPilihanJawaban } from "~/types/bank-soal/bentuk-soal-type"
import EditorPgTunggal from "../fields/editor-pg-tunggal"
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { TdEdura, TRowEdura } from "~/components/tabels/tabel-components";
import EditorPgKompleks from "../fields/editor-pg-kompleks";
import KunciJawabanPreview from "~/controllers/koleksi-bank-soal/views/kunci-jawaban-preview";


type Props = {
    currentData:BankSoalAppType,
    defineNameBentukSoal:ListBentukSoalType,
    opsiPgTunggal:OpsiPilihanJawaban[],
    setOpsiTunggal:Dispatch<SetStateAction<OpsiPilihanJawaban[]>>,
    kunciPgTunggal:number[],
    handleChangKunciPgTunggal:(v:number)=>void
    
    opsiPgKompleks:OpsiPilihanJawaban[],
    setOpsiPgKompleks:Dispatch<SetStateAction<OpsiPilihanJawaban[]>>,
    kunciPgKompleks:number[],
    handleChangKunciPgKompleks:(v:number[])=>void
    
}
export default function ContentTabOpsiJawab ({
    currentData, 
    defineNameBentukSoal,
    opsiPgTunggal, 
    setOpsiTunggal,
    kunciPgTunggal,
    handleChangKunciPgTunggal,
    opsiPgKompleks, 
    setOpsiPgKompleks, 
    kunciPgKompleks,
    handleChangKunciPgKompleks,
}:Props){
    
    return (
            <div className='flex flex-col md:flex-row md:px-2 gap-1 mt-2 text-sm pb-2 overflow-y-auto scrol-h-custom'>
                <div className="md:w-72 hidden bg-sky-50 dark:bg-slate-400 shadow-lg shadow-sky-500 border-sky-300 px-1 pt-2 rounded-s-2xl gap-2 md:flex md:flex-col">
                    <TableWithScrolling inModal={true} className='border-0  text-[10px]'>
                        <tbody>
                            <TRowEdura>
                                <TdEdura className='border-0 w-12'>Kelas</TdEdura>
                                <TdEdura className='border-0 w-5'>:</TdEdura>
                                <TdEdura className='border-0'>{currentData.jenjang_khusus}</TdEdura>
                            </TRowEdura>
                            <TRowEdura>
                                <TdEdura className='border-0 w-12'>Mata Pelajaran</TdEdura>
                                <TdEdura className='border-0 w-5'>:</TdEdura>
                                <TdEdura className='border-0 text-wrap'>{currentData.mapel_name}</TdEdura>
                            </TRowEdura>
                            <TRowEdura>
                                <TdEdura className='border-0'>Indikator Soal</TdEdura>
                                <TdEdura className='border-0'>:</TdEdura>
                                <TdEdura className='border-0 text-wrap text-[8px]'>{currentData.indikator_soal}</TdEdura>
                            </TRowEdura>
                            <TRowEdura>
                                <TdEdura className='border-0'>Bentuk Soal</TdEdura>
                                <TdEdura className='border-0'>:</TdEdura>
                                <TdEdura className='border-0'>{defineNameBentukSoal?.description}</TdEdura>
                            </TRowEdura>
                            {
                                currentData?.json_alat_jawab &&  (
                                    <>
                                        <TRowEdura>
                                            <TdEdura className='border-0 align-middle'>Jumlah Opsi</TdEdura>
                                            <TdEdura className='border-0 align-middle'>:</TdEdura>
                                            <TdEdura className='border-0'>{currentData.json_alat_jawab.OpsiPilihanJawaban.length}</TdEdura>
                                        </TRowEdura>
                                        <TRowEdura>
                                            <TdEdura className='border-0 align-top'>Kunci Jawaban</TdEdura>
                                            <TdEdura className='border-0 align-top'>:</TdEdura>
                                            <TdEdura className='border-0 text-wrap align-top'><KunciJawabanPreview data={currentData.jawaban as string[]}/> <p className="text-[8px]">(klik 'set jawaban' pada editor untuk memilih kunci jawaban')</p></TdEdura>
                                        </TRowEdura>
                                    </>
                                )
                            }
                        </tbody>
                    </TableWithScrolling>
                    <TableWithScrolling className='text-[10px]'>
                            <tbody>
                            <TRowEdura>
                                <TdEdura className='border-0 w-12'>Fase</TdEdura>
                                <TdEdura className='border-0 w-5'>:</TdEdura>
                                <TdEdura className='border-0'>{currentData.snapshot_kurikulum?.fase}</TdEdura>
                            </TRowEdura>
                            <TRowEdura>
                                <TdEdura className='border-0 w-12'>Kelas</TdEdura>
                                <TdEdura className='border-0 w-5'>:</TdEdura>
                                <TdEdura className='border-0 text-wrap'>{currentData.snapshot_kurikulum?.kelas?.join(' dan ')}</TdEdura>
                            </TRowEdura>
                            <TRowEdura>
                                <TdEdura className='border-0'>Elemen</TdEdura>
                                <TdEdura className='border-0'>:</TdEdura>
                                <TdEdura className='border-0 text-[8px] text-wrap w-36'>{currentData.snapshot_kurikulum?.elemen}</TdEdura>
                            </TRowEdura>
                            <TRowEdura>
                                <TdEdura className='border-0'>TP</TdEdura>
                                <TdEdura className='border-0'>:</TdEdura>
                                <TdEdura className='border-0 w-36 text-[8px] text-wrap'>{currentData.snapshot_kurikulum?.tp_as_cp_description}</TdEdura>
                            </TRowEdura>
                            <TRowEdura>
                                <TdEdura className='border-0'>ATP</TdEdura>
                                <TdEdura className='border-0'>:</TdEdura>
                                <TdEdura className='border-0 w-36 text-[8px] text-wrap'>{currentData.snapshot_kurikulum?.atp_as_tp_description}</TdEdura>
                            </TRowEdura>
                            <TRowEdura>
                                <TdEdura className='border-0'>Lingkup Materi</TdEdura>
                                <TdEdura className='border-0'>:</TdEdura>
                                <TdEdura className='border-0 text-wrap'>{currentData.snapshot_kurikulum?.lingkup_materi}</TdEdura>
                            </TRowEdura>
                        </tbody>
                    </TableWithScrolling>
                </div>
                <div className="md:flex-2 bg-sky-50 dark:bg-slate-400 shadow-lg shadow-sky-500 px-4 md:px-2 rounded-e-2xl pt-2 h-94 overflow-y-auto scrol-h-custom">
                {
                    currentData.bentuk_soal === 'pg' && (
                        <EditorPgTunggal 
                            opsiParent={opsiPgTunggal} 
                            setOpsiParent={setOpsiTunggal}
                            kunciPgTunggal={kunciPgTunggal}
                            handleChangeKunciPgTunggal={handleChangKunciPgTunggal}
                            />
                    )
                }
                {
                    currentData.bentuk_soal === 'pg_kompleks' && (
                        <EditorPgKompleks 
                            opsiParent={opsiPgKompleks} 
                            setOpsiParent={setOpsiPgKompleks}
                            kunciPgKompleks={kunciPgKompleks}
                            handleChangeKunciPgKompleks={handleChangKunciPgKompleks}
                            />
                    )
                }
            </div>
        </div>
    )
}