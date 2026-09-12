import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { InputText } from "~/components/fields/fields";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import CalendarTime from "~/components/ui/calender-time";
import { Field } from "~/components/ui/field";
import type { PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal";
import { initialStringKop } from "./initial-kop";



export default function ToolbarContentIdentitas(){
    const {value:data, setValue, updateExtra} = useFilterContext<PaketSoalDesign>();
    
    
    const [startTime, setStartTime] = useState<Date>( data.extra?.setting?.identitas?.start_time ?? new Date());
    const [durasi, setDurasi] = useState<number>(data.extra?.setting?.identitas?.durasi ?? 60);
    
    const handleShowElemen = (e:ChangeEvent<HTMLInputElement>)=>{
        const {name, value, checked} = e.currentTarget;
        
        updateExtra(draft=>{
            const setting = (draft.setting ?? {}) as NonNullable<typeof draft.setting>;
                    setting.identitas = {
                        ...setting.identitas,
                        [name]: checked,
                    } as NonNullable<typeof setting.identitas>;
            draft.setting = setting;
                
            }
        )
            
        
        if(name === 'showKop' && checked){
            updateExtra(draft=>{
                const setting = (draft.setting ?? {}) as NonNullable<typeof draft.setting>
                setting.dataKopCustom = initialStringKop;
                draft.setting = setting;
                // draft.dataKopCustom = initialStringKop
            })
        }
    }
    
    const handleNamaIdentitas = (e:ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.currentTarget;
        updateExtra(draft=>{
            // draft.identitas = {...draft.identitas, nama:value}
            const setting = (draft.setting ?? {}) as NonNullable<typeof draft.setting>;
            setting.identitas = {
                ...setting.identitas,
                nama: value,
            } as NonNullable<typeof setting.identitas>;
            draft.setting = setting;
        })
    };

    const waktuAwal = useMemo(()=>startTime, [startTime]);
    
    const waktuAkhir = useMemo(()=>{
        const date = new Date(startTime);
        const minute = date.getMinutes()
        date.setMinutes(durasi+minute);
        return new Date(date);
    },[startTime, durasi])
    
    useEffect(()=>{
        updateExtra(draft=>{
            const setting = (draft.setting ?? {}) as NonNullable<typeof draft.setting>;
            setting.identitas = {
                ...setting.identitas,
                start_time: waktuAwal,
            } as NonNullable<typeof setting.identitas>;
            draft.setting = setting;
        })
    },[waktuAwal])
    
    useEffect(()=>{
        updateExtra(draft=>{
            const setting = (draft.setting ?? {}) as NonNullable<typeof draft.setting>
            setting.identitas = { ...setting.identitas, end_time:waktuAkhir} as NonNullable<typeof setting.identitas>;
            draft.setting = setting;
            // draft.identitas = {...draft.identitas, end_time:waktuAkhir}
        })
    },[waktuAkhir]);

    useEffect(()=>{
        /** kode dari ChatGPT */
        updateExtra(draft => {
            const setting = (draft.setting ?? {}) as NonNullable<typeof draft.setting>;

            setting.identitas = {
                ...(setting.identitas ?? {}),
                durasi: durasi,
            } as NonNullable<typeof setting.identitas>;

            draft.setting = setting;
        })
        // updateExtra(draft=>{
        //     draft.identitas = {...draft.identitas, durasi}
        // })
    },[durasi]);


    return (
        <div className="grid md:grid-cols-2 grid-cols-1 bg-linear-to-br from-sky-400 to-sky-300  dark:from-sky-800 dark:to-sky-700 px-1 py-6 gap-1">
            <div className='inner-shadow-sky-700 text-xs  border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2 px-2'>
                <Field className="relative mt-4">
                    <InputText label="Nama Paket" value={data.extra?.setting?.identitas.nama ??''} onChange={handleNamaIdentitas}/>
                </Field>
                <div className="border mt-7 relative columns-2 p-2 rounded-e-xl rounded-b-xl bg-white dark:bg-input/30 inner-shadow-sky-700 dark:shadow dark:shadow-sky-300">
                    <div className="absolute -top-4 left-0 ps-1 pe-4 rounded-tr-2xl text-gray-500 bg-white dark:bg-input/30 dark:shadow-xs dark:shadow-sky-300">Tampiilkan Elemen Naskah berikut:</div>
                    <Field orientation="horizontal">
                        <input type="checkbox" id="show-kop" name="showKop" checked={data?.extra?.setting?.identitas?.showKop ?? false} onChange={handleShowElemen}/>
                        <label htmlFor="show-kop" className="w-full">Kop Naskah</label>
                    </Field>
                    <Field orientation="horizontal">
                        <input type="checkbox" id="show-identitas" name="showIdentitas" checked={data?.extra?.setting?.identitas?.showIdentitas ?? false} onChange={handleShowElemen}/>
                        <label htmlFor="show-identitas" className="w-full">Identitas Paket</label>
                    </Field>
                    <Field orientation="horizontal">
                        <input type="checkbox" id="show-kolom-nilai" name="showKolom" checked={data?.extra?.setting?.identitas?.showKolom ?? false} onChange={handleShowElemen}/>
                        <label htmlFor="show-kolom-nilai" className="w-full">Kolom Penilaian</label>
                    </Field>
                    <Field orientation="horizontal">
                        <input type="checkbox" id="showSebaranTp" name="showSebaranTp" checked={data?.extra?.setting?.identitas?.showSebaranTp ?? false} onChange={handleShowElemen}/>
                        <label htmlFor="showSebaranTp" className="w-full">Sebaran ATP</label>
                    </Field>
                    <Field orientation="horizontal">
                        <input type="checkbox" id="show-petunjuk" name="showPetunjuk" checked={data?.extra?.setting?.identitas?.showPetunjuk ?? false} onChange={handleShowElemen}/>
                        <label htmlFor="show-petunjuk" className="w-full">Petunjuk Umum Pengisian</label>
                    </Field>
                </div>
            </div>
            <div className='inner-shadow-sky-700  border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2 px-2'>
                <div className="flex gap-2">
                    <div className="relative mt-7">
                        <div className="absolute -top-3 text-gray-500 left-1 dark:shadow-xs dark:shadow-sky-300 ps-1 pe-4 rounded-tr-2xl bg-white dark:bg-input/30 w-fit text-[10px]">Waktu Mulai</div>
                        <CalendarTime date={startTime} setDate={setStartTime}/>
                    </div>
                    <div className="relative mt-7">
                        
                        <InputText label="Durasi (menit)" type="number" value={durasi} onChange={(e)=>setDurasi(Number(e.currentTarget.value))}/>
                    </div>
                </div>
                <div className="border bg-sky-200 dark:bg-amber-900 text-xs mt-4 p-1">
                    <p>Durasi {durasi} Menit</p>
                    <p className="text-[10px]">Durasi ini adalah lama waktu siswa mengerjakan paket soal. Durasi pada naskah paket berbeda dengan durasi saat paket soal dipublikasikan secara daring. Durasi ketika publikasi daring diatur secara terpisah.</p>
                </div>
            
            </div>
        </div>
    )
}