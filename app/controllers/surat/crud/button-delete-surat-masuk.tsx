import { Loader, StepBackIcon, Trash } from "lucide-react";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";
import { useCrudSuratKeluar } from "./surat-keluar-crud-provider";
import { useFormEdura } from "~/components/form-custom/form-edura";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import { toast } from "sonner";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import { useModal } from "~/components/modals/modal-provider";
import type { SuratMasukAppType } from "~/types/surat/surat-masuk-app-type";
import type { SuratMasukSheetType } from "~/types/surat/surat-masuk-sheet-type";
import { useCrudSuratMasuk } from "./surat-masuk-crud-provider";


export default function ButtonDeleteSuratMasuk(){
    const {state, actions} = useCrudSuratMasuk();
    const {actions:actionModal} = useModal();
    const {currentData} = useFormEdura<SuratMasukAppType>()
    const onSubmit = async ()=>{
        
        const param = {idbaris:currentData.idbaris, status: 'hapus'}
        
        toast.promise(
                actions.update(param),
                {
                    loading: 'Menghapus item Surat Masuk',
                    success: (response) => {
                        const {success,data,detailResponse} = response;
                        
                        if(detailResponse){
                            DispatchingResponseToStore(success, data as SuratMasukSheetType[],detailResponse)
                        }
                        
                        actionModal.close();
                        
                        return 'Pemanggilan data telah selesai' 
                    },
                    error: `Gagal mengupdate Surat Keluar`,
                    finally(){
                        
                    },
                    closeButton:true,
                }
            )
    }

    return (
        <ButtonDeleteAwesome className="px-2 py-0  bg-rose-500"  type='button' onClick={onSubmit} labelButton="Hapus"  
                    disabled={state.isSubmitting}
                >
                    <Trash size={12} className="self-center"/>
                    {
                        (state.isSubmitting) && <Loader size={12} className="animate-spin self-center"/>
                    }
                </ButtonDeleteAwesome>
                
    )
}