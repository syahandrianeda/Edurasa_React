import { ModalEdura, ModalFooterEdura } from "~/components/modals/modal-components";
import { useModal } from "~/components/modals/modal-provider";
import type { SuratKeluarSheetType } from "~/types/surat/surat-keluar-sheet-type";
import { titleModal } from "./title-modal";

export default function NextModalSurat(){
    const { state, actions, nextState } = useModal<SuratKeluarSheetType>();
    const open = state.isOpen && ['EDIT-CUSTOM'].includes(state?.type!);
        // state.type === "EDIT KEUANGAN";
    const typeBack = nextState ?? 'INFO';
    

    return (
        <ModalEdura 
            // state={state} 
            state={{
                ...state,
                isOpen: open
            }}
            
            actions={actions} 
            className="sm:min-w-5xl  md:min-w-2xl lg:min-w-5xl gap-0 overflow-x-auto"
            title={()=>"Next Modal"}
        >
            {typeBack}
            <ModalFooterEdura>
                <button onClick={()=>actions.open(typeBack)}>Kembali</button>
            </ModalFooterEdura>
        </ModalEdura>
    )
}

