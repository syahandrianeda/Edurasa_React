import { InputTextArea } from "~/components/fields/fields";
import {WrapperContentForm} from "./wrapper-content-form";
import { useCreateItemSoalContext } from "../reducer-item-soal/immer-reducer-context";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TaksonomiMatcher, type LkLevel, type Taksonomi } from "~/domain/taksonomi";
import { useAppSelector } from "~/context-reduct/hook";
import { TaksonomiBloomInstance } from "~/context-reduct/selectores/taksonomi-selector";
import { TextHighlighter } from "~/domain/text-highlighter/services/TextHighlighter";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";

export function FieldInputIndikatorSoal(){
    const {data, action} = useCreateItemSoalContext();
    const {indikator_soal} = data;
    const instanceOfTaksonomi = useAppSelector(TaksonomiBloomInstance);
    
    const Segments = useMemo(()=>{
        if(!instanceOfTaksonomi ) return;
        const taksonomiData = instanceOfTaksonomi.data;
        const matchTaksonomi = new TaksonomiMatcher(taksonomiData);
        const matchText = matchTaksonomi.findAll(indikator_soal);
        const matchTextCollections = matchTaksonomi.findAllCollections(indikator_soal);;//instanceOfTaksonomi.collectionMatcher(matchText)
        const highlighter = new TextHighlighter();
        const ranges = highlighter.buildHighlightRanges(matchText);
        const merged = highlighter.mergeOverlap(ranges);
        const segments = highlighter.buildSegments(indikator_soal, merged);

        return {matchText, matchTextCollections,  segments};
    },[indikator_soal, instanceOfTaksonomi])
    
    const onChangeInput = useCallback((v:string)=>{
        let lk:LkLevel = 'LK1';
        if(Segments?.matchText && Segments?.matchText.length>0){
            lk = Segments?.matchText[0].item.LK;
        }
        action({
            type:'set_item_soal',
            payload:{
                indikator_soal:v,
                lk
            }
        })
        
    },[action, indikator_soal]);

    return (
        <WrapperContentForm keyTitle='Indikator Soal'>
            <InputTextArea label="" value={indikator_soal} onChange={(e)=>onChangeInput(e.currentTarget.value)}/>
            <div className="border my-1 rounded p-1 text-xs">
                {
                        Segments?.segments?.map((segment, index) => {

                        if (!segment.highlight) {

                            return (
                                <span key={index}>
                                    {segment.text}
                                </span>
                            );

                        }

                        const level =
                            segment.matches[0].item.LK;

                        return (

                            <span
                                key={index}
                                className={
                                    level === "LK3"
                                        ? "bg-green-200"
                                        : level === "LK2"
                                        ? "bg-blue-200"
                                        : "bg-red-200" +" px-1 m-1 border rounded"
                                }
                            >
                                {segment.text}
                                <sup>{level}</sup>
                            </span>

                        );

                    })
                }
            </div>
            <div className="border my-1 rounded p-1">
                {
                    Segments?.matchTextCollections && Segments?.matchTextCollections.length>0 ? (
                        <TableWithScrolling>
                            <thead>
                                <TRowEdura>
                                    <ThEdura>LK</ThEdura>
                                    <ThEdura>Kategori Cognitif</ThEdura>
                                    <ThEdura>KKO</ThEdura>
                                </TRowEdura>
                            </thead>
                            <tbody>
                                {
                                    Segments?.matchTextCollections.map((m, i)=>
                                        m.Cognitif.map((c, iC)=>
                                            <TRowEdura key={i+''+iC}>
                                            {
                                                iC === 0 && <TdEdura key={iC} rowSpan={m.Cognitif.length}>{m.levelName} ({m.levelDefinition})</TdEdura>
                                            }
                                            <TdEdura>{c.name} ({c.description})</TdEdura>
                                            <TdEdura>{
                                                    c.kko.map((k, ik)=>
                                                        <span key={ik+''+k} className="inline-block px-1 rounded border m-0.5 text-[10px]">{k}</span>
                                                    )
                                            }</TdEdura>
                                            </TRowEdura>
                                        )
                                    )

                                }
                            </tbody>
                        </TableWithScrolling>
                    ):(
                        <p>Tidak ada Kata Kerja Operasional</p>
                    )
                }
                
            </div>
        </WrapperContentForm>
    )
}