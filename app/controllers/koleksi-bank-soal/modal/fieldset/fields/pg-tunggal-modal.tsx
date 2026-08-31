import {useCallback, useEffect, useMemo, useState} from 'react';
import {type JSONContent} from '@tiptap/react';
import { HtmlRenderer } from '~/components/editor-tip-tap/renderer/HtmlRenderer';
import TiptapEditorSoalSimpleModal from '~/components/editor-tip-tap/rte-formulir/TiptapEditorSoalSimpleModal';


export default function PgTunggalModal({
    valueJsonParent, 
    index,  
    onChangeValueJsonItem
    }:{
        valueJsonParent:JSONContent, 
        index:number,
        onChangeValueJsonItem:(index:number, content:string)=>void,
    }){
    const [valueJson, setValueJson] = useState<JSONContent>(valueJsonParent);
    
    const html = useMemo(()=>{
        console.log('memo valueJson', valueJson, valueJsonParent)
        return HtmlRenderer({document:valueJson})
    },[valueJson]);

    useEffect(()=>{
        console.log('efek dari tiptap',{html})
        onChangeValueJsonItem(index, html)
    },[html, onChangeValueJsonItem])

    return (
        <TiptapEditorSoalSimpleModal valueJson={valueJson} onChangeJson={setValueJson}/>
    )
}