import {type Dispatch, type SetStateAction} from 'react';
import TiptapEditorSoalSimple from "~/components/editor-tip-tap/rte-formulir/TiptapEditorSoalSimple";
import type { JSONContent } from '@tiptap/react';

type EditorPembahasanProps ={
    valueJson:JSONContent|null, 
    action:Dispatch<SetStateAction<JSONContent|null>>
    
}
export default function EditPembahasanModal({valueJson, action}:EditorPembahasanProps){
    
    return (
        <div className="relative mt-4">
            <div className='absolute ps-1 pe-4 rounded-tr-2xl border-s-2 border-t boreder-e -top-3.5 border-slate-400 left-2 text-[10px] bg-slate-300'>Pembahasan/Penskoran:</div>
            <TiptapEditorSoalSimple valueJson={valueJson} onChangeJson={action}/>
        </div>
    )
}