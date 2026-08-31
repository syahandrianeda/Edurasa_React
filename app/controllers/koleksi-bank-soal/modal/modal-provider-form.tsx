import type { ReactNode } from "react";
import { FormEdura } from "~/components/form-custom/form-edura";
import type { ModalState } from "~/components/modals/modal-provider";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";

export default function ModalProviderForm({state, children}:{state:ModalState<BankSoalAppType>, children:ReactNode}){
    return (
        <FormEdura data={state.payload}>
            {
                children
            }
        </FormEdura>
    )
}