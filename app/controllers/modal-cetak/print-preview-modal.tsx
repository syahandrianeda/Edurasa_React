import { ModalEdura, ModalFooterEdura } from "~/components/modals/modal-components";
import { useModal } from "~/components/modals/modal-provider";
import type { SuratKeluarSheetType } from "~/types/surat/surat-keluar-sheet-type";


export default function ModalPraCetak<T>(){
    const { state, actions, nextState } = useModal<T>();
    const open = state.isOpen && state.type === "PRINT PREVIEW";
    const typeBack = nextState 
    const typePayload = typeof state.payload;

    return (
        <ModalEdura 
            // state={state} 
            state={{
                ...state,
                isOpen: open
            }}
            
            actions={actions} 
            className="sm:min-w-5xl  md:min-w-2xl lg:min-w-5xl gap-0 overflow-x-auto"
            title={()=>"Pracetak"}
        >
            {typePayload}
            <ModalFooterEdura>
                <button type="button" onClick={()=>!typeBack ? actions.close():actions.open(typeBack)}>Kembali</button>
            </ModalFooterEdura>
        </ModalEdura>
    )
}

