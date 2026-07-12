import React, { useRef, useState, type FormEvent } from "react";
import { useEditor } from "~/adapters/react/hooks/editor/useEditor";
import { UpdateTextCommand } from "~/domain/editor-document/engine/command/text/UpdateTextCommand";
import { FormattingToolbar } from "~/adapters/react/components/toolbar/FormattingToolbar";

// Definisi Interface untuk Props Komponen
interface CustomTextEditorProps {
    nodeId: string;
    onInput?: (htmlContent: string) => void;
    placeholder?: string;
}

export default function TEeditor({ nodeId, onInput, placeholder, ...props }:React.ComponentProps<'div'> & CustomTextEditorProps){
    const editor = useEditor();
    const editorRef = useRef<HTMLDivElement | null>(null);
    const [isHtmlMode, setIsHtmlMode] = useState<boolean>(false);

    // Handle formatting commands
    const handleCommand = (command: string, value: string = "") => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
        document.execCommand(command, false, value);
        triggerChange();
    };

    // Memicu callback onInput dengan aman
    const triggerChange = (): void => {
        if (editorRef.current) {
            const content = editorRef.current.innerHTML;
            
            // Emit UpdateTextCommand ke editor store
            editor.store.execute(new UpdateTextCommand(nodeId, content));
            
            // Tetap panggil onInput callback untuk backward compatibility
            onInput?.(content);
        }
    };

    // Handler untuk event typing (onInput)
    const handleInput = (e: FormEvent<HTMLDivElement>): void => {
        triggerChange();
    };

    // Switcher antara mode teks Rich-Text dan Kode HTML mentah
    const toggleHtmlMode = (): void => {
        const editor = editorRef.current;
        if (!editor) return;

        if (!isHtmlMode) {
        // Pindah ke mode kode HTML (menampilkan tag sebagai text biasa)
        editor.innerText = editor.innerHTML;
        } else {
        // Kembali ke mode visual (merender teks tadi menjadi elemen HTML)
        editor.innerHTML = editor.innerText;
        }
        setIsHtmlMode(!isHtmlMode);
    };

    return (
        <div className="w-full border border-slate-300 rounded-lg overflow-hidden bg-white shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
            
            {/* Formatting Toolbar */}
            <FormattingToolbar onCommand={handleCommand} />

            {/* HTML Mode Toggle */}
            <div className="flex items-center justify-between px-2 py-1 bg-slate-50 border-b border-slate-200">
                <div></div>
                <button 
                    type="button"
                    className={`px-3 py-1 border rounded text-xs font-semibold shadow-sm transition-all ${
                        isHtmlMode 
                        ? 'bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200' 
                        : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
                    }`} 
                    onClick={toggleHtmlMode}
                >
                    {isHtmlMode ? '✨ Lihat Visual' : '💻 Lihat HTML'}
                </button>
            </div>

            {/* Editable Area */}
            <div
                ref={editorRef}
                contentEditable={!isHtmlMode}
                onInput={handleInput}
                className={`w-full p-4 min-h-[250px] focus:outline-none overflow-y-auto prose max-w-none
                ${isHtmlMode ? 'font-mono text-sm bg-slate-900 text-emerald-400' : 'bg-white text-slate-800'}
                `}
                dangerouslySetInnerHTML={{ __html: '' }}
                data-placeholder={placeholder}
                style={{
                    // CSS untuk placeholder pada div contentEditable
                    content: 'attr(data-placeholder)',
                }}
            />
        </div>
    );
}