import { Fields, InputText } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { cn } from "~/lib/utils";
import type { SiswaType } from "~/types/siswa";

export function MutasiPindahKe({className}:{className?:string}){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12 mx-auto",className)}>
            <InputText
                id="pindah_ke"
                value={currentData?.pindah_ke??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.pindah_ke = v
                    })}
                }
                placeholder="Pindah Ke SD Tujuan"
                label="SD Tujuan Pindah"
            />
        </Fields>
    )
}
export function MutasiDiKelas({className}:{className?:string}){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12 mx-auto",className)}>
            <InputText
                id="kelas_keluar"
                value={currentData?.kelas_keluar??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.kelas_keluar = v
                    })}
                }
                placeholder="Kelas Saat Keluar/Pindah"
                label="Kelas Terakhir Saat Keluar/Pindah"
            />
        </Fields>
    )
}
export function MutasiAlasan({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12 mx-auto",className)}>
            <InputText
                id="alasan_keluar"
                value={currentData?.alasan_keluar??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.alasan_keluar = v
                    })}
                }
                placeholder="Alasan"
                label="Alasan"
            />
        </Fields>
    )
}
