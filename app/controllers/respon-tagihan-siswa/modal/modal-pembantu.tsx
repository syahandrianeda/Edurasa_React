import { ModalEdura } from "~/components/modals/modal-components";
import { useModal, type ModalActions, type ModalState } from "~/components/modals/modal-provider";
import type { ModalType } from "~/components/modals/modal-type";


export default function ModalBantuResponseSiswa(){
    const {state, actions} = useModal()
    const open = state.isOpen && [
        'INFO',
        'EDIT',
        'HAPUS',
        
    ].includes(state?.type!);

    return (
            <ModalEdura 
            state={{
                ...state,
                isOpen: open
            }}
            
                actions={actions} 
                className={SwitchWidthByType(state.type)}
                title={()=>switchJudulResponTagihanSiswa(state.type)}
            >
                <SwitchContentFormResponTagihanSiswa state={state} actions={actions}/>
            </ModalEdura>
                )
}

function switchJudulResponTagihanSiswa(type:ModalType){
    switch(type){
        case 'EDIT':
            return 'Edit Item Soal';
        case 'HAPUS':
            return 'Hapus Item Soal';
        case 'PREVIEW ITEM SOAL':
            return 'Preview Soal'
        default:
            return  type as string
    }
}

function SwitchWidthByType(type:ModalType):string{
    switch(type){
    //     case "PREVIEW KISI-KISI":
    //         return "sm:min-w-5xl  md:min-w-2xl lg:min-w-6xl gap-0 overflow-x-auto"
    //    case "PREVIEW KISI-KISI DAN SOALNYA":
    //         return "sm:min-w-5xl  md:min-w-2xl lg:min-w-6xl gap-0 overflow-x-auto"
    //     case 'PREVIEW KUNCI JAWABAN PAKET SOAL':
    //         return "w-[calc(100vw-5rem)] print:w-[210mm] lg:min-w-3xl overflow-x-auto pt-0"
    //     case "PREVIEW KISI-KISI SERVER":
    //         return "sm:min-w-5xl  md:min-w-2xl lg:min-w-6xl gap-0 overflow-x-auto"
    //    case "PREVIEW KISI-KISI DAN SOALNYA SERVER":
    //         return "sm:min-w-5xl  md:min-w-2xl lg:min-w-6xl gap-0 overflow-x-auto"
    //     case 'PREVIEW KUNCI JAWABAN SERVER':
    //         return "w-[calc(100vw-5rem)] print:w-[210mm] lg:min-w-3xl overflow-x-auto pt-0"
    //     case 'PREVIEW PAKET SOAL':
    //         // return "w-[calc(100vw-5rem)] print:w-[210mm] lg:min-w-3xl overflow-x-auto pt-0"
    //         return "min-w-full print:w-[210mm] print:w-[210mm] lg:min-w-3xl h-[calc(100dvh-4rem)] md:min-w-5xl text-wrap overflow-x-auto scrol-h-custom p-0"
        default:
            return "sm:min-w-5xl  md:min-w-2xl lg:min-w-5xl gap-0 overflow-x-auto"
    }
}

/** Daftar semua isi komponen modal di sini */
function SwitchContentFormResponTagihanSiswa ({state, actions}:{state:ModalState, actions:ModalActions}){
    switch(state.type){
        default:
            return <p>MODAL UTAMA</p>
    }
}