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
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { Eye } from "lucide-react";
import TooltipComp from "~/components/ui_edura/tooltip-comp";


export default function FormulirItemSoal({description,bentukSoal}:{description:string,bentukSoal?:ListBentukSoalType}){
    const {data} = useCreateItemSoalContext();
    const { actions} = useModal();
    return (
        <>
            <h3 className="text-2xl text-center font-extrabold">Formulir Item Soal</h3>
            <p className="text-center mb-7">{description}</p>
            <div className="relative grid md:grid-cols-12 w-11/12 mx-auto gap-0 bg-linear-to-br  from-sky-300 via-emerald-300 to-purple-300 shadow-md shadow-sky-600 rounded-2xl p-2 mb-3">
                <div className="md:col-span-12"><p className="font-bold absolute -top-3 left-0 bg-sky-300 ps-1 pe-4 rounded-tr-2xl">Soal:</p></div>
                <FieldInputStimulan/>
                <FieldInputPertanyaan/>
            </div>
            <div className="grid md:grid-cols-12 w-11/12 mx-auto gap-0 bg-linear-to-br inset-shadow-lg inset-shadow-sky-800 from-sky-300 via-amber-300 to-purple-300 rounded-2xl p-2 mb-3">
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
            <div className="border fixed print:hidden bg-sky-300 bottom-5 py-2 md:bottom-0 w-216 flex justify-center">
                <TooltipComp content="Preview item Soal">
                    <ButtonCommitAwesome labelButton="Preview" className="px-4 py-0" onClick={()=>actions.open('PREVIEW ITEM SOAL', data,{closeOnOutsideClick:false})}><Eye/></ButtonCommitAwesome>
                </TooltipComp>
            </div>
        </>
    )
}