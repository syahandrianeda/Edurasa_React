import { BookOpenCheckIcon, Eye, FileChartColumnIncreasing, GalleryVertical, ImportIcon, InfoIcon, PencilIcon, Trash, UserCheck2 } from "lucide-react";
import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import type { SwitchTriggerModalProps } from "~/controllers/surat/modals/trigers/trigger-modal-props";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";

export default function TriggerRekapSkorKd({actions,data: m}:SwitchTriggerModalProps<TagihanHasDataResponse>){
  
    
    const ActionTrigger: TriggerTable<TagihanHasDataResponse>[] = [
            
            {
                label: 'Info Mapel di instrumen ini',
                icon: InfoIcon,
                callback: (m) => actions.open('INFO RESPON TAGIHAN', m,{closeOnOutsideClick:false})
            },
            {
                label: 'Koreksi Soal',
                icon: BookOpenCheckIcon,
                callback: (m) => actions.open('PRA KOREKSI SOAL', m,{closeOnOutsideClick:false})
            },
            {
                label: 'Import Nilai',
                icon: ImportIcon,
                callback: (m) => actions.open('IMPORT NILAI', m,{closeOnOutsideClick:false})
            },
            {
                label: 'Nilai ATP Manual',
                icon: ImportIcon,
                callback: (m) => actions.open('INPUT NILAI', m,{closeOnOutsideClick:false})
            },
        ];
    
    return (
        <ActionButtonTable<TagihanHasDataResponse>
            data={m}
            trigger={ActionTrigger}
            className="text-[8px] [&>svg]:h-2"
            // labelButton="Response"
            IconButton={PencilIcon}
            tooltipMessage="Edit Nilai/Skor"
            
        />
    )
}