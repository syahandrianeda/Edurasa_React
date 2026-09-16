import { useFormEdura } from "~/components/form-custom/form-edura";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { type PublikasiPaketAppType, type PublikasiPaketAppValidWithPaketSoal } from "~/types/bank-soal/entities/publikasi-paket-app-type";
import WrapperContent from "./wrapper-content";
import TableInfoPublikasiPaket from "./table-info-publikasi";

export default function InfoPublikasiPaketSoal(){
    const {currentData} = useFormEdura<PublikasiPaketAppValidWithPaketSoal>();
    return (
        <>
            <WrapperContent className="w-2/3 flex flex-col md:justify-center md:items-center">
                <TableInfoPublikasiPaket currentData={currentData}/>
            </WrapperContent>
            {/* <ModalFooterEdura>
                {null}
            </ModalFooterEdura> */}
        </>
    )
}