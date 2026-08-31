import { useCallback, useMemo } from "react";
import { WrapperContentForm } from "./content-wraper-fieldset";
import { useAppSelector } from "~/context-reduct/hook";
import { TaksonomiBloomInstance } from "~/context-reduct/selectores/taksonomi-selector";
import { Field } from "~/components/ui/field";
import { SelectField } from "~/components/fields/fields";
import { TaksonomiMatcher, type LkLevel } from "~/domain/taksonomi";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import { useCreateItemSoalContext } from "../../reducer-item-soal/immer-reducer-context";
import { TextHighlighter } from "~/domain/text-highlighter/services/TextHighlighter";

export function FieldSelectLevelKognitif(){
    const { data, action } = useCreateItemSoalContext();

    const instanceOfTaksonomi = useAppSelector(TaksonomiBloomInstance);

    const matcher = useMemo(() => {
        return new TaksonomiMatcher(instanceOfTaksonomi.data);
    }, [instanceOfTaksonomi]);

    const highlighter = useMemo(() => {
        return new TextHighlighter();
    }, []);

    const analysis = useMemo(() => {
        const matchText = matcher.findAll(data.indikator_soal);
        const matchTextCollections = matcher.findAllCollections(data.indikator_soal);

        const ranges = highlighter.buildHighlightRanges(matchText);
        const merged = highlighter.mergeOverlap(ranges);
        const segments = highlighter.buildSegments(data.indikator_soal, merged);

        return {
            matchText,
            matchTextCollections,
            segments,
        };
    }, [data.indikator_soal, matcher, highlighter]);
     
    const firstMatch = useMemo(()=>matcher.find(data.indikator_soal),[data.indikator_soal]);
    

    const levelKognitif = useMemo(() => {
        return instanceOfTaksonomi.Level;
    }, [instanceOfTaksonomi]);

    const selectedLk = useMemo(() => {
        return (
            levelKognitif.find(
                item => item.levelName === data.lk
            ) ?? levelKognitif[0]
        );
    }, [levelKognitif, data.lk]);

    function onChangeSelected(value: LkLevel) {
        if (value === data.lk) {
            return;
        }

        action({
            type: "set_item_soal",
            payload: {
                // lk: value,
                lk: firstMatch?.LK ?? value,
                taksonomi:firstMatch
            },
        });
    }
     const findMatchTextInTaksonomi = useCallback((query:string)=>{
            const mapingMatchText = analysis.matchText.map(m=>m.text);
            return !!mapingMatchText.find(s=>s === query)
        },[analysis])
    return (
            <WrapperContentForm keyTitle='Level Kognitif (Refrensi Taksonomi Bloom)'>
                <div className="border mt-4 mb-2">
                    <Field className="relative">
                        <SelectField
                            labelSelect="Pilih Level Kognitif (LK)"
                            id='pilih'
                            value={selectedLk?.levelName}
                            onChange={(e) =>
                                onChangeSelected(
                                    e.currentTarget.value as LkLevel
                                )
                            }
                        >
                            {levelKognitif.map((item) => (
                                <option
                                    key={item.levelName}
                                    value={item.levelName}
                                >
                                    {item.levelName}
                                </option>
                            ))}
                        </SelectField>
                    </Field>
                </div>
                <div className="border">
                    <TableWithScrolling className="text-[10px]">
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
                                                    <span key={_iKko} className={`${findMatchTextInTaksonomi(dataKko)?'bg-yellow-300':''} border inline-block border-gray-500 rounded p-1  m-0.5`}>{dataKko}</span>
                                                )
                                            }
                                        </TdEdura>
                                    </TRowEdura>
                                )
                            }
                        </tbody>
                    </TableWithScrolling>
                    
                </div>
            </WrapperContentForm>
        )
}