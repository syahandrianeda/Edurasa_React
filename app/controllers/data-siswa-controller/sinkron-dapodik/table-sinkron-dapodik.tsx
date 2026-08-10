import { ForkKnifeCrossedIcon, Info, PencilIcon } from "lucide-react";
import CopyText from "~/components/copy-paste/inline-comp-clipboard";
import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { useModal } from "~/components/modals/modal-provider";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import type { HeadingTableType, KeyModelTable } from "~/components/tabels/table-interface";
import TableWithScrolling, { HeadingTableEduraWithSort } from "~/components/tabels/table-with-scrolling";
import { HeadingTableWithSortValidation } from "~/components/tabels/table-with-scrolling-validation";
import TooltipComp from "~/components/ui_edura/tooltip-comp";
import type { SiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif";
import type { DataCompareValidAppWithDapodik } from "~/domain/dapodik/sincronize-data-dapodik";
import { formatTanggalIndonesia } from "~/lib/date-helper";
import type { SiswaType } from "~/types/siswa";

export default function TableSinkronDapodik({data}:{data:DataCompareValidAppWithDapodik[]}){
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
    const HeadingTable:HeadingTableType<DataCompareValidAppWithDapodik>[] = [
        {
            columns: [
                    {
                        label: 'Data Siswa di Aplikasi',
                        colSpan:7,
                        
                    },
                    {
                        label: 'Data Siswa di Dapodik',
                        colSpan:3
                    }
                ]
        },
        {
            columns: [
                {
                    label: 'Aksi',
                    className:'print:hidden'
                },
                {
                    label: 'No'
                },
                {
                    label: 'Nama'
                },
                {
                    label: 'NISN'
                },
                {
                    label: 'Tempat Lahir'
                },
                {
                    label: 'Tanggal Lahir'
                },
                {
                    label: 'Nama Ibu Kandung'
                },
                {
                    label: 'Level Valid'
                },
                {
                    label: 'Keterangan Valid'
                },
                {
                    label: 'Data Dapodik'
                },
            ]
        }
    ];

    return (
        <TableWithScrolling>
            {/* <HeadingTableEduraWithSort dataHead={HeadingTable} data={data} dataKey={tableKeys}/> */}
            <thead>
                {
                    HeadingTable.map(({ columns }, rowIndex) => (
                        <tr key={rowIndex}>
                            {
                                columns .map((col, colIndex) => 
                                    <ThEdura
                                        key={colIndex}
                                        colSpan={col.colSpan ?? 1}
                                        rowSpan={col.rowSpan ?? 1}
                                        className={col.className ?? ''}
                                    >
                                            {col.label}
                                        
                                    </ThEdura>
                                )
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody>
                {
                    data.map(({data,validation,level,dataCompare,description},i)=>{
                        const findCompareNama = dataCompare.find(s=>s.pd_nama.toLowerCase() === data.pd_nama.toLowerCase());
                        const findCompareNISN = dataCompare.find(s=>s.nisn === data.nisn);
                        const findCompareIbu = dataCompare.find(s=>s.pd_namaibu.toLowerCase() === data.pd_namaibu.toLowerCase());
                        const findComparetl = dataCompare.find(s=>s.pd_tl.toLowerCase() === data.pd_tl.toLowerCase());
                        const findComparetgl = dataCompare.find(s=>formatTanggalIndonesia(s.pd_tanggallahir) === formatTanggalIndonesia(data.pd_tanggallahir));
                        return (
                                <TRowEdura key={i}>
                                    <TdEdura className="print:hidden">
                                        <ActionButtonTable<SiswaType>
                                            data={data}
                                            trigger={ActionTrigger}
                                        />
                                    </TdEdura>
                                    <TdEdura>{i+1}.</TdEdura>
                                    <TdEdura className={`${!findCompareNama?'text-rose-600 font-bold':'text-inherit'}`}>
                                        {
                                            findCompareNama ? (
                                                <>
                                                    {data.pd_nama}
                                                </>
                                            ):(
                                                <>
                                                    <span className="line-through">{data.pd_nama}</span>
                                                    <br/>
                                                    <span className="text-blue-600">
                                                        {dataCompare[0]?.pd_nama}
                                                    </span>
                                                </>
                                            )
                                        }
                                    </TdEdura>
                                    <TdEdura className={`${!findCompareNISN?'text-rose-600 font-bold':'text-inherit'}`}>
                                        {
                                            findCompareNISN ? (
                                                <>
                                                    {data.nisn}
                                                </>
                                            ):(
                                                <>
                                                    <span className="line-through">{data.nisn}</span>
                                                    {data.nisn===""?null:(<br/>)}
                                                    <span className="text-blue-600">
                                                            <CopyText text={dataCompare[0]?.nisn}>
                                                                <TooltipComp content="Copy NISN">
                                                                    <span>{dataCompare[0]?.nisn}</span>
                                                                </TooltipComp>
                                                            </CopyText>
                                                    </span>
                                                </>
                                            )
                                        }
                                    </TdEdura>
                                    <TdEdura>
                                        {
                                            findComparetl ? (
                                                <>
                                                    {data.pd_tl}
                                                    {data.pd_tl===""?null:(<br/>)}
                                                </>
                                            ):(
                                                <>
                                                    <span className="line-through font-bold text-red-500">{data.pd_tl}</span>
                                                    {data.pd_tl===""?null:(<br/>)}
                                                    <span className="text-blue-600 font-bold">
                                                        {
                                                            dataCompare[0]?.pd_tl
                                                        }
                                                    </span>
                                                </>
                                            )
                                        }
                                        
                                    </TdEdura>
                                    <TdEdura className="text-end">
                                        {
                                            findComparetgl ? (
                                                    formatTanggalIndonesia(data.pd_tanggallahir)

                                            ):(
                                                <>
                                                    <span className="line-through font-bold text-red-500">{formatTanggalIndonesia(data.pd_tanggallahir)}</span>
                                                    {formatTanggalIndonesia(data.pd_tanggallahir)===""?null:<br/>}
                                                    <span className="text-blue-600 font-bold">
                                                        {
                                                            formatTanggalIndonesia(
                                                                dataCompare[0]?.pd_tanggallahir
                                                            )
                                                        }
                                                    </span>
                                                </>
                                            )
                                        }
                                    </TdEdura>
                                    <TdEdura className={`${!findCompareIbu?'text-rose-600 font-bold':'text-inherit'}`}>
                                    {
                                            findCompareIbu ? (
                                                <>
                                                    {data.pd_namaibu}
                                                    {data.pd_namaibu===""?null:(<br/>)}
                                                </>

                                            ):(
                                                <>
                                                    <span className="line-through">{data.pd_namaibu}</span>
                                                    {data.pd_namaibu===""?null:(<br/>)}
                                                    <span className="text-blue-600">
                                                        {dataCompare[0]?.pd_namaibu}
                                                    </span>
                                                </>
                                            )
                                        }
                                    </TdEdura>
                                    <TdEdura>{level}</TdEdura>
                                    <TdEdura>{description}</TdEdura>
                                    <TdEdura>
                                        {
                                            dataCompare.map((m,i)=>(
                                                <div key={i} className="border px-1 pt-0 pb-1">
                                                    <p>Nama: {m.pd_nama}</p>
                                                    <p>NISN: {m.nisn}</p>
                                                    <p>Tempat Lahir: {m.pd_tl}</p>
                                                    <p>Tanggal Lahir: {formatTanggalIndonesia(m.pd_tanggallahir)}</p>
                                                    <p>Nama Ibu: {m.pd_namaibu}</p>
                                                    <p>Kelas: {m.nama_rombel}</p>
                                                </div>
                                            ))
                                        }
                                    </TdEdura>
                                </TRowEdura>
                            )
                        }
                    )
                }
            </tbody>
        </TableWithScrolling>
    )
}