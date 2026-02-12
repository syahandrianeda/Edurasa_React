import { Check, Eye, PencilIcon, Plus, Trash } from "lucide-react";
import { useMemo } from "react";
import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { useModal } from "~/components/modals/modal-provider";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import TooltipComp from "~/components/ui_edura/tooltip-comp";
import { useAppSelector } from "~/context-reduct/hook";
import { instanceOfKaldik } from "~/context-reduct/selectores/kaldik-selector";
import { IDENTITAS_SEKOLAH } from "~/domain/identitas_sekolah/identitas-sekolah";
import { currentTapel } from "~/lib/current-tapel";
import { durasiHari, formatTanggalIndonesia } from "~/lib/date-helper";
import type { KaldikType } from "~/types/kaldik";

export default function KeteranganKaldikPage(){
    const dataKaldik = useAppSelector(instanceOfKaldik);
    const dataKaldikUrut = useMemo(() => {
        return dataKaldik.data;
    }, [dataKaldik]);

    const objekKosong = dataKaldik.dataTemplate();
    const {actions} = useModal<KaldikType>();

    const ActionTrigger: TriggerTable<KaldikType>[] = [
        {
            label: 'Preview',
            icon: Eye,
            callback: (m) => actions.open('INFO', m,{closeOnOutsideClick:true})
        },
        {
            label: 'Edit',
            icon: PencilIcon,
            callback: (m) => actions.open('EDIT', m,{closeOnOutsideClick:false})
        },
        {
            label: 'Hapus',
            icon: Trash,
            callback: (m) => actions.open('HAPUS', m,{closeOnOutsideClick:false})
        }
    ];

    return (
        <div className="p-1">
            <h3 className="text-3xl text-center font-extrabold uppercase mb-0">Kalender Pendidikan</h3>
            <h3 className="text-2xl text-center font-extrabold uppercase mb-0">{IDENTITAS_SEKOLAH}</h3>
            <h3 className="text-xl text-center font-extrabold mb-5">{currentTapel({variant:'full'})}</h3>
            <TableWithScrolling className="text-[10px]">
                <thead>
                    <TRowEdura>
                        <ThEdura rowSpan={2}>No</ThEdura>
                        <ThEdura className="print:hidden" colSpan={2}>Pengaturan</ThEdura>
                        <ThEdura rowSpan={2}>Keterangan</ThEdura>
                        <ThEdura colSpan={3}>Tanggal</ThEdura>
                        <ThEdura className="text-wrap" colSpan={3}>Status Libur, hari, dan jam efektif belajar</ThEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <ThEdura className="text-wrap print:hidden">Preview</ThEdura>
                        <ThEdura className="print:hidden">
                            <TooltipComp content="Tambah Keterangan">
                                <button onClick={()=>actions.open('TAMBAH', objekKosong,{closeOnOutsideClick:true})} className="border rounded-xl p-1 bg-green-500 inset-shadow-amber-50">
                                    <Plus size={12}/>
                                </button>
                            </TooltipComp>
                        </ThEdura>
                        <ThEdura>Mulai</ThEdura>
                        <ThEdura>Akhir</ThEdura>
                        <ThEdura className="text-wrap">Durasi (hari)</ThEdura>
                        <ThEdura>Libur</ThEdura>
                        <ThEdura className="text-wrap">Hari Efektif</ThEdura>
                        <ThEdura className="text-wrap">Hari Efektif Belajar</ThEdura>
                    </TRowEdura>
                </thead>
                <tbody>
                    {
                        dataKaldikUrut.map((data,i)=>(
                            <TRowEdura key={i}>
                                <TdEdura>{i+1}</TdEdura>
                                <TdEdura className="print:hidden">
                                    <div className='w-fit border px-2 rounded-sm' style={{backgroundColor: data?.backgroundColor?data?.backgroundColor:'', color:data?.color?data?.color:''}}>tgl</div>
                                </TdEdura>
                                <TdEdura className="print:hidden">
                                    <ActionButtonTable<KaldikType>
                                        data={data}
                                        trigger={ActionTrigger}
                                    />
                                </TdEdura>
                                <TdEdura>{data.keterangan}</TdEdura>
                                <TdEdura className="text-end">{formatTanggalIndonesia(data.start_tgl)}</TdEdura>
                                <TdEdura className="text-end">{formatTanggalIndonesia(data.end_tgl)}</TdEdura>
                                <TdEdura className="text-end">{durasiHari(data.start_tgl,data.end_tgl)} hari</TdEdura>
                                <TdEdura className="text-center">{data.libur?<Check size={14} className="mx-auto"/>:'-'}</TdEdura>
                                <TdEdura className="text-center">{data.he?<Check className="mx-auto" size={14}/>:'-'}</TdEdura>
                                <TdEdura className="text-center">{data.heb?<Check className="mx-auto" size={14}/>:'-'}</TdEdura>
                            </TRowEdura>
                        ))
                    }
                </tbody>
            </TableWithScrolling>
        </div>
    )
}