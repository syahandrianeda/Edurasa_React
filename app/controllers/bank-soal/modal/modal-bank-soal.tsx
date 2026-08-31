import { ModalEdura } from "~/components/modals/modal-components";
import { useModal, type ModalActions, type ModalState } from "~/components/modals/modal-provider";
import type { ModalType } from "~/components/modals/modal-type";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import PreviewModalItemSoal from "./PreviewModalItemSoal";
import ModalProviderForm from "~/controllers/koleksi-bank-soal/modal/modal-provider-form";
import ModalEditItemSoal from "~/controllers/koleksi-bank-soal/modal/edit-item-soal";
import HapusItemKoleksiSoal from "~/controllers/koleksi-bank-soal/modal/hapus-item-soal";

export default function ModalBankSoal(){
    const {state, actions} = useModal<BankSoalAppType>()

    return (
            <ModalEdura 
                state={state} 
                actions={actions} 
                className="sm:min-w-5xl  md:min-w-2xl lg:min-w-5xl gap-0 overflow-x-auto"
                title={()=>switchJudulBankSoal(state.type)}
            >
                <SwitchContentFormBankSoal state={state} actions={actions}/>
            </ModalEdura>
                )
}
function switchJudulBankSoal(type:ModalType){
    switch(type){
        case 'EDIT':
            return 'Edit Item Soal';
        case 'HAPUS':
            return 'Hapus Item Soal';
        case 'PREVIEW ITEM SOAL':
            return 'Preview Soal'
        default:
            return 'Modal'
    }
}
function SwitchContentFormBankSoal ({state, actions}:{state:ModalState<BankSoalAppType>, actions:ModalActions<BankSoalAppType>}){
    switch(state.type){
        case 'EDIT':
            return <ModalProviderForm state={state}><ModalEditItemSoal/></ModalProviderForm>;
        case 'HAPUS':
            return <ModalProviderForm state={state}><HapusItemKoleksiSoal/></ModalProviderForm>;
        case 'PREVIEW ITEM SOAL':
            return <PreviewModalItemSoal state={state} actions={actions}/>
        default:
            return <p>MODAL</p>
    }
}