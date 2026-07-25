import { FormEdura } from "~/components/form-custom/form-edura"
import { ModalFooterEdura } from "~/components/modals/modal-components"
import type { ModalState } from "~/components/modals/modal-provider"
import type { KeuanganAppType } from "~/types/tabungan/keuangan-app-type"

export default function FormKeuangan({state}:{
    state:ModalState
}){

    return (
        <FormEdura<KeuanganAppType> data={state.payload as KeuanganAppType}>
            
            <ModalFooterEdura>
                Footer
            </ModalFooterEdura>
        </FormEdura>
    )
}