import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { useCrudSerahTerimaProvider } from "./crud-provider-serah-terima-dokumen";
import { useModal } from "~/components/modals/modal-provider";
import {type SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";
import { Loader } from "lucide-react";
import { useFormEdura } from "~/components/form-custom/form-edura";
import isValidInputSerahTerimaDokumen from "./validate-serah-terima-document";
import DtoSerahTerimaDokumen from "~/dtos/dto-serah-terima-dokumen";
import { toast } from "sonner";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";

export default function ButtonSendEditSerahTerimaDokumen(){
    const {state:statePost, actions:post} = useCrudSerahTerimaProvider();
    const {actions:modal} = useModal<SerahTerimaDokumenAppType>();
    const {currentData:serahTerimaDokumen} = useFormEdura<SerahTerimaDokumenAppType>()
    const onSubmit = async()=>{
        
        const checked = isValidInputSerahTerimaDokumen(serahTerimaDokumen)
        
        if(!checked.isValid){
            alert(checked.message);
            return;
        }
        
        const dto = DtoSerahTerimaDokumen.fromAppToSheet(serahTerimaDokumen)
        toast.promise(
            post.update(dto),
            {
                loading:'Sedang mengupdate',
                success:(respons)=>{
                    const {success, data,detailResponse} = respons;
                    
                    DispatchingResponseToStore(success, data as unknown as SerahTerimaDokumenAppType[],  detailResponse!)
                    // setSerahTerimaDokumen(initial);
                    modal.close();
                    return 'Daftar formulir telah salesai dibuat'
                },
                error:'Oups, error terjadi.'
            }
        )
    }
    return (
        <ButtonCommitAwesome 
                className="px-4 py-0" 
                disabled={statePost.isSubmitting} 
                onClick={onSubmit}
                labelButton="Simpan">
                {
                    statePost.isSubmitting && <Loader size={12} className="animate-spin self-center"/>
                }
            </ButtonCommitAwesome>
            
    )
}