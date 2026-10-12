import { ModalFooterEdura } from "~/components/modals/modal-components";
import ButtonPrintModal from "~/controllers/modal-cetak/control-export-print";
import { AnalisisInstrumenService } from "~/domain/analisis-instrumen/AnalisisInstrumenService";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import { useExportTarget } from "~/layouts/exports/export-target-provider";
import { AnalisisInstrumenView } from "./analisis-instrumen/AnalisisInstrumenView";
import MainLaporanAnalisis from "./laporan-analisis-instrumen/main-laporan-analisis";

export default function AnalisisInstrumenModalLaporan ({data}:{data:TagihanHasDataResponse}){
    const exportRef = useExportTarget('print-area-modal') as React.Ref<HTMLDivElement>;;
    const service = AnalisisInstrumenService.analyze(data);
    
    return (
        <>
        <div className="bg-linear-to-tr from-sky-500 to-purple-300 w-full md:h-[calc(100vh-11rem)] py-4 px-2  overflow-y-auto scrol-h-custom">
            <div ref={exportRef} className="w-11/12 min-h-100 bg-white mx-auto shadow-lg shadow-gray-400  print:bg-white  print:shadow-none p-2">
                <MainLaporanAnalisis data={service}/>
            </div>
        </div>
        <ModalFooterEdura>
            <div className="flex w-full mt-2 gap-2">
                <ButtonPrintModal className="mx-auto px-4 py-0" type="landscape"/>
            </div>
        </ModalFooterEdura>
        </>
    )
}