import { FormEdura } from "~/components/form-custom/form-edura"
import { ModalFooterEdura } from "~/components/modals/modal-components"
import type { ModalState } from "~/components/modals/modal-provider"
import type { TabunganAppType } from "~/types/tabungan/tabungan-app-type"
import ModalFieldTabungan from "./fieldset/modal-field-tabungan"
import ModalFieldHapusTabungan from "./fieldset/modal-field-hapus-tabungan"
import ButtonDeleteTabungan from "../crud/button-delete-tabungan"
import ButtonUpdateTabungan from "../crud/button-update-tabungan"
import PreviewSnapshot from "./previews/preview-snapshot"
import WrapperSnapshot from "./previews/wrapper-snapshot-single"

export default function FormTabungan({state}:{
    state:ModalState
}){

    return (
        <FormEdura<TabunganAppType> data={state.payload as TabunganAppType}>
            {state.type === 'EDIT' && <ModalFieldTabungan stateModal={state}/>}
            {state.type === 'HAPUS' && <ModalFieldHapusTabungan state={state}/>}
            {state.type === 'INFO' && <WrapperSnapshot><PreviewSnapshot/></WrapperSnapshot>}
            <ModalFooterEdura>
            {state.type === 'HAPUS' && <ButtonDeleteTabungan/>}
            {state.type === 'EDIT' && <ButtonUpdateTabungan/>}
                
            </ModalFooterEdura>
        </FormEdura>
    )
}