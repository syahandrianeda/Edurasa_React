import type { handleProps } from "../fields/props-serah-terima";
import {useEffect, useState, type ChangeEvent} from 'react';
import { Field } from "~/components/ui/field";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type { UserPtk } from "~/types";

export default function AksesFormulirSerahTerimaDokumen({value,setValue}:handleProps){
    const user = getSessionApp<UserPtk>()!;//?.friends);
    const friends = user?.friends;
    const [idAkses, setIdAkses] = useState<number[]>(value?.akses_user ?? [user?.id]);

    const handleAkses = (e:ChangeEvent<HTMLInputElement>)=>{
        const {checked, value} = e.currentTarget;
        const koleksiId = checked
                ? [...new Set([...idAkses, Number(value)])]
                : idAkses.filter(s=>s!== Number(value))

        setIdAkses(koleksiId);
        setValue(draft=>{
            draft.akses_user = koleksiId
        })
    }
    useEffect(()=>{
        setValue(draft=>{
            draft.akses_user=[user?.id]
        })
    },[])
    return (
        <div className="mt-7 relative text-sm bg-linear-to-bl from-sky-200  to-purple-400 rounded-tr-2xl rounded-b-2xl p-2 shadow-lg shadow-purple-500">
            <div className="absolute -top-4 left-0 ps-1 pe-4 rounded-tr-2xl text-xs bg-sky-200">Akses Formulir</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 md:grid-rows-10 md:grid-flow-col w-full">
                {
                    friends?.map((m,i)=>
                        <Field key={m.id}>
                            <label className="has-checked:bg-sky-300 text-nowrap truncate gap-1 flex has-checked:after:content-['✓'] has-checked:after:ms-auto">
                                <input type="checkbox"
                                value={m.id}
                                disabled={m.id === user.id}
                                checked={idAkses.includes(m.id)}
                                onChange={handleAkses}
                                />
                                {i+1}. {m.name}
                            </label>
                        </Field>
                    )
                }
            </div>
            <div className="mt-2 text-[10px]">Hak akses ini adalah pihak yang dapat mengisi/mengedit/menghapus formulir serah terima dokumen</div>
        </div>
        
    )
}