import { ImagePlusIcon } from "lucide-react"
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
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import type { Editor } from "@tiptap/react";
import InsertImage from "../utils/upload-gambar-tiptap";

export function PopoverFormImage({  editor, openPop, setOpenPop }: {editor: Editor, openPop:boolean, setOpenPop: React.Dispatch<React.SetStateAction<boolean>>}) {
    // const [openPop, setOpenPop] = React.useState(false);
    const [urlGambar, setUrlGambar] = React.useState<string|File>('');
    const [disableInputText, setDisableInputText] = React.useState<boolean>(true);

    const onCommitInput = async()=>{
        const hasSelection = !editor.state.selection.empty
        if (urlGambar) {
            
            await InsertImage(urlGambar, editor);
            
            // editor.chain().focus().setImage({ src: urlGambar }).run();
            setUrlGambar('');
        }
            setOpenPop(false);
                // editor.commands.insertInlineMath({ latex: latex, });
        }
    const onUpload = (e: React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        setDisableInputText(true);
        const file = e.target.files?.[0];
        setUrlGambar(file as File)

    }
    return (
        <Popover onOpenChange={setOpenPop} open={openPop}>
        <PopoverTrigger asChild>
            <Button variant="outline" tabIndex={-1} title="Masukkan Gambar" className="p-0 leading-0 gap-0 flex flex-col has-[>svg]:p-0 h-4 min-w-4 bg-transparent mt-1">
                <ImagePlusIcon className="size-3"/>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96" align="end">
            <PopoverHeader>
            <PopoverTitle>Insert Gambar</PopoverTitle>
            <div className="text-xs">
                Silakan pilih cara masukkan gambar:
                <ul className="list-disc list-inside">
                    <li className="list-item">masukkan Url (link gambar)</li>
                    <li className="list-item">atau Upload file gambar</li>
                </ul>
            </div>
            </PopoverHeader>
            <Separator/>
            <FieldGroup className="gap-4 mt-1">
                <Field orientation="vertical">
                    <FieldLabel htmlFor="pembilang" className="w-1/2 text-xs">
                    Masukkan Url (boleh format base64)
                    </FieldLabel>
                    {
                        disableInputText &&  <Input 
                        id="pembilang" 
                        type="string" 
                        // disabled={disableInputText}
                        value={urlGambar as string}
                        onChange={(e) => setUrlGambar(e.target.value as string)}
                    />}
                </Field>
                <Field orientation="vertical">
                    <FieldLabel htmlFor="penyebut" className="w-1/2  text-xs">
                    Upload
                    </FieldLabel>
                    <Input 
                        type="file"
                        onChange={onUpload}
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
