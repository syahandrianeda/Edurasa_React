import { useCrudSerahTerimaProvider } from "./crud-provider-serah-terima-dokumen";
import { useModal } from "~/components/modals/modal-provider";
import {type SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";
import { Loader } from "lucide-react";
import { useFormEdura } from "~/components/form-custom/form-edura";
import DtoSerahTerimaDokumen from "~/dtos/dto-serah-terima-dokumen";
import { toast } from "sonner";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";

export default function ButtonSendDeleteSerahTerimaDokumen(){
    const {state:statePost, actions:post} = useCrudSerahTerimaProvider();
    const {actions:modal} = useModal<SerahTerimaDokumenAppType>();
    const {currentData:serahTerimaDokumen} = useFormEdura<SerahTerimaDokumenAppType>()
    const onSubmit = async()=>{
        
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
                    return 'Daftar formulir telah salesai dihapus'
                },
                error:'Oups, error terjadi.'
            }
        )
    }
    return (
        <ButtonDeleteAwesome
                className="px-4 py-0" 
                disabled={statePost.isSubmitting} 
                onClick={onSubmit}
                labelButton="Hapus">
                {
                    statePost.isSubmitting && <Loader size={12} className="animate-spin self-center"/>
                }
            </ButtonDeleteAwesome>
            
    )
}