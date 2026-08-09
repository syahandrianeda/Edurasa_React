import type { ModalActions } from "~/components/modals/modal-provider";

export interface SwitchTriggerModalProps<T>{
    actions:ModalActions,
    data:T//DataOrmSuratKeluarType
}