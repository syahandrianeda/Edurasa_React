import { BookOpenCheckIcon, Eye, FileChartColumnIncreasing, GalleryVertical, ImportIcon, InfoIcon, PencilIcon, Trash, UserCheck2 } from "lucide-react";
import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import type { SwitchTriggerModalProps } from "~/controllers/surat/modals/trigers/trigger-modal-props";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";

export default function TriggerEditRespon({actions,data: m}:SwitchTriggerModalProps<TagihanHasDataResponse>){
    const rombel = getSessionRombel();
    const dataResponRombel = m.data_respons.filter(s=>s.rombel === rombel);
    const peserta = m.peserta.filter(s=>s.nama_rombel === rombel);
    const data_response_bySiswa = m.data_response_bySiswa.filter(s=>s.siswa.nama_rombel === rombel)

    const targetRombel = {...m, data_respons:dataResponRombel,peserta, data_response_bySiswa, target_rombel:[rombel]}
    
    const ActionTrigger: TriggerTable<TagihanHasDataResponse>[] = [
            
            {
                label: 'Info Seluruh Respon',
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
                label: 'Analisis Soal',
                icon: FileChartColumnIncreasing,
                callback: (m) => actions.open('ANALISIS SOAL', m,{closeOnOutsideClick:false})
            },
            {
                label: 'Laporan Analisis Soal',
                icon: FileChartColumnIncreasing,
                callback: (m) => actions.open('LAPORAN ANALISIS SOAL', m,{closeOnOutsideClick:false})
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
        
