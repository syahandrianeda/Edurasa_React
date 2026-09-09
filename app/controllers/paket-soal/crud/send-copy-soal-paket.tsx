import { CopyPlusIcon, Loader } from "lucide-react";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { useCrudBankSoalProvider } from "~/controllers/bank-soal/cruds/crud-provider-bank-soal";
import ValidationItemSoal from "~/controllers/bank-soal/editor/create-validation-input-item-data-soal";
import DtoBankSoal from "~/dtos/dto-bank-soal";
import type { BankSoalAppType, BankSoalSheetType } from "~/types/bank-soal/bank-soal-type";
import {toast} from 'sonner';
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import { useModal } from "~/components/modals/modal-provider";

export default function SendCopySoalPaket({data}:{data:BankSoalAppType}){
    const {actions:Post, state} = useCrudBankSoalProvider();
    const {actions} = useModal();
    
    const onSubmit = ()=>{
        
                const checkValid = ValidationItemSoal(data);
                if(!checkValid.isValid){
                    alert(checkValid.message);
                    return;
                }
                console.log('klo muncul berarti lolos');

                const newData = {...data, idbaris:0}
                const dtoBankSoal = DtoBankSoal.fromAppToSheet(newData);
                toast.promise(
                    Post.update(dtoBankSoal),
                    {
                        loading:'Sedang mengupdate',
                        success:(response)=>{
                            const {success, data:dataRespon, detailResponse} = response;
                            DispatchingResponseToStore(success,dataRespon as BankSoalSheetType[], detailResponse!);
                            
                            
                            
                            return 'Berhasil disalin, silakan kembali ke pengaturan item soal paket'
                        },
                        error:(er)=>{
                            console.log(er);
                            return 'Gagal'
                        }
                    }
                )
    }
    return (
        <ButtonCommitAwesome 
            labelButton="Salin Soal" 
            className="py-0 px-2 text-sm"
            onClick={onSubmit} disabled={state.isSubmitting}
            >
                {
                    state.isSubmitting 
                    ?(
                        <Loader size={12} className="animate-spin self-center"/>
                    ):(
                        <CopyPlusIcon size={12}/>
                    )
                }
        </ButtonCommitAwesome>
    )
}