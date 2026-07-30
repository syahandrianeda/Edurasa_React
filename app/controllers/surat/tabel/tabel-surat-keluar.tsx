import { PencilIcon, Printer, Trash } from "lucide-react";
import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { useModal } from "~/components/modals/modal-provider";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";


export default function TableSuratKeluar({data, startIndex=0}:{data:SuratKeluarAppType[], startIndex:number}){
    const {actions} = useModal<SuratKeluarAppType>();
    const ActionTrigger: TriggerTable<SuratKeluarAppType>[] = [
            {
                label: 'Edit',
                icon: PencilIcon,
                callback: (m) => actions.open('EDIT', m,{closeOnOutsideClick:false})
            },
            {
                label: 'Cetak',
                icon: Printer,
                callback: (m) => actions.open('PRINT PREVIEW', m,{closeOnOutsideClick:false})
            },
            {
                label: 'Hapus',
                icon: Trash,
                callback: (m) => actions.open('HAPUS', m,{closeOnOutsideClick:false})
            },
        ];
        
    return (
        <TableWithScrolling className="text-[10px]">
            <thead>
                <TRowEdura>
                    <ThEdura className="pring:hidden">Aksi</ThEdura>
                    <ThEdura className="w-5 text-wrap">No. urut</ThEdura>
                    <ThEdura>No Surat</ThEdura>
                    <ThEdura>Tanggal Surat</ThEdura>
                    <ThEdura>Tujuan Surat</ThEdura>
                    <ThEdura>Index Surat</ThEdura>
                    <ThEdura>Perihal</ThEdura>
                    <ThEdura>File</ThEdura>
                    {/* <ThEdura>Pendata</ThEdura> */}
                </TRowEdura>
            </thead>
            <tbody>
                {
                    data.length ? (
                        data.map((m, i)=>
                            <TRowEdura key={m.idbaris}>
                                <TdEdura>
                                    <ActionButtonTable<SuratKeluarAppType>
                                        data={m}
                                        trigger={ActionTrigger}
                                    />
                                </TdEdura>
                                <TdEdura>{(startIndex + i + 1)}</TdEdura>
                                <TdEdura className="w-35"><span className="truncate">{m.nosurat}</span></TdEdura>
                                <TdEdura>{m.tglsurat?.toLocaleDateString('id-ID', {dateStyle:'long'})}</TdEdura>
                                <TdEdura className="text-wrap">{m.ditujukkankepada}</TdEdura>
                                <TdEdura className="text-wrap">{m.indekssurat}</TdEdura>
                                <TdEdura className="text-wrap">{m.perihal}</TdEdura>
                                <TdEdura className="text-[8px]">{m.idfile}</TdEdura>
                                {/* <TdEdura>{m.user}</TdEdura> */}
                            </TRowEdura>
                        )
                    ) : (
                        <TRowEdura>
                            <TdEdura colSpan={8} className="text-center">Belum ada data</TdEdura>
                        </TRowEdura>

                    )
                }
            </tbody>
        </TableWithScrolling>
    )
}