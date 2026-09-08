import { InputText } from "~/components/fields/fields";
import { Field } from "~/components/ui/field";
import {useState, type ChangeEvent} from 'react';
import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";
import { countOpsion } from "~/domain/bank-soal/interaction-soal/count-options";

type Props = {
    label:string,
    id: string, 
    initialValue: string, 
    onChangeCountSoal: (v:string, name:string) => void
}

export default function InputSectionBentukSoal({
    label, 
    id,
    onChangeCountSoal,

    initialValue
}:Props){

    const [valueInput, setValueInput] = useState<string>(initialValue);
    const handleInput = (e:ChangeEvent<HTMLInputElement>)=>{
        const {value, name} = e.currentTarget;
        const number= Number(value);

        if(number > 50){
            alert('Maaf, soal dibatasi hingga 50 Soal');
            setValueInput('50');
            onChangeCountSoal('50', name);    
            return;
        }
        if(number<0){
            setValueInput('0');
            return 
        }
        setValueInput(value);
        onChangeCountSoal(value, name);
    }
    
    return (
        <Field className="relative mt-4">
            <InputText 
                label={`Section ${label}`} 
                name={id} 
                type="number" 
                min={0}
                value={valueInput}
                onChange={handleInput}
                />
        </Field>
    )
}