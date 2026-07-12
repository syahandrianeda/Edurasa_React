import { Field } from "~/components/ui/field";
import GroupToolbar from "./group-toolbar";
import { SelectField } from "~/components/fields/fields";
import { AlignLeft, Heading2, List, ListOrdered } from "lucide-react";
import { Editor } from "@tiptap/react"
import {type Level} from "@tiptap/extension-heading"
import { Separator } from "~/components/ui/separator";
import type { GroupSectionsMenu, OptionsMenu } from "../type";
import { Toggle } from "~/components/ui/toggle";


export default function ListOrderToolbarGroup({editor, editorState}:{editor:Editor, editorState:any}){
    return (
        <GroupToolbar>
            <div className="flex gap-2 space-y-1 justify-center items-center">
                    <ListOrder editor={editor} editorState={editorState}/>
            </div>
            <div className="border-t border-black text-center first-letter:uppercase">List</div>
        </GroupToolbar>
    )
}

function ListOrder({editor, editorState}:{editor:Editor, editorState:any}){
    const options: OptionsMenu[] = [
        {
                id:'list',
                icon: List,
                onClick: ()=> editor.chain().focus().toggleBulletList().run(),
                pressed: editorState.isBulletList,
                group: 'paragraf'
            },
            {
                id:'list-ordered',
                icon: ListOrdered,
                onClick: ()=> editor.chain().focus().toggleOrderedList().run(),
                pressed: editorState.isOrderedList,
                group: 'paragraf'
            }
    ];
    return(
        <Field className="col-span-1">
            <div className="flex gap-1 justify-center">
                {
                    options.map((option, idx) => (
                        <Toggle 
                            key={idx} 
                            onPressedChange={option.onClick} 
                            pressed={option.pressed}
                            tabIndex={-1}
                            className={`p-1 outline-none m-1 h-4 min-w-2 ${option.pressed ? 'data-[state=on]:bg-blue-500 data-[state=on]:text-white' : 'bg-gray-200'}`
                            }>  
                            <option.icon  className="size-3"/>
                        </Toggle>
                    ))
                }
            </div>
                    
            
        </Field>
    )
}