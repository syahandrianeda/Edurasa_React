import { CalendarPicker } from "~/components/form-custom/calendar";
import { useFormEdura } from "~/components/form-custom/form-edura";
import type { SiswaType } from "~/types/siswa";

export default function KalendarMasukTanggal(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    const handleDate = (value:string|Date)=>{
        setCurrentData(draft=>{
            draft.masuk_tgl = value as Date
        })
    }
    return (
        <CalendarPicker
            id="id_masuk_tgl"
            label="Tanggal Diterima"
            currentDate={currentData.masuk_tgl}
            handleChangeDate={handleDate}/>
    )

}
