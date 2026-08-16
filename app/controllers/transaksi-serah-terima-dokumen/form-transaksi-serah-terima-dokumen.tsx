import type { ReactNode } from "react";
import { FormEdura } from "~/components/form-custom/form-edura";
import { useModal } from "~/components/modals/modal-provider";
import type { TransaksiEventType } from "~/domain/serah-terima/entities/transaksi-event-type";
import { useCrudTransaksiSerahTerimaProvider } from "./crud-provider-transaksi-serah-terima";


export default function FormTransaksiSerahTerimaDokumen({children}:{children:ReactNode}){
    const {state} = useModal<TransaksiEventType>();
    const {state:statePost} = useCrudTransaksiSerahTerimaProvider();
    
    return (
        <FormEdura data={state.payload as unknown as TransaksiEventType}>
            <fieldset disabled={statePost.isSubmitting }>
                {children}
            </fieldset>
        </FormEdura>
    )
}