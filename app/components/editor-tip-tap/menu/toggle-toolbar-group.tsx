import { Editor } from "@tiptap/react"
import { createOptionsToggleMenuTiptap } from "../configs/create-options-config";
import GroupToolbar from "./group-toolbar";
import { Toggle } from "~/components/ui/toggle";
import type { GroupSectionsMenu } from "../type";

interface GroupToogleToolbarProps {
    optionsMenu: GroupSectionsMenu[]
}
export function ToggleToolbarGroup({optionsMenu}:GroupToogleToolbarProps){
    
    return (
        <>
            {optionsMenu.map((group, index) => (
                <GroupToolbar key={index} className="justify-between">
                    <div className="flex gap-1 justify-center items-center">
                        {group.options.map((option, idx) => (
                            <Toggle 
                                key={idx} 
                                onPressedChange={option.onClick} 
                                pressed={option.pressed}
                                tabIndex={-1}
                                className={`p-1 outline-none m-1 h-4 min-w-2 ${option.pressed ? 'data-[state=on]:bg-blue-500 data-[state=on]:text-white' : 'bg-gray-200'}`
                                }>  
                                <option.icon  className="size-3"/>
                            </Toggle>
                        ))}
                    </div>
                    <div className="border-t border-black text-center first-letter:uppercase">{group.groupName}</div>
                </GroupToolbar>
            ))}                                
        </>
    )
}