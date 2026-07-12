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

export function FieldInputIndikatorSoal() {
    const { data, action } = useCreateItemSoalContext();
    const { indikator_soal } = data;

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

    const onChangeInput = useCallback(
        (value: string) => {
            const firstMatch = matcher.find(value);

            action({
                type: "set_item_soal",
                payload: {
                    indikator_soal: value,
                    lk: firstMatch?.LK ?? "LK1",
                },
            });
        },
        [action, matcher]
    );

    return (
        <WrapperContentForm keyTitle="Indikator Soal">
            <InputTextArea
                label=""
                value={indikator_soal}
                onChange={(e) => onChangeInput(e.currentTarget.value)}
            />

            <div className="border my-1 rounded p-1 text-xs">
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
                ) : (
                    <p>Tidak ada Kata Kerja Operasional</p>
                )}
            </div>
        </WrapperContentForm>
    );
}