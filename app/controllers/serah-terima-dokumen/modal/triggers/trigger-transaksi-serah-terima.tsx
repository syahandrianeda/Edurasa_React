import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { Eye, Info, PencilIcon,Trash } from "lucide-react";

import type { SwitchTriggerModalProps } from "~/controllers/surat/modals/trigers/trigger-modal-props";
import type { InfoPersonalSiswa } from "~/types/siswa";
import type { InfoPersonalPtk } from "~/types/akun-sheet";

export default function SwitchTriggerModalTransaksiSerahTerimaDokumen({actions,data: m}:SwitchTriggerModalProps<InfoPersonalSiswa | InfoPersonalPtk>){
    const ActionTrigger: TriggerTable<InfoPersonalSiswa|InfoPersonalPtk>[] = [
            
            {
                label: 'Edit',
                icon: PencilIcon,
                callback: (m) => actions.open('EDIT', m,{closeOnOutsideClick:false})
            },
            {
                label: 'Hapus',
                icon: Trash,
                callback: (m) => actions.open('HAPUS', m,{closeOnOutsideClick:false})
            },
        ];
    
    return (
        <ActionButtonTable<InfoPersonalSiswa | InfoPersonalPtk>
            data={m}
            trigger={ActionTrigger}
        />
    )
}
        