import { ArrowDown, ArrowUp, Minus, MoveDown, MoveUp, Plus, TriangleAlert} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useImmer } from "use-immer";
import { SelectField } from "~/components/fields/fields";
import { FormEdura, useFormEdura } from "~/components/form-custom/form-edura";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import type { ModalState } from "~/components/modals/modal-provider";
import { Field } from "~/components/ui/field";
import { useAppSelector } from "~/context-reduct/hook";
import { CurrentMapelInActiveRombel } from "~/context-reduct/selectores/mapel-rombel-selector";
import { DtoMapelSelector } from "~/context-reduct/selectores/mapel-selector";
import type { jp_mapelApp, jp_mapelSheet } from "~/types/mapel/jp_mapel";
import ButtonSendMapel from "../crud/send-mapelrombel";
import { useCrudMapelRombel } from "../crud/crud-mapelrombel-provider";
import ButtonSendMapelDelete from "../crud/send-mapelrombel-delete";
import ButtonAddMapel from "../crud/send-add_mapel";

export default function FormMapelRombel({state}:{state:ModalState}){
    return (
            <FormEdura<jp_mapelSheet> data={state.payload as unknown as jp_mapelSheet}>
                <ContentCp state={state}/>
            </FormEdura>
        )
}

function ContentCp({state}:{state:ModalState}){
    const {state:stateCrud} = useCrudMapelRombel();
    if(state.type === 'HAPUS MAPEL ROMBEL'){
        return (
            <DeleteMapelRombel/>
        )
    }
    
    if(state.type === 'TAMBAH MAPEL ROMBEL'){
        return (
            <AddMapelRombel/>
        )
    }
    
    return (
        <UpsertMapelRombel/>
    )
}
function UpsertMapelRombel(){
    const {currentData, setCurrentData} = useFormEdura<jp_mapelApp>();
    const {state:stateCrud} = useCrudMapelRombel();
    const mapel = useAppSelector(CurrentMapelInActiveRombel);
    const dataMapel = useAppSelector(DtoMapelSelector);
    const [mapelData, setMapelData] = useImmer< jp_mapelApp[]>(mapel.data)

    const increaseJP = ()=>{
        const jp = currentData.jp_perminggu;
        // setJp(jp+1);
        
        const findIndex = mapelData.findIndex(s => s.idmapel === currentData.idmapel);
        if (findIndex === -1) return;

        const updatedItem: jp_mapelApp = {
            ...currentData,
            jp_perminggu:jp+1
        };

        setMapelData(draft => {
            draft[findIndex] = updatedItem;
        });

        setCurrentData(()=>updatedItem);
    }
    
    const decreaseJP = ()=>{
        const jp = currentData.jp_perminggu;
        if(jp-1 < 0) return;
        // setJp(jp-1);
        const findIndex = mapelData.findIndex(s => s.idmapel === currentData.idmapel);
        if (findIndex === -1) return;

        const updatedItem: jp_mapelApp = {
            ...currentData,
            jp_perminggu:jp-1
        };

        setMapelData(draft => {
            draft[findIndex] = updatedItem;
        });

        setCurrentData(()=>updatedItem);
    }
    const handleChangeMapel = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const fokus = dataMapel.find(s => s.kode === e.currentTarget.value);
            if (!fokus) return;

            const findIndex = mapelData.findIndex(s => s.idmapel === currentData.idmapel);
            if (findIndex === -1) return;

            const updatedItem: jp_mapelApp = {
                ...currentData,
                idmapel: fokus.id,
                kode: fokus.kode,
                source: fokus,
                nama_mapel: fokus.nama,
                nama_mapel_ijazah: fokus.nama
            };

            setMapelData(draft => {
                draft[findIndex] = updatedItem;
            });

            setCurrentData(()=>updatedItem);
    };

    return (
        <fieldset disabled={stateCrud.isSubmitting}>
            <div className="grid grid-cols-1 gap-2 space-x-2 md:grid-cols-2 bg-linear-to-tl from-sky-400 to-sky-300 p-2  h-[calc(100vh-12.5rem)]  md:overflow-y-auto scrol-h-custom">
                <div className="border flex flex-col justify-start rounded-2xl bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg p-1 md:overflow-y-auto scrol-h-custom">
                
                {
                    currentData.source.kelompok === 'Pilihan'?(
                        <Field className="relative mt-3">
                            <SelectField 
                                labelSelect="Pilih Mata Pelajaran"
                                value={currentData.kode}
                                onChange={handleChangeMapel}
                                // disabled={disabled}
                                >
                                    {
                                        dataMapel.filter(s=>s.kelompok === 'Pilihan').map(({id,nama, kode},index)=>
                                            <option key={index+id} value={kode}>{nama}</option>
                                        )
                                    }
                                </SelectField>
                        </Field>
                    ):(
                        <>
                            <Field className="relative mt-5 bg-amber-100 text-sm">
                                <div className="absolute ps-1 bg-sky-100 left-0 top-0 -translate-y-4 text-xs py-0 rounded-tr-full border-b z-10 border-sky-600 md:max-w-1/3">Mata Pelajaran (Rapor):</div>
                                <div className="ps-1 bg-sky-100 w-full bottom-0">{currentData?.nama_mapel}</div>
                            </Field>
                            <Field className="relative mt-5 bg-amber-100 text-sm">
                                <div className="absolute ps-1 bg-sky-100 left-0 top-0 -translate-y-4 text-xs py-0 rounded-tr-full border-b z-10 border-sky-600 md:max-w-1/3">Mata Pelajaran (Ijazah):</div>
                                <div className="ps-1 bg-sky-100 w-full bottom-0">{currentData?.nama_mapel_ijazah}</div>
                            </Field>
                        </>
                    )
                }
                    <Field className="relative mt-5 text-sm">
                        <div className="absolute ps-1 bg-sky-100 left-0 top-0 -translate-y-4 text-xs py-0 rounded-tr-full border-b z-10 border-sky-600 md:max-w-1/3">Alokasi JP per minggu</div>
                        <div className="flex flex-row gap-1 md:max-w-1/3 bg-sky-100 justify-center items-center">
                            <button type="button" onClick={decreaseJP} className="border rounded-2xl bg-sky-300 w-4 h-4 text-center align-middle p-0"><Minus size={15}/></button>
                            <div className="px-1 bg-sky-100 max-w-fit">{currentData?.jp_perminggu}</div>
                            <button type="button" onClick={increaseJP} className="border rounded-2xl bg-sky-300 w-4 h-4 text-center align-middle p-0"><Plus size={15}/></button>
                        </div>
                    </Field>
                </div>
                <div className="border flex flex-col justify-start rounded-2xl bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg p-1 md:overflow-y-auto scrol-h-custom">
                    <div className="bg-white rounded m-1 p-1 text-xs">
                        Preview Tampilan Mata Pelajaran di Buku Rapor
                        <table className="border-collapse w-full mt-3">
                            <tbody>
                                <tr>
                                    <td colSpan={2}  className="border border-black px-1">A. Muatan Nasional</td>
                                    <td  className="border border-black px-1"/>
                                </tr>
                                {
                                    currentData?.source.kelompok === 'Agama'?(
                                        <>
                                            <tr className="bg-sky-300">
                                                <td className="border border-black px-1 text-center w-10" rowSpan={2}>1.</td>
                                                <td className="border border-black px-1">{currentData?.nama_mapel_ijazah}</td>
                                                <td className="border border-black px-1 text-center align-middle" rowSpan={2}>{currentData?.jp_perminggu}</td>
                                            </tr>
                                            <tr className="bg-sky-300"><td className="border border-black px-1">{currentData.nama_mapel}</td></tr>
                                        </>
                                        
                                    ):(
                                        <>
                                            <tr>
                                                <td className="border border-black px-1 text-center w-10" rowSpan={2}>1.</td>
                                                <td className="border border-black px-1">{mapelData.find(s=>s.source.kelompok==='Agama')?.nama_mapel_ijazah}</td>
                                                <td className="border border-black px-1 text-center align-middle" rowSpan={2}>{mapelData.find(s=>s.source.kelompok==='Agama')?.jp_perminggu}</td>
                                            </tr>
                                            <tr><td className="border border-black px-1">{mapelData.find(s=>s.source.kelompok==='Agama')?.nama_mapel}</td></tr>
                                        </>
                                    )
                                }
                                {
                                    mapelData.filter(s=>s?.source.kelompok !== 'Agama' && s?.source.muatan !=='Lokal').map((m, index)=>
                                        
                                        <tr key={m.idmapel+index + m.kode} className={currentData?.idmapel === m.idmapel?"bg-sky-300":"bg-white"}>
                                            <td className="border border-black px-1 text-center w-10">{index+2}.</td>
                                            <td className="border border-black px-1">{m.nama_mapel}</td>
                                            <td className="border border-black px-1 text-center align-middle">{currentData?.idmapel === m.idmapel? currentData.jp_perminggu:m.jp_perminggu} ({m.index_in_rombel})</td>
                                        </tr>
                                    )
                                }
                                
                                <tr>
                                    <td colSpan={2}  className="border border-black px-1">B. Muatan Lokal</td>
                                    <td  className="border border-black px-1"/>
                                </tr>
                                {
                                    mapelData.filter(s=>s.source.muatan === 'Lokal').map((m, index)=>
                                        <tr key={m.idmapel + new Date().getTime()}>
                                            <td className="border border-black px-1 text-center w-10">{index + mapelData.filter(s=>s.source.kelompok !== 'Agama' && s.source.muatan !=='Lokal').length + 2}.</td>
                                            <td className="border border-black px-1">{m.nama_mapel}</td>
                                            <td className="border border-black px-1 text-center align-middle">{m.jp_perminggu}</td>
                                        </tr>
                                    )
                                }
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
                
            <ModalFooterEdura>
                <ButtonSendMapel data={mapelData}/>
            </ModalFooterEdura>
        </fieldset>
    )
}
function DeleteMapelRombel(){
    const {currentData, setCurrentData} = useFormEdura<jp_mapelApp>();
    const {state:stateCrud} = useCrudMapelRombel();
    const mapel = useAppSelector(CurrentMapelInActiveRombel);
    const dataMapel = useAppSelector(DtoMapelSelector);
    const [mapelData, setMapelData] = useImmer< jp_mapelApp[]>(mapel.data)
    return(
        <fieldset disabled={stateCrud.isSubmitting}>
            <div className="grid grid-cols-1 gap-2 space-x-2 md:grid-cols-2 bg-linear-to-tl from-sky-400 to-sky-300 p-2  h-[calc(100vh-12.5rem)]  md:overflow-y-auto scrol-h-custom">
                <div className="border px-10 pt-2 pb-8 flex flex-col justify-center text-center rounded-2xl bg-sky-100/50 border-sky-500 inset-shadow-sky-600 shadow-lg">
                    <div className="text-2xl font-extrabold">
                        <TriangleAlert size={72} className="text-rose-500 mx-auto"/>
                        Anda yakin akan menghapus Mata Pelajaran ini?
                    </div>
                </div>
                <div className="border flex flex-col justify-start rounded-2xl bg-sky-500/50 border-sky-500 inset-shadow-sky-600 shadow-lg p-1 md:overflow-y-auto scrol-h-custom">
                    <div className="bg-white rounded m-1 p-1 text-xs">
                        Preview Tampilan Urutan Mata Pelajaran di Buku Rapor
                        <table className="border-collapse w-full mt-3">
                            <tbody>
                                <tr>
                                    <td colSpan={2}  className="border border-black px-1">A. Muatan Nasional</td>
                                    <td  className="border border-black px-1 text-wrap">Jam Pelajaran(JP) per Minggu</td>
                                </tr>
                                {
                                    currentData?.source.kelompok === 'Agama'?(
                                        <>
                                            <tr className="bg-sky-300">
                                                <td className="border border-black px-1 text-center w-10" rowSpan={2}>1.</td>
                                                <td className="border border-black px-1">{currentData?.nama_mapel_ijazah}</td>
                                                <td className="border border-black px-1 text-center align-middle" rowSpan={2}>{currentData?.jp_perminggu}</td>
                                            </tr>
                                            <tr className="bg-sky-300">
                                                <td className="border border-black px-1">{currentData.nama_mapel}</td>
                                            </tr>
                                        </>
                                        
                                    ):(
                                        <>
                                            <tr>
                                                <td className="border border-black px-1 text-center w-10" rowSpan={2}>1.</td>
                                                <td className="border border-black px-1">{mapelData.find(s=>s.source.kelompok==='Agama')?.nama_mapel_ijazah}</td>
                                                <td className="border border-black px-1 text-center align-middle" rowSpan={2}>{mapelData.find(s=>s.source.kelompok==='Agama')?.jp_perminggu}</td>
                                            </tr>
                                            <tr><td className="border border-black px-1">{mapelData.find(s=>s.source.kelompok==='Agama')?.nama_mapel}</td></tr>
                                        </>
                                    )
                                }
                                {
                                    mapelData.filter(s=>s?.source.kelompok !== 'Agama' && s?.source.muatan !=='Lokal').map((m, index)=>
                                        
                                        <tr key={m.idmapel+index + m.kode} className={currentData?.idmapel === m.idmapel?"bg-sky-300":"bg-white"}>
                                            <td className="border border-black px-1 text-center w-10">{index+2}.</td>
                                            <td className="border border-black px-1">{m.nama_mapel}</td>
                                            <td className="border border-black px-1 text-center align-middle">{currentData?.idmapel === m.idmapel? currentData.jp_perminggu:m.jp_perminggu}</td>
                                        </tr>
                                    )
                                }
                                
                                <tr>
                                    <td colSpan={2}  className="border border-black px-1">B. Muatan Lokal</td>
                                    <td  className="border border-black px-1"/>
                                </tr>
                                {
                                    mapelData.filter(s=>s.source.muatan === 'Lokal').map((m, index)=>
                                        <tr key={m.idmapel + new Date().getTime()}>
                                            <td className="border border-black px-1 text-center w-10">{index + mapelData.filter(s=>s.source.kelompok !== 'Agama' && s.source.muatan !=='Lokal').length + 2}.</td>
                                            <td className="border border-black px-1">{m.nama_mapel}</td>
                                            <td className="border border-black px-1 text-center align-middle">{m.jp_perminggu}</td>
                                        </tr>
                                    )
                                }
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
                
            <ModalFooterEdura>
                <ButtonSendMapelDelete data={mapelData} deleteIds={currentData.idbaris}/>
            </ModalFooterEdura>
        </fieldset>
    )
}
function AddMapelRombel(){
    const {currentData, setCurrentData} = useFormEdura<jp_mapelApp>();
    const {state:stateCrud} = useCrudMapelRombel();
    const mapel = useAppSelector(CurrentMapelInActiveRombel);
    const dataMapel = useAppSelector(DtoMapelSelector);
    const mapelTambahan  = dataMapel.filter(s=>!mapel.data.some(m=>m.idmapel === s.id) && s.kurikulum === 'kurmer');
    
    return(
        <fieldset disabled={stateCrud.isSubmitting}>
            <div className="bg-linear-to-tl from-sky-400 to-sky-300 p-2  h-[calc(100vh-12.5rem)]  md:overflow-y-auto scrol-h-custom">
                <div className="border px-10 pt-2 pb-8 flex flex-col justify-center text-center rounded-2xl bg-sky-100/50 border-sky-500 inset-shadow-sky-600 shadow-lg">
                    <Field className="relative mt-3">
                        <SelectField 
                            labelSelect="Pilih Mata Pelajaran"
                            value={currentData.idmapel}
                            onChange={(e)=>{
                                const fokus = dataMapel.find(s => s.id === parseInt(e.currentTarget.value));
                                if (!fokus) return; 
                                const updatedItem: jp_mapelApp = {
                                    ...currentData,
                                    idmapel: fokus.id,      
                                    kode: fokus.kode,
                                    source: fokus,
                                    nama_mapel: fokus.nama,
                                    nama_mapel_ijazah: fokus.nama
                                };  

                                setCurrentData(()=>updatedItem);
                            }}
                            >
                                <option value="">Pilih Mata Pelajaran</option>
                                    {
                                        mapelTambahan.map(({id,nama, kode},index)=>
                                            <option key={index+id} value={id}>{nama}</option>
                                        )
                                    }
                                </SelectField>
                    </Field>        
                    
                </div>
                
            </div>
                
            <ModalFooterEdura>
                <ButtonAddMapel data={currentData}>Tambahkan</ButtonAddMapel>
            </ModalFooterEdura>
        </fieldset>
    )
}