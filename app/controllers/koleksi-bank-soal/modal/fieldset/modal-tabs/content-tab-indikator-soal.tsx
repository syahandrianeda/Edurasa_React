import {useMemo, type Dispatch, type SetStateAction} from 'react';
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type"
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { TdEdura, TRowEdura } from "~/components/tabels/tabel-components";
import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";
import type { ListBentukSoalType } from '~/types/bank-soal/bentuk-soal-type';
import EditIndikatorSoalModal from '../edit-indikator-soal-modal';
import {type Content, type JSONContent} from '@tiptap/react'
import { useFormEdura } from '~/components/form-custom/form-edura';
import KunciJawabanPreview from '~/controllers/koleksi-bank-soal/views/kunci-jawaban-preview';

type Props = {
    
    defineNameBentukSoal:ListBentukSoalType
    
}
export default function ContentTabIndikatorSoal({
    defineNameBentukSoal,
    
    }:Props){
        const {currentData, setCurrentData} = useFormEdura<BankSoalAppType>();
    return (
            <div className='flex flex-col md:flex-row md:px-2 gap-1 mt-2 text-sm pb-2 overflow-y-auto scrol-h-custom'>
                <div className="md:w-72 hidden bg-sky-50 dark:bg-slate-400 pt-2 shadow-lg shadow-sky-500 border-sky-300 p-1 rounded-s-2xl gap-2 md:flex md:flex-col">
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
                                            <TdEdura className='border-0 align-top'><KunciJawabanPreview data={currentData.jawaban as string[]}/></TdEdura>
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
                <div className="md:flex-2 bg-sky-50 dark:bg-slate-400 pt-2 shadow-lg shadow-sky-500 px-4 md:px-2 rounded-e-2xl h-94 overflow-y-auto scrol-h-custom">
                    <EditIndikatorSoalModal/>
            </div>
        </div>
    )
}