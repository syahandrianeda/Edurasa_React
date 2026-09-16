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
import ModalAsyncPaketSoal from "~/controllers/koleksi-paket-soal/modal/modal-async";
import KisiKisiSoalServer from "~/controllers/koleksi-paket-soal/modal/kisi-kisi-soal-server";
import PembahasanPenskoranServer from "~/controllers/koleksi-paket-soal/modal/pembahasan-penskoran";
import PreviewPaketSoalServer from "~/controllers/koleksi-paket-soal/modal/peview-paket-soal";
import EditSettingPaketSoalServer from "~/controllers/koleksi-paket-soal/modal/edit-setting-paket-soal";
import type { PaketSoalAppType, PaketSoalAppWithPublikasi } from "~/types/bank-soal/entities/paket-soal-app-type";
import HapusSettingPaketSoalServer from "~/controllers/koleksi-paket-soal/modal/hapus-setting-paket-soal";
import WrapperFormPublikasiPaket from "~/controllers/publikasi-paket-soal/modal/wraper-form";
import type { PublikasiPaketAppType, PublikasiPaketAppValidWithPaketSoal } from "~/types/bank-soal/entities/publikasi-paket-app-type";
import InfoPublikasiPaketSoal from "~/controllers/publikasi-paket-soal/modal/info-publikasi";
import EditPublikasiPaketSoal from "~/controllers/publikasi-paket-soal/modal/edit-publikasi-paket";
import HapusPublikasiPaketSoal from "~/controllers/publikasi-paket-soal/modal/hapus-publikasi-paket";
import AddPublikasiPaketSoal from "~/controllers/publikasi-paket-soal/modal/add-publikasi-paket";
import WrapperFormAddPublikasiPaket from "~/controllers/publikasi-paket-soal/modal/wraper-form-add-publikasi";

export default function ModalBankSoal(){
    const {state, actions} = useModal<BankSoalAppType>()
     const open = state.isOpen && [
        
        'EDIT',
        'HAPUS',
        'ADD ITEM SOAL PAKET',
        'PREVIEW ITEM SOAL',
        'PREVIEW KISI-KISI',
        'PREVIEW KISI-KISI DAN SOALNYA',
        'PREVIEW KUNCI JAWABAN PAKET SOAL',
        'EDIT PAKET SOAL',
        'PREVIEW PAKET SOAL',
        'PREVIEW KISI-KISI SERVER',
        'PREVIEW KISI-KISI DAN SOALNYA SERVER',
        'PREVIEW KUNCI JAWABAN SERVER',
        'HAPUS PAKET SOAL',
        'INFO PUBLIKASI PAKET SOAL',
        'ADD PUBLIKASI PAKET SOAL',
        'EDIT PUBLIKASI PAKET SOAL',
        'HAPUS PUBLIKASI PAKET SOAL',
        'ADD PUBLIKASI PAKET SOAL'
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
            return  type as string
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
        case "PREVIEW KISI-KISI SERVER":
            return "sm:min-w-5xl  md:min-w-2xl lg:min-w-6xl gap-0 overflow-x-auto"
       case "PREVIEW KISI-KISI DAN SOALNYA SERVER":
            return "sm:min-w-5xl  md:min-w-2xl lg:min-w-6xl gap-0 overflow-x-auto"
        case 'PREVIEW KUNCI JAWABAN SERVER':
            return "w-[calc(100vw-5rem)] print:w-[210mm] lg:min-w-3xl overflow-x-auto pt-0"
        case 'PREVIEW PAKET SOAL':
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
        
        /** KOLEKSI PAKET SOAL */
        case 'EDIT PAKET SOAL':
            return <ModalAsyncPaketSoal state={state as unknown as ModalState<PaketSoalAppType>}><EditSettingPaketSoalServer/></ModalAsyncPaketSoal>
        case 'PREVIEW PAKET SOAL':
            return <ModalAsyncPaketSoal state={state as unknown as ModalState<PaketSoalAppType>}><PreviewPaketSoalServer/></ModalAsyncPaketSoal>
        case 'PREVIEW KISI-KISI SERVER':
            return <ModalAsyncPaketSoal state={state as unknown as ModalState<PaketSoalAppType>}><KisiKisiSoalServer version="v1"/></ModalAsyncPaketSoal>
        case 'PREVIEW KISI-KISI DAN SOALNYA SERVER':
            return <ModalAsyncPaketSoal state={state as unknown as ModalState<PaketSoalAppType>}><KisiKisiSoalServer version="v2"/></ModalAsyncPaketSoal>
        case 'PREVIEW KUNCI JAWABAN SERVER':
            return <ModalAsyncPaketSoal state={state as unknown as ModalState<PaketSoalAppType>}><PembahasanPenskoranServer/></ModalAsyncPaketSoal>
       case 'HAPUS PAKET SOAL':
            return <ModalAsyncPaketSoal state={state as unknown as ModalState<PaketSoalAppType>}><HapusSettingPaketSoalServer/></ModalAsyncPaketSoal>

        /** PUBLIKASI PAKET SOAL */
        case 'INFO PUBLIKASI PAKET SOAL':
            return <WrapperFormPublikasiPaket state={state as unknown as ModalState<PublikasiPaketAppValidWithPaketSoal>}><InfoPublikasiPaketSoal/></WrapperFormPublikasiPaket>
        case 'EDIT PUBLIKASI PAKET SOAL':
            return <WrapperFormPublikasiPaket state={state as unknown as ModalState<PublikasiPaketAppValidWithPaketSoal>}><EditPublikasiPaketSoal/></WrapperFormPublikasiPaket>
            
        case 'HAPUS PUBLIKASI PAKET SOAL':
            return <WrapperFormPublikasiPaket state={state as unknown as ModalState<PublikasiPaketAppValidWithPaketSoal>}><HapusPublikasiPaketSoal/></WrapperFormPublikasiPaket>
            
        case 'ADD PUBLIKASI PAKET SOAL':
            return <WrapperFormAddPublikasiPaket state={state as unknown as ModalState<PaketSoalAppWithPublikasi>}><AddPublikasiPaketSoal/></WrapperFormAddPublikasiPaket>
                
        default:
            return <p>MODAL UTAMA</p>
    }
}