import { FieldInputPertanyaan } from "../field/FieldInputPertanyaan";
import { FieldInputStimulan } from "../field/FieldInputStimulan";

export default function FieldsetPertanyaan(){
    return (
        <div className="relative gap-0 bg-linear-to-br  from-sky-300 via-emerald-300 to-purple-300 shadow-md shadow-sky-600 rounded-2xl p-2 mb-3">
            <div className="font-bold absolute -top-3 left-0 bg-sky-300 ps-1 pe-4 rounded-tr-2xl">
                Soal:
            </div>
            <FieldInputStimulan/>
            <FieldInputPertanyaan/> 
        </div>
    )
}