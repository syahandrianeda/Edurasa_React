
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import { useFormEdura } from "~/components/form-custom/form-edura";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import { Ban, Loader, StepBackIcon } from "lucide-react";
import { useModal } from "~/components/modals/modal-provider";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";
import { useCrudSuratMasuk } from "./surat-masuk-crud-provider";
import type { SuratMasukAppType } from "~/types/surat/surat-masuk-app-type";
import DtoSuratMasuk from "~/dtos/dto-surat-masuk";
import type { SuratMasukSheetType } from "~/types/surat/surat-masuk-sheet-type";

export default function ButtonUpdateSuratMasuk(){
    const {state, actions} = useCrudSuratMasuk();
    const {actions:actionModal, nextState} = useModal<SuratMasukAppType>();
    
    const {currentData} = useFormEdura<SuratMasukAppType>();
    const onSubmit = async()=>{
    
            const dto = DtoSuratMasuk.fromAppToSheet(currentData)
            const response = await actions.update(dto);
            if(response.success){
                const {success, data, detailResponse} = response;
                if(detailResponse){
                    DispatchingResponseToStore(success, data as SuratMasukSheetType[], detailResponse)
                }
                ShowToasterSuccess('Berhasil disimpan');
                actionModal.close();
            }else{
                ShowToasterError('Oups, Gagal Menyimpan data');
            }
            
        }
        console.log('button Edit Surat Masuk', nextState)
    return (
            <div className="flex w-full mt-2 gap-2">

                {
                    
                    nextState && <ButtonSaveAwesome className="px-2 py-0  bg-sky-600"  type='button' onClick={()=>actionModal.open(nextState?.type!, nextState?.payload, nextState?.configModal)} labelButton="Kembali"  
                        disabled={state.isSubmitting}
                        ><StepBackIcon size={12} className="self-center"/></ButtonSaveAwesome>
                }
                <div className="flex flex-row justify-center w-full gap-2">
                    <ButtonDeleteAwesome className="px-2 py-0 bg-rose-500"  type='button' onClick={actionModal.close} labelButton="Batal"  
                        disabled={state.isSubmitting}
                    ><Ban size={12} className="self-center"/></ButtonDeleteAwesome>
                    <ButtonSaveAwesome className="px-2 py-0 "  type='button' onClick={onSubmit} labelButton="Simpan"  
                        disabled={state.isSubmitting}
                    >
                        {
                            state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>
                        }
                    </ButtonSaveAwesome> 

                </div>
            </div>
        
    )
}