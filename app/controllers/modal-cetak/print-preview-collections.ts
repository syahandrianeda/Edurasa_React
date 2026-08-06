import type { ModalState } from "~/components/modals/modal-provider";

export default function isPrintPreviewModal(type:ModalState['type']):boolean{
    return [
            "PRINT PREVIEW", 
            "PRINT PREVIEW SPPD", 
            "PRINT PREVIEW SURAT TUGAS",
            "PRINT NOTULA RAPAT",
            'NOTULA RAPAT' , 
        ].includes(type!)
}