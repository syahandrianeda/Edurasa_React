import { Info, PencilIcon } from "lucide-react";
import { useMemo } from "react";
import {  ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { useModal } from "~/components/modals/modal-provider";
import type { HeadingTableType, KeyModelTable } from "~/components/tabels/table-interface";
import TableWithScrolling, { HeadingTableEduraWithSort } from "~/components/tabels/table-with-scrolling";
import {  getAgamaLabel } from "~/types/enums/agama";
import {  getGenderLabel } from "~/types/enums/gender";
import type { SiswaType } from "~/types/siswa";



const HeadingTable:HeadingTableType<SiswaType>[]=[
    {
        columns:[
            {
                label: 'Aksi',
                rowSpan:2,
                className:'print:hidden'
            },
            {
                label: 'Nomor',
                colSpan:5
            },
            {
                label: 'Nama',
                rowSpan:2,
                key: 'pd_nama',
                sortable:true
            },
            {
                label: 'Jenis Kelamin',
                rowSpan:2
            },
            {
                label: 'Agama',
                rowSpan:2,
                key: 'pd_agama',
                sortable:true
            },
            {
                label: 'Tempat, Tanggal Lahir',
                colSpan:2
            },
           
        ]
    },
    {
        columns:[
            {
                label: 'urut',
            },
            {
                label: 'ID/Token',
                key: 'id',
                sortable:true
            },
            {
                label: 'NIS',
                key:'nis',
                sortable:true,
                sortResolver: (row) => Number(String(row.nis).slice(-3))
            },
            {
                label: 'N I S N',
                key:'nisn',
                sortable:true
            },
            {
                label: 'NIK',
                key: 'nik',
                sortable:true
            },
            {
                label: 'Tempat',
            },
            {
                label: 'Tanggal Lahir',
            },
        ]
    },
];
const RefrenceKeyTable : KeyModelTable<SiswaType>[] = [
    {
        type: 'index',
        className: 'text-center'
    },
    {
        type: 'field',
        render: (row) => row.id,
        className: 'text-center',
        key: 'id'
    },
    {
        type: 'field',
        render: (row) => row.nis,
        key: 'nis'
    },
    {
        type: 'field',
        render: (row) => row.nisn,
        key: 'nisn'
    },
    {
        type: 'field',
        render: (row) => row.nik,
        key: 'nik'
    },
    {
        type: 'field',
        render: (row) => row.pd_nama,
        key: 'pd_nama'
    },
    
    {
        type: 'field',
        render: (row) => getGenderLabel(row.pd_jk) ?? row.pd_jk,// GenderMeta[row.pd_jk].label,
        key: 'pd_jk'
    },
    {
        type: 'field',
        render: (row) => getAgamaLabel(row.pd_agama),//AgamaMeta[row.pd_agama].label
        key: 'pd_agama'
    },
    {
        type: 'field',
        render: (row) => row.pd_tl,
        key: 'pd_tl'
    },
    {
        type: 'field',
        render: (row) => new Date(row.pd_tanggallahir).toLocaleString('id-ID',{dateStyle:'long'}),
        key: 'pd_tanggallahir'
    },

]

export function TableSiswaRombel({data}:{data:SiswaType[]}){
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