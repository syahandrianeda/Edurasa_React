import { useFormEdura } from "~/components/form-custom/form-edura"
import { ModalFooterEdura } from "~/components/modals/modal-components"
import type { ModalState } from "~/components/modals/modal-provider"
import type { KaldikType } from "~/types/kaldik"
import { PreviewKaldikModal } from "./preview-kaldik-setting"
import FieldKeteranganKaldik from "./field-preview-keterangan"
import FieldKeteranganKaldikNonSetting from "./field-keterangan-nonsetting"

export default function FormPreviewKaldik(){
    
    return (
        <div className="overflow-y-auto scrol-h-custom">
            <WrapPreviewMultipleKaldik/>
            <ModalFooterEdura>
                Contoh Tampilan Kalender
            </ModalFooterEdura>
        </div>
    )
}
function WrapPreviewMultipleKaldik(){
    const {currentData} = useFormEdura<KaldikType>();
    const dateBefore = new Date(currentData.start_tgl.getFullYear(), currentData.start_tgl.getMonth()-1,1);
    const isTwoMonth = currentData.end_tgl.getMonth() - currentData.start_tgl.getMonth();
    const dateNext = new Date(currentData.start_tgl.getFullYear(), currentData.start_tgl.getMonth()+1,1);
console.log("wrap", {
    start: currentData.start_tgl,
    end: currentData.end_tgl,
});
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-linear-to-tl from-sky-400 to-sky-300">
            <div className="md:flex hidden border rounded justify-between items-center md:flex-col px-2 py-3">
                {
                    currentData.start_tgl.getMonth()===6?(
                        <div className="flex h-full w-full justify-center items-center">
                            Tahun Pelajaran Sebelumnya
                        </div>
                    ):(
                        <>
                            <PreviewKaldikModal date={dateBefore}/>
                            <FieldKeteranganKaldikNonSetting date={dateBefore}/>
                        </>
                    )
                }
            </div>
            <div className="flex border rounded h-full justify-between items-center flex-col px-1 py-3">
                <PreviewKaldikModal date={currentData?.start_tgl ?? new Date()}/>
                <FieldKeteranganKaldik date={currentData?.start_tgl ?? new Date()}/>
            </div>
            <div className="flex border rounded h-full justify-between items-stretch flex-col px-2 py-3">
                {
                    isTwoMonth?(
                        <>
                            <PreviewKaldikModal date={currentData.end_tgl}/>
                            <FieldKeteranganKaldik date={currentData.end_tgl}/>
                        </>
                    ):(
                        <>
                            <PreviewKaldikModal date={dateNext}/>
                            <FieldKeteranganKaldikNonSetting date={dateNext}/>
                        </>
                    )
                }
            </div>        
        </div>
    )
}