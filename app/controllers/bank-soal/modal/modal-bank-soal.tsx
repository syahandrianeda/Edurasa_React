import { ModalEdura } from "~/components/modals/modal-components";
import { useModal, type ModalActions, type ModalState } from "~/components/modals/modal-provider";
import type { ModalType } from "~/components/modals/modal-type";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import PreviewModalItemSoal from "./PreviewModalItemSoal";
import ModalProviderForm from "~/controllers/koleksi-bank-soal/modal/modal-provider-form";
import ModalEditItemSoal from "~/controllers/koleksi-bank-soal/modal/edit-item-soal";
import HapusItemKoleksiSoal from "~/controllers/koleksi-bank-soal/modal/hapus-item-soal";
import AddItemSoalPaketModal from "~/controllers/paket-soal/modal/add-item-soal-paket";
import type { InitialItemSoalImplemented } from "~/controllers/paket-soal/modal/initial-item-soal-implemented";
import ModalEditItemSoalPaket from "~/controllers/koleksi-bank-soal/modal/edit-item-soal-paket";
import FormPaketSoal from "~/controllers/paket-soal/modal/form-paket-soa";

export default function ModalBankSoal(){
    const {state, actions} = useModal<BankSoalAppType>()
     const open = state.isOpen && [
        
        'EDIT',
        'HAPUS',
        'ADD ITEM SOAL PAKET',
        'PREVIEW ITEM SOAL'
    ].includes(state?.type!);

    return (
            <ModalEdura 
            state={{
                ...state,
                isOpen: open
            }}
            
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
        case 'ADD ITEM SOAL PAKET':
            return 'Tambah/Edit Item Soal'
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
        case 'ADD ITEM SOAL PAKET':
            return <AddItemSoalPaketModal state={state as unknown as ModalState<InitialItemSoalImplemented>}/>
        // case 'EDIT ITEM SOAL PAKET':
        //     return<FormPaketSoal state={state as unknown as ModalState<InitialItemSoalImplemented>}><ModalEditItemSoalPaket/></FormPaketSoal>;
        default:
            return <p>MODAL UTAMA</p>
    }
}