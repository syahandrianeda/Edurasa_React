
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { TdEdura, TRowEdura } from "~/components/tabels/tabel-components";
import {useMemo} from 'react';
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";
import { useAppSelector } from "~/context-reduct/hook";
import { TaksonomiBloomInstance } from "~/context-reduct/selectores/taksonomi-selector";
import { TaksonomiMatcher } from "~/domain/taksonomi";
import { TextHighlighter } from "~/domain/text-highlighter/services/TextHighlighter";
import KunciJawabanPreview from "~/controllers/koleksi-bank-soal/views/kunci-jawaban-preview";

type Props = {
    currentData:BankSoalAppType,
    defineNameBentukSoal:ListBentukSoalType,
    promes:AtpAsOrm[]
    
}
export default function ContentTabLevelSoal ({
    currentData, 
    defineNameBentukSoal, 
    promes,
    
}:Props){
    const instanceOfTaksonomi = useAppSelector(TaksonomiBloomInstance);
        
    const matcher = useMemo(() => {
        return new TaksonomiMatcher(instanceOfTaksonomi.data);
    }, [instanceOfTaksonomi]);

    const highlighter = useMemo(() => {
        return new TextHighlighter();
    }, []);

    const analysis = useMemo(() => {
        const matchText = matcher.findAll(currentData.indikator_soal);
        const matchTextCollections = matcher.findAllCollections(currentData.indikator_soal);

        const ranges = highlighter.buildHighlightRanges(matchText);
        const merged = highlighter.mergeOverlap(ranges);
        const segments = highlighter.buildSegments(currentData.indikator_soal, merged);

        return {
            matchText,
            matchTextCollections,
            segments,
        };
    }, [currentData.indikator_soal, matcher, highlighter]);
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
                                    <TdEdura className='border-0'>{currentData.snapshot_kurikulum?.lingkup_materi}</TdEdura>
                                </TRowEdura>
                            </tbody>
                        </TableWithScrolling>
                    </div>
                    <div className="md:flex-2 bg-sky-50 dark:bg-slate-400 shadow-lg shadow-sky-500 px-4 md:px-2 pt-2 rounded-e-2xl h-94 overflow-y-auto scrol-h-custom">
                        {
                            promes.length 
                            ? (
                                <TableWithScrolling inModal={true} className="border-0 text-[10px]">
                                    <tbody>
                                        <TRowEdura>
                                            <TdEdura className="md:w-24 border-0">Tujuan Pembelajaran (ATP)</TdEdura>
                                            <TdEdura className="border-0 w-5">:</TdEdura>
                                            <TdEdura className="border-0 first-letter:uppercase">{currentData.snapshot_kurikulum?.atp_as_tp_description}</TdEdura>
                                        </TRowEdura>
                                        <TRowEdura>
                                            <TdEdura className="border-0">Indikator Soal</TdEdura>
                                            <TdEdura className="border-0">:</TdEdura>
                                            <TdEdura className="border-0">
                                                {
                                                    analysis.segments.map((segment, index) => {
                                                        if (!segment.highlight) {
                                                            return <span key={index}>{segment.text}</span>;
                                                        }
                                    
                                                        const level = segment.matches[0].item.LK;
                                    
                                                        return (
                                                            <span
                                                                key={index}
                                                                className={
                                                                    level === "LK3"
                                                                        ? "bg-green-200"
                                                                        : level === "LK2"
                                                                        ? "bg-blue-200"
                                                                        : "bg-red-200 px-1 m-1 border rounded"
                                                                }
                                                            >
                                                                {segment.text}
                                                                <sup>{level}</sup>
                                                            </span>
                                                        );
                                                    })}
                                            </TdEdura>
                                        </TRowEdura>
                                        <TRowEdura>
                                            <TdEdura className="border-0">Kata Kerja Operasional (KKO)</TdEdura>
                                            <TdEdura className="border-0">:</TdEdura>
                                            <TdEdura className="border-0">{currentData?.taksonomi?.kko}</TdEdura>
                                        </TRowEdura>
                                        <TRowEdura>
                                            <TdEdura className="border-0">Level Kognitif</TdEdura>
                                            <TdEdura className="border-0">:</TdEdura>
                                            <TdEdura className="border-0">{currentData?.taksonomi?.LK} - {currentData?.taksonomi?.levelkognitif_definisi}</TdEdura>
                                        </TRowEdura>
                                        <TRowEdura>
                                            <TdEdura className="border-0">Tingkat Taksonomi</TdEdura>
                                            <TdEdura className="border-0">:</TdEdura>
                                            <TdEdura className="border-0">{currentData?.taksonomi?.type} - ({currentData?.taksonomi?.nama_taksonomi})</TdEdura>
                                        </TRowEdura>
                                    </tbody>
                                </TableWithScrolling>
                            ) : (
                                <div className="bg-rose-300 text-center min-h-64 flex justify-center items-center">Tidak ditemukan Kurikulum untuk Mata Pelajaran {currentData.mapel_name}</div>
                            )
                        }
                </div>
            </div>
        
    )
}