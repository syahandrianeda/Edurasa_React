import { Bold, Italic, Underline } from "lucide-react";
import CheckboxLabel from "~/components/fields/checkbox-label";
import { Fields, SelectField } from "~/components/fields/fields";
import type { InputTypeEditor, TypeComponent } from "./interface-title-description";
import { Fragment } from "react";
import { useFilterContext, type FilterContextValue } from "./state-toolbar";
import type { EditorFormatState, EditorSectionKey } from "./interface-toolbar-edtor";
import { FONT_CLASSES, FONT_SIZE_CLASSES, replaceClassInGroup, SelectFont, SelectSizeFont } from "~/components/fields/select-font";
import { RadioTextAlign, TEXT_ALIGN } from "~/components/fields/text-align-control";


const InitializeJudul: InputTypeEditor[] = [
    
    {
        type:'h1',
        text:'',
        label:'Judul 1',
        classNames:['font-bold']
    },
    {
        type:'h2',
        text:'',
        label:'Judul 2',
        classNames:['font-bold']
    },
    {
        type:'h3',
        text:'',
        label:'Judul 3',
        classNames:['font-bold']
    },
    {
        type:'h4',
        text:'',
        label:'Judul 4',
        classNames:['font-bold']
    }
]

export function SelectTypeJudul() {
  const { value, setValue } = useFilterContext()

  const judulList = value.editorFormat?.judul ?? []

  const onChange = (type: TypeComponent) => {
    const exists = judulList.some(j => j.type === type)

    setValue({
      activeEditorKey: 'judul',
      activeJudulType: type,
      editorFormat: exists
        ? value.editorFormat
        : {
            ...value.editorFormat,
            judul: [
              ...judulList,
              {
                type,
                text: '',
                classNames: []
              }
            ]
          }
    })
  }
  
  return (
    
        <Fields className="mx-auto max-w-1/2 mt-4">
            <SelectField 
              onChange={e => onChange(e.target.value as TypeComponent)}
              value={value.activeJudulType}
              labelSelect="Pilih Tipe Judul" 
              className="bg-white"
              >
                  {
                      InitializeJudul.map((m,i)=>(
                          <option key={i} value={m.type}>{m.label}</option>
                      ))
                  }
            </SelectField>
        </Fields>
    )
  
}
type ToolbarTextEditorProps = {
    sectionKey: EditorSectionKey
    judulType?: TypeComponent // hanya dipakai kalau section = 'judul'
}

