import { StepBackIcon } from "lucide-react";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import ButtonPrintModal from "~/controllers/modal-cetak/control-export-print";
import CaraPenskoran from "./kisi-kisi/cara-penskoran";
import TableIdentitasKisikisi from "./kisi-kisi/tabel-identitas-kisi-kisi";
import TableKunciJawabanPembahasan from "./kisi-kisi/tabel-kunci-jawaban";
import TitleKunciJawabanPembahasan from "./kisi-kisi/title-kunci-jawaban";
import type DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class";
import { useExportTarget } from "~/layouts/exports/export-target-provider";
import { useModal } from "~/components/modals/modal-provider";

export default function CetakPembahasanDanPenskoran({KisiKisiInstance}:{KisiKisiInstance:DataKisiKisi}){
    const exportRef = useExportTarget('print-area-modal') as React.Ref<HTMLDivElement>;;
    const {actions} = useModal();
    const setting = KisiKisiInstance.designPaket.setting;
    

    return (
        <>
        <div className="bg-linear-to-tr from-sky-500 to-purple-300 w-full md:h-[calc(100vh-12rem)] px-2  overflow-y-auto scrol-h-custom">
                <div ref={exportRef} className=" min-h-100 bg-white mx-auto shadow-lg shadow-gray-400  print:bg-white  print:shadow-none p-2">
                    <TitleKunciJawabanPembahasan PaketSoalName={setting?.identitas?.nama ?? ''}/>
                    
                    {/* tabel identitas */}
                    {
                    setting?.identitas &&  KisiKisiInstance && <TableIdentitasKisikisi isKisi={false} identitas={setting?.identitas} isMultiple={setting?.koleksi_mapel?.isMultiple!!} KisiKisiInstance={KisiKisiInstance} koleksiMapel={setting?.koleksi_mapel?.data ?? []}/>
                    }
                    {/* table Kunci Jawwaban */}
                    <h4 className="font-bold">A. Kunci Jawaban dan Pembahasan</h4>
                    <TableKunciJawabanPembahasan KisiKisiInstance={KisiKisiInstance}/>
                    <h4 className="font-bold">B. Penskoran</h4>
                    {(KisiKisiInstance ) && <CaraPenskoran KisiKisiInstance={KisiKisiInstance}/>}
                </div>
            </div>
            <ModalFooterEdura>
                <div className="flex w-full mt-2 gap-2">
                    <ButtonDeleteAwesome className="px-2 py-0  bg-rose-500"  type='button' onClick={actions.close} labelButton="Tutup" >
                        <StepBackIcon size={12} className="self-center"/>
                    </ButtonDeleteAwesome>
                    <ButtonPrintModal className="mx-auto px-4 py-0" type="portrait"/>
                </div>
            </ModalFooterEdura>
        </>
    )
}