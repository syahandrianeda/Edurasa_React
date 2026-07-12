import { Field } from "~/components/ui/field";
import GroupToolbar from "./group-toolbar";
import { SelectField } from "~/components/fields/fields";
import { AlignLeft, Heading2, List, ListOrdered } from "lucide-react";
import { Editor } from "@tiptap/react"
import {type Level} from "@tiptap/extension-heading"
import { Separator } from "~/components/ui/separator";
import type { GroupSectionsMenu, OptionsMenu } from "../type";
import { Toggle } from "~/components/ui/toggle";


export default function ParagraphToolbarGroup({editor, editorState}:{editor:Editor, editorState:any}){
    return (
        <GroupToolbar>
            <div className="flex gap-2 space-y-1 justify-center items-center">
                    <HeadingSelect editor={editor}/>
            </div>
            <div className="border-t border-black text-center first-letter:uppercase">Paragraph</div>
        </GroupToolbar>
    )
}

function HeadingSelect({editor}:{editor:Editor}){
    const onSelect=(v:string)=>{
        if(v==="") {
            editor.chain().focus().setParagraph().run();
            return;
        }
        const n = Number(v) as Level;
        editor.chain().focus().setHeading({ level: n }).run()
    }
    return (
        <Field className="col-span-2">
            <label className="flex gap-2">
                Style
                <select 
                    onChange={(e)=>onSelect(e.currentTarget.value)}
                    className="w-24 bg-white"
                    >
                        <option value="">Paragraph</option>
                        <option value="1">H1</option>
                        <option value="2">H2</option>
                        <option value="3">H3</option>
                        <option value="4">H4</option>
                        <option value="5">H5</option>
                        <option value="6">H6</option>
                </select>
            </label>
        </Field>
    )
}