import type { ReactNode } from "node_modules/@types/react"
import { FormEdura } from "~/components/form-custom/form-edura"
import type { ModalState } from "~/components/modals/modal-provider"
import type { PublikasiPaketAppType } from "~/types/bank-soal/entities/publikasi-paket-app-type"

export default function  WrapperFormPublikasiPaket ({state, children}:{state:ModalState<PublikasiPaketAppType>, children:ReactNode

}){
    return (
        <FormEdura data={state.payload}>
            {
                children
            }
        </FormEdura>
    )
}