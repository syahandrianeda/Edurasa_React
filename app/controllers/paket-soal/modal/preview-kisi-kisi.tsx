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

export default function PreviewKisiKisi ({state, version}:{state:ModalState<PaketSoalDesign>, version:'v1'|'v2'}){
    //   const open = state.isOpen && isPrintPreviewModal(state.type)
    const exportRef = useExportTarget('print-area-modal') as React.Ref<HTMLDivElement>;;
    const {actions} = useModal()
    const paketSoal = state.payload
    const setting = state.payload?.setting;
    

    const KisiKisiInstance = useMemo(()=>{
        if(!paketSoal) return;

        return new DataKisiKisi(paketSoal)
        },[paketSoal]);

    return (
        <>
            <div className="bg-linear-to-tr from-sky-500 to-purple-300 w-full md:h-[calc(100vh-11rem)] py-4 px-2  overflow-y-auto scrol-h-custom">
                <div ref={exportRef} className="w-11/12 min-h-100 bg-white mx-auto shadow-lg shadow-gray-400  print:bg-white  print:shadow-none p-2">
                    <TitleKisiKisi PaketSoalName={setting?.identitas?.nama ?? ''}/>
                    
                    {/* tabel identitas */}
                    {
                    setting?.identitas &&  KisiKisiInstance && <TableIdentitasKisikisi identitas={setting?.identitas} isMultiple={setting?.koleksi_mapel?.isMultiple!!} KisiKisiInstance={KisiKisiInstance} koleksiMapel={setting?.koleksi_mapel?.data ?? []}/>
                    }
                    {/* table kisi-kisi */}
                    {
                        KisiKisiInstance && ( <SwitchVersioningKisiKisi isMultiple={setting?.koleksi_mapel?.isMultiple!!} InstanceDataKisikisi={KisiKisiInstance} version={version} /> )
                    }
                </div>
            </div>
            <ModalFooterEdura>
                <div className="flex w-full mt-2 gap-2">
                    <ButtonDeleteAwesome className="px-2 py-0  bg-rose-500"  type='button' onClick={actions.close} labelButton="Batal" >
                        <StepBackIcon size={12} className="self-center"/>
                    </ButtonDeleteAwesome>
                    <ButtonPrintModal className="mx-auto px-4 py-0" type="landscape"/>
                </div>
            </ModalFooterEdura>
        </>
    )
}