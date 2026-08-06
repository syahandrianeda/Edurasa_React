import { Fields, InputText } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { cn } from "~/lib/utils";
import type { SiswaType } from "~/types/siswa";

export function AnakUrutanDiKeluarga({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 md:w-10/12 w-5/12",className)}>
            <InputText
                id="dapo_anakkeberapa"
                type="number"
                value={currentData?.dapo_anakkeberapa??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_anakkeberapa = v
                    })}
                }
                placeholder="Anak Ke"
                label="Anak Ke"
            />
        </Fields>
    )
}

export function SaudaraDiKeluarga({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 md:w-10/12 w-5/12",className)}>
            <InputText
                id="dapo_jumlahsaudarakandung"
                type="number"
                value={currentData?.dapo_jumlahsaudarakandung??''}
                onChange={(e)=>{
                    const v = e.currentTarget.value ;
                    setCurrentData(draft=> {
                        draft.dapo_jumlahsaudarakandung = Number(v)
                    })}
                }
                placeholder="Jumlah Saudara"
                label="Jumlah Saudara (Kandung/tiri)"
            />
        </Fields>
    )
}
