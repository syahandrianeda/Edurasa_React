import { Info, PencilIcon } from "lucide-react";
import { useMemo } from "react";
import {  type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { useModal } from "~/components/modals/modal-provider";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar"
import { useAppSelector } from "~/context-reduct/hook";
import { selectAllSiswaDTO } from "~/context-reduct/selectores/data-siswa-aktif";
import { TablePencarianSiswa } from "~/controllers/data-siswa-controller/cari-siswa/tabel-pencarian-siswa";
import type { SiswaType } from "~/types/siswa";

export default function CariSiswaPage(){
    const {value} = useFilterContext();
    const siswa = useAppSelector(selectAllSiswaDTO);
    // const searchNama = value?.extra?.namaSiswa as string;
    const {actions} = useModal<SiswaType>()
    
    const ActionTrigger: TriggerTable<SiswaType>[] = [
        {
            label: 'Edit',
            icon: PencilIcon,
            callback: (m) => actions.open('EDIT', m,{closeOnOutsideClick:false})
        },
        {
            label: 'Info',
            icon: Info,
            callback: (m) => actions.open('INFO', m)
        },
    ]
    
    const data = useMemo(() => {
        const extra = value?.extra;

        // ❌ tidak ada filter sama sekali
        if (!extra) return [];

        // ❌ semua filter kosong
        const hasActiveFilter = Object.values(extra).some(v => !!v);
        if (!hasActiveFilter) return [];

        let filtered = siswa;

        Object.entries(extra).forEach(([key, keyword]) => {
            if (!keyword) return;

            filtered = filtered.filter((s) => {
                const fieldValue = s[key as keyof SiswaType];

                if (fieldValue == null) return false;

                return String(fieldValue)
                    .toLowerCase()
                    .includes(String(keyword).toLowerCase());
            });
        });

        return filtered;
    }, [siswa, value?.extra]);

    
    return (
        <div className="p-l">
            <h3 className="text-xl text-center mb-3">Pencarian Data Siswa</h3>
            <TablePencarianSiswa data={data}/>
        </div>
    )
}