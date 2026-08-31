import {useCallback, useMemo, type Dispatch, type SetStateAction} from 'react';
import TiptapEditorSoalSimple from "~/components/editor-tip-tap/rte-formulir/TiptapEditorSoalSimple";
import type { JSONContent } from '@tiptap/react';
import { InputTextArea } from '~/components/fields/fields';
import  { Field } from '~/components/ui/field';
import { TaksonomiMatcher, type Taksonomi } from '~/domain/taksonomi';
import { useAppSelector } from '~/context-reduct/hook';
import { TaksonomiBloomInstance } from '~/context-reduct/selectores/taksonomi-selector';
import { TextHighlighter } from '~/domain/text-highlighter/services/TextHighlighter';
import { useFormEdura } from '~/components/form-custom/form-edura';
import type{ BankSoalAppType } from '~/types/bank-soal/bank-soal-type';
import TableWithScrolling from '~/components/tabels/table-with-scrolling';
import { TdEdura, ThEdura, TRowEdura } from '~/components/tabels/tabel-components';
import { data } from 'react-router';


export default function Editindikator_soalModal(){
    const {currentData, setCurrentData} = useFormEdura<BankSoalAppType>();
    const {indikator_soal} = currentData
    const instanceOfTaksonomi = useAppSelector(TaksonomiBloomInstance);
    
        const matcher = useMemo(() => {
            return new TaksonomiMatcher(instanceOfTaksonomi.data);
        }, [instanceOfTaksonomi]);
    
        const highlighter = useMemo(() => {
            return new TextHighlighter();
        }, []);
    
        const analysis = useMemo(() => {
            const matchText = matcher.findAll(indikator_soal);
            const matchTextCollections = matcher.findAllCollections(indikator_soal);
    
            const ranges = highlighter.buildHighlightRanges(matchText);
            const merged = highlighter.mergeOverlap(ranges);
            const segments = highlighter.buildSegments(indikator_soal, merged);
    
            return {
                matchText,
                matchTextCollections,
                segments,
            };
        }, [indikator_soal, matcher, highlighter]);
        
        const levelKognitif = useMemo(() => {
            return instanceOfTaksonomi.Level;
        }, [instanceOfTaksonomi]);
        
        const selectedLk = useMemo(() => {
            return (
                levelKognitif.find(
                    item => item.levelName === currentData.lk
                ) ?? levelKognitif[0]
            );
        }, [levelKognitif, currentData.lk]);

        const onChangeInput = useCallback(
            (value: string) => {
                const firstMatch = matcher.find(value);
                console.log({firstMatch})
                setCurrentData(draft=>{
                    draft.indikator_soal = value;
                    draft.lk= firstMatch?.LK ?? "LK1",
                    draft.taksonomi=firstMatch
                })
            },
            [setCurrentData, matcher]
        );
    
    const findMatchTextInTaksonomi = useCallback((query:string)=>{
        const mapingMatchText = analysis.matchText.map(m=>m.text);
        return !!mapingMatchText.find(s=>s === query)
    },[analysis])
    return (
        <>
            <div className="relative mt-4">
                <div className='absolute ps-1 pe-4 dark:bg-slate-700 rounded-tr-2xl border-s-2 border-t boreder-e -top-3.5 border-slate-400 left-2 text-[10px] bg-slate-300'>Indikator Soal:</div>
                <Field orientation="horizontal">
                <InputTextArea
                    label=""
                    value={indikator_soal}
                    className="text-wrap shadow shadow-sky-400 dark:bg-white dark:text-black"
                    rows={2}
                    onChange={(e) => onChangeInput(e.currentTarget.value)}
                />
            </Field>
            </div>
            <div className='border-b-0 text-xs mt-4 ps-1 pe-4 bg-slate-300 dark:bg-slate-600 rounded-tr-2xl border-s-2 border-t border-e -top-3.5 border-slate-400 w-fit '>Pelacakan Level Kognitif Soal</div>
            <div className="border my-0 border-t border-s shadow shadow-sky-400 dark:bg-slate-600 border-b-0 border-e-0 border-slate-400 rounded-e p-1 text-xs overflow-y-auto h-2/3 scrol-h-custom">
                <div className= "my-1 p-2 bg-white dark:bg-white dark:text-black">
                    {analysis.segments.map((segment, index) => {
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
                </div>
    
                <div className="border my-1 rounded p-1">
                    {analysis.matchTextCollections.length > 0 ? (
                        <>
                            <TableWithScrolling>
                                <thead>
                                    <TRowEdura>
                                        <ThEdura>LK</ThEdura>
                                        <ThEdura>Kategori Cognitif</ThEdura>
                                        <ThEdura>KKO</ThEdura>
                                    </TRowEdura>
                                </thead>
        
                                <tbody>
                                    {analysis.matchTextCollections.map((m, i) =>
                                        m.Cognitif.map((c, iC) => (
                                            <TRowEdura key={`${i}_${iC}`}>
                                                {iC === 0 && (
                                                    <TdEdura rowSpan={m.Cognitif.length}>
                                                        {m.levelName} ({m.levelDefinition})
                                                    </TdEdura>
                                                )}
        
                                                <TdEdura>
                                                    {c.name} ({c.description})
                                                </TdEdura>
        
                                                <TdEdura>
                                                    {c.kko.map((k, ik) => (
                                                        <span
                                                            key={`${ik}_${k}`}
                                                            className="inline-block px-1 rounded border m-0.5 text-[10px]"
                                                        >
                                                            {k}
                                                        </span>
                                                    ))}
                                                </TdEdura>
                                            </TRowEdura>
                                        ))
                                    )}
                                </tbody>
                            </TableWithScrolling>
                            <div className="text-[8px]">Penentuan LK berdasarkan KKO yang ditemukan pertama kali pada indikator soal. Berikut adalah data Taksonomi Bloom yang terdata di Edurasa</div>
                            <TableWithScrolling className='text-[8px]'>
                                <thead>
                                    <TRowEdura>
                                        <ThEdura colSpan={3}>{selectedLk?.levelName}</ThEdura>
                                    </TRowEdura>
                                    <TRowEdura>
                                        <ThEdura>Kode Kognitif</ThEdura>
                                        <ThEdura>Nama</ThEdura>
                                        <ThEdura>Kata Kerja Operasional (KKO)</ThEdura>
                                    </TRowEdura>
                                </thead>
                                <tbody>
                                    {
                                        selectedLk.Cognitif.map((row, index)=>
                                            <TRowEdura key={index}>
                                                <TdEdura>{row.name}</TdEdura>
                                                <TdEdura>{row.description}</TdEdura>
                                                <TdEdura className="text-wrap">
                                                    {
                                                        row.kko.map((dataKko, _iKko)=>
                                                            <span key={_iKko} className={`${findMatchTextInTaksonomi(dataKko)?'bg-yellow-300':''} border inline-block border-gray-500 rounded p-1 text-[8px] m-0.5`}>{dataKko}</span>
                                                        )
                                                    }
                                                </TdEdura>
                                            </TRowEdura>
                                        )
                                    }
                                </tbody>
                            </TableWithScrolling>
                        </>
                    ) : (
                        <p>Tidak ada Kata Kerja Operasional</p>
                    )}
                </div>
            </div>

        </>
    )
}