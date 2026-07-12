
import { Button } from "~/components/ui/button";
import { Pi } from "lucide-react";
import type { Editor } from "@tiptap/react";

export default function AdditionalButtonDegree({editor}:{editor:Editor}){
    function onClick(){
        // const latex = `\\pi`;
        // editor.commands.insertInlineMath({ latex: latex, });
        editor.commands.insertContent({type:'text', text:'°'})
    }
    return (
        <Button 
            variant="outline"
            onClick={onClick}
            tabIndex={-1} 
            title="Sudut/Derajat x°"
            className="p-0 leading-0 gap-0 flex flex-col has-[>svg]:p-0 h-4 min-w-4 bg-transparent mt-1"
            >x°</Button>
    )
}