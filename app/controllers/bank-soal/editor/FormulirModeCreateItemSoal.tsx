
import FieldsetPertanyaan from "../component-item-soal/fieldset/fieldset-pertanyaan";
import FieldsetOpsiJawaban from "../component-item-soal/fieldset/fieldset-opsi-jawaban";
import FieldsetPembahsan from "../component-item-soal/fieldset/fieldset-pembahasan";
import { FieldInfoCp, FieldInfoMapel, FieldInfoTp, FieldInputIndikatorSoal, FieldInputMateriPokok, FieldSelectLevelKognitif } from "../component-item-soal";
// import { FieldInputPembahasan } from "../component-item-soal";

export default function FormulirModeCreateItemSoal(){
    return (
        <>
        <div className="bg-linear-to-br  from-grey-300 to-zinc-300 shadow-md shadow-sky-600 rounded-2xl p-2 mb-3">
            <FieldsetPertanyaan/>
            <FieldsetOpsiJawaban/>
            <FieldsetPembahsan/>
        </div>
        <div className="bg-linear-to-br mt-7 from-grey-300 to-zinc-300 shadow-md shadow-sky-600 rounded-2xl p-2 mb-3">
            <FieldInputMateriPokok/>
            <FieldInputIndikatorSoal/>
            <FieldSelectLevelKognitif/>
        </div>
        <div className="bg-linear-to-br mt-7 from-grey-300 to-zinc-300 shadow-md shadow-sky-600 rounded-2xl p-2 mb-3">
            <FieldInfoMapel/>
            <FieldInfoTp/>
            <FieldInfoCp/>
        </div>
        
        </>
    )
}