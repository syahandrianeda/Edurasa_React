import { ModalEdura} from "~/components/modals/modal-components";
import { useModal } from "~/components/modals/modal-provider";
import { titleModal } from "./title-modal";
import type { SppdAppType } from "~/types/surat/sppd-app-type";
import SwitchFormTemplate from "./templates/switch-next-modal-form";

export default function NextModalSurat(){
    const { state, actions, nextState } = useModal<SppdAppType>();
    const open = state.isOpen && [
        'EDIT-CUSTOM',
        'EDIT SPPD',
        'EDIT JUMLAH HARI',
        'EDIT TEMPAT SPPD',
        'HAPUS SUKET ITEM SISWA',
        'EDIT SUKET ITEM SISWA'
    ].includes(state?.type!);

    
    return (
        <ModalEdura 
            state={{
                ...state,
                isOpen: open
            }}
            
            actions={actions} 
            // className="min-w-10/12 gap-0 overflow-x-auto"
            className="md:min-w-9/12 md:h-[calc(100vh-4.5rem)] gap-0 overflow-x-auto"
            title={()=>titleModal(state)}
        >
            <SwitchFormTemplate state={state}/>
            
        </ModalEdura>
    )
}

