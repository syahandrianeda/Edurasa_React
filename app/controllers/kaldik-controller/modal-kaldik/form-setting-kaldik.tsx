import { FormEdura, useFormEdura } from "~/components/form-custom/form-edura";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import { useModal, type ModalState } from "~/components/modals/modal-provider";
import type { KaldikType } from "~/types/kaldik";
import { useKaldikCrud } from "../crud-provider-controller/kaldik-crud-provider";
import { Fields, InputText} from "~/components/fields/fields";
import { CalendarPickerKaldik } from "~/components/form-custom/calendar";
import { BellIcon, CheckCheck, SmileIcon, TriangleAlert } from "lucide-react";
import { cn } from "~/lib/utils";
import { PreviewKaldikModal } from "./preview-kaldik-setting";
import FieldKeteranganKaldik from "./field-preview-keterangan";
import SendEditKaldik from "../crud-provider-controller/send-edit-kaldik";
import FormPreviewKaldik from "./form-preview-kaldik";
import { useEffect } from "react";

export default function FormSettingKaldik({state}:{
    state:ModalState
}){

    return (
        <FormEdura<KaldikType> data={state.payload as unknown as KaldikType}>
            {
                state.type === 'INFO'?(
                    <FormPreviewKaldik/>
                ):(
                    <>
                        <FieldSetKaldik/>
                        <ModalFooterEdura>
                            <SendEditKaldik/>
                        </ModalFooterEdura>
                    </>
                )
            }
        </FormEdura>
    )
}

export function FieldSetKaldik(){
    //sampel aja dulu:
    
    const {state:StatusCrud} = useKaldikCrud();
    const {state:modal} = useModal<KaldikType>();
    
    return (
        <fieldset disabled={StatusCrud.isSubmitting}>
            {
                modal.type === 'HAPUS'?(
                    <HapusKaldik/>
                ):(
                    
                        modal.type ==='EDIT-CUSTOM'?(
                            <p>Modal Edit Custom</p>
                        ):(
                            <TambahEditKaldik/>
                        )
                    
                    
                )
            }
        </fieldset>
        )
        
}

