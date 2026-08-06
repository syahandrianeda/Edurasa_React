import { FormEdura } from "~/components/form-custom/form-edura";
import type { ModalState } from "~/components/modals/modal-provider";
import type { SppdAppType } from "~/types/surat/sppd-app-type";
import { useSppdCrudProvider } from "../../crud/sppd-crud-provider";
import type { ReactNode } from "react";

interface FormSppdProps{
    state:ModalState<SppdAppType>
    children:ReactNode
}
export default function FormSppd ({state, children}:FormSppdProps){
    const {state:crudState} = useSppdCrudProvider()
    return (
        <FormEdura<SppdAppType>  data={state.payload as SppdAppType}>
            <fieldset disabled={crudState.isSubmitting}>
                {children}
            </fieldset>
        </FormEdura>
    )
}