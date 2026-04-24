import { FormEdura, useFormEdura } from "~/components/form-custom/form-edura";
import type { ModalState } from "~/components/modals/modal-provider";
import { useAppSelector } from "~/context-reduct/hook";
import { PropertyKurikulumMapelAktifSelector } from "~/context-reduct/selectores/kurmer-selector";
import type { OrmAtp, OrmFaseKurikulumType, OrmKurikulumMerdekaType } from "~/types/kurikulum/kurikulum-type";
import { Field } from "~/components/ui/field";
import { InputTextArea, SelectField } from "~/components/fields/fields";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import { useEffect, useState} from "react";
import { TriangleAlert } from "lucide-react";
import SendAtpUpdate from "../crud/send-atp-update";
import CheckboxLabel from "~/components/fields/checkbox-label";
import { useCrudAtpProvider } from "../crud/crud-atp-provider";


export default function FormContentAtp<OrmFaseKurikulumType>({state}:{state:ModalState}){
    
    return (
        <FormEdura<OrmFaseKurikulumType> data={state.payload as unknown as OrmFaseKurikulumType}>
            <ContentAtp state={state}/>
        </FormEdura>
    )
}

function ContentAtp({state}:{state:ModalState}){
    if(state.type === 'HAPUS ATP'){
        return (
            <DeleteContenAtp/> 
        )
    }
    if(state.type === 'TAMBAH ATP'){
        return ( 
            <CreateContenAtp/>
        )
    }
    return (
        <EditContenAtp/>
    )
}

