import { CopyPlusIcon, Loader } from "lucide-react";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { useModal } from "~/components/modals/modal-provider";
import { useCrudBankSoalProvider } from "~/controllers/bank-soal/cruds/crud-provider-bank-soal";
import ValidationItemSoal from "~/controllers/bank-soal/editor/create-validation-input-item-data-soal";
import DtoBankSoal from "~/dtos/dto-bank-soal";
import type { BankSoalAppType, BankSoalSheetType } from "~/types/bank-soal/bank-soal-type";
import {toast} from 'sonner';
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";

export default function SendCopySoal({data}:{data:BankSoalAppType}){
    const {actions:actionModal} = useModal<BankSoalAppType>();
    const {actions:Post, state} = useCrudBankSoalProvider();
    
    const onSubmit = ()=>{
        console.log(data);
                const checkValid = ValidationItemSoal(data);
                if(!checkValid.isValid){
                    alert(checkValid.message);
                    return;
                }
                console.log('klo muncul berarti lolos');
                /** masalah:
                 * Jika soal edit ini sudah dijadikan refrensi soal pada paket soal, maka:
                 * - soal paket soal tetap pake yang lama? atau
                 * - soal paket turut diperbarui [x]
                 * 
                 * jika soal diperbaruinya adalah dihapus? bagaimana paket soalnya?
                 * - soal paket masih pake data yang lama? (diambil dari file json), atau
                 * - soal paket turut dihapus dan paket yang telah diperabur
                 */
                // karena disalin, idbaris diubah;
                const newData = {...data, idbaris:0}
                const dtoBankSoal = DtoBankSoal.fromAppToSheet(newData);
                toast.promise(
                    Post.update(dtoBankSoal),
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
                            return 'Gagal'
                        }
                    }
                )
    }
    return (
        <ButtonCommitAwesome 
            labelButton="Salin Soal" 
            className="py-0 px-2 text-xs"
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