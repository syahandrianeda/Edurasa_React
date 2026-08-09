import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useModal} from "~/components/modals/modal-provider";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import {  File,  NotebookPenIcon,  Printer, Trash, UserIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import TooltipComp from "~/components/ui_edura/tooltip-comp";
import TriggerEditWaktuSppd from "../trigers/triger-edit-waktu-sppd";
import { getEndDate } from "~/lib/date-helper";
import TriggerEditPtkYangDiperintah from "../trigers/triger-edit-ptk-sppd";
import TriggerEditSuratMasuk from "../trigers/triger-edit-surat-masuk";
import TriggerEditTempatSppd from "../trigers/triger-edit-tempat-perjalanan";
import switchModalTypeTemplate from "../../tabel/siswa/switch-modal-type-template";
import type { ModalType } from "~/components/modals/modal-type";
import ButtonAddAwesome from "~/components/button-awesome/add-button";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";

export default function SuratKeteranganResumePreview(){
    const {state, actions } = useModal<DataOrmSuratKeluarType>()
    const dataForm = state.payload
    const dataSiswa = dataForm?.dataTemplate?.personalSiswaType ?? [];
    const template = dataForm?.dataTemplate?.name;
    const type = switchModalTypeTemplate(template!);
    const typeLampiran = type + ' FORMAT LAMPIRAN'
    
    return (
        <div className="border m-3 flex flex-col gap-2  max-h-svh overflow-y-auto scrol-h-custom">
            <h3 className="font-bold uppercase text-center mb-3">Informasi {template}</h3>
            <TableWithScrolling className="border-none md:w-10/12 w-full mx-auto">
                <tbody>
                    <tr>
                        <td className="px-1 w-3/12 text-nowrap">Jenis Surat</td>
                        <td className="w-1">:</td>
                        <td className="px-1 w-9/12">{template}</td>
                    </tr>
                    <tr>
                        <td className="px-1 text-nowrap">No Surat Keluar</td>
                        <td>:</td>
                        <td className="px-1">{dataForm?.nosurat ?? ''}</td>
                    </tr>
                    <tr>
                        <td className="px-1 text-nowrap">Tanggal dikeluarkan</td>
                        <td>:</td>
                        <td className="px-1">{dataForm?.tglsurat.toLocaleDateString('id-ID', {dateStyle:'full'})}</td>
                    </tr>
                    <tr>
                        <td className="px-1 text-nowrap">Surat Ditujukan Kepada</td>
                        <td>:</td>
                        <td className="px-1">
                            {dataForm?.ditujukkankepada}
                        </td>
                    </tr>
                    <tr>
                        <td className="px-1 text-nowrap">Dibuat/diarsipkan oleh</td>
                        <td>:</td>
                        <td className="px-1">
                            {dataForm?.oleh}
                        </td>
                    </tr>
                </tbody>
            </TableWithScrolling>
            <div className="flex w-10/12 mx-auto justify-end">
                <ButtonCommitAwesome labelButton="Tambah/Edit Siswa" onClick={()=>actions.open('EDIT SUKET ITEM SISWA',state.payload, {
                    closeOnOutsideClick: false,
                    backToModalType:state}
                )} className="bg-sky-400 text-sm py-0 px-2"/>
            </div>
            <TableWithScrolling className="w-10/12 mx-auto mb-3">
                <thead>
                    <TRowEdura>
                        <ThEdura>No</ThEdura>
                        <ThEdura>Nama</ThEdura>
                        <ThEdura>Kelas</ThEdura>
                        <ThEdura colSpan={2}>Aksi</ThEdura>
                    </TRowEdura>
                </thead>
                <tbody>
                    { dataSiswa && dataSiswa.length === 0 ? (
                            <TRowEdura>
                                <TdEdura colSpan={5} className="text-center">Tidak ada data Siswa yang dipilih</TdEdura>
                            </TRowEdura>
                        ):(
                            dataSiswa && dataSiswa.length > 0 && dataSiswa.map((item, index)=>
                                <TRowEdura key={item.id}>
                                    <TdEdura className="w-1/12 text-center">{index+1}.</TdEdura>
                                    <TdEdura className="w-5/12">{item.pd_nama}</TdEdura>
                                    <TdEdura className="w-4/12">{item.nama_rombel}</TdEdura>
                                    <TdEdura className="w-2/12">
                                        <div className="flex justify-between gap-2 w-full">
                                            <TooltipComp content={`Cetak Surat untuk ${item.pd_nama}`}>
                                                <Button variant="ghost" className="rounded-full bg-sky-700  text-white shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),0px_0px_4px_1px_var(--color-sky-300),0px_4px_0px_0px_var(--color-sky-800)] duration-250 hover:translate-y-[0.25em] active:translate-y-[0.5em] active:shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),1px_0px_2px_1px_var(--color-sky-300)] py-0 px-2 h-4 text-xs btn btn-sm btn-primary" 
                                                    onClick={()=>actions.open(type, {data:item, surat_keluar:dataForm},
                                                                {closeOnOutsideClick:false, backToModalType:state}
                                                            )}
                                                ><Printer className="[text-shadow:0px_1px_1px_0px_#950000]"/></Button>
                                            </TooltipComp>
                                            <TooltipComp content={`Hapus ${item.pd_nama}`}>
                                                <Button variant="ghost" className="rounded-full bg-rose-300 hover:bg-rose-400  text-white shadow-[inset_0px_-4px_4px_0px_var(--color-rose-600),0px_0px_4px_1px_var(--color-rose-300),0px_4px_0px_0px_var(--color-rose-800)] duration-250 hover:translate-y-[0.25em] active:translate-y-[0.5em] active:shadow-[inset_0px_-4px_4px_0px_var(--color-rose-600),1px_0px_2px_1px_var(--color-rose-300)] py-0 px-2 h-4 text-xs btn btn-sm" 
                                                    onClick={()=>actions.open('HAPUS SUKET ITEM SISWA', {data:item, surat_keluar:dataForm},
                                                                {closeOnOutsideClick:false, backToModalType:state}
                                                            )}
                                                ><Trash className="[text-shadow:0px_1px_1px_0px_#950000]"/></Button>
                                            </TooltipComp>
                                        </div>
                                    </TdEdura>
                                    {
                                        index === 0 && 
                                        <TdEdura rowSpan={dataSiswa.length} className=" w-2/12 align-middle">
                                            <TooltipComp content={`Format Lampiran ${template}`}>
                                                <Button variant="ghost" className="rounded-full bg-sky-700  text-white shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),0px_0px_4px_1px_var(--color-sky-300),0px_4px_0px_0px_var(--color-sky-800)] duration-250 hover:translate-y-[0.25em] active:translate-y-[0.5em] active:shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),1px_0px_2px_1px_var(--color-sky-300)] py-0 px-2 h-4 text-xs btn btn-sm btn-primary" onClick={
                                                    ()=>actions.open(typeLampiran as ModalType, {data:item, surat_keluar:dataForm}, {closeOnOutsideClick:false, backToModalType:state}
                                            )}><File className="[text-shadow:0px_1px_1px_0px_#950000]"/></Button>
                                            </TooltipComp>
                                        </TdEdura>  
                                    }
                                </TRowEdura>
                                )
                            )
                        }
                </tbody>
            </TableWithScrolling>
                
        </div>
    )
}