function EditContenAtp(){
    const dataasal = useAppSelector(PropertyKurikulumMapelAktifSelector);
    const {currentData, setCurrentData} = useFormEdura<OrmAtp>();
    
    const {state:stateCrud} = useCrudAtpProvider();
    const [dataCp, setDataCp]= useState<OrmKurikulumMerdekaType|null>(null);
    const [dataTp, setDataTp] = useState<OrmFaseKurikulumType|null>(null);
    useEffect(()=>{
        const currentFase = dataasal.currentFase;
        const idAtp = currentData?.source_atp?.idbaris;
        const idTp = currentData?.source_atp?.foreignkey_tp;
        const idCp = currentData?.source_atp?.foreignkey_elemencp;
        const findCp = currentFase.elemen_cp.find(s=>s.id_elemen_cp === idCp);
        if(findCp){
            setDataCp(findCp);
            
            const findTp = findCp.tp_fase_properties.find(s=>s.idbaris_tp === idTp);
            if(findTp) setDataTp(findTp)
        }
    },[]);
    
    const handleChangeElemen = (v:number)=>{
        const findCp = dataasal.currentFase.elemen_cp.find(s=>s.id_elemen_cp === v);
        
        
        if(findCp){
            setDataCp(findCp);

            const findTp = findCp.tp_fase_properties[0];
            
            if(!findTp) alert('TP tidak tersedia, silakan buat TP untuk Elemen/CP ini')
            if(findTp){
                setDataTp(findTp);
                setCurrentData((draft:OrmAtp) => ({
                    ...draft,
                    source_atp: {
                        ...draft.source_atp,
                        foreignkey_elemencp: findCp?.id_elemen_cp,
                        foreignkey_tp:findTp.idbaris_tp
                    },
    
                }));

            } 
        }
    }

    const handleChangeElemenTp = (v:number)=>{
        const findTp = dataCp?.tp_fase_properties.find(s=>s.idbaris_tp === v);
        
        if(!findTp) alert('TP tidak tersedia, silakan buat dulu di fitur TP, jika diteruskan maka akan dianggap TP di fase pertama yang Anda isi.');
        
        if(findTp){
            setDataTp(findTp);
            setCurrentData((draft:OrmAtp) => ({
                ...draft,
                source_atp: {
                    ...draft.source_atp,
                    foreignkey_elemencp: dataCp?.id_elemen_cp,
                    foreignkey_tp:findTp?.idbaris_tp
                },
            }));
        }
    }
    
    const handleInputChange = (vt:string)=>{
        
        setCurrentData((draft:OrmAtp) => ({
                ...draft,
                source_atp: {
                    ...draft.source_atp,
                    atp:vt,
                },
                atp:vt
            }));
        
    };
    const handleSelectKelas = (value:number)=>{
        setCurrentData((draft:OrmAtp)=>({
            ...draft,
            kelas : draft.kelas.includes(value)? draft.kelas.filter(s=>s!=value):[...draft.kelas, value]
        }));
    }
    
    const truncate = (text: string, max = 80) => text.length > max ? text.slice(0, max) + "..." : text
    return (
        <fieldset disabled={stateCrud.isSubmitting}>
            <div className="grid grid-cols-1 gap-2 space-x-2 md:grid-cols-2 bg-linear-to-tl from-sky-400 to-sky-300 p-2  h-[calc(100vh-12.5rem)]  md:overflow-y-auto scrol-h-custom">
                <div className="border flex flex-col justify-start rounded-2xl bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg p-1 md:overflow-y-auto scrol-h-custom">
                    <Field className="relative flex flex-row gap-2 mt-4 border rounded pt-5 px-2">
                        <span className="absolute text-base bg-white dark:text-gray-400 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 duration-300 transform -translate-y-4 rounded-3xl scale-75 top-2 z-10 origin-left  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Kelas</span>
                        {
                            dataasal.currentFase.memberJenjang.map((kelas,index)=>
                                <CheckboxLabel key={index}
                                    checked={currentData.kelas.includes(kelas)}
                                    value={kelas}
                                    onChange={()=>handleSelectKelas(kelas)} 
                                    className="rounded-4xl text-center text-sm"
                                    >Kelas {kelas}</CheckboxLabel>
                            )
                        }
                    </Field>
                    <Field className="relative mt-4">
                        <SelectField 
                            labelSelect="Elemen & CP"
                            value={currentData?.source_atp?.foreignkey_elemencp}
                            onChange={(e)=>handleChangeElemen(Number(e.currentTarget.value))}
                            >
                            {
                                dataasal.currentFase.elemen_cp.map(({elemen,cp_utama, id_elemen_cp},index)=>
                                    <option value={id_elemen_cp} key={index}>{elemen}</option>
                                )
                            }
                        </SelectField>
                    </Field>
                    <Field className="relative mt-4">
                        <SelectField 
                            labelSelect="Tujuan Pembelajaran"
                            value={dataTp?.idbaris_tp}
                            onChange={(e)=>handleChangeElemenTp(Number(e.currentTarget.value))}
                            >
                            {
                                dataCp?.tp_fase_properties.map(({idbaris_tp,tp},index)=>
                                    <option key={index} value={idbaris_tp}>{truncate(tp)}</option>
                                )
                            }
                        </SelectField>
                    </Field>
                    <Field className="relative mt-4">
                        <InputTextArea className="scrol-h-custom" label="Alur Tujuan Pembelajaran" value={currentData.atp} onChange={(e)=>handleInputChange(e.target.value)}/>
                    </Field>
                </div>
                <div className="border rounded-2xl  flex flex-col justify-start bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg p-1 md:overflow-y-auto scrol-h-custom">
                    <div className="bg-white dark:bg-sky-50 p-1 m-1 rounded">
                        <div className="flex flex-col lg:flex-row gap-2">
                            <div className="flex flex-1 gap-1 flex-row">
                                <p className="font-bold dark:text-black">Mata Pelajaran</p>
                                <p className="italic border p-2 text-xs text-black">{dataasal.mapel_nama}</p>
                            </div>
                            <div className="flex flex-row gap-1">
                                <p className="font-bold dark:text-black">Fase</p>
                                <p className="italic border p-2 text-xs text-black">{dataasal.currentFase.faseName}</p>
                            </div>
                        </div>
                        <p className="font-bold dark:text-black">Elemen</p>
                        <p className="italic border p-2 text-xs text-black">{dataCp?.elemen}</p>
                        <p className="font-bold dark:text-black">TP</p>
                        <p className="italic border p-2 text-xs text-black">{dataTp?.tp}</p> 
                        <p className="font-bold dark:text-black">ATP</p>
                        <p className="italic border p-2 text-xs text-black">{currentData.atp}</p>
                        <p className="font-bold dark:text-black">Untuk Jenjang</p>
                        <p className="italic border p-2 text-xs text-black">{currentData.kelas.length===0?'':`Kelas ${currentData.kelas.join(' dan ')}`}</p>
                    </div>
                </div>
            </div>
            <ModalFooterEdura>
                <SendAtpUpdate data={currentData} mode="update"/>
            </ModalFooterEdura>
        </fieldset>
    )
}

