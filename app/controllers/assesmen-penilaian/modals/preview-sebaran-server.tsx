import { StepBackIcon } from "lucide-react";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import { useModal } from "~/components/modals/modal-provider";
import ButtonPrintModal from "~/controllers/modal-cetak/control-export-print";
import CaraPenskoran from "~/controllers/paket-soal/modal/kisi-kisi/cara-penskoran";
import type DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class";
import { useExportTarget } from "~/layouts/exports/export-target-provider";

export default function PreviewSebaranServer(){
     const {currentData:KisiKisiInstance} = useFormEdura<DataKisiKisi>();
     const exportRef = useExportTarget('print-area-modal') as React.Ref<HTMLDivElement>;;
    const {actions} = useModal();
    const setting = KisiKisiInstance.designPaket.setting;
    return (
        <>
            <div className="bg-linear-to-tr from-sky-500 to-purple-300 w-full md:h-[calc(100vh-11rem)] py-4 px-2  overflow-y-auto scrol-h-custom">
                <div ref={exportRef} className="w-11/12 min-h-100 bg-white mx-auto shadow-lg shadow-gray-400  print:bg-white  print:shadow-none p-2">
                <h3 className="text-[10px] text-center uppercase">Data Sebaran Kompetensi di tiap soal</h3>
                {KisiKisiInstance && <CaraPenskoran KisiKisiInstance={KisiKisiInstance} modeCountSebaran={true} />}
                </div>
            </div>
             <ModalFooterEdura>
                <div className="flex w-full mt-2 gap-2">
                    <ButtonDeleteAwesome className="px-2 py-0  bg-rose-500"  type='button' onClick={actions.close} labelButton="Tutup" >
                        <StepBackIcon size={12} className="self-center"/>
                    </ButtonDeleteAwesome>
                    <ButtonPrintModal className="mx-auto px-4 py-0" type="landscape"/>
                </div>
            </ModalFooterEdura>
        </>
    )
}