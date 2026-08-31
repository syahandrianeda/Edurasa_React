import * as React from 'react';
import type { Editor } from "@tiptap/react";
import { Sigma } from "lucide-react";
import { Button } from "~/components/ui/button";
import { 
        Popover, 
        PopoverContent, 
        PopoverHeader, 
        PopoverTitle, 
        PopoverTrigger 
    } from "~/components/ui/popover";
import { Separator } from '~/components/ui/separator';
import { Field, FieldGroup } from '~/components/ui/field';
import ButtonCommitAwesome from '~/components/button-awesome/commit-button';
import TooltipComp from '~/components/ui_edura/tooltip-comp';

export default function PopoverFormulaLatex({editor, valueLatex, openPop, setOpenPop }:{editor:Editor, valueLatex?:string|null,openPop:boolean, setOpenPop: React.Dispatch<React.SetStateAction<boolean>>}){
    // const [openPop, setOpenPop] = React.useState(false);
    const [showMathEditor, setShowMathEditor] = React.useState(false);
    const mathfieldElRef = React.useRef<any>(null);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    // const [formula, setFormula] = React.useState("");
    
    // React.useEffect(()=>{
    //     if(!valueLatex) return;
    //     setFormula(valueLatex);
    // },[])
    // console.log('latex formula', valueLatex, formula);

    // React.useEffect(() => {
    //         let mounted = true;
    //         import('katex').then((k) => {
    //             if (!mounted) return;
    //             katexRef.current = k;
    //         }).catch(() => {});
    //         return () => { mounted = false; };
    //     }, []);

    React.useEffect(() => {
            let mounted = true;
            if (!showMathEditor && !openPop) return;
    
            // dynamically import MathLive and mount a <math-field> element
            import('mathlive').then((ml) => {
                if (!mounted) return;
                ml.MathfieldElement.soundsDirectory = null;
                ml.MathfieldElement.keypressSound = null;
                ml.MathfieldElement.keypressVibration = false;
                try {
                    const mfEl = document.createElement('math-field') as any;
                    mfEl.setAttribute('virtual-keyboard-mode', 'manual');
                    mfEl.style.width = '360px';
                    mfEl.style.minHeight = '120px';
                    mfEl.style.fontSize = '16px';
                    
                    // set initial value
                    // if (formula) {
                    //     mfEl.setValue?.(formula);
                    // }
                    if(valueLatex){
                        mfEl.setValue?.(valueLatex);
                    }
                    containerRef.current?.appendChild(mfEl);
                    mathfieldElRef.current = mfEl;
                    // focus the mathfield
                    mfEl.focus?.();
                } catch (err) {
                    // ignore
                }
            }).catch(() => {});
    
            return () => {
                mounted = false;
                if (mathfieldElRef.current) {
                    try { mathfieldElRef.current.remove(); } catch {}
                    mathfieldElRef.current = null;
                }
            };
        }, [showMathEditor,openPop]);

    function getLatexFromField() {
        return mathfieldElRef.current?.getValue?.() ?? valueLatex;
    }
    const onCommitInput = ()=>{
        const hasSelection = !editor.state.selection.empty
        const latex = getLatexFromField();

        if(hasSelection){
            editor.commands.updateInlineMath({ latex: latex, });
            setOpenPop(false);
            setShowMathEditor(false);
            
            return;
        }
            editor.commands.insertInlineMath({ latex: latex, });
            setOpenPop(false);
            setShowMathEditor(false);
        }    
    return (
        <Popover onOpenChange={setOpenPop} open={openPop}>
        <TooltipComp content="Teks Editor Matematika">
            <PopoverTrigger asChild>
                <Button variant="outline" type="button" tabIndex={-1} className="p-0 leading-0 gap-0 flex flex-col has-[>svg]:p-0 h-4 min-w-4 bg-transparent mt-1">
                    <Sigma/>
                </Button>
            </PopoverTrigger>
        </TooltipComp>
        <PopoverContent className="w-full" align="end" 
        
            onInteractOutside={(event) => {
                    const target = event.target as HTMLElement;

                    if ( target.closest(".ML__keyboard") ) {
                        event.preventDefault();
                    }
                }}
            onPointerDownOutside={(event) => {
                    const target = event.target as HTMLElement;
                    if (target.closest(".ML__keyboard")) {
                        event.preventDefault();
                    }
                }}
            
        >
            <PopoverHeader>
            <PopoverTitle>Equation Editor</PopoverTitle>
                {/* deskrips di sini */}
            </PopoverHeader>
            <Separator/>
            <div ref={containerRef} />
            <FieldGroup className='mt-1'>
                <Field orientation="horizontal" className='justify-center'>
                    <ButtonCommitAwesome 
                        labelButton="Commit"  
                        type='button'
                        className={`py-1 px-2 text-xs disabled:bg-gray-300 disabled:shadow-none w-fit`} 
                        onClick={onCommitInput}
                        />
                </Field>
            </FieldGroup>
        </PopoverContent>
        </Popover>
    )
}