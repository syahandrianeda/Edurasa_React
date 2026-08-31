import { InputTextArea } from "~/components/fields/fields";
import {WrapperContentForm} from "./content-wraper-fieldset";
import { useCreateItemSoalContext } from "../../reducer-item-soal/immer-reducer-context";
import { useEffect, useState } from "react";
import { Field } from "~/components/ui/field";

export function FieldInputJawabanSingkat() {
    const { action } = useCreateItemSoalContext();
    const [jawabanString, setJawabanString] = useState<string>('')
    
    useEffect(()=>{
        action({
            type:'set_item_soal',
            payload:{
                jawaban: [jawabanString]
            }
        })
    }, [jawabanString])

    return (
        <WrapperContentForm keyTitle="Jawaban Singkat">
            <Field orientation="horizontal">
                <InputTextArea
                    label=""
                    value={jawabanString}
                    className="text-wrap"
                    rows={2}
                    onChange={(e) => setJawabanString(e.currentTarget.value)}
                />
            </Field>
        </WrapperContentForm>
    );
}