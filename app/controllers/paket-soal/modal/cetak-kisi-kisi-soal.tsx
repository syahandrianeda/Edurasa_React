import type { PraSettingPaket } from "~/domain/paket-soal/entities/pra-setting-paket"
import type DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class"
import TitleKisiKisi from "./kisi-kisi/title-kisi-kisi"
import TableIdentitasKisikisi from "./kisi-kisi/tabel-identitas-kisi-kisi"
import SwitchVersioningKisiKisi from "./kisi-kisi/switch-versioning-tabel-kisi-kisi"
import { StepBackIcon } from "lucide-react"
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button"
import { ModalFooterEdura } from "~/components/modals/modal-components"
import ButtonPrintModal from "~/controllers/modal-cetak/control-export-print"
import { useExportTarget } from "~/layouts/exports/export-target-provider"
import { useModal } from "~/components/modals/modal-provider"

type Props = {
    version:'v1'|'v2',
    KisiKisiInstance: DataKisiKisi
}
export default function CetakKisiKisiSoal({KisiKisiInstance, version}:Props ){
    const exportRef = useExportTarget('print-area-modal') as React.Ref<HTMLDivElement>;;
    const {actions} = useModal();
    const setting = KisiKisiInstance.designPaket.setting;
    

    return (
        <>
        <div className="bg-linear-to-tr from-sky-500 to-purple-300 w-full md:h-[calc(100vh-11rem)] py-4 px-2  overflow-y-auto scrol-h-custom">
                <div ref={exportRef} className="w-11/12 min-h-100 bg-white mx-auto shadow-lg shadow-gray-400  print:bg-white  print:shadow-none p-2">
                    <TitleKisiKisi PaketSoalName={setting?.identitas?.nama ?? ''}/>
                    
                    {/* tabel identitas */}
                    {
                    setting?.identitas &&  KisiKisiInstance && <TableIdentitasKisikisi isKisi={true} identitas={setting?.identitas} isMultiple={setting?.koleksi_mapel?.isMultiple!!} KisiKisiInstance={KisiKisiInstance} koleksiMapel={setting?.koleksi_mapel?.data ?? []}/>
                    }
                    {/* table kisi-kisi */}
                    {
                        KisiKisiInstance && ( <SwitchVersioningKisiKisi isMultiple={setting?.koleksi_mapel?.isMultiple!!} InstanceDataKisikisi={KisiKisiInstance} version={version} /> )
                    }
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