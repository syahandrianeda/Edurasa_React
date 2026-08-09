import { Field } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";


export interface NoSuratFieldProps{
    inputValue:string,
    handleChange?:(v:string)=>void,
    disable?:boolean,
    className?:string
}

export default function NoSuratField({inputValue, handleChange, disable, className}:NoSuratFieldProps){
    
        
    return (
        <Field className={cn("relative mt-7", className)} orientation="horizontal">
            <Label htmlFor="id_nosurat" className="absolute dark:bg-gray-700 border-s-2 border-t border-sky-500 bg-sky-50 dark:text-sky-100 ps-1 text-[10px] dark:border-b-0 top-0 left-0 py-0 pe-4 rounded-se-2xl -translate-y-3.5 w-fit">Nomor Surat</Label>
            <Input
                id="id_nosurat"
                placeholder="<kode klasifikasi surat>/<no-urut-surut>-Instansi/Bulan/Tahun"
                disabled={disable}
                value={inputValue}
                className="col-span-3 dark:bg-gray-700 disable:bg-gray-700  bg-sky-50 dark:text-white dark:border-0 border-s-2 rounded-ss-none rounded-br-none rounded-tr-2xl focus-visible:ring-0 border-sky-500 focus-visible:border-sky-400"
                onChange={(e)=>handleChange?.(e.currentTarget.value)}
                type="text"/>
        </Field>
    )
}