import { Loader,  Trash } from "lucide-react";
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
import { DataOrmSuratKeluarSelector } from "~/context-reduct/selectores/surat-keluar-selector";
import { useCallback } from "react";


export default function ButtonDeleteItemSiswaSuratKeluar({siswa}:{siswa:SiswaType}){
    const {state, actions} = useCrudSuratKeluar();
    
    const {currentData} = useFormEdura<DataOrmSuratKeluarType>();
    

    const onSubmit = async ()=>{
        const idKirim:number[] = currentData.target_siswa.filter(s=>s !== siswa.id)
        const param = {idbaris:currentData.idbaris, target_siswa:idKirim.join(', ')}
        toast.promise(
                actions.update(param),
                {
                    loading: 'Menghapus item siswa Surat Keluar',
                    success: (response) => {
                        const {success,data,detailResponse} = response;
                        
                        if(detailResponse){
                            DispatchingResponseToStore(success,data as SuratKeluarSheetType[],detailResponse)
                        }
                        
                        
                        
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