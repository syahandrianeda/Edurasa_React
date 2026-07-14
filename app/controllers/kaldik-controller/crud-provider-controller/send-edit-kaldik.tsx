import { useFormEdura } from "~/components/form-custom/form-edura"
import { useModal } from "~/components/modals/modal-provider";
import { DTOKaldikSheetToSheet } from "~/dtos/dto-kaldik-to-sheet";
import type{ KaldikType } from "~/types/kaldik"
import { useKaldikCrud } from "./kaldik-crud-provider";
import { useAppDispatch } from "~/context-reduct/hook";
import { setloadedApi } from "~/context-reduct/global-state/loaded-slice";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import { Loader } from "lucide-react";
import { setKaldik } from "~/context-reduct/global-state/kaldik-slice";

export default function SendEditKaldik(){
    const dispatch = useAppDispatch();
    const {currentData} = useFormEdura<KaldikType>();
    const {actions:actionModal} = useModal<KaldikType>();
    const {state, actions:actionCrud} = useKaldikCrud();

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const dataDto = DTOKaldikSheetToSheet.fromApp(currentData);
        
        const paramUpdate = {
            data: JSON.stringify([dataDto]),
            key_match:'idbaris',
            key_index:'idbaris',
            schema:JSON.stringify({
                time_stamp: 'datetime',
                start_tgl:'date',
                end_tgl: 'date',
                idbaris:'number',
                he:'number',
                heb: 'number',
                libur:'number'
            })
            
        }
        const respon  = await actionCrud.update(paramUpdate);
        
        dispatch(setloadedApi({
                    loaded:true, name:'loaded_animation'
                }))
        if(respon.success){
            const raw = respon.data as KaldikType[];
            dispatch(setKaldik({
                loaded:true,
                data:raw,
                name:'kalender'
            }));
            ShowToasterSuccess('Berhasil diupdate');
            actionModal.close();
        }else{
            ShowToasterError('Gagal Menyimpan Edit');
        }
        dispatch(setloadedApi({
                            loaded:false, name:'loaded_animation'
                        }))

    } 
    return (
        
        <button onClick={onSubmit}  disabled={state.isSubmitting} type="button" className="border border-sky-500 rounded-xl p-1 bg-radial from-amber-200 text-rose-600 to-sky-600 shadow-xs shadow-amber-300 font-extrabold w-fit mx-auto flex justify-center gap-2">
            {state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>}Simpan
        </button>
    )
}