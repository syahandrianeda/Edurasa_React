import { Eye, FileCheck, FileCheckCorner, FileKey2Icon, Key, PencilIcon, Settings, Trash } from "lucide-react";
import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { useModal } from "~/components/modals/modal-provider";
import type { PaketSoalAppWithPublikasi } from "~/types/bank-soal/entities/paket-soal-app-type";

export default function TriggerPaketSoal({data:m}:{data:PaketSoalAppWithPublikasi}){
    const {actions} = useModal<PaketSoalAppWithPublikasi>()
    const ActionTrigger: TriggerTable<PaketSoalAppWithPublikasi>[] = [
            
            {
                label: 'Edit',
                icon: PencilIcon,
                callback: (m) => actions.open('EDIT PAKET SOAL', m,{closeOnOutsideClick:false})
            },
            {
                label: 'Preview',
                icon: Eye,
                callback: (m) => actions.open('PREVIEW PAKET SOAL', m,{closeOnOutsideClick:false})
            },{
                label: 'Kisi-kisi',
                icon: FileCheck,
                callback: (m) => actions.open('PREVIEW KISI-KISI SERVER', m,{closeOnOutsideClick:false})
            },{
                label: 'Kisi-kisi dan Soal',
                icon: FileCheckCorner,
                callback: (m) => actions.open('PREVIEW KISI-KISI DAN SOALNYA SERVER', m,{closeOnOutsideClick:false})
            },
            {
                label: 'Pembahasan',
                icon: FileKey2Icon,
                callback: (m) => actions.open('PREVIEW KUNCI JAWABAN SERVER', m,{closeOnOutsideClick:false})
            },
            {
                label: 'Hapus',
                icon: Trash,
                callback: (m) => actions.open('HAPUS PAKET SOAL', m,{closeOnOutsideClick:false})
            },
        ];
    
    return (
        <ActionButtonTable<PaketSoalAppWithPublikasi>
            data={m}
            trigger={ActionTrigger}
        />
    )
}