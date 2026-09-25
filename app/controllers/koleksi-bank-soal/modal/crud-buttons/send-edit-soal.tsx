import { Globe2, Loader } from "lucide-react";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { useModal } from "~/components/modals/modal-provider";
import { useCrudBankSoalProvider } from "~/controllers/bank-soal/cruds/crud-provider-bank-soal";
import ValidationItemSoal from "~/controllers/bank-soal/editor/create-validation-input-item-data-soal";
import DtoBankSoal from "~/dtos/dto-bank-soal";
import type { BankSoalAppType, BankSoalSheetType } from "~/types/bank-soal/bank-soal-type";
import {toast} from 'sonner'
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import dataFormItemSoalNormalize from "~/domain/bank-soal/normalizer-data-form-soal";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";

export default function SendEditSoal({data}:{data:BankSoalAppType}){
    const {actions:actionModal} = useModal<BankSoalAppType>();
    const {actions:Post, state} = useCrudBankSoalProvider();
    
    const onSubmit = ()=>{
        
        const checkValid = ValidationItemSoal(data);
        if(!checkValid.isValid){
            alert(checkValid.message);
            return;
        }
        
        const dtoBankSoal = DtoBankSoal.fromAppToSheet(data);
        // const par = {...dtoBankSoal, idbaris}
        const par = dataFormItemSoalNormalize(dtoBankSoal, {name: data.bentuk_soal} as ListBentukSoalType)
        toast.promise(
            Post.update(par),
            {
                loading:'Sedang mengupdate',
                success:(response)=>{
                    const {success, data:dataRespon, detailResponse} = response;
                    DispatchingResponseToStore(success,dataRespon as BankSoalSheetType[], detailResponse!);
                    actionModal.close();
                    
                    
                    return 'Berhasil'
                },
                error:(er)=>{
                    console.log(er);
                    return 'Gagal | '+ er
                }
            }
        )
    }
    return (
        <ButtonCommitAwesome 
            labelButton="Simpan" 
            className="py-0 px-2 text-sm"
            onClick={onSubmit}
            disabled={state.isSubmitting}
            >
                {
                    state.isSubmitting 
                    ?(
                        <Loader size={12} className="animate-spin self-center"/>
                    ):(
                        <Globe2 size={12}/>
                    )  
                }
        </ButtonCommitAwesome>
    )
}