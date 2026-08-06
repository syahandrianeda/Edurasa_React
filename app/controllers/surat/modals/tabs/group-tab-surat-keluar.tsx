import FieldSuratMasukKolomSatu from "../fieldset/surat-masuk-kolom-satu";
import KolomDuaSamainSuratKeluar from "../fieldset/perihal-tujuan-surat"
import SppdResumePreviewBySuratMasuk from "../templates/sppd-resume-by-surat-masuk";
import { useModal } from "~/components/modals/modal-provider";
import type { SuratMasukAppType } from "~/types/surat/surat-masuk-app-type";

export default function GroupTabSuratKeluar(){
    const {state} = useModal<SuratMasukAppType>();
    const data = state.payload;
    return (
        <div className="grid grid-cols-1 gap-2 p-4 h-[calc(100vh-12.5rem)]">
            {data?.indekssurat === 'SPPD' && <SppdResumePreviewBySuratMasuk/>}
        </div>
    )
}