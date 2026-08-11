import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { useFormEdura } from "~/components/form-custom/form-edura";
import type { PangkatGolonganAppType } from "~/types/tendik/pangkat-golongan-app-type";
import { useCrudPangkatGolongan } from "./crud-tendik-provider";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useModal } from "~/components/modals/modal-provider";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import type { PangkatGolonganSheetType } from "~/types/tendik/pangkat-golongan-sheet-type";

export default function ButtonUdpatePangkatGolongan(){
    const {currentData} = useFormEdura<PangkatGolonganAppType>();
    const {state, actions:post} = useCrudPangkatGolongan();
    const {actions:modal} = useModal();

    const onSubmit = ()=>{
        
        toast.promise(
            post.update(currentData),
            {
                loading:'Proses mengupdate Pangkat dan Golongan',
                success: (response)=>{
                    const {success, data, detailResponse} = response;
                    DispatchingResponseToStore(success, data as PangkatGolonganSheetType[], detailResponse!);
                    modal.close();
                    return "Pangkat dan Golongan Berhasil diupdate"
                },
                error:(er)=>{
                    console.error(er);
                    return 'Gagal mengupdate Pangat dan golongan';
                },
                finally:()=>{
                    
                },
                closeButton:true
                
            }
        )
    }
    return (
        <ButtonCommitAwesome type="button" onClick={onSubmit} className="py-0 px-4" labelButton="Simpan"
        disabled={state.isSubmitting}
                >
                    {
                        state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>
                    }
            
        </ButtonCommitAwesome>
    )
}