function CreateContenAtp(){
    const dataasal = useAppSelector(PropertyKurikulumMapelAktifSelector);
    const {currentData, setCurrentData} = useFormEdura<OrmAtp>();
    
    const {state:stateCrud} = useCrudAtpProvider();
    const [dataCp, setDataCp]= useState<OrmKurikulumMerdekaType|null>(null);
    const [dataTp, setDataTp] = useState<OrmFaseKurikulumType|null>(null);
    useEffect(()=>{
        const currentFase = dataasal.currentFase;
        const idAtp = currentData?.source_atp?.idbaris;
        const idTp = currentData?.source_atp?.foreignkey_tp;
        const idCp = currentData?.source_atp?.foreignkey_elemencp;
        const findCp = currentFase.elemen_cp.find(s=>s.id_elemen_cp === idCp);
        if(findCp){
            setDataCp(findCp);
            
            const findTp = findCp.tp_fase_properties.find(s=>s.idbaris_tp === idTp);
            if(findTp) setDataTp(findTp);
            
        }
    },[]);
    
    const handleChangeElemen = (v:number)=>{
        const findCp = dataasal.currentFase.elemen_cp.find(s=>s.id_elemen_cp === v);
        
        
        if(findCp){
            setDataCp(findCp);

            const findTp = findCp.tp_fase_properties[0];
            
            if(!findTp) alert('TP tidak tersedia, silakan buat TP untuk Elemen/CP ini')
            if(findTp){
                setDataTp(findTp);
                setCurrentData((draft:OrmAtp) => ({
                    ...draft,
                    source_atp: {
                        ...draft.source_atp,
                        foreignkey_elemencp: findCp?.id_elemen_cp,
                        foreignkey_tp:findTp.idbaris_tp
                    },
    
                }));

            } 
        }
    }

    const handleChangeElemenTp = (v:number)=>{
        const findTp = dataCp?.tp_fase_properties.find(s=>s.idbaris_tp === v);
        
        if(!findTp) alert('TP tidak tersedia, silakan buat dulu di fitur TP, jika diteruskan maka akan dianggap TP di fase pertama yang Anda isi.');
        
        if(findTp){
            setDataTp(findTp);
            setCurrentData((draft:OrmAtp) => ({
                ...draft,
                source_atp: {
                    ...draft.source_atp,
                    foreignkey_elemencp: dataCp?.id_elemen_cp,
                    foreignkey_tp:findTp?.idbaris_tp
                },
            }));
        }
    }
    
    const handleInputChange = (vt:string)=>{
        
        setCurrentData((draft:OrmAtp) => ({
                ...draft,
                source_atp: {
                    ...draft.source_atp,
                    atp:vt,
                },
                atp:vt
            }));
        
    };
    const handleSelectKelas = (value:number)=>{
        setCurrentData((draft:OrmAtp)=>({
            ...draft,
            kelas : draft.kelas.includes(value)? draft.kelas.filter(s=>s!=value):[...draft.kelas, value]
        }));
    }
    
    const truncate = (text: string, max = 80) => text.length > max ? text.slice(0, max) + "..." : text
    return (
        <fieldset disabled={stateCrud.isSubmitting}>
            <div className="grid grid-cols-1 gap-2 space-x-2 md:grid-cols-2 bg-linear-to-tl from-sky-400 to-sky-300 p-2  h-[calc(100vh-12.5rem)]  md:overflow-y-auto scrol-h-custom">
                <div className="border flex flex-col justify-start rounded-2xl bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg p-1 md:overflow-y-auto scrol-h-custom">
                    <Field className="relative flex flex-row gap-2 mt-4 border rounded pt-5 px-2">
                        <span className="absolute text-base bg-white dark:text-gray-400 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 duration-300 transform -translate-y-4 rounded-3xl scale-75 top-2 z-10 origin-left  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Kelas</span>
                        {
                            dataasal.currentFase.memberJenjang.map((kelas,index)=>
                                <CheckboxLabel key={index}
                                    checked={currentData.kelas.includes(kelas)}
                                    value={kelas}
                                    onChange={()=>handleSelectKelas(kelas)} 
                                    className="rounded-4xl text-center text-sm"
                                    >Kelas {kelas}</CheckboxLabel>
                            )
                        }
                    </Field>
                    <Field className="relative mt-4">
                        <SelectField 
                            labelSelect="Elemen & CP"
                            value={currentData?.source_atp?.foreignkey_elemencp}
                            onChange={(e)=>handleChangeElemen(Number(e.currentTarget.value))}
                            >
                            {
                                dataasal.currentFase.elemen_cp.map(({elemen,cp_utama, id_elemen_cp},index)=>
                                    <option value={id_elemen_cp} key={index}>{elemen}</option>
                                )
                            }
                        </SelectField>
                    </Field>
                    <Field className="relative mt-4">
                        <SelectField 
                            labelSelect="Tujuan Pembelajaran"
                            value={dataTp?.idbaris_tp}
                            onChange={(e)=>handleChangeElemenTp(Number(e.currentTarget.value))}
                            >
                            {
                                dataCp?.tp_fase_properties.map(({idbaris_tp,tp},index)=>
                                    <option key={index} value={idbaris_tp}>{truncate(tp)}</option>
                                )
                            }
                        </SelectField>
                    </Field>
                    <Field className="relative mt-4">
                        <InputTextArea className="scrol-h-custom" label="Alur Tujuan Pembelajaran" value={currentData.atp} onChange={(e)=>handleInputChange(e.target.value)}/>
                    </Field>
                </div>
                <div className="border rounded-2xl  flex flex-col justify-start bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg p-1 md:overflow-y-auto scrol-h-custom">
                    <div className="bg-white dark:bg-sky-50 p-1 m-1 rounded">
                        <div className="flex flex-col lg:flex-row gap-2">
                            <div className="flex flex-1 gap-1 flex-row">
                                <p className="font-bold dark:text-black">Mata Pelajaran</p>
                                <p className="italic border p-2 text-xs text-black">{dataasal.mapel_nama}</p>
                            </div>
                            <div className="flex flex-row gap-1">
                                <p className="font-bold dark:text-black">Fase</p>
                                <p className="italic border p-2 text-xs text-black">{dataasal.currentFase.faseName}</p>
                            </div>
                        </div>
                        <p className="font-bold dark:text-black">Elemen</p>
                        <p className="italic border p-2 text-xs text-black">{dataCp?.elemen}</p>
                        <p className="font-bold dark:text-black">TP</p>
                        <p className="italic border p-2 text-xs text-black">{dataTp?.tp}</p> 
                        <p className="font-bold dark:text-black">ATP</p>
                        <p className="italic border p-2 text-xs text-black">{currentData.atp}</p>
                        <p className="font-bold dark:text-black">Untuk Jenjang</p>
                        <p className="italic bo rder p-2 text-xs text-black">{currentData.kelas.length===0?'':`Kelas ${currentData.kelas.join(' dan ')}`}</p>
                    </div>
                </div>
            </div>
            <ModalFooterEdura>
                <SendAtpUpdate data={currentData} mode="update"/>
            </ModalFooterEdura>
        </fieldset>
    )
}

