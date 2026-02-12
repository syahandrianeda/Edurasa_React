import { Fields, InputText } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { cn } from "~/lib/utils";
import type { SiswaType } from "~/types/siswa";

export default function NoNis({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12 mx-auto",className)}>
            <InputText
                id="nis"
                value={currentData?.nis??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.nis = v
                    })}
                }
                placeholder="Nomor Induk Siswa (NIS)"
                label="Nomor Induk Siswa"
            />
        </Fields>
    )
}
