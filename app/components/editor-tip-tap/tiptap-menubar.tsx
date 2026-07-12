import { Editor, useEditorState } from "@tiptap/react"
import type { GroupSectionsMenu, OptionsMenu } from './type';
import { 
    BoldIcon, 
    Heading1Icon, 
    Heading2Icon, 
    Heading3Icon, 
    ItalicIcon, 
    TextAlignCenter, 
    TextAlignEndIcon, 
    TextAlignJustify, 
    TextAlignStartIcon, 
    UnderlineIcon, 
    
    
} from "lucide-react"; 
import { Toggle } from "../ui/toggle";
import GroupToolbar from "./menu/group-toolbar";
import { ToggleToolbarGroup } from "./menu/toggle-toolbar-group";
import { PopoverFormPecahanBiasa } from "./menu/popover-pecahan-biasa";
import { PopoverFormPecahanCampuran } from "./menu/popover-pecahan-campuran";
import { createOptionsToggleMenuTiptap } from "./configs/create-options-config";

interface MenuBarTiptapProps {
  editor: Editor 
}

export default function MenuBarTiptap({ editor }: MenuBarTiptapProps ) {
    const {opsiToolbar, editorStateData} = createOptionsToggleMenuTiptap(editor);
    console.log('opsiToolbar', editorStateData);
    return (
        <div className="flex space-x-1 px-2 justify-center items-stretch">
            <ToggleToolbarGroup optionsMenu={opsiToolbar}/>
            <GroupToolbar>
                <div className="border-b border-black flex gap-2 space-y-1 justify-center">  
                    {/* <PopoverFormPecahanBiasa editor={editor}/> */}
                    {/* <PopoverFormPecahanCampuran editor={editor}/> */}
                </div>
                <div className="border-t text-center">Matematika</div>
            </GroupToolbar>
        </div> 
    ) 
}