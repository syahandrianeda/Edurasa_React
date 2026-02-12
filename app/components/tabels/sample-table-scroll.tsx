import type { SiswaType } from "~/types/siswa";
import type { HeadingTableType, KeyModelTable } from "./table-interface";
import {  GenderMeta } from "~/types/enums/gender";
import TableWithScrolling, { BodyTableEdura, HeadingTableEdura } from "./table-with-scrolling";
import { AgamaMeta } from "~/types/enums/agama";

const HeadingTable:HeadingTableType<SiswaType>[]=[
    {
        columns:[
            {
                label: 'Nomor',
                colSpan:5
            },
            {
                label: 'Nama',
                rowSpan:2
            },
            {
                label: 'Jenis Kelamin',
                rowSpan:2
            },
            {
                label: 'Agama',
                rowSpan:2
            },
            {
                label: 'Tempat, Tanggal Lahir',
                colSpan:2
            },
            {
                label: 'Aksi',
                rowSpan:2
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
            },
            {
                label: 'NIS',
            },
            {
                label: 'N I S N',
            },
            {
                label: 'NIK',
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

const RefrenceKeyTable:KeyModelTable<SiswaType>[] = [
    {
        type: 'index',
        className: 'text-center'
    },
    {
        type: 'field',
        render: (row) => row.id
    },
    {
        type: 'field',
        render: (row) => row.nis
    },
    {
        type: 'field',
        render: (row) => row.nisn
    },
    {
       type: 'field',
        render: (row) => row.nik
    },
    {
        type: 'field',
        render: (row) => row.pd_nama
    },
    {
        type: 'field',
        render: (row) => AgamaMeta[row.pd_agama].label
    },
    
    {
        type: 'field',
        render: (row) => GenderMeta[row.pd_jk].label
    },
    {
        type: 'field',
        render: (row) => row.pd_tl
    },
    {
        type: 'field',
        render: (row) => new Date(row.pd_tanggallahir).toLocaleString('id-ID',{dateStyle:'long'})
    },
    {
        type: 'actions',
        // render: (row) => 'aks'
    }

]

export function TableTestSiswa<T>({data}:{data:T[]}){
    return (
        <TableWithScrolling>
            <HeadingTableEdura dataHead={HeadingTable}/>
            <BodyTableEdura<SiswaType> data={data as SiswaType[]} dataKey={RefrenceKeyTable}/>
        </TableWithScrolling>
    )
}