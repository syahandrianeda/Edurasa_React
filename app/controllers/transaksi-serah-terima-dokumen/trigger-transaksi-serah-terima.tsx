import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { PencilIcon } from "lucide-react";
import type { SwitchTriggerModalProps } from "~/controllers/surat/modals/trigers/trigger-modal-props";
import type { TransaksiEventType } from "~/domain/serah-terima/entities/transaksi-event-type";

export default function SwitchTriggerModalTransaksiSerahTerimaDokumen({actions,data: m}:SwitchTriggerModalProps<TransaksiEventType>){
    
    const ActionTrigger: TriggerTable<TransaksiEventType>[] = [
            
            {
                label: 'Transaksi',
                icon: PencilIcon,
                callback: (m) => actions.open('EDIT TRANSAKSI SERAH TERIMA', m,{closeOnOutsideClick:false})
            },
        ];
    
    return (
        <ActionButtonTable<TransaksiEventType>
            data={m}
            trigger={ActionTrigger}
        />
    )
}
        