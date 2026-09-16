import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import PopoverDisplayOpsi from "./popover-display-opsi";
import { Button } from "~/components/ui/button";
import type { FormatElemen } from "~/types/bank-soal/bentuk-soal-type";
import type { Dispatch, SetStateAction } from "react";
import { useFormEdura } from "~/components/form-custom/form-edura";
import type { DisplayFormatItemSoal } from "~/domain/paket-soal/result/display-format-item-soal";

type Props={
    modeDisplay:FormatElemen,
    setModeDisplay:Dispatch<SetStateAction<FormatElemen>>
    showStimulus:boolean,
    setShowStimulus:Dispatch<SetStateAction<boolean>>
    data:BankSoalAppType
    handleApply:()=>void
    handleEdit:()=>void
}
export default function ControlTerapkanEdit({data, modeDisplay, setModeDisplay, showStimulus, setShowStimulus, handleApply, handleEdit}:Props){
    const {currentData} = useFormEdura<DisplayFormatItemSoal>();
    return (
        <div className="flex justify-evenly items-center w-full bg-linear-to-r from-sky-300 via-amber-300 to-purple-400 border-t border-sky-400 shadow shadow-sky-100 py-1 rounded-b-2xl gap-2">
            
            <PopoverDisplayOpsi
                data={data} 
                modeDisplay={modeDisplay} 
                setModeDisplay={setModeDisplay}
                showStimulus={showStimulus} 
                setShowStimulus={setShowStimulus}
                /> 
            <Button variant="ghost" type="button" onClick={handleApply}>Terapkan</Button> 
            {(currentData.data_soal && currentData.data_soal.idbaris === data.idbaris) && <Button variant="ghost" type="button" onClick={handleEdit}>Edit</Button>}
        </div>
    )
}