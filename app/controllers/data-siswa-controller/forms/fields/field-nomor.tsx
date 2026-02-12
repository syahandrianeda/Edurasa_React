import { Fields, InputText } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { cn } from "~/lib/utils";
import type { SiswaType } from "~/types/siswa";

export function NoKK({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12 mx-auto",className)}>
            <InputText
                id="no_kk"
                value={currentData?.nokk??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.nokk = v
                    })}
                }
                placeholder="Nomor Kartu Keluarga"
                label="Nomor Kartu Keluarga"
            />
        </Fields>
    )
}

export function NoAkte({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12 mx-auto",className)}>
            <InputText
                id="no_akte"
                value={currentData?.dapo_noregistrasiaktalahir??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_noregistrasiaktalahir = v
                    })}
                }
                placeholder="Nomor Registrasi Akte"
                label="Nomor Registrasi Akte Kelahiran"
            />
        </Fields>
    )
}

export function NoHp({className}:{className?:string}){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12 mx-auto",className)}>
            <InputText
                id="no_hp"
                value={currentData?.pd_hp??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.pd_hp = v
                    })}
                }
                placeholder="No HP"
                label="No HP yang bisa dihubungi"
            />
        </Fields>
    )
}