function TambahEditKaldik(){
    const {currentData} = useFormEdura<KaldikType>();
    return (
        <div className="grid grid-cols-1 gap-2 space-x-2 md:grid-cols-2 bg-linear-to-tl from-sky-400 to-sky-300 p-2  h-[calc(100vh-12.5rem)]  md:overflow-y-auto scrol-h-custom">
            <div className="border rounded-2xl bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg p-1 md:overflow-y-auto scrol-h-custom">
                <InputKeterangan/>
                <div className="flex flex-col md:flex-row gap-1">
                    <InputStartAt/>
                    <InputEndAt/>
                </div>
                <div className="flex flex-col md:flex-row gap-1">
                    <SelectLibur/>
                    <ColorPickerForeGround/>

                </div>
                <SelectHariEfektif/>
            </div>
            <div className="border px-2 pt-2 pb-8 flex flex-col justify-between rounded-2xl bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg">
                <PreviewKaldikModal date={currentData?.start_tgl}/>
                <FieldKeteranganKaldik date={currentData?.start_tgl}/>
            </div>
        </div>
    )
};
function HapusKaldik(){
    const {currentData,setCurrentData} = useFormEdura<KaldikType>();
    useEffect(()=>{
        setCurrentData((draft)=>{
            draft.hapus = 'hapus';
        })
    },[])
    return (
        <div className="grid grid-cols-1 gap-2 space-x-2 md:grid-cols-2 bg-linear-to-tl from-sky-400 to-sky-300 p-2 h-[calc(100vh-12.5rem)] overflow-y-auto">
            <div className="border px-10 pt-2 pb-8 flex flex-col justify-center text-center rounded-2xl bg-sky-100/50 border-sky-500 inset-shadow-sky-600 shadow-lg">
            <div className="text-2xl font-extrabold">
                <TriangleAlert size={72} className="text-rose-500 mx-auto"/>
            Anda yakin akan menghapus Agenda Kalendar Pendidikan ini?

            </div>
            </div>
            <div className="border px-2 pt-2 pb-8 flex flex-col justify-between rounded-2xl bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg">
                <PreviewKaldikModal date={currentData?.start_tgl}/>
                <FieldKeteranganKaldik date={currentData?.start_tgl}/>
            </div>
        </div>
    )
}
function InputKeterangan({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<KaldikType>();
    
    return (
        <Fields className={cn("mt-3 w-full",className)}>
            <InputText
                id="keterangan"
                value={currentData?.keterangan??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.keterangan = v;
                    })}
                }
                placeholder="Tuliskan keterangan kalender"
                label="Keterangan Kalendar"
                required
            />
        </Fields>
    )
}
function InputStartAt(){
    const {currentData, setCurrentData} = useFormEdura<KaldikType>();
    const handleDate = (value:string|Date)=>{
        setCurrentData(draft=>{
            draft.start_tgl = value as Date;
            draft.end_tgl = value as Date;
        })
    }
    return (
        <CalendarPickerKaldik
            id="strart_tgl"
            label="Tanggal Mulai"
            currentDate={currentData.start_tgl}
            handleChangeDate={handleDate}/>
    )

}
function InputEndAt(){
    const {currentData, setCurrentData} = useFormEdura<KaldikType>();
    const handleDate = (value:string|Date)=>{
        setCurrentData(draft=>{
            draft.end_tgl = value as Date
        })
    }
    return (
        <CalendarPickerKaldik
            id="end_tgl"
            label="Tanggal Akhir"
            currentDate={currentData.end_tgl}
            handleChangeDate={handleDate}/>
    )

}
function SelectHariEfektif({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<KaldikType>();
    
    if(currentData?.libur) return null;
    
    return (
        <Fields className={cn("mt-5 mb-0 w-full",className)}>
            <div className="flex gap-2 flex-col justify-center bg-white rounded-xl text-sm p-2">
                
                    <label className={cn(
                        'cursor-pointer rounded-2xl p-1 h-auto w-full select-none border border-sky-500',
                        "shadow-sm shadow-sky-300",
                        "has-checked:bg-green-400 has-checked:text-sky-900",
                        "[&>svg]:size-4 gap-2",
                        "flex justify-between items-center px-2"
                    )}>
                        Hari Efektif
                        <input
                            type="checkbox"
                            name={`is_he`}
                            className="hidden peer"
                            checked={currentData?.he}
                            onChange={(e) => setCurrentData((draft)=>{
                                        draft.he = e.target.checked
                                    })}
                        />
                    {currentData?.he && <CheckCheck/>}
                </label>
                <label className={cn(
                        'cursor-pointer rounded-2xl p-1 h-auto w-full select-none border border-sky-500',
                        "shadow-sm shadow-sky-300",
                        "has-checked:bg-green-400 has-checked:text-sky-900",
                        "[&>svg]:size-4 gap-2",
                        "flex justify-between items-center px-2"
                    )}>
                        Hari Efektif Belajar
                        <input
                            type="checkbox"
                            name={`is_heb`}
                            className="hidden peer"
                            checked={currentData?.heb}
                            onChange={(e) => setCurrentData((draft)=>{
                                        draft.heb = e.target.checked
                                    })}
                        />
                    {currentData?.heb && <CheckCheck/>}
                </label>
                <div className="p-2">
                        <ul className="list-disc list-outside ms-5 text-xs">
                            <li className="list-item">
                                <strong>Hari Efektif</strong> = Murid hadir ke sekolah, kemungkinan tidak ada aktifitas KBM intrakurikuler.
                            </li>
                            <li className="list-item">
                                <strong>Hari Efektif Belajar</strong> = Murid hadir ke sekolah dan ada aktifitas KBM. Hari Efektif Belajar digunakan untuk menghitung Jumlah Hari dan Jam Pelajaran dalam waktu tertentu (dalam satu semester/tahun).
                            </li>
                        </ul>
                    </div>
            </div>
            <div className="absolute rounded-t-xl text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 left-2 ps-2 z-10 origin-left bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:w-[calc(100%-12px)] peer-focus:w-auto peer-focus:top-1 peer-focus:left-1 peer-focus:ps-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
            Hari Efektif/Efektif Belajar
            </div>
        </Fields>
    )
}
function SelectLibur ({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<KaldikType>();
    const onChange = (v:number)=>{
        setCurrentData((draft)=>{
            draft.libur = v === 1;
            draft.he = v === 1?false:true;
            draft.heb = v === 1?false:false;
        })
    }
    
    return (
        <>
            <Fields className={cn("mt-5 mb-0 w-full md:w-1/2",className)}>
                <div className="flex gap-2 justify-center bg-white rounded-xl text-sm p-2">
                    {
                        <label className={cn(
                                'cursor-pointer rounded-2xl p-1 h-auto w-fit select-none border border-sky-500',
                                "shadow-sm shadow-sky-300",
                                "has-checked:bg-rose-400 has-checked:text-sky-100",
                                "[&>svg]:size-4 gap-2",
                                "flex justify-between items-center px-2"
                            )}>
                                Libur
                                <input
                                    type="radio"
                                    name={`is_libur`}
                                    className="hidden peer"
                                    checked={currentData?.libur}
                                    value={1}
                                    onChange={(e) => onChange(1)}
                                />
                                {currentData?.libur && <SmileIcon/>}
                            </label>
                    }
                    {
                        <label className={cn(
                                'cursor-pointer rounded-2xl p-1 h-auto w-fit select-none border border-sky-500',
                                "shadow-sm shadow-sky-300",
                                "has-checked:bg-green-400 has-checked:text-sky-900",
                                "[&>svg]:size-4 gap-2",
                                "flex justify-between items-center px-2"
                            )}>
                                Tidak Libur
                                <input
                                    type="radio"
                                    name={`is_libur`}
                                    className="hidden peer"
                                    checked={!currentData?.libur}
                                    value={0}
                                    onChange={(e) => onChange(0)}
                                />
                                {!currentData?.libur && <BellIcon/>}
                            </label>
                    }
                    
                </div>
                    
                <div className="absolute rounded-t-xl text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 left-2 ps-2 z-10 origin-left bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:w-[calc(100%-12px)] peer-focus:w-auto peer-focus:top-1 peer-focus:left-1 peer-focus:ps-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                Hari Efektif
                </div>
            </Fields>
        </>
    )
}
function ColorPickerForeGround ({className}:{className?:string}){
    return (
        <>
            <Fields className={cn("mt-5 mb-0 w-full md:w-1/2",className)}>
                <div className="flex gap-2 justify-center flex-col bg-white rounded-xl text-xs p-2">
                    <ForeGround/>
                    <BackGround/>
                </div>
                    
                <div className="absolute rounded-t-xl text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 left-2 ps-2 z-10 origin-left bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:w-[calc(100%-12px)] peer-focus:w-auto peer-focus:top-1 peer-focus:left-1 peer-focus:ps-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                Warna Tanggal
                </div>
            </Fields>
        </>
    )
}
function ForeGround(){
    const {currentData, setCurrentData} = useFormEdura<KaldikType>();
    const onChange = (v:string)=>{
        setCurrentData((draft)=>{
            draft.color = v ;
        })
    }
    return (
        <Fields className="w-full mt-2">
            <input
                type="color"
                name={`foreground`}
                className="block px-2.5 pb-2 pt-2 h-12 w-full  text-sm  mx-auto text-gray-900 rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  bg-white dark:bg-gray-700 peer"
                value={currentData?.color}
                onChange={(e) => onChange(e.target.value)}
            />
            <label className={cn(   
                "absolute rounded-t-xl text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-1 ps-2 z-10 origin-left bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:w-[calc(100%-12px)] peer-focus:w-auto peer-focus:top-1 peer-focus:left-1 peer-focus:ps-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            )}>
                Warna Huruf
            </label>
        </Fields>
    )
}
function BackGround(){
    const {currentData, setCurrentData} = useFormEdura<KaldikType>();
    const onChange = (v:string)=>{
        setCurrentData((draft)=>{
            draft.backgroundColor = v ;
        })
    }
    return (
        <Fields className="w-full mt-2">
            <input
                type="color"
                name={`foreground`}
                className="block px-2.5 pb-2 pt-2 h-12 w-full text-sm text-gray-900 rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  bg-white dark:bg-gray-700 peer"
                value={currentData?.backgroundColor}
                onChange={(e) => onChange(e.target.value)}
            />
            <label className={cn(   
                "absolute rounded-t-xl text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-1 ps-2 z-10 origin-left bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:w-[calc(100%-12px)] peer-focus:w-auto peer-focus:top-1 peer-focus:left-1 peer-focus:ps-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            )}>
                Warna Latar
            </label>
        </Fields>
    )
}

