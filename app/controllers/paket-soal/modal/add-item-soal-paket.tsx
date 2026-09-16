import { FormEdura } from "~/components/form-custom/form-edura";
import type { InitialItemSoalImplemented } from "./initial-item-soal-implemented";
import { useModal, type ModalState } from "~/components/modals/modal-provider";
import SidebarKurikulumControl from "./components/sidebar-kurikulum-control";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import { Button } from "~/components/ui/button";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";

export default function AddItemSoalPaketModal({state}:{state:ModalState<InitialItemSoalImplemented>}){
    // const {currentItemSoal, curriculumProvider, triggerUpsert, paketSoalHasIplemented} = state.payload
    
    return (
        <FormEdura data={state.payload?.currentItemSoal}>
            <SidebarKurikulumControl 
                data={state.payload?.curriculumProvider ??[]} 
                triggerUpsert={state.payload?.triggerUpsert!} 
                koleksiSoalHasImplemented={state.payload?.paketSoalHasIplemented ?? []}/>
            
        </FormEdura>
    )
}