import { useEffect } from "react"
import { SelectTypeJudul, ToolbarTextEditor } from "~/components/toolbars/state-toolbar/comp-text-editor-toolbar"
import type { InputTypeEditor } from "~/components/toolbars/state-toolbar/interface-title-description"
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar"

const InitializeJudul:InputTypeEditor = {
    type: 'h1',
    text: '',
    classNames: ['text-2xl'],

}

export function ControlJudul(){
    const { value, setValue } = useFilterContext()

    useEffect(() => {
    if (!value.editorFormat?.judul) {
        setValue({
            activeEditorKey: 'judul',
            
            activeJudulType: InitializeJudul.type,
            editorFormat: {
            ...value.editorFormat,
            judul: [InitializeJudul]
            }
        })
    }
  }, [value]) // sengaja kosong → run sekali

    return(
        <div className="flex-1 flex-col">
            <h3 className="text-sm font-bold text-center">Judul</h3>
            <SelectTypeJudul />
            <ToolbarTextEditor sectionKey="judul" judulType={value.activeJudulType} />
        </div>
    )
}

export function ControlParagrafAtas(){
    const { value, setValue } = useFilterContext()

    useEffect(() => {
    if (!value.editorFormat?.paragrafAtas) {
        setValue({
        activeEditorKey: 'paragrafAtas',
        
        editorFormat: {
            ...value.editorFormat,
            paragrafAtas: {
            type: 'p',
            text: '',
            classNames: ['mt-5']
            }
        }
        })
    }
    }, [value])
    return(
        <div className="flex-1 flex-col">
            <h3 className="text-sm font-bold text-center">Deskripsi/Teks Atas tabel</h3>
            <ToolbarTextEditor  sectionKey="paragrafAtas"/>
        </div>
    )
}
export function ControlParagrafBawah(){
    const { value, setValue } = useFilterContext()

    useEffect(() => {
    if (!value.editorFormat?.paragrafBawah) {
        setValue({
            activeEditorKey: 'paragrafBawah',
        editorFormat: {
            ...value.editorFormat,
            paragrafBawah: {
            type: 'p',
            text: '',
            classNames: ['mt-5']
            }
        }
        })
    }
    }, [value])
    return(
        <div className="flex-1 flex-col">
            <h3 className="text-sm font-bold text-center">Deskripsi/Teks Bawah tabel</h3>
            <ToolbarTextEditor  sectionKey="paragrafBawah"/>
        </div>
    )
}