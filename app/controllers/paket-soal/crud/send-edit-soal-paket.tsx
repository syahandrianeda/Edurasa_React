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
import dataFormItemSoalNormalize from "~/domain/bank-soal/normalizer-data-form-soal";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";

export default function SendEditSoalPaket({data}:{data:BankSoalAppType}){
    const {actions:actionsModal, state:stateModal, nextState} = useModal<InitialItemSoalImplemented>()
    const {actions:Post, state} = useCrudBankSoalProvider();
    
    const onSubmit = ()=>{
        
        const checkValid = ValidationItemSoal(data);
        if(!checkValid.isValid){
            alert(checkValid.message);
            return;
        }
        
        /** masalah:
         * Jika soal edit ini sudah dijadikan refrensi soal pada paket soal, maka:
         * - soal paket soal tetap pake yang lama? atau
         * - soal paket turut diperbarui [x]
         * 
         * jika soal diperbaruinya adalah dihapus? bagaimana paket soalnya?
         * - soal paket masih pake data yang lama? (diambil dari file json), atau
         * - soal paket turut dihapus dan paket yang telah diperabur
         */
        const dtoBankSoal = DtoBankSoal.fromAppToSheet(data);
        const par = dataFormItemSoalNormalize(dtoBankSoal, {name: data.bentuk_soal} as ListBentukSoalType)
        toast.promise(
                    Post.update(par),
            {
                loading:'Sedang mengupdate',
                success:(response)=>{
                    const {success, data:dataRespon, detailResponse} = response;
                    DispatchingResponseToStore(success,dataRespon as BankSoalSheetType[], detailResponse!);
                    // actionModal.close();
                    // const currentItemSoal = {...(nextState?.payload as InitialItemSoalImplemented)?.currentItemSoal, data_soal:data}
                    
                    // const fn = (nextState?.payload as InitialItemSoalImplemented)?.triggerUpsert;
                    
                    // fn(currentItemSoal)
                     const bankSoal = (dataRespon as BankSoalSheetType[]);
                     const lastItemBankSoal = bankSoal.find(s=>s.idbaris === data.idbaris);
                    if(bankSoal && lastItemBankSoal){
                        
                        const data_soal = DtoBankSoal.fromSheetToApp(lastItemBankSoal);
                        const currentItemSoal = {...(nextState?.payload as InitialItemSoalImplemented)?.currentItemSoal, data_soal}
                        // const dataFix = {...(nextState?.payload as InitialItemSoalImplemented), currentItemSoal }
                        const fn = (nextState?.payload as InitialItemSoalImplemented)?.triggerUpsert;
                        
                        fn(currentItemSoal);

                    }
                    actionsModal.close();
                    return 'Berhasil diedit dan diterapkan';
                },
                error:(er)=>{
                    console.log(er);
                    actionsModal.close()
                    return 'Gagal'
                },
                finally:()=>{
                    actionsModal.close();
                }
            }
        )
    }
    return (
        <ButtonCommitAwesome 
            labelButton="Simpan dan Terapkan" 
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