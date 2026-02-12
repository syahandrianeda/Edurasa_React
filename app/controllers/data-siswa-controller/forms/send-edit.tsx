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

        // ambil state dari context / store
        const DTO = DTOSiswa.toAppScript(currentData);
        const param = {
            formData: JSON.stringify(DTO),
            byRow: currentData?.id
        }
        
        const respon = await siswaActions.update(param);
        if(respon.success){
            modalActions.close();
            
            dispatch(setAllSiswa({
                loaded:true,
                allSiswa: respon.data as SiswaType[],
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