import type { ModalState } from "~/components/modals/modal-provider";

export function titleModal(state:ModalState):string{
    const type = state.type;
    switch(type){
        case "EDIT":
            return 'Edit Surat Keluar';
        case "INFO":
            return 'Informasi Surat'
        case 'HAPUS':
            return "Hapus";
        case "PRINT PREVIEW":
            return "Pracetak "
        default:
            return 'Modal'
    }
    
}