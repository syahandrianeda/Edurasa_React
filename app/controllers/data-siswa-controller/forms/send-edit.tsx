import { useFormEdura } from "~/components/form-custom/form-edura";
import type { SiswaType } from "~/types/siswa";
import { useSiswaCrud } from "../kesiswaan-controller";
import { DTOSiswa } from "~/dtos/dto-siswa";
import { Loader } from "lucide-react";
import { useModal } from "~/components/modals/modal-provider";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import { useAppDispatch } from "~/context-reduct/hook";
import { setAllSiswa } from "~/context-reduct/global-state/siswa-slice";

export function SendEdit(){
    const {currentData} = useFormEdura<SiswaType>();
    const {state, actions:siswaActions} = useSiswaCrud();
    const {actions:modalActions} = useModal<SiswaType>();
    const dispatch = useAppDispatch()
    const onSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault()

        const DTO = DTOSiswa.toAppScript(currentData);
        
        
        const respon = await siswaActions.update(DTO);
        if(respon.success){
            modalActions.close();
            
            dispatch(setAllSiswa({
                loaded:true,
                data: respon.data as SiswaType[],
                name:'datasiswa',
                source: respon?.source,
                loading:false
            }))

            ShowToasterSuccess('Berhasil diupdate');
        }else{
            ShowToasterError('Gagal Menyimpan Edit');
        }
    }

    return (
        <button type="button" onClick={onSubmit} disabled={state.isSubmitting} className="rounded-xl bg-sky-700 px-2 shadow-sky-300 text-sky-50 inner-shadow-sky-200 disabled:bg-sky-900 disabled:text-sky-400 flex justify-center gap-2">
            {state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>}Simpan
        </button>
    )
}