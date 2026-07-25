import { CalendarPicker } from "~/components/form-custom/calendar"
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar"

export default function TanggalInput(){
    const {value, updateExtra} = useFilterContext<{
        currentTgalInput:Date
    }>( )
        const handleDate = (value:string|Date)=>{
            updateExtra(draft=>{
                draft.currentTgalInput = value as Date
            })
        }
        return (
            <div className="bg-linear-to-br from-sky-300 to-sky-200  dark:from-sky-800 dark:to-sky-700 px-2 py-6 gap-1">
                <div className='inner-shadow-sky-700  border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2'>
                    <h1 className="text-lg font-bold text-center">Pengaturan Tanggal Input Keuangan</h1>
                        <CalendarPicker
                            id="id_tgl_input"
                            className="mx-auto"
                            label="Tanggal Input"
                            currentDate={value?.extra?.currentTgalInput ?? new Date()}
                            handleChangeDate={handleDate}/>
                </div>
            </div>
        )
}
