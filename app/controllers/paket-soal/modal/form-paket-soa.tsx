import { FormEdura } from "~/components/form-custom/form-edura";
import type { InitialItemSoalImplemented } from "./initial-item-soal-implemented";
import type { ModalState } from "~/components/modals/modal-provider";
import SidebarKurikulumControl from "./components/sidebar-kurikulum-control";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import { Button } from "~/components/ui/button";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import type { ReactNode } from "react";

export default function FormPaketSoal({state, children}:{state:ModalState<InitialItemSoalImplemented>, children:ReactNode}){
    const {currentItemSoal, curriculumProvider, triggerUpsert, paketSoalHasIplemented} = state.payload!
    
    return (
        <FormEdura data={state.payload}>
            {
                children
            }
        </FormEdura>
    )
}