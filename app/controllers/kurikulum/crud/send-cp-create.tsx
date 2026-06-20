import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import type { ElemenCpType } from "~/types/kurikulum/elemen-cp";
import { useCrudElemenCpProvider } from "./crud-elemen-cp-provider";
import { useAppDispatch } from "~/context-reduct/hook";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { useModal } from "~/components/modals/modal-provider";
import { setloadedApi } from "~/context-reduct/global-state/loaded-slice";
import { setKurmerCp } from "~/context-reduct/global-state/kurikulum/kurmer-slice";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import { Loader } from "lucide-react";

export default function SendCpCreate({data}:{data:ElemenCpType}){
    const dispatch = useAppDispatch();
    const {actions:actionModal} = useModal<ElemenCpType>();
    const {state, actions}=useCrudElemenCpProvider();
    const onSubmit =  async (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(data.cp_utama ==="" || data.elemen ==="") {
            alert('Elemen dan/atau CP tidak boleh kosong');
            return;
        }
        const paramUpdate = {
            data: JSON.stringify([data]),
            key_match:'idbaris',
            key_index:'idbaris',
            schema:JSON.stringify({
                idbaris:'number',
                kode_elemen:'number',
            })
            
        }
        const respon  = await actions.update(paramUpdate);
                
                dispatch(setloadedApi({
                            loaded:true
                        }))
                if(respon.success){
                    const raw = respon.data as ElemenCpType[];
                    dispatch(setKurmerCp(raw));
                    ShowToasterSuccess('Berhasil diupdate');
                    actionModal.close();
                }else{
                    ShowToasterError('Gagal Menyimpan Edit');
                }
                dispatch(setloadedApi({
                                    loaded:false
                                }))
    }
    return (
        <ButtonSaveAwesome onClick={onSubmit} className="px-2 py-1" labelButton="Simpan" disabled={state.isSubmitting}>{state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>}</ButtonSaveAwesome>
    )
}