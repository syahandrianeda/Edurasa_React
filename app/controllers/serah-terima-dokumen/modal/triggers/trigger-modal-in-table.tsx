import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { Eye, Info, PencilIcon,Trash } from "lucide-react";

import type { SwitchTriggerModalProps } from "~/controllers/surat/modals/trigers/trigger-modal-props";
import type { SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";


export default function SwitchTriggerModalSerahTerimaDokumen({actions,data: m}:SwitchTriggerModalProps<SerahTerimaDokumenAppType>){
    const ActionTrigger: TriggerTable<SerahTerimaDokumenAppType>[] = [
            {
                label: 'Info',
                icon: Info,
                callback: (m) => actions.open('INFO', m,{closeOnOutsideClick:false})
            },
            {
                label: 'Edit',
                icon: PencilIcon,
                callback: (m) => actions.open('EDIT', m,{closeOnOutsideClick:false})
            },{
                label: 'Preview',
                icon: Eye,
                callback: (m) => actions.open('PRINT DAFTAR SERAH TERIMA', m,{closeOnOutsideClick:false})
            },
            {
                label: 'Hapus',
                icon: Trash,
                callback: (m) => actions.open('HAPUS', m,{closeOnOutsideClick:false})
            },
        ];
    
    return (
        <ActionButtonTable<SerahTerimaDokumenAppType>
            data={m}
            trigger={ActionTrigger}
        />
    )
}
        