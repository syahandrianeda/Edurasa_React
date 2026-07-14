import { 
    FieldInfoCp,
    FieldInfoMapel,
    FieldInfoTp,
    FieldInputIndikatorSoal, 
    FieldInputPembahasan, 
    FieldInputPertanyaan, 
    FieldInputStimulan, 
    FieldSelectLevelKognitif
} from "~/controllers/bank-soal/component-item-soal"

import { useCreateItemSoalContext } from "~/controllers/bank-soal/reducer-item-soal/immer-reducer-context"
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type"
import { OptionInteractionItemSoal } from "./OptionInteractionItemSoal"
import { useModal } from "~/components/modals/modal-provider";


export default function FormulirItemSoal({description,bentukSoal}:{description:string,bentukSoal?:ListBentukSoalType}){
    const {data} = useCreateItemSoalContext();
    const { actions} = useModal();
    return (
        <>
            <h3 className="text-2xl text-center font-extrabold">Formulir Item Soal</h3>
            <p className="text-center mb-7">{description}</p>
            <button onClick={()=>actions.open('PREVIEW ITEM SOAL', data,{closeOnOutsideClick:false})}>TEST</button>
            <div className="grid md:grid-cols-12 gap-0 bg-amber-50 rounded-2xl p-2 mb-3">
                <div className="md:col-span-12"><p className="font-bold">Soal:</p></div>
                <FieldInputStimulan/>
                <FieldInputPertanyaan/>
                {
                    (bentukSoal && bentukSoal.name === 'pg')?( <OptionInteractionItemSoal bentukSoal={bentukSoal}/> 
                    ):(
                        <p>PG KOMPLEKS dan OPSI LAIN nanti</p>
                    )
                }
                <div className="md:col-span-12 mt-4">
                    <p className="font-bold">Pembahasan Soal:</p>
                    <p className="text-xs">Digunakan untuk pembahasan soal</p>
                </div>
                <FieldInputPembahasan/>
            
            </div>
            <div className="grid md:grid-cols-12 gap-0 rounded-2xl bg-red-50 p-2 mb-3">    
                <div className="md:col-span-12"><p className="font-bold">Metadata Soal:</p></div>
                <FieldInputIndikatorSoal/>
                <FieldSelectLevelKognitif/>
            </div>
            <div className="grid md:grid-cols-12 gap-0 rounded-2xl bg-green-50 p-2 mb-3">
                <div className="md:col-span-12"><p className="font-bold mt-2 mb-1">Metadata Kurikulum:</p></div>
                <FieldInfoMapel/>
                <FieldInfoTp/>
                <FieldInfoCp/>
            </div>
            <div className="border fixed print:hidden bg-sky-300 bottom-5 md:bottom-0 w-216 flex justify-center">Disinii footer</div>
        </>
    )
}