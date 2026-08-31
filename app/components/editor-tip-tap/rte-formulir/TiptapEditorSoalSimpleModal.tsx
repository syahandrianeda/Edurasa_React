import * as React from 'react';
import { useEditor, EditorContent, type Content, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Math, { migrateMathStrings } from '@tiptap/extension-mathematics'
import { createOptionsToggleMenuTiptap } from "../configs/create-options-config";
import GroupToolbar from "../menu/group-toolbar";
import { PopoverFormPecahanBiasa } from "../menu/popover-pecahan-biasa";
import { getFraction, getLatexCategory, getMixedFraction, type LatexCategory } from "../utils/getFractionLatex";
import type { PecahanBiasa, PecahanCampuran } from "../type";
import { PopoverFormPecahanCampuran } from "../menu/popover-pecahan-campuran";
import { Table, TableCell, TableHeader, TableKit, TableRow } from '@tiptap/extension-table'
import PopoverFormulaLatex from "../menu/popover-formula";
import Image from '@tiptap/extension-image'
import AdditionalButtonPi from "../menu/additional-button-pi";
import AdditionalButtonDegree from "../menu/additional-button-degree";
import { PopoverFormImage } from "../menu/popover-image";
import { BubbleMenuAsContextMenu } from '../menu/bubble-menu';
import { Button } from '~/components/ui/button';
import { Table2Icon } from 'lucide-react';
import TextAlign from '@tiptap/extension-text-align';
import { SetCellVerticalAlign } from '../commands/SetCellVerticalAlign';
import ParagraphToolbarGroup from '../menu/ParagraphToolbarGroup';
import TextAlignToolbarGroup from '../menu/TextAlignToolbarGroup';
import ListOrderToolbarGroup from '../menu/ListOrderToolbarGroup';
import ShortcutGuider from './ShortcutGuider';
import { cn } from '~/lib/utils';
import TooltipComp from '~/components/ui_edura/tooltip-comp';
import PasteImage from '~/components/editor-tiptap/extension/paste-image-extension';
import UploadGambarSoalService from '~/infrastructures/services/upload-gambar-soal-service-implements';

type Props = {
    // value?: Content;
    // onChange?: (html: Content) => void;
    valueJson?:Content;
    onChangeJson?:React.Dispatch<React.SetStateAction<JSONContent>>
    className?:string
};


export default function TiptapEditorSoalSimpleModal({ valueJson, onChangeJson, className }: Props) {
    // const [isFocused, setIsFocused] = React.useState(false);
    const [showContext, setShowContext] = React.useState(false);
    const [openPop, setOpenPop] = React.useState(false);
    const [openPopCampuran, setOpenPopCampuran] = React.useState(false);
    const [openPopGambar, setOpenPopGambar] = React.useState(false);
    const [openPopFormula, setOpenPopFormula] = React.useState(false);
    const [pecahanBiasa, setPecahanBiasa] = React.useState<PecahanBiasa|null>(null);
    const [pecahanCampuranState, setPecahanCampuranState] = React.useState<PecahanCampuran|null>(null);
    const [valueLatex, setValueLatex] = React.useState<string|null>(null);

    const editor = useEditor({
            extensions: [
                StarterKit,
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                }),
                // Math,
                Math.configure({
                    inlineOptions: {
                        
                        onClick: (node, pos) => {
                            const Latex = node.attrs.latex;
                            const kategori:LatexCategory = getLatexCategory(Latex);
                            
                            if(kategori === 'pecahanBiasa'){
                                const pecahan = getFraction(Latex)
                                setPecahanBiasa(pecahan)
                                setOpenPop(true);
                            };
                            if(kategori === 'pecahanCampuran'){
                                const pecahan = getMixedFraction(Latex);
                                setPecahanCampuranState(pecahan);
                                setOpenPopCampuran(true);
                            }
                            if(kategori === 'latexFormula'){
                                setValueLatex(Latex);
                                setOpenPopFormula(true);
                            }
                        },
                        
                    },
                }), 
                // MathInline,
                PasteImage.configure({
                    // Use client-side base64 upload flow via UploadGambarSoalService
                    upload: async (file: File, onProgress?: (p: number) => void) => {
                        try {
                            const svc = new UploadGambarSoalService();
                            const url = await svc.uploadFile(file, onProgress);
                            
                            return url;
                        } catch (err) {
                            console.error("upload error", err);
                            return "";
                        }
                    },
                }),               
                Image.configure({
                    inline:true,
                    allowBase64: true,
                    resize: {
                        enabled: true,
                        alwaysPreserveAspectRatio: true,
                    },
                    HTMLAttributes: {
                        class: 'inline-block align-middle',
                        referrerpolicy:  "no-referrer",
                        crossorigin: "anonymous",
                        loading: "lazy",
                        
                    },
                }),
                Table.extend({
                    addCommands() {
                        return {
                            ...this.parent?.(),
                            setCellVerticalAlign: (value: any) => SetCellVerticalAlign(value),
                        };
                    },
                }).configure({
                    resizable:true,
                }),
                TableRow,
                TableHeader,
                TableCell.extend({
                        addAttributes() {
                            return {
                                ...this.parent?.(),
                                verticalAlign: {
                                    default: "top",
                                    renderHTML(attrs) {
                                        return {
                                            style: `vertical-align:${attrs.verticalAlign}`,
                                        };
                                    },
                                },
                            };
                        },
                    })
            ],
            onCreate: ({ editor: currentEditor }) => { migrateMathStrings(currentEditor) },
            content: valueJson, 
            editorProps:{
                attributes: {
                    class:'focus:outline-none focus:ring-1 bg-white dark:text-black focus:ring-blue-500 p-2 border-s border-b border-e border-t-none',
                    
                }
                
            },
            onUpdate({ editor }) {
                onChangeJson?.(editor.getJSON())
            },
            
        });
    
    
    const { editorStateData} = createOptionsToggleMenuTiptap(editor);
    
    const addTable = React.useCallback(() => {
        editor.chain().focus().insertTable().run();
    }, [editor])

    return (
        <div 
            className={cn("border border-slate-400 bg-slate-300 dark:bg-slate-600 rounded-md p-0 w-full overflow-clip shadow shadow-sky-300", className)}>
            <div className="grid grid-cols-3 gap-1 space-y-1 space-x-1 px-2 justify-center align-center">
                <GroupToolbar className='flex-row justify-between py-0 has-[&>svg]:align-middle'>
                    <PopoverFormPecahanBiasa pecahan={pecahanBiasa} editor={editor} openPop={openPop} setOpenPop={setOpenPop}/>
                    <PopoverFormPecahanCampuran pecahan={pecahanCampuranState} editor={editor} openPop={openPopCampuran} setOpenPop={setOpenPopCampuran}/>
                    <AdditionalButtonPi editor={editor}/>
                    <AdditionalButtonDegree editor={editor}/>
                    <PopoverFormulaLatex editor={editor} valueLatex={valueLatex} openPop={openPopFormula} setOpenPop={setOpenPopFormula}/>
                </GroupToolbar>
                <GroupToolbar className='flex-row justify-evenly items-center w-full gap-2'>
                    <PopoverFormImage editor={editor} openPop={openPopGambar} setOpenPop={setOpenPopGambar}/>
                    <TooltipComp content="Buat Tabel">
                        <Button 
                            variant="outline" 
                            type='button'
                            tabIndex={-1} 
                            title="Buat Tabel" 
                            className="p-0 leading-0 gap-0 flex flex-col has-[>svg]:p-0 h-4 min-w-4 bg-transparent mt-1"
                            onClick={addTable}
                            >
                            <Table2Icon className="size-3"/>
                        </Button>
                    </TooltipComp>
                    <ShortcutGuider/>
                </GroupToolbar>
                <div className="text-xs p-1 flex items-center gap-2 ms-auto">
                    <TooltipComp content="Opsi pilihan sebagai kunci jawaban">
                        <p>{className?'Kunci Jawaban':''}</p>
                    </TooltipComp>
                </div>
            </div> 
            
            <BubbleMenuAsContextMenu editor={editor} editorStateData={ editorStateData}/>
            
            <EditorContent editor={editor} className="editor-document" placeholder='ketik di sini'/>
            {/* <div className='bottom-0 bg-slate-200 w-full flex justify-between'>
                <div className="text-xs p-1 flex items-center gap-2">Shortcut <ShortcutGuider/></div>
                <div className="text-xs p-1">Powered By Tiptap</div>
            </div> */}
        </div>
    )
}