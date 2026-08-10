import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { Info, PencilIcon, Trash } from "lucide-react";
import type { SwitchTriggerModalProps } from "~/controllers/surat/modals/trigers/trigger-modal-props";
import type { IdAkunDanPangkat } from "~/domain/tendik/entities/id-akun-dan-pangkat";


export default function SwitchTriggerModalEditAkun({actions,data: m}:SwitchTriggerModalProps<IdAkunDanPangkat>){
    
    const ActionTrigger: TriggerTable<IdAkunDanPangkat>[] = [
            {
                label: 'Info',
                icon: Info,
                callback: (m) => actions.open('INFO RIWAYAT AKUN', m,{closeOnOutsideClick:false})
            },
            // {
            //     label: 'Edit Jabatan',
            //     icon: PencilIcon,
            //     callback: (m) => actions.open('EDIT JABATAN PTK', m,{closeOnOutsideClick:false})
            // },
            {
                label: 'Edit Pangkat',
                icon: PencilIcon,
                callback: (m) => actions.open('EDIT PANGKAT PTK', m,{closeOnOutsideClick:false})
            }
        ];
    
    
    
    
    return (
        <ActionButtonTable<IdAkunDanPangkat>
            data={m}
            trigger={ActionTrigger}
        />
    )
}
        