import { Field, FieldLabel } from "~/components/ui/field";
import { Switch } from "~/components/ui/switch";
import { useFilterContext } from "./state-toolbar";
import { useEffect } from "react";
import { cn } from "~/lib/utils";
import { useAppDispatch, useAppSelector } from "~/context-reduct/hook";
import { setSabtuLibur } from "~/context-reduct/global-state/sabtu-libur";

export function SwitchSabtuLibur({className}:{className?:string}){
    const sabtuLibur  = useAppSelector(state=> state.uiPreference.sabtuLibur);
    const dispatch = useAppDispatch();
    // const { value, setValue } = useFilterContext();
    // useEffect(()=>{
    //     setValue({
    //         sabtuLibur:true
    //     })
    // },[])
    const onSwitch = (v:boolean)=>{
        // setValue({
        //     sabtuLibur:v
        // })
        dispatch(setSabtuLibur(v))
    }
    
    return (
        <Field orientation="horizontal" className={cn("w-1/2",className)}>
            <Switch id="switch-size-sm" size="default" defaultChecked={true} checked={sabtuLibur} onCheckedChange={onSwitch} />
            <FieldLabel htmlFor="switch-size-sm">Sabtu {sabtuLibur?"":"Tidak"} Libur</FieldLabel>
        </Field>
    )
}
export function SwitchIsBottomKalendar(){
    const { value, setValue } = useFilterContext();
    
    const onSwitch = (v:boolean)=>{
        setValue({
            isBottomKalendar:v
        })
    }
    
    return (
        <Field orientation="horizontal" className="w-1/2">
            <Switch id="switch-ket-kalendar" size="default" defaultChecked={false} checked={value?.isBottomKalendar} onCheckedChange={onSwitch} />
            <FieldLabel htmlFor="switch-ket-kalendar">Keterangan {value?.isBottomKalendar?"di Bawah":"di Samping"} Kalendar</FieldLabel>
        </Field>
    )
}
export function SwitchIncludingHariEfektif(){
    const { value, setValue } = useFilterContext();

    const onSwitch = (v:boolean)=>{
        setValue({
            includingHariEfektif:v
        })
    }
    
    return (
        <Field orientation="horizontal" className="w-1/2">
            <Switch id="switch-isInclude" size="default"  defaultChecked={false} checked={value?.includingHariEfektif} onCheckedChange={onSwitch} />
            <FieldLabel htmlFor="switch-isInclude">{value?.includingHariEfektif?"Tampilkan":"Tidak Tampilkan"} Hari Efektif Belajar</FieldLabel>
        </Field>
    )
}
export function SwitchModeTahunan(){
    const { value, setValue } = useFilterContext();

    const onSwitch = (v:boolean)=>{
        setValue({
            kaldikSatuTahun:v
        })
    }
    
    return (
        <Field orientation="horizontal" className="w-1/2">
            <Switch id="switch-kaldikSatuTahun" size="default" defaultChecked={false} checked={value?.kaldikSatuTahun} onCheckedChange={onSwitch} />
            <FieldLabel htmlFor="switch-kaldikSatuTahun">Mode {value?.kaldikSatuTahun?"Gabung":"Pisah"} Semester</FieldLabel>
        </Field>
    )
}
export function SwitchModePenabungAktif(){
    const { value, updateExtra } = useFilterContext();

    const onSwitch = (v:boolean)=>{
        updateExtra(draft=>{
            draft.onlyPenabung = v
        })
    }

    useEffect(()=>{
        updateExtra(draft=>{
            draft.onlyPenabung = true
        })
    },[])
    
    return (
        <Field orientation="horizontal" className="w-1/2 items-center pt-5">
            <Switch id="switch-penabung-aktif" size="default" checked={value?.extra?.onlyPenabung ?? false} onCheckedChange={onSwitch} />
            <FieldLabel htmlFor="switch-penabung-aktif">{value?.extra?.onlyPenabung?'Penabung Aktif':'Semua Siswa Rombel'}</FieldLabel>
        </Field>
    )
}