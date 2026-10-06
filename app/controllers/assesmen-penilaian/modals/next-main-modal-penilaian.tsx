import { ModalEdura } from "~/components/modals/modal-components";
import { useModal, type ModalActions, type ModalState } from "~/components/modals/modal-provider";
import type { ModalType } from "~/components/modals/modal-type";
import KoreksiItemSoal from "./koreksi-item-soal";
import MainModalForm from "./main-modal-form-penilaian";
import type { detailNilaiSiswaAppType } from "~/types/penilaian/nilai-siswa-app-type";

export default function NextMainModalPenilaian(){
    const {state, actions} = useModal()
        const open = state.isOpen && [
            'KOREKSI SOAL',
            
        ].includes(state?.type!);
    return (
        <ModalEdura
            state={{
                ...state,
                isOpen: open
            }}
            
                actions={actions} 
                className={SwitchWidthByType(state.type)}
                title={()=>switchJudulPublikasiSoal(state)}
            >
               
            <SwitchContentFormBankSoal state={state}/>
        </ModalEdura>
    )
}

function switchJudulPublikasiSoal(state:ModalState){
    const type = state.type;
    switch(type){
        case 'KOREKSI SOAL':
            return `KOREKSI ][ ${(state.payload as unknown as detailNilaiSiswaAppType)?.publikasi?.nama_publikasi} ][ ${(state.payload as unknown as detailNilaiSiswaAppType)?.siswa?.pd_nama}`
       default:
            return  type as string
    }
}

function SwitchWidthByType(type:ModalType):string{
    switch(type){
        case 'KOREKSI SOAL':
            return "sm:min-w-5xl  md:min-w-3xl lg:min-w-6xl gap-0 overflow-x-auto"
        default:
            return "sm:min-w-5xl  md:min-w-2xl lg:min-w-5xl gap-0 overflow-x-auto"
    }
}

function SwitchContentFormBankSoal ({state}:{state:ModalState}){
    switch(state.type){
       case 'KOREKSI SOAL':
        return <MainModalForm data={state.payload}><KoreksiItemSoal/></MainModalForm>
        default:
            return <div className="w-full min-h-32 flex justify-center items-center lowercase first-letter:uppercase gap-2"><strong>{state.type}</strong>  <span>on Proses Development</span></div>
    }
}