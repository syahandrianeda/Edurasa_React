import { Info, PencilIcon } from "lucide-react";
import { useMemo } from "react";
import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { useModal } from "~/components/modals/modal-provider";
import type { HeadingTableType, KeyModelTable } from "~/components/tabels/table-interface";
import TableWithScrolling, { HeadingTableEduraWithSort } from "~/components/tabels/table-with-scrolling";
import { formatTanggalIndonesia } from "~/lib/date-helper";
import { getGenderLabel } from "~/types/enums/gender";
import type { SiswaType } from "~/types/siswa";

const HeadingTable:HeadingTableType<SiswaType>[]=[
    {
        columns:[
            {
                label: 'Aksi',
                className:'print:hidden'
            },
            {
                label: 'No',
            },
            {
                label: 'Status',
            },
            {
                label: 'Kelas Terakhir',
                className: 'text-wrap',
            },
            {
                label: 'NIS',
                key:'nis',
                sortable:true,
                sortResolver: (row) => Number(String(row.nis).slice(-3))//
            },
            {
                label: 'NISN',
                key:'nisn',
                sortable:true,
            },
            {
                label: 'Nama Siswa',
                key:'pd_nama',
                sortable:true,
            },
            {
                label: 'Gender',
                key:'pd_agama',
                sortable:true,
            },
            {
                label: 'Masuk Tanggal',
                className: 'text-wrap',
                key:'masuk_tgl',
                sortable:true,
            },
            {
                label: 'Keluar Tanggal',
                className: 'text-wrap',
                key:'keluar_tgl',
                sortable:true,
            }
        ]
    },
];
const RefrenceKeyTable : KeyModelTable<SiswaType>[] = [
    
    // {
    //     type: 'actions',
    //     render: (row) => <ActionButtonTable<SiswaType> data={row} trigger={ActionTrigger}/>,
    //     className:'print:hidden'
    // },
    {
        type: 'index',
        className: 'text-center'
    },
    {
        type: 'field',
        render: (row) => row.aktif,
        className: 'text-center'
    },
    {
        type: 'field',
        render: (row) => row.aktif === 'aktif'?row.nama_rombel: row.kelas_keluar,
        className: 'text-center'
    },
    {
        type: 'field',
        render: (row) =>    row.nis,
        className: 'text-center'
    },
    
    {
        type: 'field',
        render: (row) => row.nisn,
        className: 'text-center'
    },
    {
        type: 'field',
        render: (row) => row.pd_nama
    },
    {
        type: 'field',
        render: (row) => getGenderLabel(row.pd_jk) ?? row.pd_jk,
    },
    {
        type: 'field',
        render: (row) => formatTanggalIndonesia(row.masuk_tgl,{dateStyle:'long'})
    },
    {
        type: 'field',
        render: (row) => formatTanggalIndonesia(row.keluar_tgl,{dateStyle:'long'})
    },

]

export function TablePencarianSiswa({data}:{data:SiswaType[]}){
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
    const tableKeys = useMemo<KeyModelTable<SiswaType>[]>(() => [
            {
                type: 'actions',
                render: (row) => (
                    <ActionButtonTable<SiswaType>
                        data={row}
                        trigger={ActionTrigger}
                    />
                ),
                className: 'print:hidden',
            },
            ...RefrenceKeyTable,
        ], [ActionTrigger])
        // saya ingin memasukkan 'act' ke dalam RefrenceKeyTable dengan menempati urutan pertama
    return (
        <TableWithScrolling>
            <HeadingTableEduraWithSort<SiswaType> dataHead={HeadingTable} data={data} dataKey={tableKeys}/>
        </TableWithScrolling>
    )
}