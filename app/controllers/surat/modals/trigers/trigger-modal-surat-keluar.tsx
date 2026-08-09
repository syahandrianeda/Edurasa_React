import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { Info, PencilIcon, Printer, Trash } from "lucide-react";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import type { SwitchTriggerModalProps } from "./trigger-modal-props";

export default function SwitchTriggerModalSuratKeluar({actions,data: m}:SwitchTriggerModalProps<DataOrmSuratKeluarType>){
    const ActionTriggerHasTemplate: TriggerTable<DataOrmSuratKeluarType>[] = [
            {
                label: 'Info',
                icon: Info,
                callback: (m) => actions.open('INFO', m,{closeOnOutsideClick:false})
            },{
                label: 'Edit Srt Keluar',
                icon: PencilIcon,
                callback: (m) => actions.open('EDIT', m,{closeOnOutsideClick:false})
            },
            {
                label: 'Pracetak' ,//+ m.dataTemplate?.name,
                icon: Printer,
                callback: (m) => actions.open('INFO', m,{closeOnOutsideClick:false})
            },
            {
                label: 'Hapus',
                icon: Trash,
                callback: (m) => actions.open('HAPUS', m,{closeOnOutsideClick:false})
            },
        ];
    if(m.hasTemplate){
        return (
        <ActionButtonTable<DataOrmSuratKeluarType>
            data={m}
            trigger={ActionTriggerHasTemplate}
        />
    )
    }
    const actionTrigger = ActionTriggerHasTemplate.filter(s=>s.label !=='Pracetak')
    
    return (
        <ActionButtonTable<DataOrmSuratKeluarType>
            data={m}
            trigger={actionTrigger}
        />
    )
}
        