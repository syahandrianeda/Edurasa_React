import { Info, PencilIcon } from "lucide-react";
import { useMemo } from "react";
import {  ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { useModal } from "~/components/modals/modal-provider";
import type { HeadingTableType, KeyModelTable } from "~/components/tabels/table-interface";
import TableWithScrolling, { HeadingTableEduraWithSort } from "~/components/tabels/table-with-scrolling";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { useAppSelector } from "~/context-reduct/hook";
import { selectAllSiswaDTO } from "~/context-reduct/selectores/data-siswa-aktif";
import { AgamaMeta, getAgamaLabel } from "~/types/enums/agama";
import { GenderMeta, getGenderLabel } from "~/types/enums/gender";
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
                label: 'Status',
                rowSpan:2,
                key: 'aktif',
                className:'print:hidden'
            },
            {
                label: 'Nomor',
                colSpan:3
            },
            {
                label: 'Nama',
                rowSpan:2,
                key: 'pd_nama',
                sortable:true
            },
            {
                label: 'Jenis Kelamin',
                key:'pd_jk',
                rowSpan:2
            },
            {
                label: 'Tanggal Keluar',
                rowSpan:2,
                className: 'text-wrap'
            },
            {
                label: 'Kelas Terakhir',
                rowSpan:2,
                className: 'text-wrap'
            },
            
            {
                label: 'Pindah Ke',
                rowSpan:2,
                className: 'text-wrap'
            },
            
            {
                label: 'alasan',
                rowSpan:2,
                // className: 'text-wrap'
            },
            {
                label: 'Keterangan',
                rowSpan:2,
                // className: 'text-wrap'
            },
           
        ]
    },
    {
        columns:[
            {
                label: 'urut',
            },
            {
                label: 'NIS',
                key: 'nis',
                sortable:true,
                sortResolver: (row) => Number(String(row.nis).slice(-3))
            },
            {
                label: 'N I S N',
                key: 'nisn',
                sortable:true
            },
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
        type: 'field',
        className: 'text-center print:hidden',
        render: (row)=> row.aktif,
    },
    {
        type: 'index',
        className: 'text-center'
    },
    {
        type: 'field',
        render: (row) => row.nis,
        className: 'text-center'
    },
    {
        type: 'field',
        render: (row) => row.nisn
    },
    {
        type: 'field',
        render: (row) => row.pd_nama
    },
    {
        type: 'field',
        render: (row) => getGenderLabel(row.pd_jk) ?? row.pd_jk
    },
    {
        type: 'field',
        render: (row) => row.keluar_tgl?.toLocaleDateString('id-ID', {dateStyle:'long'}),
        // className: 'text-center'
    },
    {
        type: 'field',
        render: (row) =>   row.kelas_keluar,
        className:'text-center'
    },
    {
        type: 'field',
        render: (row) => row.aktif === 'lulus'?row.smp_ke:row?.pindah_ke
    },
    {
        type: 'field',
        render: (row) => row.aktif==='lulus'?'Lulus': row.alasan_keluar
    },
    {
        type: 'field',
        render: (row) => (row.awal_kelas==""?"":"awal kelas "+ row.awal_kelas) + ' ' + (row.kelas_keluar===""?"":"kelas terakhir "+ row.nama_rombel)
    },

]

export function TableMutasiKeluar({ year }: { year: number }) {
    const { actions } = useModal<SiswaType>();

    const actionTrigger = useMemo<TriggerTable<SiswaType>[]>(() => [
        {
            label: 'Edit',
            icon: PencilIcon,
            callback: (m) =>
                actions.open('EDIT', m, { closeOnOutsideClick: false }),
        },
        {
            label: 'Info',
            icon: Info,
            callback: (m) => actions.open('INFO', m),
        },
    ], [actions]);

    const tableKeys = useMemo<KeyModelTable<SiswaType>[]>(() => [
        {
            type: 'actions',
            label: 'Aksi',
            sortable: false,
            render: (row) => (
                <ActionButtonTable<SiswaType>
                    data={row}
                    trigger={actionTrigger}
                />
            ),
            className: 'print:hidden',
        },
        ...RefrenceKeyTable,
    ], [actionTrigger, RefrenceKeyTable]);

    return (
        <TableWithScrolling>
            <BodyKeluar tableKeys={tableKeys} tahun={year} />
        </TableWithScrolling>
    );
}


function BodyKeluar({
  tableKeys,
  tahun,
}: {
  tableKeys: KeyModelTable<SiswaType>[];
  tahun: number;
}) {
  const siswaktifRombel = useAppSelector(selectAllSiswaDTO
  );

  const data = useMemo(() => {
    if (!tahun) return siswaktifRombel;

    return siswaktifRombel.filter((siswa) => {
    //   if (!siswa.keluar_tgl) return false;

      const d = new Date(siswa.keluar_tgl);
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      const day = d.getDate();

      return (
            
            (y > tahun || (y === tahun && (m > 7 || (m === 7 && day >= 1)))) &&
            (y < tahun + 1 || (y === tahun + 1 && (m < 6 || (m === 6 && day <= 30))))
        
      );
    });
  }, [siswaktifRombel, tahun]);

  return (
    <HeadingTableEduraWithSort<SiswaType>
      dataHead={HeadingTable}
      data={data}
      dataKey={tableKeys}
    />
  );
}
