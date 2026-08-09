import { ComponentIcon, Loader,  Trash } from "lucide-react";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";
import { useCrudSuratKeluar } from "./surat-keluar-crud-provider";
import { useFormEdura } from "~/components/form-custom/form-edura";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import { toast } from "sonner";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import type { SuratKeluarSheetType } from "~/types/surat/surat-keluar-sheet-type";
import { useModal, type ModalActions } from "~/components/modals/modal-provider";
import type { SiswaType } from "~/types/siswa";
import { useAppSelector } from "~/context-reduct/hook";
import { DataOrmSuratKeluarSelector, DtoSuratKeluarSelector } from "~/context-reduct/selectores/surat-keluar-selector";
import { useCallback } from "react";
import ButtonSaveAwesome from "~/components/button-awesome/save-button";


export default function ButtonUpdateItemSiswaSuratKeluar({tutupModal}:{tutupModal:()=>void}){
    const {state, actions} = useCrudSuratKeluar();
    const {currentData} = useFormEdura<DataOrmSuratKeluarType>();
    
    

    const onSubmit = async ()=>{
        
        const param = {idbaris:currentData.idbaris,  target_siswa: currentData.target_siswa.join(', ')}
        toast.promise(
                actions.update(param),
                {
                    loading: 'Mengupdate item siswa Surat Keterangan',
                    success: (response) => {
                        const {success,data,detailResponse} = response;
                        
                        if(detailResponse){
                            DispatchingResponseToStore(success,data as SuratKeluarSheetType[],detailResponse)
                        }
                        
                            // callSuratKeluar();
                            tutupModal()
                        
                        return 'Proses telah selesai' 
                    },
                    error: `Gagal mengupdate Surat Keluar`,
                    finally(){
                        
                    },
                    closeButton:true,
                }
            )
    }

    return (
        <ButtonSaveAwesome className="py-0 px-2 text-sm" labelButton="Simpan" 
            onClick={onSubmit} 
            disabled={state.isSubmitting}
            >
                <ComponentIcon  size={12} className="self-center"/>
                    {
                        (state.isSubmitting) && <Loader size={12} className="animate-spin self-center"/>
                    }
        </ButtonSaveAwesome>
                
    )
}