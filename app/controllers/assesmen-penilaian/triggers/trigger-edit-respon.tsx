import { BookOpenCheckIcon, Eye, FileChartColumnIncreasing, GalleryVertical, ImportIcon, InfoIcon, PencilIcon, Trash, UserCheck2 } from "lucide-react";
import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import type { SwitchTriggerModalProps } from "~/controllers/surat/modals/trigers/trigger-modal-props";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";

export default function TriggerEditRespon({actions,data: m}:SwitchTriggerModalProps<TagihanHasDataResponse>){
    
    const ActionTrigger: TriggerTable<TagihanHasDataResponse>[] = [
            
            {
                label: 'Info Seluruh Respon',
                icon: InfoIcon,
                callback: (m) => actions.open('INFO RESPON TAGIHAN', m,{closeOnOutsideClick:false})
            },
            {
                label: 'Koreksi Soal',
                icon: BookOpenCheckIcon,
                callback: (m) => actions.open('KOREKSI SOAL', m,{closeOnOutsideClick:false})
            },
            {
                label: 'Import Nilai',
                icon: ImportIcon,
                callback: (m) => actions.open('IMPORT NILAI', m,{closeOnOutsideClick:false})
            },
            {
                label: 'Analisis Soal',
                icon: FileChartColumnIncreasing,
                callback: (m) => actions.open('ANALLISIS SOAL', m,{closeOnOutsideClick:false})
            },
        ];
    
    return (
        <ActionButtonTable<TagihanHasDataResponse>
            data={m}
            trigger={ActionTrigger}
            className="text-[10px] [&>svg]:h-3"
            labelButton="Response"
            IconButton={UserCheck2}
            tooltipMessage="Aksi seluruh respon dan inputan data nilai"
            
        />
    )
}
        
