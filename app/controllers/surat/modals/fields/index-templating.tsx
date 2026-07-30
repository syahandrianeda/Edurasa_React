import { Field } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { KlasifikasiNoSurat } from "~/domain/surat/klasifikasi-surat-permendagri";


export interface TemplatingIndexSuratProps{
    inputValue:string,
    handleChange:(v:string)=>void,
    disable?:boolean
}

export default function TemplatingIndexSurat({inputValue, handleChange, disable}:TemplatingIndexSuratProps){
    return (
        <Field className="relative mt-5 flex-col gap-0" orientation="horizontal">
            <Label htmlFor="id_indexsurat" className="absolute dark:bg-gray-700 border-s-2 border-t border-sky-500 bg-sky-50 dark:text-sky-100 ps-1 text-[10px] dark:border-b-0 top-0 left-0 py-0 pe-4 rounded-se-2xl -translate-y-3.5 w-fit">Index Surat</Label>
            <Input
                id="id_indexsurat"
                disabled={disable}
                value={inputValue}
                className="col-span-3 dark:bg-gray-700 disable:bg-gray-700  bg-sky-50 dark:text-white dark:border-0 border-s-2 rounded-ss-none rounded-br-none rounded-tr-2xl focus-visible:ring-0 border-sky-500 focus-visible:border-sky-400"
                onChange={(e)=>handleChange(e.currentTarget.value)}
                type="text"/>
            <div className="text-[10px]">
                Berikut index surat yang memiliki template surat otomatis:
                <ul className="list-disc list-inside">
                    {
                        KlasifikasiNoSurat.filter(s=>s.template).map(({description, template},index)=>
                            <li key={index} className="list-item">{description}</li>
                        )
                    }
                </ul>
            </div>
        </Field>
    )
}