import { FormEdura, useFormEdura } from "~/components/form-custom/form-edura";
import type { ModalState } from "~/components/modals/modal-provider";
import { useAppSelector } from "~/context-reduct/hook";
import { PropertyKurikulumMapelAktifSelector } from "~/context-reduct/selectores/kurmer-selector";
import type { OrmFaseKurikulumType, OrmKurikulumMerdekaType } from "~/types/kurikulum/kurikulum-type";
import { Field } from "~/components/ui/field";
import { InputTextArea, SelectField } from "~/components/fields/fields";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import {  useEffect,  useState} from "react";
import SendTpCreate from "../crud/send-tp-create";
import SendTpUpdate from "../crud/send-tp-update";
import { useCrudTpFaseProvider } from "../crud/crud-tp-fase-provider";
import { TriangleAlert } from "lucide-react";
import TpPageRoute from "~/routes/kurikulum/atp-page";


export default function FormContentFaseTp<OrmFaseKurikulumType>({state}:{state:ModalState}){
    
    return (
        <FormEdura<OrmFaseKurikulumType> data={state.payload as unknown as OrmFaseKurikulumType}>
            <ContentFaseTp state={state}/>
        </FormEdura>
    )
}
function ContentFaseTp({state}:{state:ModalState}){
    if(state.type === 'HAPUS TP'){
        return (
            <DeleteContenFaseTp/> 
        )
    }
    if(state.type === 'TAMBAH TP'){
        return ( 
            <CreateContenFaseTp/>
        )
    }
    return (
        <EditContenFaseTp/>
    )
}
function EditContenFaseTp(){
    const dataasal = useAppSelector(PropertyKurikulumMapelAktifSelector)
    const {currentData, setCurrentData} = useFormEdura<OrmFaseKurikulumType>();
    const {state:stateCrud} = useCrudTpFaseProvider();
    const [dataCp, setDataCp]= useState<OrmKurikulumMerdekaType|null>(null);
    const [dataIdElemen, setDataIdElemen]= useState<number>(0);
    
    const handleChangeElemen = (v:number)=>{
        const findCP = dataasal.currentFase.elemen_cp.find(s=>s.id_elemen_cp === v);
        setDataIdElemen(findCP?.id_elemen_cp??0)
        console.log('id elemen cp', findCP?.id_elemen_cp, findCP)
        setCurrentData(draft=>{
            draft.source_data_tp = {
                idbaris:draft.idbaris_tp,
                foreignkey_elemencp:findCP?.id_elemen_cp??0,// dataIdElemen,//,Number(findCP?.id_elemen_cp)??0,
                status:'',
                tp:draft.tp

            }
        });
        if(findCP) setDataCp(findCP);
    };
    useEffect(()=>{
        const sourceIdCp = currentData.source_data_tp?.foreignkey_elemencp;
        const findCP = dataasal.currentFase.elemen_cp.find(s=>s.id_elemen_cp === sourceIdCp);
        if(findCP){
            setDataCp(findCP);
            setDataIdElemen(findCP.id_elemen_cp)
            // setCurrentData(draft=>draft.fase_name=dataasal.currentFase.faseName)
        }
    },[dataasal]);
    
    const handleInputChange = (vt:string)=>{
        setCurrentData(draft=>{
            draft.tp = vt;
            draft.source_data_tp = {
                idbaris:draft.idbaris_tp,
                foreignkey_elemencp: dataIdElemen,//,Number(findCP?.id_elemen_cp)??0,
                status:'',
                tp:draft.tp,
            }
        })
    };
    console.log('data form', currentData)
    return (
        <fieldset disabled={stateCrud.isSubmitting}>
            <div className="grid grid-cols-1 gap-2 space-x-2 md:grid-cols-2 bg-linear-to-tl from-sky-400 to-sky-300 p-2  h-[calc(100vh-12.5rem)]  md:overflow-y-auto scrol-h-custom">
                <div className="border flex flex-col justify-start rounded-2xl bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg p-1 md:overflow-y-auto scrol-h-custom">
                    <Field className="relative mt-4">
                        <SelectField 
                            labelSelect="Pilih Elemen & CP"
                            value={currentData?.source_data_tp?.foreignkey_elemencp}
                            onChange={(e)=>handleChangeElemen(Number(e.currentTarget.value))}
                            >
                            {
                                dataasal.currentFase.elemen_cp.map(({elemen,cp_utama, id_elemen_cp},index)=>
                                    <option value={id_elemen_cp} key={index}>{cp_utama}</option>
                                )
                            }
                        </SelectField>
                    </Field>
                    <div className="border p-2 text-xs italic rounded bg-sky-50">{dataCp?.cp_utama}</div>
                    
                    <Field className="relative mt-4">
                        <InputTextArea className="scrol-h-custom" label={`Tujuan Pembelajaran`} value={currentData.tp} onChange={(e)=>handleInputChange(e.target.value)}/>
                    </Field>
                </div>
                <div className="border rounded-2xl  flex flex-col justify-start bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg p-1 md:overflow-y-auto scrol-h-custom">
                    <div className="bg-white dark:bg-sky-50 p-1 m-1 rounded">
                        <div className="flex flex-col md:flex-row align-items-center gap-2">
                            <p className="font-bold dark:text-black">Mata Pelajaran</p>
                            <p className="italic border p-2 text-xs text-black align-middle">{dataasal.mapel_nama}</p>
                            <p className="font-bold dark:text-black">Fase</p>
                            <p className="italic border p-2 text-xs text-black">{currentData.fase_name}</p>
                        </div>
                        <p className="font-bold dark:text-black">Elemen (Elemen Yang Sedang Anda Pilih)</p>
                        <p className="italic border p-2 text-xs text-black">{dataCp?.elemen}</p>
                        <p className="font-bold dark:text-black">CP (Yang sedang Anda Pilih | ({currentData?.source_data_tp?.foreignkey_elemencp}) )</p>
                        <p className="italic border p-2 text-xs text-black">{dataCp?.cp_utama}</p>
                        <p className="font-bold dark:text-black">TP (Yang sedang Anda Edit |  ({currentData?.idbaris_tp}))</p>
                        <p className="italic border p-2 text-xs text-black">{currentData.tp}</p>
                    </div>
                </div>
            </div>
            <ModalFooterEdura>
                <SendTpUpdate data={currentData} mode="update"/>
            </ModalFooterEdura>
        </fieldset>
    )
    
}
function CreateContenFaseTp(){
    const dataasal = useAppSelector(PropertyKurikulumMapelAktifSelector)
    const {currentData, setCurrentData} = useFormEdura<OrmFaseKurikulumType>();
    const {state:stateCrud} = useCrudTpFaseProvider();
    const [dataCp, setDataCp]= useState<OrmKurikulumMerdekaType|null>(null);
    const [dataIdElemen, setDataIdElemen]= useState<number>(0);
    
    const handleChangeElemen = (v:number)=>{
        const findCP = dataasal.currentFase.elemen_cp.find(s=>s.id_elemen_cp === v);
        setDataIdElemen(findCP?.id_elemen_cp??0)
        
        setCurrentData(draft=>{
            draft.source_data_tp = {
                idbaris:0,
                foreignkey_elemencp: dataIdElemen,//,Number(findCP?.id_elemen_cp)??0,
                status:'',
                tp:draft.tp

            }
        });
        if(findCP) setDataCp(findCP);
    };
    useEffect(()=>{
        const findCP = dataasal.currentFase.elemen_cp[0];
        if(findCP){
            setDataCp(findCP);
            setDataIdElemen(findCP.id_elemen_cp)
            // setCurrentData(draft=>draft.fase_name=dataasal.currentFase.faseName)
        }
    },[]);
    
    const handleInputChange = (vt:string)=>{
        setCurrentData(draft=>{
            draft.tp = vt;
            draft.source_data_tp = {
                idbaris:0,
                foreignkey_elemencp: dataIdElemen??0,
                status:'',
                tp:vt

            }
        })
    };
    
    return (
        <fieldset disabled={stateCrud.isSubmitting}>
            <div className="grid grid-cols-1 gap-2 space-x-2 md:grid-cols-2 bg-linear-to-tl from-sky-400 to-sky-300 p-2  h-[calc(100vh-12.5rem)]  md:overflow-y-auto scrol-h-custom">
                <div className="border flex flex-col justify-start rounded-2xl bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg p-1 md:overflow-y-auto scrol-h-custom">
                    <Field className="relative mt-4">
                        <SelectField 
                            labelSelect="Pilih Elemen & CP"
                            value={currentData?.source_data_tp?.foreignkey_elemencp}
                            onChange={(e)=>handleChangeElemen(Number(e.currentTarget.value))}
                            >
                            {
                                dataasal.currentFase.elemen_cp.map(({elemen,cp_utama, id_elemen_cp},index)=>
                                    <option value={id_elemen_cp} key={index}>{cp_utama}</option>
                                )
                            }
                        </SelectField>
                    </Field>
                    <div className="border p-2 text-xs italic rounded bg-sky-50">{dataCp?.cp_utama}</div>
                    
                    <Field className="relative mt-4">
                        <InputTextArea className="scrol-h-custom" label="Tujuan Pembelajaran" value={currentData.tp} onChange={(e)=>handleInputChange(e.target.value)}/>
                        <p>Hindari awalan 'Peserta didik mampu' atau sejenisnya agar dapat digunakan sebagai indikator deskripsi rapor</p>
                    </Field>
                </div>
                <div className="border rounded-2xl  flex flex-col justify-center bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg p-1 md:overflow-y-auto scrol-h-custom">
                    <div className="bg-white dark:bg-sky-50 p-1 m-1 rounded">
                        <p className="font-bold dark:text-black">Mata Pelajaran</p>
                        <p className="italic border p-2 text-xs text-black">{dataasal.mapel_nama}</p>
                        <p className="font-bold dark:text-black">Fase</p>
                        <p className="italic border p-2 text-xs text-black">{currentData.fase_name}</p>
                        <p className="font-bold dark:text-black">Elemen (Elemen Yang Sedang Anda Pilih)</p>
                        <p className="italic border p-2 text-xs text-black">{dataCp?.elemen}</p>
                        <p className="font-bold dark:text-black">CP (Yang sedang Anda Pilih)</p>
                        <p className="italic border p-2 text-xs text-black">{dataCp?.cp_utama}</p>
                        <p className="font-bold dark:text-black">TP (Yang sedang Anda Edit)</p>
                        <p className="italic border p-2 text-xs text-black">{currentData.tp}</p>
                    </div>
                </div>
            </div>
            <ModalFooterEdura>
                <SendTpCreate data={currentData}/>
            </ModalFooterEdura>
        </fieldset>
    )
}

