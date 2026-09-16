import {useMemo, type Dispatch, type SetStateAction} from 'react';
import EditPertanyaanModal from "../edit-pertanyaan-modal";
import EditStimulusModal from "../edit-stimulus-modal";
import type { BankSoalAppType, JsonAlatJawabTupple } from "~/types/bank-soal/bank-soal-type";
import type { JSONContent } from '@tiptap/react';
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { TdEdura, TRowEdura } from "~/components/tabels/tabel-components";
import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import KunciJawabanPreview from '~/controllers/koleksi-bank-soal/views/kunci-jawaban-preview';

type Props = {
    currentData:BankSoalAppType, 
    valueJsonStimulus:JSONContent|null, 
    actionStimulus:Dispatch<SetStateAction<JSONContent|null>>,
    valueJsonPertanyaan:JSONContent|null, 
    actionPertanyaan:Dispatch<SetStateAction<JSONContent|null>>,
    kelas:number,
    handleSelectjenjang:(v:string)=>void
    koleksiJenjang:number[],
    bentukSoal:string,
    handleChangeBentukSoal:(v:string)=>void
}
export default function ContentTabSoalPaket({currentData, 
    valueJsonPertanyaan,
    actionPertanyaan,
    valueJsonStimulus, 
    actionStimulus,
    kelas,
    handleSelectjenjang,
    koleksiJenjang,
    bentukSoal,
    handleChangeBentukSoal
}:Props){
        
    return (
    <div className='flex flex-col md:flex-row md:px-2 gap-1 mt-2 text-sm pb-2'>
        <div className="md:w-72 h-94 hidden bg-sky-50 shadow-lg shadow-sky-500 border-sky-300  dark:bg-slate-400 px-1 pt-2 rounded-s-2xl gap-2 md:flex md:flex-col overflow-y-auto scrol-h-custom">
            <TableWithScrolling inModal={true} className='border-0  text-[10px]'>
                <tbody>
                    <TRowEdura>
                        <TdEdura className='border-0 w-12'>Kelas</TdEdura>
                        <TdEdura className='border-0 w-5'>:</TdEdura>
                        <TdEdura className='border-0'>{kelas}</TdEdura>
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
                        <TdEdura className='border-0'>{bentukSoal}</TdEdura>
                    </TRowEdura>
                    {
                        (['pg', 'pg_kompleks', 'menjodohkan'].includes(currentData.bentuk_soal) && currentData.json_alat_jawab) &&  (
                            <>
                                <TRowEdura>
                                    <TdEdura className='border-0 align-middle'>Jumlah Opsi</TdEdura>
                                    <TdEdura className='border-0 align-middle'>:</TdEdura>
                                    <TdEdura className='border-0'>{currentData.json_alat_jawab.OpsiPilihanJawaban.length}</TdEdura>
                                </TRowEdura>
                                <TRowEdura>
                                    <TdEdura className='border-0 align-top'>Kunci Jawaban</TdEdura>
                                    <TdEdura className='border-0 align-top'>:</TdEdura>
                                    <TdEdura className='border-0 align-top'>
                                        <KunciJawabanPreview data={currentData.jawaban as string[]}/>
                                    </TdEdura>
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
                        <TdEdura className='border-0'>{currentData.snapshot_kurikulum?.kelas?.join(' dan ')}</TdEdura>
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
        <div className="md:flex-2 bg-sky-50 dark:bg-slate-400 shadow-lg shadow-sky-500 px-4 md:px-2 pt-2 rounded-e-2xl h-94 overflow-y-auto scrol-h-custom">
            <EditStimulusModal valueJson={valueJsonStimulus}  action={actionStimulus}/>
            <EditPertanyaanModal  valueJson={valueJsonPertanyaan} action={actionPertanyaan}/>
        </div>
    </div>
        
    )
}