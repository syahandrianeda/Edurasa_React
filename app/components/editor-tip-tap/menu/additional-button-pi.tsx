
import { Button } from "~/components/ui/button";
import { Pi } from "lucide-react";
import type { Editor } from "@tiptap/react";
import TooltipComp from "~/components/ui_edura/tooltip-comp";

export default function AdditionalButtonPi({editor}:{editor:Editor}){
    function onClick(){
        // const latex = `\\pi`;
        // editor.commands.insertInlineMath({ latex: latex, });
        editor.commands.insertContent({type:'text', text:'π'})
    }
    return (
        <TooltipComp content="Masukkan Pi π">
            <Button 
                variant="outline"
                onClick={onClick}
                tabIndex={-1} 
                title="Pi π"
                type="button"
                className="p-0 leading-0 gap-0 flex flex-col has-[>svg]:p-0 h-4 min-w-4 bg-transparent mt-1"
                ><Pi className="size-3"/></Button>
        </TooltipComp>
    )
}