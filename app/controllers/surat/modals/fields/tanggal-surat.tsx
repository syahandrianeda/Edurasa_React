import { CalendarPicker } from "~/components/form-custom/calendar";
import { useFormEdura } from "~/components/form-custom/form-edura";
import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";

export default function TanggalSurat(){
    const {currentData, setCurrentData} = useFormEdura<SuratKeluarAppType>()
    
    const handleDate = (value:string|Date)=>{
        if(!value) return;
        setCurrentData(draft=>{
            draft.tglsurat = typeof(value) === 'string'? new Date(value):value;
        })
    }
    
    return (
        <CalendarPicker
            id="id_tgl_surat"
            className="col-span-2 mt-7"
            label="Tanggal Surat"
            
            currentDate={currentData?.tglsurat ?? new Date()}
            handleChangeDate={handleDate}/>

    )
}