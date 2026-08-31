import {useMemo} from 'react'
import { TdEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useAppSelector } from '~/context-reduct/hook';
import { TaksonomiBloomInstance } from '~/context-reduct/selectores/taksonomi-selector';
import { TaksonomiMatcher } from '~/domain/taksonomi';
import { TextHighlighter } from '~/domain/text-highlighter/services/TextHighlighter';
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";

export default function TableTaksonomiItemSoal({
        currentData,
        inModal=false,
        modeKeterangan
    }:{
        currentData:BankSoalAppType,
        inModal?:boolean
        modeKeterangan?:boolean
    }){
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
            <TableWithScrolling inModal={inModal}>
                <tbody>
                    <TRowEdura>
                        <TdEdura colSpan={3} className="text-center">
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
                    <TRowEdura>
                        <TdEdura colSpan={3} className="font-bold text-center text-sm">Properti Kurikulum</TdEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <td className="align-top px-1 border-b">Fase</td>
                        <td className="align-top px-1 border-b">:</td>
                        <td className="align-top px-1 border-b first-letter:uppercase">{currentData.snapshot_kurikulum?.fase}</td>
                    </TRowEdura>
                    <TRowEdura>
                        <td className="align-top px-1 border-b">{modeKeterangan?'ATP':'Alur Tujuan Pembelajaran (ATP)'}</td>
                        <td className="align-top px-1 border-b">:</td>
                        <td className="align-top px-1 border-b first-letter:uppercase">{currentData.snapshot_kurikulum?.atp_as_tp_description}</td>
                    </TRowEdura>
                    <TRowEdura>
                        <td className="align-top px-1 border-b">{modeKeterangan?'TP':'Tujuan Pembelajaran'}</td>
                        <td className="align-top px-1 border-b">:</td>
                        <td className="align-top px-1 border-b">{currentData.snapshot_kurikulum?.tp_as_cp_description}</td>
                    </TRowEdura>
                    <TRowEdura>
                        <td className="align-top px-1 border-b">{modeKeterangan?'CP':'Capaian Pembelajran'}</td>
                        <td className="align-top px-1 border-b">:</td>
                        <td className="align-top px-1 border-b">{currentData.snapshot_kurikulum?.cp_description}</td>
                    </TRowEdura>
                    <TRowEdura>
                        <td className="align-top px-1 border-b">Elemen</td>
                        <td className="align-top px-1 border-b">:</td>
                        <td className="align-top px-1 border-b">{currentData.snapshot_kurikulum?.elemen}</td>
                    </TRowEdura>
                    <TRowEdura>
                        <td className="align-top px-1 border-b text-nowrap">{modeKeterangan?'Lingkup Materi':'Ruang Lingkup Materi'}</td>
                        <td className="align-top px-1 border-b">:</td>
                        <td className="align-top px-1 border-b">{currentData.snapshot_kurikulum?.elemen}</td>
                    </TRowEdura>
                </tbody>
            </TableWithScrolling>
        )
}