export function ToolbarTextEditor({
  sectionKey,
  judulType
}: ToolbarTextEditorProps) {
    const { value, setValue } = useFilterContext()

        const current = getEditorBySection(value, sectionKey, judulType)
        
        if(!current) return null;

    const onChangeText = (text: string) => {
        const next = {
        ...current,
        text
        }

        setValue({
          editorFormat: updateEditorFormatBySection(value, sectionKey, next, judulType)
        })
    }

    const toggleClass = (v: string) => {
        const next = {
        ...current,
        classNames: current.classNames.includes(v)
            ? current.classNames.filter(c => c !== v)
            : [...current.classNames, v]
        }

        setValue({
          editorFormat: updateEditorFormatBySection(value, sectionKey, next, judulType)
        })
    }
    const onChangeFont = (font?: string) => {
      
      const cleaned = normalizeClassNames(current.classNames);
      
      
      const next = {
        ...current,
        classNames: replaceClassInGroup(cleaned, FONT_CLASSES, font)
      }

      setValue({
        editorFormat: updateEditorFormatBySection(value, sectionKey, next, judulType)
      })
    }

    const onChangeFontSize = (size?: string) => {
      const cleaned = normalizeClassNames(current.classNames);
      
      const next = {
        ...current,
        classNames: replaceClassInGroup(cleaned, FONT_SIZE_CLASSES, size)
      }
      
      setValue({
        editorFormat: updateEditorFormatBySection(value, sectionKey, next, judulType)
      })
    }

    const onChangeTextAlign = (align?: string) => {
      const cleaned = normalizeClassNames(current.classNames);
      
      const next = {
        ...current,
        // classNames: replaceClassInGroup(cleaned, FONT_SIZE_CLASSES, size)
        classNames: replaceClassInGroup(cleaned, TEXT_ALIGN, align)
        // classNames: replaceClassInGroup(cleaned, FONT_SIZE_CLASSES, size)
      }
      
      setValue({
        editorFormat: updateEditorFormatBySection(value, sectionKey, next, judulType)
      })
    }

    const onDelete=()=>{
      const next = {
        ...current,
        text:'',
        classNames: []
      }
        setValue({
                editorFormat: updateEditorFormatBySection(value, sectionKey, next, judulType)
              })
    }
    return (
        <Fields className="gap-0 max-w-svw">
        <div className="flex gap-1 bg-linear-to-tl from-sky-600 to-sky-100 dark:to-sky-300 px-0 mx-0 md:px-2 py-2 rounded-t-2xl justify-center"> 
            
            <CheckboxLabel checked={current.classNames.includes('font-extrabold')} onChange={() => toggleClass('font-extrabold')}>
                <Bold />
            </CheckboxLabel>
            <CheckboxLabel checked={current.classNames.includes('italic')} onChange={() => toggleClass('italic')}>
                <Italic />
            </CheckboxLabel>
            <CheckboxLabel checked={current.classNames.includes('underline')} onChange={() => toggleClass('underline')}>
                <Underline />
            </CheckboxLabel>
              <SelectFont
                value={current.classNames.find(c => FONT_CLASSES.includes(c))}
                onChange={onChangeFont}
              />

              <SelectSizeFont
                value={current.classNames.find(c => FONT_SIZE_CLASSES.includes(c))}
                onChange={onChangeFontSize}
              />
              
              <RadioTextAlign 
                sectionKey={sectionKey} 
                value={current.classNames.find(c => TEXT_ALIGN.includes(c))}
                onChange={onChangeTextAlign}/>
        </div>

        <textarea
            value={current.text}
            onChange={e => onChangeText(e.target.value)}
            rows={3}
            className="flex bg-white w-full dark:text-black text-sm p-2 outline-none ring-0 mb-0 border-s-2 border-e-2 border-sky-400 "
        />
        <div className="flex justify-center bg-linear-to-tl from-sky-600 to-sky-100 dark:to-sky-300 rounded-b-2xl mt-0 py-1 px-4">
            <button onClick={()=>
                onDelete()
              }
              className="rounded-2xl bg-sky-600 inset-shadow-100 text-white px-2 py-1  ring-sky-300/50"
              >Hapus</button>
        </div>
        </Fields>
    )
}

function normalizeClassNames(list: string[]): string[] {
  return Array.from(new Set(list))
}

function getEditorBySection(
  value: FilterContextValue,
  key: EditorSectionKey,
  judulType?: TypeComponent
): InputTypeEditor | undefined {
  const format = value.editorFormat
  if (!format) return

  if (key === 'judul') {
    return format.judul?.find(j => j.type === judulType)
  }

  return format[key]
}

/** === Helper */
function getActiveEditor(
    value: FilterContextValue
    ): InputTypeEditor | undefined {
    const key = value.activeEditorKey
    if (!key) return

    if (key === 'judul') {
        return value.editorFormat?.judul?.find(
        j => j.type === value.activeJudulType
        )
    }

    return value.editorFormat?.[key]
}

function updateEditorFormatBySection(
  value: FilterContextValue,
  key: EditorSectionKey,
  next: InputTypeEditor,
  judulType?: TypeComponent
): EditorFormatState {
  const format = value.editorFormat ?? {}

  if (key === 'judul') {
    return {
      ...format,
      judul: format.judul?.map(j =>
        j.type === judulType ? next : j
      )
    }
  }

  return {
    ...format,
    [key]: next
  }
}

export function RenderEditorBlock({ data }: { data: InputTypeEditor }) {
  const Comp = data.type ?? 'div'
  const className = data.classNames?.join(' ');
  const text = data.text ?? ''
  const lines = text.split('\n')
  //  const lines = data.text?.split('\n') ?? []


  return (<Comp className={"whitespace-pre-wrap "+className }>
    
      {
        lines.map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </Fragment>
      ))}
    
  </Comp>)
}