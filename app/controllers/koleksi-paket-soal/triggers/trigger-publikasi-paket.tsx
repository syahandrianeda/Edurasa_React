import { InfoIcon,  PencilIcon, Trash } from "lucide-react";
import {  ActionButtonTableMini,  type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { useModal } from "~/components/modals/modal-provider";
import type {  PublikasiPaketAppValidWithPaketSoal } from "~/types/bank-soal/entities/publikasi-paket-app-type";

export default function TriggerItemPublikasi({data:m}:{data:PublikasiPaketAppValidWithPaketSoal}){
    const {actions} = useModal<PublikasiPaketAppValidWithPaketSoal>()
    const ActionTrigger: TriggerTable<PublikasiPaketAppValidWithPaketSoal>[] = [
            
            {
                label: 'Info',
                icon: InfoIcon,
                callback: (m) => actions.open('INFO PUBLIKASI PAKET SOAL', m,{closeOnOutsideClick:false})
            },
           
            {
                label: 'Edit',
                icon: PencilIcon,
                callback: (m) => actions.open('EDIT PUBLIKASI PAKET SOAL', m,{closeOnOutsideClick:false})
            },
           
            {
                label: 'Hapus',
                icon: Trash,
                callback: (m) => actions.open('HAPUS PUBLIKASI PAKET SOAL', m,{closeOnOutsideClick:false})
            },
        ];
    
    return (
        <ActionButtonTableMini<PublikasiPaketAppValidWithPaketSoal>
            data={m}
            trigger={ActionTrigger}
            // konten={<Edit className="text-green" size={10}/>}
        />
    )
}