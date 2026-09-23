import { Eye, FileCheckCornerIcon, FileCog2, FileKeyIcon, FileQuestionMark, GalleryVertical, PencilIcon, Settings, Settings2, Trash, Wrench } from "lucide-react";
import { useMemo } from "react";
import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import type { SwitchTriggerModalProps } from "~/controllers/surat/modals/trigers/trigger-modal-props";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";

export default function TriggerEditTagihan({actions,data: m}:SwitchTriggerModalProps<TagihanHasDataResponse>){
    
    const actionTrigger= useMemo<TriggerTable<TagihanHasDataResponse>[]>(()=>{
        if(m.source === 'Non Paket Soal'){
            return [
                 {
                    label: 'Edit Publikasi',
                    icon: Settings,
                    callback: (m) => actions.open('EDIT PUBLIKASI NON PAKET SOAL', m,{closeOnOutsideClick:false})//actions.open('EDIT', m,{closeOnOutsideClick:false})
                },
                {
                    label: 'Kompetensi yang Diukur',
                    icon: FileCog2,
                    callback: (m) => actions.open('PREVIEW SEBARAN KOMPETENSI NON PAKET SOAL', m,{closeOnOutsideClick:false})
                },
                {
                    label: 'Hapus',
                    icon: Trash,
                    callback: (m) => actions.open('HAPUS', m,{closeOnOutsideClick:false})
                },
            ]
        }

        return [
                
                {
                    label: 'Edit Publikasi',
                    icon: Settings,
                    callback: (m) => actions.open('EDIT PUBLIKASI PAKET SOAL', m,{closeOnOutsideClick:false})
                },
                {
                    label: 'Preview soal',
                    icon: FileQuestionMark,
                    callback: (m) => actions.open('PREVIEW PAKET SOAL', m,{closeOnOutsideClick:false})
                },
                {
                    label: 'Kisi-kisi soal versi 1',
                    icon: FileCheckCornerIcon,
                    callback: (m) => actions.open('PREVIEW KISI-KISI SERVER', m,{closeOnOutsideClick:false})
                },
                
                {
                    label: 'Kisi-kisi soal versi 2',
                    icon: FileCheckCornerIcon,
                    callback: (m) => actions.open('PREVIEW KISI-KISI DAN SOALNYA SERVER', m,{closeOnOutsideClick:false})
                },
                
                {
                    label: 'Kunci Jawaban dan Pembahasan',
                    icon: FileKeyIcon,
                    callback: (m) => actions.open('PREVIEW KUNCI JAWABAN SERVER', m,{closeOnOutsideClick:false})
                },
                
                {
                    label: 'Kompetensi yang Diukur',
                    icon: FileCog2,
                    callback: (m) => actions.open('PREVIEW SEBARAN KOMPETENSI SERVER', m,{closeOnOutsideClick:false})
                },
                {
                    label: 'Hapus',
                    icon: Trash,
                    callback: (m) => actions.open('HAPUS', m,{closeOnOutsideClick:false})
                },
            ]
    }, [actions]);
    
    return (
        <ActionButtonTable<TagihanHasDataResponse>
            data={m}
            trigger={actionTrigger}
            className="text-[10px] [&>svg]:h-3"
            labelButton="Instrumen"
            IconButton={Wrench}
            tooltipMessage="Kumpulan Aksi Instrumen Tagihan Penilaian"
            
        />
    )
}
        
