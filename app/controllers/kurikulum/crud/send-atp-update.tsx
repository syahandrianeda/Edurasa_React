import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import { useModal } from "~/components/modals/modal-provider";
import { useAppDispatch } from "~/context-reduct/hook";
import type { faseMerdekaType, OrmAtp } from "~/types/kurikulum/kurikulum-type";
import { useCrudTpFaseProvider } from "./crud-tp-fase-provider";
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum";
import DTOAtp from "~/dtos/dto-atp";
import type { AtpKurikulumSheetType, AtpKurikulumType } from "~/types/kurikulum/atp-kurikulum";
import { setloadedApi } from "~/context-reduct/global-state/loaded-slice";
import { useCrudAtpProvider } from "./crud-atp-provider";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import { setKurmerAtp } from "~/context-reduct/global-state/kurikulum/kurmer-slice";
import { Loader } from "lucide-react";

export default function SendAtpUpdate({mode, data}:{mode:'update'|'delete', data:OrmAtp}){
    const dispatch = useAppDispatch();
    const {actions:actionModal} = useModal<OrmAtp>();
    const {state, actions}=useCrudAtpProvider();
    const onSubmit =  async (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        
        const dataAtp:AtpKurikulumSheetType = DTOAtp.fromOrmAtpToSheet(data);
        
        const respon  = await actions.update(dataAtp);
                
                dispatch(setloadedApi({
                            loaded:state.isSubmitting
                        }))
                if(respon.success){
                    const raw = respon.data as AtpKurikulumType[];
                    
                    dispatch(setKurmerAtp(raw))
                    ShowToasterSuccess('Berhasil diupdate');
                    actionModal.close();
                }else{
                    ShowToasterError('Gagal Menyimpan Edit');
                }
                // dispatch(setloadedApi({
                //                     loaded:false
                //                 }))
    }

    if(mode==='delete'){
        return (
            <ButtonDeleteAwesome
                className="px-2 py-1" onClick={onSubmit} labelButton="Hapus"  disabled={state.isSubmitting}>{state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>}</ButtonDeleteAwesome>
        )
    }
    return (
        <ButtonSaveAwesome className="px-2 py-1"  onClick={onSubmit} labelButton="Simpan"  disabled={state.isSubmitting}>{state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>}</ButtonSaveAwesome> 
    )
}