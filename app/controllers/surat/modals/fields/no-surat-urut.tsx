import { Field } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type{ SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";

export default function NoSuratUrutField({currentData, setCurrentData}:{currentData:SuratKeluarAppType, setCurrentData:(updater: (draft: SuratKeluarAppType) => void) => void}){
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
            const {value} = e.currentTarget;
            if(!value) return;
            setCurrentData(draft=>{
                if(!draft) return;
                draft.id_nosurat = value
            })
    }
    return (
        <Field className="relative mt-7 shadow-lg shadow-sky-400" orientation="horizontal">
            <Label htmlFor="id_nosurat-urut" className="absolute dark:bg-gray-700 border-s-2 dark:border-s-0 border-t border-sky-500 bg-sky-50 dark:text-sky-100 ps-1 text-[10px] dark:border-b-0 top-0 left-0 py-0 pe-4 rounded-se-2xl -translate-y-3.5 w-fit">No. Urut Surat</Label>
            <Input
                id="id_nosurat_urut"
                value={currentData.id_nosurat}
                className="col-span-1 dark:bg-gray-700 bg-sky-50 dark:text-white dark:border-0 border-s-2 rounded-ss-none rounded-br-none rounded-tr-2xl focus-visible:ring-0 border-sky-500 focus-visible:border-sky-400"
                onChange={handleChange}
                type="number"/>
        </Field>
    )
}