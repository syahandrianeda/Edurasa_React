import { TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import { InputText, InputTextArea } from "~/components/fields/fields";
import { FormEdura, useFormEdura } from "~/components/form-custom/form-edura";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import type { ModalState } from "~/components/modals/modal-provider";
import { Field } from "~/components/ui/field";
import { useAppSelector } from "~/context-reduct/hook";
import { PropertyKurikulumMapelAktifSelector } from "~/context-reduct/selectores/kurmer-selector";
import { getNumberFromString } from "~/lib/get-number";
import type { ElemenCpType } from "~/types/kurikulum/elemen-cp";
import type { OrmKurikulumMerdekaType } from "~/types/kurikulum/kurikulum-type";
import SendCpCreate from "../crud/send-cp-create";
import { useCrudElemenCpProvider } from "../crud/crud-elemen-cp-provider";
import SendCpUpdate from "../crud/send-cp-update";

export default function FormContentCp<OrmKurikulumMerdekaType>({state}:{state:ModalState}){
    
    return (
        <FormEdura<OrmKurikulumMerdekaType> data={state.payload as unknown as OrmKurikulumMerdekaType}>
            <ContentCp state={state}/>
        </FormEdura>
    )
}
function ContentCp({state}:{state:ModalState}){
    if(state.type === 'HAPUS'){
        return (
            <DeleteContenCP/> 
        )
    }
    if(state.type === 'TAMBAH'){
        return ( 
            <CreateContenCP/>
        )
    }
    return (
        <EditContenCP/>
    )
}
function EditContenCP(){
    const {state} = useCrudElemenCpProvider();
    const dataasal = useAppSelector(PropertyKurikulumMapelAktifSelector);
    const {currentData, setCurrentData} = useFormEdura<OrmKurikulumMerdekaType>();
    const handleChangeElemen = (v:string)=> setCurrentData(draft=>{
        draft.elemen = v
    });
    const handleChangeLingkupMateri = (v:string)=> setCurrentData(draft=>{
        draft.lingkup_materi = v
    });
    const handleInputChange = (v:string)=>{
        setCurrentData(draft=>{
            draft.cp_utama = v;
        })
    };
    
    const handleInputIndexChange = (vt:string)=>{
        const v = getNumberFromString(vt);
        setCurrentData(draft=>{
            draft.index = v;
        })
    }

    return (
        <fieldset disabled={state.isSubmitting}>
            <div className="grid grid-cols-1 gap-2 space-x-2 md:grid-cols-2 bg-linear-to-tl from-sky-400 to-sky-300 p-2  h-[calc(100vh-12.5rem)]  md:overflow-y-auto scrol-h-custom">
                <div className="border rounded-2xl flex flex-col justify-center bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg p-1 md:overflow-y-auto scrol-h-custom">
                    <div className="flex md:flex-row flex-col gap-2">
                        <Field className="relative mt-4 w-3/4">
                            <InputText label="Elemen" value={currentData.elemen} onChange={(e)=>handleChangeElemen(e.currentTarget.value)}/>
                        </Field>
                        <Field className="relative mt-4 w-1/4">
                            <InputText type="number" label="Index" value={currentData.index} onChange={(e)=>handleInputIndexChange(e.target.value)}/>
                        </Field>
                    </div>
                    <div className="flex md:flex-row flex-col gap-2">
                        <Field className="relative mt-4 w-full">
                            <InputText label="Lingkup Materi" value={currentData.lingkup_materi} onChange={(e)=>handleChangeLingkupMateri(e.currentTarget.value)}/>
                        </Field>
                    </div>
                    <Field className="relative mt-4">
                        <InputTextArea className="scrol-h-custom" label="Capaian Pembelajaran" value={currentData.cp_utama} onChange={(e)=>handleInputChange(e.target.value)}/>
                    </Field>
                    <p className="text-xs">Hindari awalan 'Peserta didik mampu' atau sejenisnya agar dapat digunakan sebagai indikator deskripsi rapor</p>
                    
                </div>
                <div className="border select-none rounded-2xl bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg p-1 md:overflow-y-auto scrol-h-custom">
                    <div className="bg-white dark:bg-sky-50 p-1 m-1 rounded">
                        <p className="font-bold dark:text-black">Mata Pelajaran</p>
                        <p className="italic border p-2 text-xs text-black">{dataasal.mapel_nama}</p>
                        <p className="font-bold dark:text-black">Fase</p>
                        <p className="italic border p-2 text-xs text-black">{dataasal.currentFase.faseName}</p>
                        <p className="font-bold dark:text-black">Elemen (Elemen Yang Sedang Anda Edit)</p>
                        <p className="italic border p-2 text-xs text-black">{currentData.elemen}</p>
                        <p className="font-bold dark:text-black">CP (Yang sedang Anda Edit)</p>
                        <p className="italic border p-2 text-xs text-black">{currentData.cp_utama}</p>
                        <p className="font-bold dark:text-black">Total TP</p>
                        <p className="italic border p-2 text-xs text-black">{currentData.tp_fase_properties?.length}</p>
                    </div>
                </div>
            </div>
            <ModalFooterEdura>
                <SendCpUpdate mode="update"  data={currentData}/>
            </ModalFooterEdura>
        </fieldset>
    )
}
function CreateContenCP(){
    const dataasal = useAppSelector(PropertyKurikulumMapelAktifSelector)
    const {currentData, setCurrentData} = useFormEdura<ElemenCpType>();
    const {state:stateCrud} = useCrudElemenCpProvider();
    const handleChangeElemen = (v:string)=> setCurrentData(draft=>{
        draft.elemen = v
    });
    const handleInputChange = (v:string)=>{
        setCurrentData(draft=>{
            draft.cp_utama = v;
        })
    }
    const handleInputIndexChange = (vt:string)=>{
        const v = getNumberFromString(vt);
        setCurrentData(draft=>{
            draft.kode_elemen = v;
        })
    }
    const handleInputLingkupMateriChange = (vt:string)=>{
        
        setCurrentData(draft=>{
            draft.lingkup_materi = vt;
        })
    }
    
    return (
        <fieldset disabled={stateCrud.isSubmitting}>
            <div className="grid grid-cols-1 gap-2 space-x-2 md:grid-cols-2 bg-linear-to-tl from-sky-400 to-sky-300 p-2  h-[calc(100vh-12.5rem)]  md:overflow-y-auto scrol-h-custom">
                <div className="border flex flex-col justify-center rounded-2xl bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg p-1 md:overflow-y-auto scrol-h-custom">
                    <div className="flex md:flex-row flex-col gap-2">
                        <Field className="relative mt-4 w-3/4">
                            <InputText label="Elemen" value={currentData.elemen} onChange={(e)=>handleChangeElemen(e.currentTarget.value)}/>
                        </Field>
                        <Field className="relative mt-4 w-1/4">
                            <InputText type="number" label="Index" value={currentData.kode_elemen} onChange={(e)=>handleInputIndexChange(e.target.value)}/>
                        </Field>
                    </div>
                    <Field className="relative mt-4 w-full">
                            <InputText type="text" label="Lingkup Materi" value={currentData.lingkup_materi} onChange={(e)=>handleInputLingkupMateriChange(e.target.value)}/>
                        </Field>
                    <Field className="relative mt-4">
                        <InputTextArea className="scrol-h-custom" label="Capaian Pembelajaran" value={currentData.cp_utama} onChange={(e)=>handleInputChange(e.target.value)}/>
                    </Field>
                </div>
                <div className="border rounded-2xl  flex flex-col justify-center bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg p-1 md:overflow-y-auto scrol-h-custom">
                    <div className="bg-white dark:bg-sky-50 p-1 m-1 rounded">
                        <p className="font-bold dark:text-black">Mata Pelajaran</p>
                        <p className="italic border p-2 text-xs text-black">{dataasal.mapel_nama}</p>
                        <p className="font-bold dark:text-black">Fase</p>
                        <p className="italic border p-2 text-xs text-black">{dataasal.currentFase.faseName}</p>
                        <p className="font-bold dark:text-black">Elemen (Elemen Yang Sedang Anda Edit)</p>
                        <p className="italic border p-2 text-xs text-black">{currentData.elemen}</p>
                        <p className="font-bold dark:text-black">CP (Yang sedang Anda Edit)</p>
                        <p className="italic border p-2 text-xs text-black">{currentData.cp_utama}</p>
                        <p className="font-bold dark:text-black">Lingkup Materi</p>
                        <p className="italic border p-2 text-xs text-black">{currentData.lingkup_materi}</p>
                        <p className="font-bold dark:text-black">Index</p>
                        <p className="italic border p-2 text-xs text-black">{currentData.kode_elemen}</p>
                    </div>
                </div>
            </div>
            <ModalFooterEdura>
                <SendCpCreate data={currentData}/>
            </ModalFooterEdura>
        </fieldset>
    )
}
function DeleteContenCP(){
    const dataasal = useAppSelector(PropertyKurikulumMapelAktifSelector)
    const {currentData, setCurrentData} = useFormEdura<OrmKurikulumMerdekaType>();
    const handleChangeElemen = (v:string)=> setCurrentData(draft=>{
        draft.elemen = v
    });
    const handleInputChange = (v:string)=>{
        setCurrentData(draft=>{
            draft.cp_utama = v;
        })
    }
    return (
        <>
            <div className="grid grid-cols-1 gap-2 space-x-2 md:grid-cols-2 bg-linear-to-tl from-sky-400 to-sky-300 p-2  h-[calc(100vh-12.5rem)]  md:overflow-y-auto scrol-h-custom">
                <div className="border px-10 pt-2 pb-8 flex flex-col justify-center text-center rounded-2xl bg-sky-100/50 border-sky-500 inset-shadow-sky-600 shadow-lg">
                    <div className="text-2xl font-extrabold">
                        <TriangleAlert size={72} className="text-rose-500 mx-auto"/>
                        Anda yakin akan menghapus Elemen dan CP ini?
                    </div>
                </div>
                <div className="border rounded-2xl bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg p-1 md:overflow-y-auto scrol-h-custom">
                    <div className="bg-white dark:bg-sky-50 p-1 m-1 rounded">
                        <p className="font-bold dark:text-black">Mata Pelajaran</p>
                        <p className="italic border p-2 text-xs text-black">{dataasal.mapel_nama}</p>
                        <p className="font-bold dark:text-black">Fase</p>
                        <p className="italic border p-2 text-xs text-black">{dataasal.currentFase.faseName}</p>
                        <p className="font-bold dark:text-black">Elemen (Elemen Yang Sedang Anda Edit)</p>
                        <p className="italic border p-2 text-xs text-black">{currentData.elemen}</p>
                        <p className="font-bold dark:text-black">CP (Yang sedang Anda Edit)</p>
                        <p className="italic border p-2 text-xs text-black">{currentData.cp_utama}</p>
                        <p className="font-bold dark:text-black">Total TP</p>
                        <p className="italic border p-2 text-xs text-black">{currentData.tp_fase_properties?.length}</p>
                    </div>
                </div>
            </div>
            <ModalFooterEdura>
                <SendCpUpdate mode="delete"  data={currentData}/>
            </ModalFooterEdura>
        </>
    )
}
