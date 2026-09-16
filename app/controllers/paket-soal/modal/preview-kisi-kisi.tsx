import { useModal, type ModalState } from "~/components/modals/modal-provider";
import type { PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal";
import {useMemo} from 'react';
import DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class";
import SwitchVersioningKisiKisi from "./kisi-kisi/switch-versioning-tabel-kisi-kisi";
import TitleKisiKisi from "./kisi-kisi/title-kisi-kisi";
import TableIdentitasKisikisi from "./kisi-kisi/tabel-identitas-kisi-kisi";
import { useExportTarget } from "~/layouts/exports/export-target-provider";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";
import { StepBackIcon } from "lucide-react";
import ButtonPrintModal from "~/controllers/modal-cetak/control-export-print";
import CetakKisiKisiSoal from "./cetak-kisi-kisi-soal";

export default function PreviewKisiKisi ({state, version}:{state:ModalState<PaketSoalDesign>, version:'v1'|'v2'}){
    //   const open = state.isOpen && isPrintPreviewModal(state.type)
    
    const {actions} = useModal()
    const paketSoal = state.payload
    const setting = state.payload?.setting;
    

    const KisiKisiInstance = useMemo(()=>{
        if(!paketSoal) return;

        return new DataKisiKisi(paketSoal)
        },[paketSoal]);

    return (
        
            setting && KisiKisiInstance ? (
                <CetakKisiKisiSoal KisiKisiInstance={KisiKisiInstance}  version={version}/>

            ):(
                <p>Data Belum Siap</p>
            )
        
    )
}