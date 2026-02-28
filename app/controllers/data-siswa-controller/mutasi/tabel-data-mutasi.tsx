import { Info, PencilIcon } from "lucide-react";
import { useMemo } from "react";
import {  ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { useModal } from "~/components/modals/modal-provider";
import type { HeadingTableType, KeyModelTable } from "~/components/tabels/table-interface";
import TableWithScrolling, { HeadingTableEduraWithSort } from "~/components/tabels/table-with-scrolling";
import { useAppSelector } from "~/context-reduct/hook";
import { selectAllSiswaDTO } from "~/context-reduct/selectores/data-siswa-aktif";
import { StatistikPerRombel } from "~/domain/kesiswaan/kesiswaan-statistik";
import { getParseDateYYYYMMMDD } from "~/lib/date-helper";
import { getGenderLabel } from "~/types/enums/gender";
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
                label: 'Kelas Terakhir',
                rowSpan:2,
                key: 'nama_rombel',
                sortable:true ,
                className: 'text-wrap'
            },
            {
                label: 'Tanggal Diterima',
                rowSpan:2,
                key: 'pd_agama',
                sortable:true,
                className: 'text-wrap'
            },
            {
                label: 'Asal Sekolah',
                rowSpan:2,
                key: 'pd_agama',
                sortable:true,
                className: 'text-wrap'
            },
            {
                label: 'Diterima di Kelas',
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
        render: (row) => row.kelas_keluar ===""? row.nama_rombel : row.kelas_keluar,
        className:'text-center'
    },
    {
        type: 'field',
        render: (row) => row.masuk_tgl?.toLocaleDateString('id-ID', {dateStyle:'long'}),
        className: 'text-center'
    },
    {
        type: 'field',
        render: (row) => row.dapo_sekolahasal === ""?`${row.masuk_dari}`:row.dapo_sekolahasal
    },
    {
        type: 'field',
        render: (row) => row.awal_kelas
    },

]

export function TableMutasiMasuk({ year }: { year: number }) {
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
            // key: 'act',
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
            <Body tableKeys={tableKeys} tahun={year} />
        </TableWithScrolling>
    );
}
function Body({
  tableKeys,
  tahun,
}: {
  tableKeys: KeyModelTable<SiswaType>[];
  tahun: number;
}) {
  const siswaktifRombel = useAppSelector(selectAllSiswaDTO );

  const data = useMemo(() => {
    if (!tahun) return siswaktifRombel;
    const tglMasukStart = new Date(tahun, 6, 1);
    const tglMasukEnd = new Date(tahun+1, 5, 30);
    console.log('tahun masuk', tahun, tglMasukStart, tglMasukEnd);
    const start = getParseDateYYYYMMMDD(tglMasukStart);
    const end = getParseDateYYYYMMMDD(tglMasukEnd);
    return siswaktifRombel.filter((siswa) => {
        const d = new Date(siswa.masuk_tgl);
        const yDd = getParseDateYYYYMMMDD(d);
        return start<=yDd && end >=yDd;
        // const d = new Date(siswa.masuk_tgl);
        // const y = d.getFullYear();
        // const m = d.getMonth() + 1;
        // const day = d.getDate();

        // return (
        //         (y > tahun || (y === tahun && (m > 7 || (m === 7 && day >= 1)))) &&
        //         (y < tahun + 1 || (y === tahun + 1 && (m < 6 || (m === 6 && day <= 30))))
        //     );
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
