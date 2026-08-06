
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import { useFormEdura } from "~/components/form-custom/form-edura";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import { Ban, Loader } from "lucide-react";
import { useModal } from "~/components/modals/modal-provider";
import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";
import { useCrudSuratKeluar } from "./surat-keluar-crud-provider";
import type { SuratKeluarSheetType } from "~/types/surat/surat-keluar-sheet-type";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";
import DtoSuratKeluar from "~/dtos/dto-surat-keluar";

export default function ButtonUpdateSuratKeluar(){
    const {state, actions} = useCrudSuratKeluar();
    const {actions:actionModal} = useModal<SuratKeluarAppType>();
    
    const {currentData} = useFormEdura<SuratKeluarAppType>();
    const onSubmit = async()=>{
    
            const dto = DtoSuratKeluar.toSheetPartial(currentData)
            const response = await actions.update(dto);
            if(response.success){
                const {success, data, detailResponse} = response;
                if(detailResponse){
                    DispatchingResponseToStore(success, data as SuratKeluarSheetType[], detailResponse)
                }
                ShowToasterSuccess('Berhasil disimpan');
                actionModal.close();
            }else{
                ShowToasterError('Oups, Gagal Menyimpan data');
            }
            
        }

    return (
            <div className="flex justify-center mt-2 gap-2">
                <ButtonDeleteAwesome className="px-2 py-0 bg-rose-500"  type='button' onClick={actionModal.close} labelButton="Batal"  
                    disabled={state.isSubmitting}
                ><Ban size={12} className="self-center"/></ButtonDeleteAwesome>
                <ButtonSaveAwesome className="px-2 py-0"  type='button' onClick={onSubmit} labelButton="Simpan"  
                    disabled={state.isSubmitting}
                >
                    {
                        state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>
                    }
                </ButtonSaveAwesome> 
            </div>
        
    )
}