function DeleteContenAtp(){
    const dataasal = useAppSelector(PropertyKurikulumMapelAktifSelector);
    const {currentData, setCurrentData} = useFormEdura<OrmAtp>();
    const {state:stateCrud} = useCrudAtpProvider();
    const [dataCp, setDataCp]= useState<OrmKurikulumMerdekaType|null>(null);
    const [dataTp, setDataTp] = useState<OrmFaseKurikulumType|null>(null)
    
    useEffect(()=>{
        const currentFase = dataasal.currentFase;
        const idAtp = currentData?.source_atp?.idbaris;
        const idTp = currentData?.source_atp?.foreignkey_tp;
        const idCp = currentData?.source_atp?.foreignkey_elemencp;
        const findCp = currentFase.elemen_cp.find(s=>s.id_elemen_cp === idCp);
        if(findCp){
            setDataCp(findCp);
            
            const findTp = findCp.tp_fase_properties.find(s=>s.idbaris_tp === idTp);
            if(findTp) setDataTp(findTp)
        };
    setCurrentData(draft=>{
        draft.status = 'hapus'}
    );
    
    },[]);
    
    return (
        <fieldset disabled={stateCrud.isSubmitting}>
            <div className="grid grid-cols-1 gap-2 space-x-2 md:grid-cols-2 bg-linear-to-tl from-sky-400 to-sky-300 p-2  h-[calc(100vh-12.5rem)]  md:overflow-y-auto scrol-h-custom">
                <div className="border px-10 pt-2 pb-8 flex flex-col justify-center text-center rounded-2xl bg-sky-100/50 border-sky-500 inset-shadow-sky-600 shadow-lg">
                    <div className="text-2xl font-extrabold">
                        <TriangleAlert size={72} className="text-rose-500 mx-auto"/>
                        Anda yakin akan menghapus Alur Tujuan Pembelajaran ini?
                    </div>
                </div>
                <div className="border rounded-2xl  flex flex-col justify-start bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg p-1 md:overflow-y-auto scrol-h-custom">
                    <div className="bg-white dark:bg-sky-50 p-1 m-1 rounded">
                        <div className="flex flex-col lg:flex-row gap-2">
                            <div className="flex flex-1 gap-1 flex-row">
                                <p className="font-bold dark:text-black">Mata Pelajaran</p>
                                <p className="italic border p-2 text-xs text-black">{dataasal.mapel_nama}</p>
                            </div>
                            <div className="flex flex-row gap-1">
                                <p className="font-bold dark:text-black">Fase</p>
                                <p className="italic border p-2 text-xs text-black">{dataasal.currentFase.faseName}</p>
                            </div>
                        </div>
                        <p className="font-bold dark:text-black">Elemen</p>
                        <p className="italic border p-2 text-xs text-black">{dataCp?.elemen}</p>
                        <p className="font-bold dark:text-black">TP</p>
                        <p className="italic border p-2 text-xs text-black">{dataTp?.tp}</p> 
                        <p className="font-bold dark:text-black">ATP</p>
                        <p className="italic border p-2 text-xs text-black">{currentData.atp}</p>
                        <p className="font-bold dark:text-black">Untuk Jenjang</p>
                        <p className="italic border p-2 text-xs text-black">{currentData.kelas.length===0?'':`Kelas ${currentData.kelas.join(' dan ')}`}</p>
                    </div>
                </div>
            </div>
            <ModalFooterEdura>
                <SendAtpUpdate data={currentData} mode="delete"/>
            </ModalFooterEdura>
        </fieldset>
    )
    
}
