import { useEffect, useMemo, useState } from "react";
import { WrapperContentForm } from "./wrapper-content-form";
import type { TaksonomiAppLevelingType } from "~/types/taksonomi/taksonomi-app";
import { useAppSelector } from "~/context-reduct/hook";
import { TaksonomiBloomInstance, TaksonomiBloomPureSelector } from "~/context-reduct/selectores/taksonomi-selector";
import { Field } from "~/components/ui/field";
import { SelectField } from "~/components/fields/fields";
import { TaksonomiMatcher, type LkLevel } from "~/domain/taksonomi";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import { useCreateItemSoalContext } from "../reducer-item-soal/immer-reducer-context";
import { Button } from "~/components/ui/button";

export function FieldSelectLevelKognitif(){
    const { data, action } = useCreateItemSoalContext();

    const instanceOfTaksonomi = useAppSelector(TaksonomiBloomInstance);

    const [showTable, setShowTable] = useState(false);

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
                lk: value,
            },
        });
    }
    
    return (
            <WrapperContentForm keyTitle='Level Kognitif'>
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
                    <Button variant= "default" onClick={()=>setShowTable((b)=>!b)}>Detail KKO</Button>
                    {
                        showTable && (
                            <TableWithScrolling>
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
                                                            <span key={_iKko} className="border inline-block border-gray-500 rounded p-1 text-xs m-0.5">{dataKko}</span>
                                                        )
                                                    }
                                                </TdEdura>
                                            </TRowEdura>
                                        )
                                    }
                                </tbody>
                            </TableWithScrolling>
                        )
                    }
                </div>
            </WrapperContentForm>
        )
}