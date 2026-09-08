import {useCallback, useEffect, useMemo, useState, type ChangeEvent} from 'react';
import { InputText } from '~/components/fields/fields';
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar"
import { Field, FieldContent, FieldGroup } from "~/components/ui/field";
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useAppSelector } from '~/context-reduct/hook';
import {type PraSettingPaket } from "~/domain/paket-soal/entities/pra-setting-paket"
import type { TypePaketSoal } from '~/domain/paket-soal/entities/type-paket';
import { DataRombelUI } from '~/domain/rombel/data-rombel';
import { getSessionRombel } from '~/infrastructures/session-storage/rombel-session';
import { getNumberFromString } from '~/lib/get-number';

export default function ToolbarContentTargetPaket(){
    const {value, updateExtra} = useFilterContext<PraSettingPaket>();
    const rombel = useAppSelector(s=> s.fokusRombel.value) ?? getSessionRombel() as string
    const jenjang = useMemo(()=>getNumberFromString(rombel), [rombel])
    const [targetPaket, setTargetPaket] = useState<TypePaketSoal>(value.extra?.target_paket ?? 'rombel');
    // const [dataTargetRombel, setDataTargetRombel] = useState<string[]>(value.extra?.data_target ?? [])
    const [dataKelas, setDataKelas] = useState<string>(value.extra?.identitas.kelas ?? jenjang.toString())

    const koleksiRombel = useMemo(()=>DataRombelUI.filter(s=>s.active && s.jenjang === jenjang),[jenjang])
    
    const onSelectTarget = useCallback((v:TypePaketSoal)=>{
        setTargetPaket(v);
    },  [])
    
    const handleCheckTargetRombel = useCallback((e:ChangeEvent<HTMLInputElement>)=>{
        const {value, checked} = e.currentTarget;
        
        if(!checked){
            return
        }
        setDataKelas(value);
        // updateExtra(draft=>{
        //     draft.identitas = {...draft.identitas, kelas: value}
        // })
    }, [])

    useEffect(()=>{
        if(targetPaket === 'siswa'){
            setDataKelas(rombel)
            // updateExtra(draft=>{
            //     draft.identitas = {...draft.identitas, kelas: rombel}
            // })

        }
        
    }, [targetPaket, setDataKelas])

    useEffect(()=>{
        updateExtra(draft=>{
            draft.target_paket = targetPaket;
            // draft.identitas = {...draft.identitas, kelas: dataKelas}
        })
    }, [targetPaket, updateExtra])

    useEffect(()=>{
        updateExtra(draft=>{
            draft.identitas = {...draft.identitas, kelas: dataKelas}
        })
    },[dataKelas])
    
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 bg-linear-to-br from-sky-400 to-sky-300  dark:from-sky-800 dark:to-sky-700 px-1 py-6 gap-1">
            <div className='inner-shadow-sky-700 text-xs  border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2 px-2'>
                <Field className='relative mt-4' orientation={"horizontal"}>
                    <div className='text-[10px] absolute -top-2 ps-1 pe-4 bg-white dark:bg-sky-900/80 dark:text-sky-200 rounded-tr-2xl w-fit'>Pilih Target Paket</div>
                    <Select
                        
                            value={targetPaket}
                            onValueChange={onSelectTarget}
                        >
                        <SelectTrigger className='bg-white w-full rounded-tl-none text-[10px]'>
                            <SelectValue placeholder="Pilih target Paket"/>
                        </SelectTrigger>
                        <SelectContent className='bg-white dark:text-black w-full'>
                            <SelectItem value="rombel">Kelas</SelectItem>
                            <SelectItem value="siswa">Siswa Tertentu</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>
                <div className='bg-white dark:bg-sky-700 dark:shadow dark:shadow-sky-100 rounded dark:text-sky-100 mt-3 p-1 text-[8px]'>
                    Target Paket Soal artinya paket soal ini dapat dipublikasikan untuk satu kelas (pilih kelas) atau siswa tertentu. Fitur baru ini memungkinkan siswa mendapatkan paket soal pengayaan/remedial. 
                </div>
            </div>
            <div className='inner-shadow-sky-700 text-xs  border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2 px-2'>
                <div className='bg-white rounded p-2'>
                    <FieldGroup>
                        <FieldContent className='gap-2'>
                            {
                                targetPaket === 'rombel' ?
                                (
                                    <>
                                        <Field orientation='horizontal'>
                                            <Input type="radio" name="target_kelas" id="jenjang" className='h-3 w-3' value={jenjang.toString()} checked={dataKelas === jenjang.toString()} onChange={handleCheckTargetRombel}/>
                                            <Label htmlFor="jenjang" className='text-[10px]'>Seluruh Kelas {jenjang}</Label>
                                        </Field>
                                            {
                                                koleksiRombel.map((m, i)=>
                                                    <Field key={i} orientation='horizontal' className='text-[10px]'>
                                                        <Input type="radio" name="target_kelas" id={"rombel_"+m.rombelName} className='h-3 w-3' value={m.rombelName} checked={dataKelas === m.rombelName} onChange={handleCheckTargetRombel}/>
                                                        <Label htmlFor={"rombel_"+m.rombelName} className='text-[10px]'>{m.rombelName}</Label>
                                                    </Field>
                                                    
                                                )
                                            }
                                    </>
                                ):(
                                    <div>Paket Soal dikhususkan untuk pengayaan/remedial. Siswa akan dipilih saat publikasi paket soal di kelas {dataKelas}</div>
                                )
                            }
                        </FieldContent>
                    </FieldGroup>
                </div>
            </div>
        </div>

    )
}