import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar"
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle, } from "~/components/ui/field";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {useCallback, useEffect} from 'react';
import type { StrukturAtpType, StrukturCpType, StrukturTpType } from "~/domain/trees-struktur-kurikulum";
import type { RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan } from "~/domain/kategori-tagihan/types";

type KeyStrukturKurikulumType = 
    | keyof StrukturAtpType
    | keyof StrukturTpType
    | keyof StrukturCpType;

export type FokusStrukturKurikulumSelected = {
    keyLabel:string,
    keyStrukturKurikulum: KeyStrukturKurikulumType,
    keyFokusStruktur: keyof RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan
}

const dataControls:FokusStrukturKurikulumSelected[]=[
    {
        keyLabel:'Atp',
        keyStrukturKurikulum: 'atp_id',
        keyFokusStruktur:'collection_Atp'
    },
    {
        keyLabel:'Tp',
        keyStrukturKurikulum: 'tp_id',
        keyFokusStruktur:'collection_Tp'
    },
    {
        keyLabel:'Cp',
        keyStrukturKurikulum: 'cp_id',
        keyFokusStruktur:'collection_Cp'
    },
]
export type FokusStrukturKurikulumPresentation={
    FokusStrukturKurikulum:FokusStrukturKurikulumSelected
}
export default function RadioChooseFokusStrukturKurikulum(){
    const {value, updateExtra} = useFilterContext<FokusStrukturKurikulumPresentation>();
    const handleChange = useCallback((value:string)=>{
        updateExtra(draft=>{
            // draft.formatKategoriAssesmen = value;
            const foundControl = dataControls.find(s=>s.keyLabel === value);
            draft.FokusStrukturKurikulum = foundControl!;
        })
    },[]);
    useEffect(()=>{
        if(!value?.extra?.FokusStrukturKurikulum){
            updateExtra(draft=>{
                draft.FokusStrukturKurikulum =dataControls[0];
            })
        }
    },[])
    return (
            <RadioGroup value={value?.extra?.FokusStrukturKurikulum?.keyLabel} onValueChange={handleChange} className="flex flex-col md:flex-row shadow-md shadow-sky-700 p-1">
                <div className="w-full space-y-1 bg-sky-50 rounded text-xs h-fit p-1 shadow-md shadow-sky-600">
                    {
                        dataControls.map((struktur, iStruktur)=>
                            <div key={struktur.keyLabel} className="flex items-center gap-3">
                                <RadioGroupItem value={struktur.keyLabel} id={struktur.keyLabel} />
                                <Label htmlFor={struktur.keyLabel} className="text-[10px]">Nilai {struktur.keyLabel}</Label>
                            </div>
                        )
                    }
                    
                </div>
        </RadioGroup>
    )
}