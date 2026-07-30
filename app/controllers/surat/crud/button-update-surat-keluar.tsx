
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import { useFormEdura } from "~/components/form-custom/form-edura";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import { Loader } from "lucide-react";
import { useModal } from "~/components/modals/modal-provider";
import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";
import { useCrudSuratKeluar } from "./surat-keluar-crud-provider";
import type { SuratKeluarSheetType } from "~/types/surat/surat-keluar-sheet-type";

export default function ButtonUpdateSuratKeluar(){
    const {state, actions} = useCrudSuratKeluar();
    const {actions:actionModal} = useModal<SuratKeluarAppType>();
    
    const {currentData} = useFormEdura<SuratKeluarAppType>();
    const onSubmit = async()=>{
    
            // const dto  = DtoTabungan.toSheet(currentData);
            // const argService = {
            //     data: dto,
            //     tab: namaTab(keuangan?.kategori!) +"_" +keuangan?.rombel
            // }
            const response = await actions.update(currentData);
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
            <div className="flex justify-center mt-2">
                <ButtonSaveAwesome className="px-2 py-0"  type='button' onClick={onSubmit} labelButton="Update"  
                    disabled={state.isSubmitting}
                >
                    {
                        state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>
                    }
                </ButtonSaveAwesome> 
            </div>
        
    )
}