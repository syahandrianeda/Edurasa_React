import { useModal } from "~/components/modals/modal-provider";
import { useAppDispatch } from "~/context-reduct/hook";
import type { OrmFaseKurikulumType } from "~/types/kurikulum/kurikulum-type";
import { useCrudTpFaseProvider } from "./crud-tp-fase-provider";
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum";
import { setloadedApi } from "~/context-reduct/global-state/loaded-slice";
import { setKurmerTpFaseA, setKurmerTpFaseB, setKurmerTpFaseC } from "~/context-reduct/global-state/kurikulum/kurmer-slice";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import { Loader } from "lucide-react";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import { Row } from "node_modules/react-day-picker/dist/esm";

export default function SendTpUpdate({mode, data}:{mode:'update'|'delete', data:OrmFaseKurikulumType}){
    const dispatch = useAppDispatch();
    const {actions:actionModal} = useModal<OrmFaseKurikulumType>();
    const {state, actions}=useCrudTpFaseProvider();
    const onSubmit =  async (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(data.tp ==="" ) {
            alert('TP tidak boleh kosong');
            return;
        }
        const modeStatus = mode ==='delete'?'hapus':'';
        const dataFase:FaseKurikulumType ={
            idbaris:data.idbaris_tp,
            foreignkey_elemencp:data.source_data_tp?.foreignkey_elemencp??0,
            tp:data.tp,
            faseName:data.fase_name,
            status:modeStatus
        }
        
        
        
        const respon  = await actions.update(dataFase);
                
                dispatch(setloadedApi({
                            loaded:true, name:'loaded_animation'
                        }))
        const {success, data:dataAtpRespon, detailResponse} = respon
        if(success){
            if(detailResponse){
                DispatchingResponseToStore(success, dataAtpRespon as unknown as FaseKurikulumType[], detailResponse,)
            }
                ShowToasterSuccess('Berhasil diupdate');
                actionModal.close();
        }else{
            ShowToasterError('Gagal Menyimpan Edit');
        }
        dispatch(setloadedApi({
                            loaded:false,
                            name:'loaded_animation'
                        }))
    }
    if(mode==='delete'){
        return (
            <ButtonDeleteAwesome onClick={onSubmit} className="px-2 py-1" labelButton="Hapus" disabled={state.isSubmitting}>{state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>}</ButtonDeleteAwesome>
        )
    }
    return (
        <ButtonSaveAwesome onClick={onSubmit} className="px-2 py-1" labelButton="Simpan" disabled={state.isSubmitting}>{state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>}</ButtonSaveAwesome>
    )
}