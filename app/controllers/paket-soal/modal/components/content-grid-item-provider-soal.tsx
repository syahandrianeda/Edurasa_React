import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import ControlTerapkanEdit from "./control-terapkan-dan-edit";
import CardSoalPreviewDisplay from "./card-soal-privew-display";
import { useFormEdura } from "~/components/form-custom/form-edura";
import {type DisplayFormatItemSoal } from "~/domain/paket-soal/result/display-format-item-soal";
import { useCallback, useState } from "react";
import {type FormatElemen } from "~/types/bank-soal/bentuk-soal-type";
import { useModal } from "~/components/modals/modal-provider";

export default function ContentGridItemProvider({noDisplay, data, trigger}:{noDisplay:number, data:BankSoalAppType, trigger:(v:DisplayFormatItemSoal)=>void}){
    const {currentData} = useFormEdura<DisplayFormatItemSoal>();
    const {actions, state} = useModal()
    const [modeDisplay, setModeDisplay] = useState<FormatElemen>(currentData?.format_display ?? 'vertical')
    const [showStimulus, setShowStimulus] = useState<boolean>(true)
    
    const handleApply = useCallback(()=>{
        
        const newDataForm:DisplayFormatItemSoal = {...currentData, format_display:modeDisplay, showStimulus, data_soal:data}
        trigger(newDataForm);
        actions.close();
    }, [currentData, data, modeDisplay, trigger, actions, showStimulus]);

    const handleEdit = useCallback(()=>{
        if(!currentData.data_soal){
            alert('soal belum diterapkan')
            return;
        }
        actions.open('EDIT ITEM SOAL PAKET', currentData.data_soal, {closeOnOutsideClick:false, backToModalType:state})
    }, []);
    
    return (
        <div className="border rounded shadow-xs flex justify-between flex-col grid-2 shadow-sky-100 bg-linear-to-br from-sky-300 via-purple-300 to-amber-300 px-1">
            <CardSoalPreviewDisplay noDisplay={noDisplay} data={data} modeDisplay={modeDisplay} showStimulus={showStimulus}/>
            <ControlTerapkanEdit data={data} 
                modeDisplay={modeDisplay}
                setModeDisplay={setModeDisplay}
                showStimulus={showStimulus}
                setShowStimulus={setShowStimulus}
                handleApply={handleApply}
                handleEdit = {handleEdit}
                />
        </div>
    )
}