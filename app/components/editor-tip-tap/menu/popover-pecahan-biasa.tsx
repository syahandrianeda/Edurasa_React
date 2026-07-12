import { Box, SquareDashed } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import * as React from "react";
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "~/components/ui/popover"
import { Separator } from "~/components/ui/separator";
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import type { Editor } from "@tiptap/react";
import type { PecahanBiasa } from "../type";

export function PopoverFormPecahanBiasa({ pecahan, editor, openPop, setOpenPop }: {pecahan: PecahanBiasa|null,editor: Editor, openPop:boolean, setOpenPop: React.Dispatch<React.SetStateAction<boolean>>}) {
    // const [openPop, setOpenPop] = React.useState(false);
    const [pembilang, setPembilang] = React.useState<number>(1);
    const [penyebut, setPenyebut] = React.useState<number>(2);
    React.useEffect(()=>{
        if(!pecahan){
            return;
        }
        const {numerator, denominator} = pecahan;
        setPembilang(numerator),
        setPenyebut(denominator);
    },[pecahan])

    const onCommitInput = ()=>{
        const hasSelection = !editor.state.selection.empty
        const latex = `\\frac{${pembilang}}{${penyebut}}`;
            if (hasSelection) {
                
                setOpenPop(false);
                editor.commands.updateInlineMath({ latex: latex, });
                return 
            }
            setOpenPop(false);
                editor.commands.insertInlineMath({ latex: latex, });
        }

    return (
        <Popover onOpenChange={setOpenPop} open={openPop}>
        <PopoverTrigger asChild>
            <Button variant="outline" tabIndex={-1} className="p-0 leading-0 gap-0 flex flex-col has-[>svg]:p-0 h-4 min-w-4 bg-transparent mt-1">
                <SquareDashed className="size-2"/>
                <span className="border-b border-black w-2"></span>
                <SquareDashed className="size-2"/>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64" align="end">
            <PopoverHeader>
            <PopoverTitle>Pecahan Biasa</PopoverTitle>
            <div className="text-xs bg-slate-200 flex flex-col items-center mb-1 justify-center">
                <span>{pembilang}</span>
                <span className="border-b border-black w-2"></span>
                <span>{penyebut}</span>
            </div>
            </PopoverHeader>
            <Separator/>
            <FieldGroup className="gap-4 mt-1">
                <Field orientation="horizontal">
                    <FieldLabel htmlFor="pembilang" className="w-1/2 text-xs">
                    Pembilang
                    </FieldLabel>
                    <Input 
                        id="pembilang" 
                        type="number" 
                        value={pembilang}
                        onChange={(e) => setPembilang(parseInt(e.target.value) || 1)}
                    />
                </Field>
                <Field orientation="horizontal">
                    <FieldLabel htmlFor="penyebut" className="w-1/2 text-xs">
                    Penyebut
                    </FieldLabel>
                    <Input 
                        id="penyebut" 
                        type="number" 
                        value={penyebut}
                        onChange={(e) => setPenyebut(parseInt(e.target.value) || 1)}
                    />
                </Field>
                <Field>
                    <ButtonCommitAwesome 
                        labelButton="Commit"
                        className={`py-1 px-2 text-xs disabled:bg-gray-300 disabled:shadow-none`} 
                        onClick={onCommitInput}/>
                </Field>
            </FieldGroup>
        </PopoverContent>
        </Popover>
    )
}
