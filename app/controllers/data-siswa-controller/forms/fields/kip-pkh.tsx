import { Fields, InputText } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { cn } from "~/lib/utils";
import type { SiswaType } from "~/types/siswa";

export function NoKIP({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12",className)}>
            <InputText
                id="nokip"
                value={currentData?.dapo_nomorkip??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_nomorkip = v.toUpperCase();
                    })}
                }
                placeholder="Nomor KIP"
                label="Nomor KIP"
            />
        </Fields>
    )
}
export function NamaKIP({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12",className)}>
            <InputText
                id="namakip"
                value={currentData?.dapo_namadikip??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_namadikip = v.toUpperCase();
                    })}
                }
                placeholder="Nama di KIP"
                label="Nama Di KIP"
            />
        </Fields>
    )
}
export function NamaBankKIP({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12",className)}>
            <InputText
                id="bankkip"
                value={currentData?.dapo_bank??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_bank = v.toUpperCase();
                    })}
                }
                placeholder="Nama Bank"
                label="Nama Bank"
            />
        </Fields>
    )
}
export function IdentitasRekeningBankKIP({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12",className)}>
            <InputText
                id="identitasrekeingkip"
                value={currentData?.dapo_rekeningatasnama??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_rekeningatasnama = v.toUpperCase();
                    })}
                }
                placeholder="Nama di Rekening Bank"
                label="Nama di Rekening Bank"
            />
        </Fields>
    )
}