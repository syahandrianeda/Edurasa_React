import { ModalEdura } from "~/components/modals/modal-components";
import { useModal } from "~/components/modals/modal-provider";
import { titleModal } from "./title-modal-serah-terima-dokumen";
import SwitchFieldsetSerahTerimaDokumen from "./triggers/switch-field-serah-terima-dokumen";

export default function ModalSerahTerimaDokumen(){
    const { state, actions } = useModal();

    const open = state.isOpen && [
        'INFO',
        'EDIT',
        'HAPUS',
    ].includes(state?.type!);
        

    return (
        <ModalEdura 
            state={{
                ...state,
                isOpen: open
            }}
            
            actions={actions} 
            className="md:min-w-9/12 md:h-[calc(100vh-4.5rem)] gap-0 overflow-x-auto"
            title={()=>titleModal(state)}
        >
            <SwitchFieldsetSerahTerimaDokumen/>
        </ModalEdura>
    )
}

