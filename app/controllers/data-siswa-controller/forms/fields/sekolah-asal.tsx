import { Fields, InputText } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { cn } from "~/lib/utils";
import type { SiswaType } from "~/types/siswa";

export function AsalSekolahTK({className}:{className?:string}){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 md:w-10/12 mx-auto",className)}>
            <InputText
                id="asal_sekolah_tk"
                value={currentData?.namasekolahasaltk??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.namasekolahasaltk = v
                    })}
                }
                placeholder="Sekolah Asal TK"
                label="Asal Sekolah (Khusus Nama TK)"
            />
        </Fields>
    )
}

export function AsalPindahan({className}:{className?:string}){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12 mx-auto",className)}>
            <InputText
                id="asal_pindahan"
                value={currentData?.dapo_sekolahasal??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_sekolahasal = v
                    })}
                }
                placeholder="Sekolah Asal SD"
                label="Asal Sekolah (Khusus Siswa Pindahan)"
            />
        </Fields>
    )
}