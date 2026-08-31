import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { Eye, PencilIcon, Trash } from "lucide-react";
import type { SwitchTriggerModalProps } from "~/controllers/surat/modals/trigers/trigger-modal-props";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";

export default function SwitchTriggerModalEditItemBankSoal({actions,data: m}:SwitchTriggerModalProps<BankSoalAppType>){
    
    const ActionTrigger: TriggerTable<BankSoalAppType>[] = [
            
            {
                label: 'Edit',
                icon: PencilIcon,
                callback: (m) => actions.open('EDIT', m,{closeOnOutsideClick:false})
            },
            {
                label: 'Preview',
                icon: Eye,
                callback: (m) => actions.open('PREVIEW ITEM SOAL', m,{closeOnOutsideClick:false})
            },
            {
                label: 'Hapus',
                icon: Trash,
                callback: (m) => actions.open('HAPUS', m,{closeOnOutsideClick:false})
            },
        ];
    
    return (
        <ActionButtonTable<BankSoalAppType>
            data={m}
            trigger={ActionTrigger}
        />
    )
}
        