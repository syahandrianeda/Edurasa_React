import { useFormEdura } from "~/components/form-custom/form-edura"
import {type BankSoalAppType, type BankSoalSheetType } from "~/types/bank-soal/bank-soal-type"
import {Loader, TriangleAlert} from 'lucide-react';
import PratinjauItemSoalModal from "../views/pratinjau-soal-di-modal";
import { useCrudBankSoalProvider } from "~/controllers/bank-soal/cruds/crud-provider-bank-soal";
import { FieldSet } from "~/components/ui/field";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";
import {toast} from 'sonner'
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import { useModal } from "~/components/modals/modal-provider";

export default function HapusItemKoleksiSoal(){
    const {currentData} = useFormEdura<BankSoalAppType>();
    const {actions:actionModal} = useModal<BankSoalAppType>();
    const {state, actions:Post} = useCrudBankSoalProvider();
    const OnDelete = ()=>{
        const {idbaris} = currentData;
        const data = {idbaris, status:'hapus'};
        toast.promise(
            Post.update(data),
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
        <FieldSet disabled={state.isSubmitting}>
            <div className="border-2 h-[calc(100vh-12rem)] border-black flex bg-rose-200">
                <div className="border border-rose-400 justify-items-stretch flex-1 m-2 bg-linear-to-bl from-sky-300 via-rose-300 to-purple-300 rounded-2xl shadow-sm shadow-rose-300 flex flex-col justify-center items-center">
                    <div className="text-2xl font-extrabold text-center">
                        <TriangleAlert size={72} className="text-rose-500 mx-auto"/>
                        Anda yakin akan menghapus Item soal ini?
                    </div>
                </div>
                <div className="border border-black flex-1 flex flex-col justify-center m-2 p-2 bg-linear-to-bl from-sky-300 via-rose-300 to-purple-300 rounded-2xl shadow-sm shadow-rose-300">
                    <div className="border overflow-y-hidden text-wrap">
                        <PratinjauItemSoalModal currentData={currentData}/>
                    </div>
                </div>
            </div>
            <ModalFooterEdura>
                <ButtonDeleteAwesome labelButton="Hapus" className="py-0 px-4" disabled={state.isSubmitting} onClick={OnDelete}>
                    {
                        state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>
                    }
                </ButtonDeleteAwesome>
            </ModalFooterEdura>
        </FieldSet>
    )
}