function DeleteContenFaseTp(){
    const dataasal = useAppSelector(PropertyKurikulumMapelAktifSelector)
    const {currentData, setCurrentData} = useFormEdura<OrmFaseKurikulumType>();
    const {state:stateCrud} = useCrudTpFaseProvider();
    const [dataCp, setDataCp]= useState<OrmKurikulumMerdekaType|null>(null);
    const [dataIdElemen, setDataIdElemen]= useState<number>(0);
    
    const handleChangeElemen = (v:number)=>{
        const findCP = dataasal.currentFase.elemen_cp.find(s=>s.id_elemen_cp === v);
        setDataIdElemen(findCP?.id_elemen_cp??0)
        
        setCurrentData(draft=>{
            draft.source_data_tp = {
                idbaris:draft.idbaris_tp,
                foreignkey_elemencp: findCP?.id_elemen_cp ?? 0,//dataIdElemen,//,Number(findCP?.id_elemen_cp)??0,
                status:'hapus',
                tp:draft.tp
            }
        });
        if(findCP) setDataCp(findCP);
    };
    useEffect(()=>{
        const sourceIdCp = currentData.source_data_tp?.foreignkey_elemencp;
        const findCP = dataasal.currentFase.elemen_cp.find(s=>s.id_elemen_cp === sourceIdCp);
        if(findCP){
            setDataCp(findCP);
            setDataIdElemen(findCP.id_elemen_cp)
        }
    },[]);
    
    const handleInputChange = (vt:string)=>{
        setCurrentData(draft=>{
            draft.tp = vt;
            // draft.source_data_tp.tp = vt
            draft.source_data_tp = {
                idbaris:draft.idbaris_tp,
                foreignkey_elemencp: dataIdElemen,//,Number(findCP?.id_elemen_cp)??0,
                status:'hapus',
                tp:vt,
            }
        })
    };
    
    return (
        <fieldset disabled={stateCrud.isSubmitting}>
            <div className="grid grid-cols-1 gap-2 space-x-2 md:grid-cols-2 bg-linear-to-tl from-sky-400 to-sky-300 p-2  h-[calc(100vh-12.5rem)]  md:overflow-y-auto scrol-h-custom">
                <div className="border px-10 pt-2 pb-8 flex flex-col justify-center text-center rounded-2xl bg-sky-100/50 border-sky-500 inset-shadow-sky-600 shadow-lg">
                    <div className="text-2xl font-extrabold">
                        <TriangleAlert size={72} className="text-rose-500 mx-auto"/>
                        Anda yakin akan menghapus Tujuan Pembelajaran ini?
                    </div>
                </div>
                <div className="border rounded-2xl  flex flex-col justify-center bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg p-1 md:overflow-y-auto scrol-h-custom">
                    <div className="bg-white dark:bg-sky-50 p-1 m-1 rounded">
                        <p className="font-bold dark:text-black">Mata Pelajaran</p>
                        <p className="italic border p-2 text-xs text-black">{dataasal.mapel_nama}</p>
                        <p className="font-bold dark:text-black">Fase</p>
                        <p className="italic border p-2 text-xs text-black">{currentData.fase_name}</p>
                        <p className="font-bold dark:text-black">Elemen (Elemen Yang Sedang Anda Pilih)</p>
                        <p className="italic border p-2 text-xs text-black">{dataCp?.elemen}</p>
                        <p className="font-bold dark:text-black">CP (Yang sedang Anda Pilih)</p>
                        <p className="italic border p-2 text-xs text-black">{dataCp?.cp_utama}</p>
                        <p className="font-bold dark:text-black">TP (Yang sedang Anda Edit)</p>
                        <p className="italic border p-2 text-xs text-black">{currentData.tp}</p>
                    </div>
                </div>
            </div>
            <ModalFooterEdura>
                <SendTpUpdate data={currentData} mode="delete"/>
            </ModalFooterEdura>
        </fieldset>
    )
    
}
