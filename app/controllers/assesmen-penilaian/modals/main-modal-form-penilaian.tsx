import type { ReactNode } from "react";
import { FormEdura } from "~/components/form-custom/form-edura";
import type { ModalState } from "~/components/modals/modal-provider";

export default function MainModalForm<T>({data, children}:{data:T, children:ReactNode}){
    
    return (
        <FormEdura data={data}>
            {
                children
            }
        </FormEdura>
    )
}