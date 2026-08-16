import type { ModalState } from "~/components/modals/modal-provider";

export function titleModal(state:ModalState):string{
    const type = state.type;
    switch(type){
        case "INFO":
            return 'Informasi Data';
        case "EDIT":
            return 'Edit Daftar Serah Terima Dokumen';
        case "HAPUS":
            return 'HAPUS DATA';
        case "EDIT TRANSAKSI SERAH TERIMA":
            return 'Transaksi Penyerahan/Penerimaan'
        case "HAPUS TRANSAKSI SERAH TERIMA":
            return 'Hapus Transaksi'
        default:
            return 'Modal'
    }
}