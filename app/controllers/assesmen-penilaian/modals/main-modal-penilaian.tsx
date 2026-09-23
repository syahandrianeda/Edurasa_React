import { ModalEdura } from "~/components/modals/modal-components";
import { useModal, type ModalActions, type ModalState } from "~/components/modals/modal-provider";
import type { ModalType } from "~/components/modals/modal-type";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import MainModalForm from "./main-modal-form-penilaian";
import type { PaketSoalAppType } from "~/types/bank-soal/entities/paket-soal-app-type";
import AddNonPaketSoalModal from "./add-non-paket-soal";
import type { PublikasiPaketAppValidWithPaketSoal } from "~/types/bank-soal/entities/publikasi-paket-app-type";
import EditPublikasiPaketSoal from "~/controllers/publikasi-paket-soal/modal/edit-publikasi-paket";
import WrapperFormPublikasiPaket from "~/controllers/publikasi-paket-soal/modal/wraper-form";
import EditPublikasiInstrumenTagihan from "./edit-publikasi-instrumeen";
import EditNonPaketSoal from "./edit-non-paket-soal";
import ModalAsyncPaketSoal from "~/controllers/koleksi-paket-soal/modal/modal-async";
import PreviewPaketSoalServer from "~/controllers/koleksi-paket-soal/modal/peview-paket-soal";
import ModalAsyncPublikasiPaketSoal from "./modal-async-publikasi-soal";
import KisiKisiSoalServer from "~/controllers/koleksi-paket-soal/modal/kisi-kisi-soal-server";
import PembahasanPenskoranServer from "~/controllers/koleksi-paket-soal/modal/pembahasan-penskoran";
import PreviewSebaranServer from "./preview-sebaran-server";
import HapusPubilikasiInstrumenSoal from "./hapus-publikasi-instrumen";
import PreviewSebaranPaketNonSoal from "./preview-sebaran-non-paket-soal";

export default function MainModalPenilaian(){
    const {state, actions} = useModal()
        const open = state.isOpen && [
            
            'EDIT',
            'HAPUS',
            'INFO',
            'TAMBAH',
            'ADD PUBLIKASI NON PAKET SOAL',
            'EDIT PUBLIKASI PAKET SOAL',
            'EDIT PUBLIKASI NON PAKET SOAL',
            'PREVIEW PAKET SOAL',
            'PREVIEW KISI-KISI DAN SOALNYA SERVER',
            'PREVIEW KUNCI JAWABAN SERVER',
            'PREVIEW KISI-KISI SERVER',
            'PREVIEW SEBARAN KOMPETENSI SERVER',
            'PREVIEW SEBARAN KOMPETENSI NON PAKET SOAL',
            'INFO RESPON TAGIHAN',
            'KOREKSI SOAL',
            'IMPORT NILAI',
            'ANALLISIS SOAL',
            
        ].includes(state?.type!);
    return (
        <ModalEdura
            state={{
                ...state,
                isOpen: open
            }}
            
                actions={actions} 
                className={SwitchWidthByType(state.type)}
                title={()=>switchJudulPublikasiSoal(state.type)}
            >
               
            <SwitchContentFormBankSoal state={state}/>
        </ModalEdura>
    )
}

function switchJudulPublikasiSoal(type:ModalType){
    switch(type){
        case 'ADD PUBLIKASI NON PAKET SOAL':
            return 'Buat Baru Insrumen Penilaian non Paket Soal'
        case 'EDIT PUBLIKASI NON PAKET SOAL':
            return 'Edit Insrumen Penilaian non Paket Soal'
        default:
            return  type as string
    }
}

function SwitchWidthByType(type:ModalType):string{
    switch(type){
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

function SwitchContentFormBankSoal ({state}:{state:ModalState}){
    switch(state.type){
        case 'ADD PUBLIKASI NON PAKET SOAL':
            return <MainModalForm data={state.payload}><AddNonPaketSoalModal/></MainModalForm>
        case 'EDIT PUBLIKASI PAKET SOAL':
            return <MainModalForm data={state.payload}><EditPublikasiInstrumenTagihan/></MainModalForm>
        case 'EDIT PUBLIKASI NON PAKET SOAL':
            return <MainModalForm data={state.payload}><EditNonPaketSoal/></MainModalForm>
        case 'PREVIEW SEBARAN KOMPETENSI NON PAKET SOAL':
            return <MainModalForm data={state.payload}><PreviewSebaranPaketNonSoal/></MainModalForm>
        case 'HAPUS':
            return <MainModalForm data={state.payload}><HapusPubilikasiInstrumenSoal/></MainModalForm>
        case 'PREVIEW PAKET SOAL':
            return <ModalAsyncPublikasiPaketSoal state={state as unknown as ModalState<TagihanHasDataResponse>}><PreviewPaketSoalServer/></ModalAsyncPublikasiPaketSoal>
        case 'PREVIEW KISI-KISI DAN SOALNYA SERVER':
            <ModalAsyncPublikasiPaketSoal state={state as unknown as ModalState<TagihanHasDataResponse>}><KisiKisiSoalServer version="v2"/></ModalAsyncPublikasiPaketSoal>
        case 'PREVIEW KUNCI JAWABAN SERVER':
            return <ModalAsyncPublikasiPaketSoal state={state as unknown as ModalState<TagihanHasDataResponse>}><PembahasanPenskoranServer/></ModalAsyncPublikasiPaketSoal>
        case 'PREVIEW KISI-KISI SERVER':
            return <ModalAsyncPublikasiPaketSoal state={state as unknown as ModalState<TagihanHasDataResponse>}><KisiKisiSoalServer version="v1"/></ModalAsyncPublikasiPaketSoal>
         case 'PREVIEW SEBARAN KOMPETENSI SERVER':
            return <ModalAsyncPublikasiPaketSoal state={state as unknown as ModalState<TagihanHasDataResponse>}><PreviewSebaranServer/></ModalAsyncPublikasiPaketSoal>
                                     
        default:
            return <div className="w-full min-h-32 flex justify-center items-center lowercase first-letter:uppercase gap-2"><strong>{state.type}</strong>  <span>on Proses Development</span></div>
    }
}