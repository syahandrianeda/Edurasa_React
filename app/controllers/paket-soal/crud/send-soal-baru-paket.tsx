import { Globe2, Loader } from "lucide-react";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { useModal } from "~/components/modals/modal-provider";
import { useCrudBankSoalProvider } from "~/controllers/bank-soal/cruds/crud-provider-bank-soal";
import ValidationItemSoal from "~/controllers/bank-soal/editor/create-validation-input-item-data-soal";
import DtoBankSoal from "~/dtos/dto-bank-soal";
import type { BankSoalAppType, BankSoalSheetType } from "~/types/bank-soal/bank-soal-type";
import {toast} from 'sonner'
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import type { InitialItemSoalImplemented } from "~/controllers/paket-soal/modal/initial-item-soal-implemented";

export default function SendSoalBaruPaket({data}:{data:BankSoalAppType}){
    const {actions:actionsModal, state:stateModal, nextState} = useModal<InitialItemSoalImplemented>()
    const {actions:Post, state} = useCrudBankSoalProvider();
    
    const onSubmit = ()=>{
        
        const checkValid = ValidationItemSoal(data);
        if(!checkValid.isValid){
            alert(checkValid.message);
            return;
        }
        const dtoBankSoal = DtoBankSoal.fromAppToSheet(data);
        
        toast.promise(
            Post.update(dtoBankSoal),
            {
                loading:'Sedang mengupdate',
                success:(response)=>{
                    const {success, data:dataRespon , detailResponse} = response;
                    DispatchingResponseToStore(success,dataRespon as BankSoalSheetType[], detailResponse!);
                    
                    /** itemSoalBaru dari server */
                    const bankSoal = (dataRespon as BankSoalSheetType[]);
                    const lastItemBankSoal = bankSoal[bankSoal.length -1];
                    const data_soal = DtoBankSoal.fromSheetToApp(lastItemBankSoal);
                    const currentItemSoal = {...(nextState?.payload as InitialItemSoalImplemented)?.currentItemSoal, data_soal}
                    // const dataFix = {...(nextState?.payload as InitialItemSoalImplemented), currentItemSoal }
                    const fn = (nextState?.payload as InitialItemSoalImplemented)?.triggerUpsert;
                    
                    fn(currentItemSoal);
                    
                    actionsModal.close();
                    
                    return 'Berhasil disimpan di server dan diterapkan di paket soal';
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