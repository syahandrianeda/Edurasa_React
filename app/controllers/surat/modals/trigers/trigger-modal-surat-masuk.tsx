import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { Info, PencilIcon, Trash } from "lucide-react";
import type { SwitchTriggerModalProps } from "./trigger-modal-props";
import type { SuratMasukAppType } from "~/types/surat/surat-masuk-app-type";

export default function SwitchTriggerModalSuratMasuk({actions,data: m}:SwitchTriggerModalProps<SuratMasukAppType>){
    
    const ActionTrigger: TriggerTable<SuratMasukAppType>[] = [
            {
                label: 'Info',
                icon: Info,
                callback: (m) => actions.open('INFO SURAT MASUK', m,{closeOnOutsideClick:false})
            },{
                label: 'Edit Srt Masuk',
                icon: PencilIcon,
                callback: (m) => actions.open('EDIT SURAT MASUK', m,{closeOnOutsideClick:false})
            },
            {
                label: 'Hapus',
                icon: Trash,
                callback: (m) => actions.open('HAPUS SURAT MASUK', m,{closeOnOutsideClick:false})
            },
        ];
    
    
    
    
    return (
        <ActionButtonTable<SuratMasukAppType>
            data={m}
            trigger={ActionTrigger}
        />
    )
}
        