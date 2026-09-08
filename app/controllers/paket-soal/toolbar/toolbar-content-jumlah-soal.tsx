import {useCallback, useEffect, useState, type ChangeEvent} from 'react';
import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";
import InputSectionBentukSoal from "./sections/section-bentuk-soal";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import type { PraSettingPaket } from "~/domain/paket-soal/entities/pra-setting-paket";
import type { CountBentukSoalPaket } from '~/domain/paket-soal/entities/count-bentuk-soal-paket';
import SoalItemFlex from '~/controllers/bank-soal/modal/soal-item-flex';
import TooltipComp from '~/components/ui_edura/tooltip-comp';
import { Button } from '~/components/ui/button';

export default function ToolbarContentJumlahSoal(){
    const {value, updateExtra} = useFilterContext<PraSettingPaket>();
    const [strukturSoal, setStrukturSoal] = useState<CountBentukSoalPaket[]>(value.extra?.count_bentuk_soal ?? []);
    const [backToOne, setBackToOne] = useState<boolean>(value.extra?.nomorSoalUrut!! ?? true)

    // const onChangeCountSoal = useCallback((v:string, name:string)=>{
    //     setStrukturSoal((prev)=>{
    //         const defineBentukSoal = ListBentukSoal.find(s=>s.name === name);
    //         const prevBefore = prev.findIndex(s=>s.dataBentukSoal.name === name) 
    //         if(prevBefore === -1){
    //             return prev.filter(s=>s.dataBentukSoal.name !== name)
    //         }
    //         if(v === ""){
    //             return prev.filter(s=>s.dataBentukSoal.name !== name)
    //         }

    //         return prev.map((m, i)=> i === prevBefore ? {...m, count:Number(v)}:m)
    //     })
    //     // const defineBentukSoal = ListBentukSoal.find(s=>s.name === name);
    //     // setStrukturSoal(prev=>{
    //     //     const obj:CountBentukSoalPaket = {
    //     //         dataBentukSoal:defineBentukSoal!,
    //     //         count:Number(v),
    //     //         description:defineBentukSoal?.petunjukPengisian ?? ''
    //     //     }
    //     //     if(prev.length === 0){
    //     //         return [obj]
    //     //     }
    //     //     const findIndex = prev.findIndex(s=>s.dataBentukSoal.name === name);
    //     //     if(v===""|| v==='0'){
    //     //         return prev.filter((_, i) => i !== findIndex)
    //     //     }
    //     //     if(findIndex === -1){
    //     //         return [...prev, obj]
    //     //     }
    //     //     return prev.map((m, i)=> i === findIndex ? {...m, count:Number(v)}:m)
    //     // })
    // },[]);

    const onChangeCountSoal = (index: number, value: string) => {
            const count = Number(value);
            const bentukSoal = ListBentukSoal[index];

            if (!bentukSoal) return;

            setStrukturSoal(prev => {
                // hapus jika kosong atau 0
                if (!value.trim() || count === 0) {
                    return prev.filter(
                        item => item.dataBentukSoal.name !== bentukSoal.name
                    );
                }

                const existingIndex = prev.findIndex(
                    item => item.dataBentukSoal.name === bentukSoal.name
                );

                const newItem: CountBentukSoalPaket = {
                    dataBentukSoal: bentukSoal,
                    count,
                    description: bentukSoal.petunjukPengisian!,
                };

                // belum ada → tambahkan
                if (existingIndex === -1) {
                    return [...prev, newItem];
                }

                // sudah ada → update
                const next = [...prev];
                next[existingIndex] = newItem;

                return next;
            });
        };
    useEffect(()=>{
        updateExtra(draft=>{
            draft.count_bentuk_soal = strukturSoal
        })
    },[strukturSoal, updateExtra]);
    
    const moveUp = useCallback((index: number) => {
        if (index <= 0) return;

        setStrukturSoal(prev => {
            if (index >= prev.length) return prev;

            const newData = [...prev];

            [newData[index - 1], newData[index]] = [
                newData[index],
                newData[index - 1],
            ];

            return newData;
        });
    }, []);

    const moveDown = useCallback((index: number) => {
        setStrukturSoal(prev => {
            if (index < 0 || index >= prev.length - 1) return prev;

            const newData = [...prev];

            [newData[index], newData[index + 1]] = [
                newData[index + 1],
                newData[index],
            ];

            return newData;
        });
    }, []);

    const onChangeDescription  = useCallback((e:ChangeEvent<HTMLInputElement>)=>{
        const {value, name} = e.currentTarget;
        setStrukturSoal(prev=>{
            return prev.map((m, i)=> i === Number(name) ? {...m, description:value}:m)
        })

    },[])
    useEffect(()=>{
        updateExtra(draft=>{
            draft.nomorSoalUrut = backToOne
        })
    },[backToOne, updateExtra])
    
    
    return (
        <div className="grid md:grid-cols-3 grid-cols-1 bg-linear-to-br from-sky-400 to-sky-300  dark:from-sky-800 dark:to-sky-700 px-1 py-6 gap-1">
            <div className='max-h-[calc(100vh-22rem)] overflow-y-auto scrol-h-custom inner-shadow-sky-700 text-xs md:col-span-1 border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2 px-2'>
                
            {
                ListBentukSoal.map((m, i)=>
                    <InputSectionBentukSoal 
                        key={i} 
                        initialValue={
                            strukturSoal
                                    .find(s => s.dataBentukSoal.name === m.name)
                                    ?.count
                                    ?.toString() ?? ''
                                }
                        onChangeCountSoal={(value) => onChangeCountSoal(i, value)} 
                        label={m.shortName ?? ''} id={m.name}/>
                )
            }
        </div>
        <div className='inner-shadow-sky-700 text-xs md:col-span-2 border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2 px-2'>
            {
                strukturSoal.map((m, i)=>{
                    const startNumber = backToOne 
                                        ? 1
                                        : strukturSoal
                                            .slice(0, i)
                                            .reduce((total, item) => total + item.count, 1);
                    return (

                        <div key={i} className='flex bg-white dark:text-black'>
                            <ol start={i+1}  className='flex-1 border list-inside list-[upper-roman] ps-2'>
                                <li className='list-item flex-1'>
                                    <input 
                                        type="text" 
                                        name={i.toString()}
                                        value= {m.description}
                                        onChange={onChangeDescription}
                                        className='w-11/12 inline-block border-0  outline-0 ring-0 focus-within:ring-0 focus-visible:border-0'
                                    />
                                    <ol start={i===0?1:startNumber} className='list-inside list-decimal ps-5'>

                                        <li>...</li>
                                        <li>...</li>
                                        <li>hingga {m.count} soal</li>
                                    </ol>
                                </li>
                            </ol>
                            <div className='border flex justify-center items-center'>
                                <TooltipComp content="Naikkan Posisi">
                                    <Button 
                                        variant={'ghost'} 
                                        disabled={i===0}
                                        className='p-0'
                                        onClick={()=>moveUp(i)}
                                        >🔼</Button>
                                </TooltipComp>
                                <TooltipComp content="Turunkan Posisi">
                                    <Button 
                                        variant={'ghost'}
                                        disabled={i === strukturSoal.length - 1}
                                        className='p-0'
                                        onClick={()=>moveDown(i)}
                                        >🔽</Button>
                                </TooltipComp>
                            </div>
                        </div>
                    )
                }
                )
            }
            <label className='select-none block mt-4 align-middle w-full'>
                <input 
                    type="checkbox"
                    checked={backToOne}
                    onChange={()=>setBackToOne(prev=>!prev)}
                    /> {backToOne ? 'Nomor Soal kembali ke nomor 1':'Nomor soal melanjutkan dari sesion sebelumnya'}
            </label>
        </div>
        </div>
    )
}