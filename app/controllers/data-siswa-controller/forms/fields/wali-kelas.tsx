import { Fields, InputText } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { useAppSelector } from "~/context-reduct/hook";
import { cn } from "~/lib/utils";
import type { SiswaType } from "~/types/siswa";

export default function WaliKelas({className}:{className?:string}){
    const {currentData} = useFormEdura<SiswaType>();
    const friends = useAppSelector(state=>state.auth.user?.friends);
    const rombel = currentData?.nama_rombel;
    const findWalas = friends?.find(s=>s.kode_mapel_ampu === rombel);
    
    return (
        <Fields className={cn("w-6/12 my-3", className)}>
            <InputText
                disabled
                readOnly
                value={findWalas?.name}
                label={"Wali Kelas "+rombel}/>
        </Fields>
    )
}