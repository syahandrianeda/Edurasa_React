import RteTiptap from "~/components/editor-tip-tap/RTE";
import * as React from "react";
import Tiptap from "~/components/editor-tip-tap/tiptap";
import MenuBarTiptap from "~/components/editor-tip-tap/tiptap-menubar";
import type { Content, JSONContent } from "@tiptap/react";
import RteTiptapFormulirLive from "~/components/editor-tip-tap/rte-formulir/rte-formulir-live";
import { DocumentRenderer } from "~/components/editor-tip-tap/renderer/DocumentRenderer";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";


export default function CreateItemSoal(){
    const [value, setValue] = React.useState<Content>("");
    const [valueJson, setValueJson] = React.useState<JSONContent | null>(null);
    React.useEffect(()=>{
        if(!value){
            return
        }
        

    }, [value]);
    console.log('valueJson', valueJson);
    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">New Editor Tiptap</h3>
            <p>Ceritanya ini formulir</p>
            <TableWithScrolling  >
                <thead>
                    <tr className="border-b border-black">
                        <th className="border-e border-black w-0 px-2">Komponen Soal</th>
                        <th>Konten</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-black">
                        <td className="border-e border-black px-2 text-nowrap">Indikator Soal</td>
                        <td className="py-1"><RteTiptapFormulirLive value={value} onChange={setValue} valueJson={valueJson} onChangeJson={setValueJson} /></td>
                    </tr>
                    <tr className="border-b border-black">
                        <td className="border-e border-black px-2 text-nowrap">Result</td>
                        <td className="py-1" dangerouslySetInnerHTML={{__html: value?.toString() || ''}} />
                    </tr>
                    <tr className="border-b border-black">
                        <td className="border-e border-black px-2 text-nowrap">Result ChatGPT</td>
                        <td className="py-1 editor-document"><DocumentRenderer document={valueJson} /></td>
                    </tr>
                    
                </tbody>
            </TableWithScrolling>
        </div>
            

            
        
    )
}