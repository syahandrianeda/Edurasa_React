import type { ModalState } from "~/components/modals/modal-provider";

export function titleModal(state:ModalState):string{
    const type = state.type;
    switch(type){
        case "EDIT":
            return 'Edit Surat Keluar';
        case "INFO": case "INFO SURAT MASUK":
            return 'Informasi Surat'
        case 'HAPUS': case "HAPUS SURAT MASUK":
            return "Hapus";
        case "PRINT PREVIEW":
            return "Pracetak "
        case "EDIT SPPD":
            return "Edit Surat Perjalanan Dinas"
        case "EDIT JUMLAH HARI":
            return "Edit Hari Pelaksanaan SPPD"
        case "EDIT-CUSTOM":
            return "Edit Data PTK"
        case "EDIT SURAT MASUK":
            return "Edit Surat Masuk"
        case "EDIT TEMPAT SPPD":
            return "Edit Tempat SPPD"
        default:
            return 'Modal'
    }
    
}