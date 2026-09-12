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
import PreviewKisiKisi from "~/controllers/paket-soal/modal/preview-kisi-kisi";
import type { PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal";
import PreviewKunciJawabanPenskoran from "~/controllers/paket-soal/modal/preview-kunci-jawaban";

export default function ModalBankSoal(){
    const {state, actions} = useModal<BankSoalAppType>()
     const open = state.isOpen && [
        
        'EDIT',
        'HAPUS',
        'ADD ITEM SOAL PAKET',
        'PREVIEW ITEM SOAL',
        'PREVIEW KISI-KISI',
        'PREVIEW KISI-KISI DAN SOALNYA',
        'PREVIEW KUNCI JAWABAN PAKET SOAL'
    ].includes(state?.type!);

    return (
            <ModalEdura 
            state={{
                ...state,
                isOpen: open
            }}
            
                actions={actions} 
                className={SwitchWidthByType(state.type)}
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
        case 'PREVIEW KISI-KISI':
            return 'Preview Kisi-kisi'
        case 'PREVIEW KISI-KISI DAN SOALNYA':
            return 'Preview Kisi-kisi + Soal';
         case 'PREVIEW KUNCI JAWABAN PAKET SOAL':
            return 'Kunci Jawaban, pembahasan, dan penskoran'
        default:
            return 'Modal'
    }
}

function SwitchWidthByType(type:ModalType):string{
    switch(type){
        case "PREVIEW KISI-KISI":
            return "sm:min-w-5xl  md:min-w-2xl lg:min-w-6xl gap-0 overflow-x-auto"
       case "PREVIEW KISI-KISI DAN SOALNYA":
            return "sm:min-w-5xl  md:min-w-2xl lg:min-w-6xl gap-0 overflow-x-auto"
        case 'PREVIEW KUNCI JAWABAN PAKET SOAL':
            return "w-[calc(100vw-5rem)] print:w-[210mm] lg:min-w-3xl overflow-x-auto pt-0"
        default:
            return "sm:min-w-5xl  md:min-w-2xl lg:min-w-5xl gap-0 overflow-x-auto"
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
        case 'PREVIEW KISI-KISI':
            return <PreviewKisiKisi state={state as unknown as ModalState<PaketSoalDesign>} version="v1"/>
        case 'PREVIEW KISI-KISI DAN SOALNYA':
            return <PreviewKisiKisi state={state as unknown as ModalState<PaketSoalDesign>} version="v2"/>
        case 'PREVIEW KUNCI JAWABAN PAKET SOAL':
            return <PreviewKunciJawabanPenskoran state={state as unknown as ModalState<PaketSoalDesign>}/>
        // case 'EDIT ITEM SOAL PAKET':
        //     return<FormPaketSoal state={state as unknown as ModalState<InitialItemSoalImplemented>}><ModalEditItemSoalPaket/></FormPaketSoal>;
        default:
            return <p>MODAL UTAMA</p>
    }
}