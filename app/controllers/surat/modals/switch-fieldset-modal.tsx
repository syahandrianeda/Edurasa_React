import { useModal, type ModalState } from "~/components/modals/modal-provider";
import type { SuratKeluarSheetType } from "~/types/surat/surat-keluar-sheet-type";
import FormSuratKeluar from "./fieldset-surat-keluar";

export default function SwitchFieldsetModalSurat(){
    const {state, actions } = useModal<SuratKeluarSheetType>()
    const {type, payload} = state;
    switch(type){
        case "EDIT":
            return <FormSuratKeluar state={state}/>
        default:
            return <p>Test Dulu</p>
    }
}
    