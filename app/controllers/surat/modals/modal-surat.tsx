import { ModalEdura } from "~/components/modals/modal-components";
import { useModal } from "~/components/modals/modal-provider";
import { titleModal } from "./title-modal";
import SwitchFieldsetModalSurat from "./switch-fieldset-modal";

export default function ModalSurat(){
    const { state, actions } = useModal();
    const open = state.isOpen && [
        'INFO', 'EDIT', 'HAPUS',
        'INFO SURAT MASUK', 'EDIT SURAT MASUK', 'HAPUS SURAT MASUK',
    ].includes(state?.type!);
        // state.type === "EDIT KEUANGAN"

    return (
        <ModalEdura 
            // state={state} 
            state={{
                ...state,
                isOpen: open
            }}
            
            actions={actions} 
            className="md:min-w-9/12 md:h-[calc(100vh-4.5rem)] gap-0 overflow-x-auto"
            title={()=>titleModal(state)}
        >
            <SwitchFieldsetModalSurat/>
        </ModalEdura>
    )
}

