
import FieldsetPertanyaan from "./formulir-editor/fieldset-pertanyaan";
import FieldsetOpsiJawaban from "./formulir-editor/fieldset-opsi-jawaban";
import FieldsetPembahsan from "./formulir-editor/fieldset-pembahasan";
import {  FieldInputIndikatorSoal, FieldInputMateriPokok, FieldSelectLevelKognitif } from "./formulir-editor";
import { FieldInputRefrensi } from "./formulir-editor/fieldset-input-refrensi";
import { FieldInfoPropertiKurikulum } from "./formulir-editor/fieldset-info-kurikulum";

export default function FormulirModeCreateItemSoal(){
    return (
        <>
            <div className="bg-linear-to-br  from-grey-300 to-zinc-300 shadow-md shadow-sky-600 rounded-2xl p-2 mb-3">
                <FieldsetPertanyaan/>
            </div>
            <div className="bg-linear-to-br  from-grey-300 to-zinc-300 shadow-md shadow-sky-600 rounded-2xl p-2 mb-3">
                
                <FieldsetOpsiJawaban/>
                <FieldsetPembahsan/>
            </div>
            <div className="bg-linear-to-br mt-7 from-grey-300 to-zinc-300 shadow-md shadow-sky-600 rounded-2xl p-2 mb-3">
                <FieldInputMateriPokok/>
                <FieldInputIndikatorSoal/>
            </div>
            <div className="bg-linear-to-br mt-7 from-grey-300 to-zinc-300 shadow-md shadow-sky-600 rounded-2xl p-2 mb-3">
                <FieldSelectLevelKognitif/>
            </div>
            <div className="bg-linear-to-br mt-7 from-grey-300 to-zinc-300 shadow-md shadow-sky-600 rounded-2xl p-2 mb-3">
                <FieldInfoPropertiKurikulum/>
            </div>
            
            <div className="bg-linear-to-br mt-7 from-grey-300 to-zinc-300 shadow-md shadow-sky-600 rounded-2xl p-2 mb-3">
                <FieldInputRefrensi/>
            </div>
        </>
    )
}