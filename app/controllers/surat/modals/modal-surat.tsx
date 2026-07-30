import { ModalEdura } from "~/components/modals/modal-components";
import { useModal } from "~/components/modals/modal-provider";
import type { SuratKeluarSheetType } from "~/types/surat/surat-keluar-sheet-type";
import { titleModal } from "./title-modal";
import SwitchFieldsetModalSurat from "./switch-fieldset-modal";

export default function ModalSurat(){
    const { state, actions } = useModal();
    const open = state.isOpen && ['INFO', 'EDIT', 'HAPUS'].includes(state?.type!);
        // state.type === "EDIT KEUANGAN"

    return (
        <ModalEdura 
            // state={state} 
            state={{
                ...state,
                isOpen: open
            }}
            
            actions={actions} 
            className="sm:min-w-5xl  md:min-w-2xl lg:min-w-5xl gap-0 overflow-x-auto"
            title={()=>titleModal(state)}
        >
            <SwitchFieldsetModalSurat/>
        </ModalEdura>
    )
}

