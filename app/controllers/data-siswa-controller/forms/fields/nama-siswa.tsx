import { Fields, InputText } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { cn } from "~/lib/utils";
import type { SiswaType } from "~/types/siswa";

export default function NamaSiswa({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className={cn("mt-3 md:w-10/12 w-5/12",className)}>
            <InputText
                id="pd_nama"
                value={currentData?.pd_nama?.toUpperCase()??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.pd_nama = v.toUpperCase();
                    })}
                }
                placeholder="Nama Siswa"
                label="Nama Peserta Didik"
                required
            />
        </Fields>
    )
}