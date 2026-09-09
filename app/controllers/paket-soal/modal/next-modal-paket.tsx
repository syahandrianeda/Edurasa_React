import { ModalEdura} from "~/components/modals/modal-components";
import { useModal, type ModalActions, type ModalState } from "~/components/modals/modal-provider";
import type { ModalType } from "~/components/modals/modal-type";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { InitialItemSoalImplemented } from "./initial-item-soal-implemented";
import FormPaketSoal from "./form-paket-soa";
import ModalEditItemSoalPaket from "~/controllers/paket-soal/modal/edit-item-soal-paket";

export default function NextModalPaketSoal(){
    const { state, actions, nextState } = useModal<BankSoalAppType>();
    const open = state.isOpen && [
        'ADD NEW ITEM SOAL PAKET',
        'EDIT ITEM SOAL PAKET'
    ].includes(state?.type!);

    
    return (
        <ModalEdura 
            state={{
                ...state,
                isOpen: open
            }}
            
            actions={actions} 
            // className="min-w-10/12 gap-0 overflow-x-auto"
            // className="md:min-w-9/12 md:h-[calc(100vh-4.5rem)] gap-0 overflow-x-auto"
            //className="w-[calc(100vw-5rem)] print:w-[210mm] lg:min-w-3xl overflow-x-auto pt-0"
            className="sm:min-w-5xl  md:min-w-2xl lg:min-w-5xl gap-0 overflow-x-auto"
            title={()=>switchJudulBankSoal(state.type)}
        >
            <SwitchContentFormBankSoal state={state} actions={actions}/>
            
        </ModalEdura>
    )
}


function switchJudulBankSoal(type:ModalType){
    switch(type){
        case 'EDIT ITEM SOAL PAKET':
            return 'Edit Item Soal';
        case 'ADD NEW ITEM SOAL PAKET':
            return 'Tambah Soal Baru';
        default:
            return 'Modal Kedua'
    }
}
function SwitchContentFormBankSoal ({state, actions}:{state:ModalState<BankSoalAppType>, actions:ModalActions<BankSoalAppType>}){
    switch(state.type){
        case 'EDIT ITEM SOAL PAKET':
            return<FormPaketSoal state={state as unknown as ModalState<InitialItemSoalImplemented>}><ModalEditItemSoalPaket/></FormPaketSoal>;
        case 'ADD NEW ITEM SOAL PAKET':
            return<FormPaketSoal state={state as unknown as ModalState<InitialItemSoalImplemented>}><ModalEditItemSoalPaket mode="tambah_baru"/></FormPaketSoal>;
        default:
            return <p>MODAL UTAMA</p>
    }
}
