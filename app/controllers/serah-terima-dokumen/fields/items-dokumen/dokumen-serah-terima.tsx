import type { dokumenSerahTerimaType } from "./dokumen-serah-terima-type";
import FormItemDokumen from "./form-item-document";
import ItemListDokumen from "./item-list-document";
import {useCallback, useState} from 'react';
import {type Updater} from 'use-immer';

let id:number = 0
const initial:dokumenSerahTerimaType[] = [
    {
        id: id++,
        name:''
    }
]
export default function DokumenSerahTerima({
    dokumen, 
    setDokumen
}:{
    dokumen: dokumenSerahTerimaType[],
    setDokumen:Updater<dokumenSerahTerimaType[]>

    }){
    // const [dokumen, setDokumen] = useImmer<dokumenSerahTerimaType[]>([])
    
    const onAdd = (v:string)=>{
        
        setDokumen(draft=>{
            draft.push({
                id:id++,
                name:v
            });
        })
    }
    const onEdit = (v:dokumenSerahTerimaType)=>{
        
        setDokumen(draft=>{
            const index = draft.findIndex(s=>s.id === v.id);
            draft[index] = v
        });
    }
    const onDelete = (v:dokumenSerahTerimaType)=>{
        setDokumen(draft=>{
            const index = draft.findIndex(s=>s.id === v.id);
            draft.splice(index, 1)
        })
    }
    /**
     */
    const moveUp = useCallback((index: number) => {
            if (index <= 0) return;
            setDokumen(draft => {
                const tmp = draft[index - 1];
                draft[index - 1] = draft[index];
                draft[index] = tmp;
                // update index_prota after reorder
                // for (let i = 0; i < draft.length; i++) draft[i].index_prota = i + 1;
            });
        }, [setDokumen]);
        
            const moveDown = useCallback((index: number) => {
                setDokumen(draft => {
                    if (index < 0 || index >= draft.length - 1) return;
                    const tmp = draft[index + 1];
                    draft[index + 1] = draft[index];
                    draft[index] = tmp;
                    // update index_prota after reorder
                    // for (let i = 0; i < draft.length; i++) draft[i].index_prota = i + 1;
                });
            }, [setDokumen]);
        
    return(
        <div className="w-full">
            <FormItemDokumen handleAdd={onAdd}/>
            <ItemListDokumen dokuments={dokumen} onChange={onEdit} onDelete={onDelete} onUp={moveUp} onDown={moveDown}/>
        </div>
    )
}