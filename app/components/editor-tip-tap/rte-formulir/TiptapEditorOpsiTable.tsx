import * as React from 'react';
import { useEditor, EditorContent, type Content, type JSONContent, type HTMLContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Math, { migrateMathStrings } from '@tiptap/extension-mathematics'
import { createOptionsToggleMenuTiptap } from "../configs/create-options-config";
import { ToggleToolbarGroup } from "../menu/toggle-toolbar-group";
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
import TextAlign from '@tiptap/extension-text-align';
import { SetCellVerticalAlign } from '../commands/SetCellVerticalAlign';
import ShortcutGuider from './ShortcutGuider';
import { generateAlphabet } from '~/lib/generateAlphabet';
import { createStringTableTiptap } from '~/controllers/bank-soal/editor/createStringTableTiptap';

type Props = {
    row:number, 
    col:number,
    // templateTable:Content
    valueJson?:Content;
    onChangeJson?:React.Dispatch<React.SetStateAction<JSONContent | null>>
};


export default function TiptapEditorOpsiTable({col, row, valueJson, onChangeJson }: Props) {
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
                StarterKit.configure({
                   //....
                }),
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

                    
                    // resize: {
                    //     enabled: true,
                    //     alwaysPreserveAspectRatio: true,
                    //     },
                }),
                // TableKit.configure({
                //     table: { resizable: true },
                // }),
                Table.extend({
                    addCommands() {

                        return {

                            ...this.parent?.(),

                            setCellVerticalAlign: (value: any) => SetCellVerticalAlign(value),

                        };

                    },
                    addKeyboardShortcuts() {
                        const parent = this.parent?.()

                        return {
                            ...parent,

                            Tab: () => {
                                const editor = this.editor

                                // Jika berhasil pindah ke cell berikutnya,
                                // maka hentikan di sini.
                                if (editor.commands.goToNextCell()) {
                                return true
                                }

                                // Jangan buat row baru.
                                return true
                            },

                    }
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
                                            style:
                                                `vertical-align:${attrs.verticalAlign}`,
                                        };

                                    },

                                },

                            };

                        },

                    })
                // Dropcursor,
            ],
            onCreate: ({ editor: currentEditor }) => {
                migrateMathStrings(currentEditor)
            },

            content: valueJson, 
            editorProps:{
                attributes: {
                    class:'focus:outline-none focus:ring-1 bg-white focus:ring-blue-500 p-2 border-s border-b border-e border-t-none'
                }
            },
            onUpdate({ editor }) {
                
                // onChange?.(editor.getHTML());
                onChangeJson?.(editor.getJSON())
            },
            
        });
    
    const addTable = React.useCallback((cont:HTMLContent) => {
        editor.commands.setContent(cont);
        // editor.chain().focus().insertTable(cont).run();
    }, [editor])
    // console.log('test di tiptap', col, row)
    React.useEffect(()=>{
        // console.log('di useEffect', col, row);
        const ts = createStringTableTiptap(row, col);
        // editor.chain().focus().setContent(ts);
        // editor.commands.setContent(ts);
        addTable(ts);
    },[row, col, addTable])
    
    return (
        <div 
            
            className="border border-slate-400 bg-slate-300 rounded-md p-0 w-full overflow-clip">
            
            <div className="grid grid-cols-3 gap-1 space-y-1 space-x-1 px-2 justify-center pb-1">
                <GroupToolbar className='flex-row justify-between'>
                        <PopoverFormPecahanBiasa pecahan={pecahanBiasa} editor={editor} openPop={openPop} setOpenPop={setOpenPop}/>
                        <PopoverFormPecahanCampuran pecahan={pecahanCampuranState} editor={editor} openPop={openPopCampuran} setOpenPop={setOpenPopCampuran}/>
                        <AdditionalButtonPi editor={editor}/>
                        <AdditionalButtonDegree editor={editor}/>
                        <PopoverFormulaLatex editor={editor} valueLatex={valueLatex} openPop={openPopFormula} setOpenPop={setOpenPopFormula}/>
                </GroupToolbar>
                <GroupToolbar className='flex-row justify-between'>
                        <PopoverFormImage editor={editor} openPop={openPopGambar} setOpenPop={setOpenPopGambar}/>
                </GroupToolbar>
            </div> 
            <EditorContent editor={editor} className="editor-document"/>
            <div className='bottom-0 bg-slate-200 w-full flex justify-between'>
                <div className="text-xs p-1 flex items-center gap-2">Shortcut <ShortcutGuider/></div>
                <div className="text-xs p-1">Powered By Tiptap</div>
            </div>
        </div>
    
    )
}
