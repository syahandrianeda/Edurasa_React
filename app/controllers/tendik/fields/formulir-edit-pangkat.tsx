import type { PangkatGolonganAppType } from "~/types/tendik/pangkat-golongan-app-type";
import PangkatGolonganAsn from "../fields/pangkat-golongan-asn";
import type { ReactNode } from "react";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { CalendarPicker } from "~/components/form-custom/calendar";
import type { Updater } from "use-immer";

export default function FormulirEditPangkat({children}:{children:ReactNode}){
    
    const {currentData, setCurrentData} = useFormEdura<PangkatGolonganAppType>()
    
    const handleDate = (value:string|Date)=>{
            if(!value) return;
            setCurrentData(draft=>{
                draft.start_at = typeof(value) === 'string'? new Date(value):value;
            })
        }
    return (
        <div className="min-h-8/12 mx-4 my-2 border md:min-w-10/12 p-4 bg-sky-100 shadow-sm shadow-sky-400 rounded-2xl">
                <h3 className="text-center font-bold">Informasi PTK</h3>
                {
                    children
                }
                <h3 className="text-xl font-bold text-center mt-4">Edit Pangkat dan Golongan Saat ini</h3>
                <div className="grid md:grid-cols-12 gap-2 shadow-lg bg-sky-200 shadow-sky-700 rounded-2xl p-4">
                    <div className="md:col-span-4">
                        <CalendarPicker
                                    id="id_tgl_surat"
                                    className="col-span-2"
                                    label="TMT Pangkat"
                                    
                                    currentDate={currentData?.start_at ?? new Date()}
                                    handleChangeDate={handleDate}/>
                    </div>
                    <div className="md:col-span-8">
                        <PangkatGolonganAsn value={currentData} setValue={setCurrentData as unknown as Updater<PangkatGolonganAppType>}/>
                    </div>
                </div>
            </div>
    )
}