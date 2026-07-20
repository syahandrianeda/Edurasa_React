import { CalendarPicker } from "~/components/form-custom/calendar";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { cn } from "~/lib/utils";
import type { SiswaType } from "~/types/siswa";

export default function KalendarTanggalLahir({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    const handleDate = (value:string|Date)=>{
        setCurrentData(draft=>{
            draft.pd_tanggallahir = value as Date
        })
    }
    return (
        <CalendarPicker
            id="id_pd_tanggallahir"
            label="Tanggal Lahir"
            className={cn("w-10/12", className)}
            currentDate={currentData?.pd_tanggallahir ??""}
            handleChangeDate={handleDate}/>
            
            
    )

}
