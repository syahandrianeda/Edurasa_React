import { useModal } from "~/components/modals/modal-provider";
import { useAppDispatch } from "~/context-reduct/hook";
import type { OrmFaseKurikulumType, OrmKurikulumMerdekaType } from "~/types/kurikulum/kurikulum-type";
import { useCrudElemenCpProvider } from "./crud-elemen-cp-provider";
import { setloadedApi } from "~/context-reduct/global-state/loaded-slice";
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum";
import { setKurmerTpFaseA, setKurmerTpFaseB, setKurmerTpFaseC } from "~/context-reduct/global-state/kurikulum/kurmer-slice";
import { useCrudTpFaseProvider } from "./crud-tp-fase-provider";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import { Loader } from "lucide-react";

export default function SendTpCreate({data}:{ data:OrmFaseKurikulumType}){
    const dispatch = useAppDispatch();
    const {actions:actionModal} = useModal<OrmFaseKurikulumType>();
    const {state, actions}=useCrudTpFaseProvider();
    const onSubmit =  async (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(data.tp ==="" ) {
            alert('TP tidak boleh kosong');
            return;
        }
        const dataFase:FaseKurikulumType ={
            idbaris:0,
            foreignkey_elemencp:data.source_data_tp?.foreignkey_elemencp??0,
            tp:data.tp,
            faseName:data.fase_name
        }
        
        console.log('data TP yang dikirim', dataFase)
        
        const respon  = await actions.update(dataFase);
                
                dispatch(setloadedApi({
                            loaded:true
                        }))
                if(respon.success){
                    const raw = respon.data as FaseKurikulumType[];
                    if(data.fase_name === 'A'){
                        dispatch(setKurmerTpFaseA(raw));
                    }
                    if(data.fase_name === 'B'){
                        dispatch(setKurmerTpFaseB(raw));
                    }
                    if(data.fase_name === 'C'){
                        dispatch(setKurmerTpFaseC(raw));
                    }
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