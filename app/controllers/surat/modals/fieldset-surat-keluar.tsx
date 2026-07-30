import { FormEdura } from "~/components/form-custom/form-edura";
import type { ModalState } from "~/components/modals/modal-provider";
import FieldsetNoSurat from "./fieldset/define-no-surat";
import FieldsetTujuanDanLampiranSurat from './fieldset/perihal-tujuan-surat';
import FieldsetLampiranFileCetak from './fieldset/unggahan-file-cetak';
import { ModalFooterEdura } from "~/components/modals/modal-components";
import ButtonUpdateSuratKeluar from "../crud/button-update-surat-keluar";


export default function FormSuratKeluar<SuratKeluarSheetType>({state}:{state:ModalState<SuratKeluarSheetType>}){
    
    return (
        <FormEdura<SuratKeluarSheetType> data={state.payload as unknown as SuratKeluarSheetType}>
            <div className="grid grid-cols-1 gap-2 space-x-1 md:grid-cols-3 bg-linear-to-tl from-sky-600 to-sky-500 p-2  h-[calc(100vh-12.5rem)]  md:overflow-y-auto scrol-h-custom">
                <FieldsetNoSurat/>
                <FieldsetTujuanDanLampiranSurat/>
                <FieldsetLampiranFileCetak/>
            </div>
            <ModalFooterEdura>
                <ButtonUpdateSuratKeluar/>
            </ModalFooterEdura>
        </FormEdura>
                
    )
}