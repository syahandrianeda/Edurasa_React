import { Field } from "~/components/ui/field";
import GroupToolbar from "./group-toolbar";
import { SelectField } from "~/components/fields/fields";
import { AlignLeft, Heading2, List, ListOrdered } from "lucide-react";
import { Editor } from "@tiptap/react"
import {type Level} from "@tiptap/extension-heading"
import { Separator } from "~/components/ui/separator";
import type { GroupSectionsMenu, OptionsMenu } from "../type";
import { Toggle } from "~/components/ui/toggle";


export default function TextAlignToolbarGroup({editor, editorState}:{editor:Editor, editorState:any}){
    return (
        <GroupToolbar>
            <div className="flex gap-2 space-y-1 justify-center items-center">
                    <AlignSelect editor={editor}/>
            </div>
            <div className="border-t border-black text-center first-letter:uppercase">Align</div>
        </GroupToolbar>
    )
}

function AlignSelect({editor}:{editor:Editor}){
    const onSelect=(v:string)=>{
        if(v==="") {
            editor.chain().focus().setTextAlign('left').run();
            return;
        }
        editor.chain().focus().setTextAlign(v).run()
    }
    return (
        <Field className="col-span-2">
            <label className="flex gap-2">
                Align
                <select 
                    onChange={(e)=>onSelect(e.currentTarget.value)}
                    className="w-24 bg-white"
                    >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                        <option value="justify">Justify</option>
                </select>
            </label>
        </Field>
    )
}