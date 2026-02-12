import { CalendarPicker } from "~/components/form-custom/calendar";
import { useFormEdura } from "~/components/form-custom/form-edura";
import type { SiswaType } from "~/types/siswa";

export default function KalendarKeluarTanggal(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    const handleDate = (value:string|Date)=>{
        setCurrentData(draft=>{
            draft.keluar_tgl = value as Date
        })
    }
    return (
        <CalendarPicker
            id="id_keluar_tgl"
            label={currentData?.aktif === 'lulus'?"Tanggal Lulus":"Tanggal Mutasi (Keluar)"}
            currentDate={currentData?.keluar_tgl??""}
            handleChangeDate={handleDate}/>
    )

}
