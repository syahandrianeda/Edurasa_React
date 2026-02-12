import { InfoIcon, PencilIcon } from "lucide-react";
import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { useModal } from "~/components/modals/modal-provider";
import type { KeyModelTable } from "~/components/tabels/table-interface";
import type { SiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif";

export function ActionTriggerEditSiswa<T>():  TriggerTable<T>[] {
    const {actions} = useModal<T>();
        
    return [
            {
            label: 'Edit',
            icon: PencilIcon,
            callback: (m) => actions?.open('EDIT', m,{closeOnOutsideClick:false})
        },
        {
            label: 'Info',
            icon: InfoIcon,
            callback: (m) => actions.open('INFO', m)
        },
        ]
}
export function ConfigActionTriggerEditSiswa<T>(ActionTrigger:  TriggerTable<T>[]):  KeyModelTable<T> {
    return {
                type: 'actions',
                render: (row) => (
                    <ActionButtonTable<T>
                        data={row}
                        trigger={ActionTrigger}
                    />
                ),
                className: 'print:hidden text-center align-middle',
            }
}

export default function DropdownCellActionEditSiswa<T>(){
    const ActionTrigger = ActionTriggerEditSiswa<T>();
    const ConfigActionTrigger = ConfigActionTriggerEditSiswa<T>(ActionTrigger);
    return ConfigActionTrigger;
}

export function ActionTriggerEditSiswaWithValidation<T extends SiswaWithValidation>():  TriggerTable<T>[] {
    const {actions} = useModal<T>();
        
    return [
            {
            label: 'Edit',
            icon: PencilIcon,
            callback: (m) => actions?.open('EDIT', m.data,{closeOnOutsideClick:false})
        },
        {
            label: 'Info',
            icon: InfoIcon,
            callback: (m) => actions.open('INFO', m.data)
        },
        ]
}
export  function DropdownCellActionEditSiswaWithValidation<T extends SiswaWithValidation>(){
    const ActionTrigger = ActionTriggerEditSiswaWithValidation<T>();
    const ConfigActionTrigger = ConfigActionTriggerEditSiswa<T>(ActionTrigger);
    return ConfigActionTrigger;
}
