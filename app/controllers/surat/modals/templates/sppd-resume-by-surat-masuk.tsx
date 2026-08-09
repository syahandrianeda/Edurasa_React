import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useModal} from "~/components/modals/modal-provider";
import {  File,  NotebookPenIcon,  Printer,  UserIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import TooltipComp from "~/components/ui_edura/tooltip-comp";
import TriggerEditWaktuSppd from "../trigers/triger-edit-waktu-sppd";
import { getEndDate } from "~/lib/date-helper";
import TriggerEditPtkYangDiperintah from "../trigers/triger-edit-ptk-sppd";
import TriggerEditSuratMasuk from "../trigers/triger-edit-surat-masuk";
import type { SuratMasukAppType } from "~/types/surat/surat-masuk-app-type";
import { useAppSelector } from "~/context-reduct/hook";
import { DataOrmSuratKeluarSelector } from "~/context-reduct/selectores/surat-keluar-selector";
import { useMemo } from "react";
import TriggerEditTempatSppd from "../trigers/triger-edit-tempat-perjalanan";


export default function SppdResumePreviewBySuratMasuk(){
    const {state, actions } = useModal<SuratMasukAppType>();
    const dataSuratKeluar = useAppSelector(DataOrmSuratKeluarSelector);
    const dataTemplate = useMemo(()=>{
        return dataSuratKeluar.find(s=>s.refrensi_suratmasuk === state.payload?.idbaris);
    },[state.payload?.idbaris, dataSuratKeluar])
    const dataForm = dataTemplate
    const dataSppd = dataForm?.dataTemplate?.personalSppdType ?? [];
    
    if(!dataForm) return (
        <div className="border m-3 flex justify-center gap-2 h-80 items-center">
            <p className="font-bold text-center mb-3">Surat masuk ini tidak dijadikan sumber/refrensi Surat Keluar SPPD</p>
        </div>
    )
    return (
        <div className="border m-3 flex flex-col gap-2">
            <h3 className="font-bold uppercase text-center mb-3">Informasi SPPD</h3>
            <TableWithScrolling inModal={true} className="border-none md:w-10/12 w-full mx-auto">
                <tbody>
                    <tr>
                        <td className="px-1 w-3/12 text-nowrap">Jenis Surat</td>
                        <td className="w-1">:</td>
                        <td className="px-1 w-9/12">Surat Perintah Perjalanan Dinas (SPPD)</td>
                    </tr>
                    <tr>
                        <td className="px-1 text-nowrap">No Surat Keluar</td>
                        <td>:</td>
                        <td className="px-1">{dataForm?.nosurat ?? ''}</td>
                    </tr>
                    <tr>
                        <td className="px-1 text-nowrap">Maksud Perjalanan</td>
                        <td>:</td>
                        <td className="px-1 text-nowrap">{dataForm?.perihal}</td>
                    </tr>
                    <tr>
                        <td className="px-1 text-nowrap">Tujuan/Tempat Pelaksanaan</td>
                        <td>:</td>
                        <td className="px-1">
                            {dataForm && <TriggerEditTempatSppd dataForm={dataForm} state={state}/>}
                        </td>
                    </tr>
                    <tr>
                        <td className="px-1 text-nowrap">Waktu Mulai Pelaksanaan </td>
                        <td>:</td>
                        <td className="px-1">
                            {dataForm && <TriggerEditWaktuSppd dataForm={dataForm} state={state}/>}
                            </td>
                    </tr>
                    <tr>
                        <td className="px-1 text-nowrap">Waktu Selesai Pelaksanaan </td>
                        <td>:</td>
                        <td className="px-1">
                            {(dataForm?.tglsurat && dataForm?.dataTemplate?.personalSppdType?.[0].ptk_durasisppd) && getEndDate(dataForm?.tglsurat , dataSppd[0]?.ptk_durasisppd).toLocaleDateString('id-ID', {dateStyle:'long'})}
                        </td>
                    </tr>
                    <tr>
                        <td className="px-1 text-nowrap">Lama Dinas </td>
                        <td>:</td>
                        <td className="px-1"><span>{dataSppd[0]?.ptk_durasisppd ?? 1} hari</span> </td>
                    </tr>
                    <tr>
                        <td className="px-1 text-nowrap">PTK yang diperintah</td>
                        <td>:</td>
                        <td className="px-1 flex items-center gap-2">
                            {dataForm && <TriggerEditPtkYangDiperintah dataForm={dataForm} state={state}/>}
                        </td>
                    </tr>
                    <tr>
                        <td className="px-1 text-nowrap text-sky-400 font-bold">Refrensi Surat Masuk</td>
                        <td>:</td>
                        <td className="px-1 flex items-center gap-2">
                            {dataForm?.dataSuratMasuk && <TriggerEditSuratMasuk dataForm={dataForm} state={state}/>}
                        </td>
                    </tr>
                </tbody>
            </TableWithScrolling>
            <TableWithScrolling inModal={true} className="w-10/12 mx-auto mb-3">
                <thead>
                    <TRowEdura>
                        <ThEdura>No</ThEdura>
                        <ThEdura>PTK</ThEdura>
                        <ThEdura>Jabatan/Tugas</ThEdura>
                        <ThEdura colSpan={2}>Aksi</ThEdura>
                    </TRowEdura>
                </thead>
                <tbody>
                    { dataSppd && dataSppd.length === 0 ? (
                        <TRowEdura>
                            <TdEdura colSpan={5} className="text-center">Tidak ada data PTK</TdEdura>
                        </TRowEdura>
                    ):(
                        dataSppd && dataSppd.length > 0 && dataSppd.map((item, index)=>
                            <TRowEdura key={item.idbaris}>
                                <TdEdura className="w-1/12 text-center">{index+1}.</TdEdura>
                                <TdEdura className="w-5/12">{item.ptk_nama}</TdEdura>
                                <TdEdura className="w-4/12">{item.ptk_jabatan}</TdEdura>
                                <TdEdura className="w-2/12">
                                    <div className="flex justify-between gap-2 w-full">
                                    <TooltipComp content={`Edit data  ${item.ptk_nama}`}>
                                        <Button variant="ghost" className="rounded-full bg-sky-700  text-white shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),0px_0px_4px_1px_var(--color-sky-300),0px_4px_0px_0px_var(--color-sky-800)] duration-250 hover:translate-y-[0.25em] active:translate-y-[0.5em] active:shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),1px_0px_2px_1px_var(--color-sky-300)] py-0 px-2 h-4 text-xs btn btn-sm btn-primary" onClick={()=>actions.open('EDIT-CUSTOM', item,
                                            {closeOnOutsideClick:false, backToModalType:state}
                                        )}><UserIcon className="[text-shadow:0px_1px_1px_0px_#950000]"/></Button>
                                    </TooltipComp>
                                    <TooltipComp content={`Cetak SPPD untuk ${item.ptk_nama}`}>
                                        <Button variant="ghost" className="rounded-full bg-sky-700  text-white shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),0px_0px_4px_1px_var(--color-sky-300),0px_4px_0px_0px_var(--color-sky-800)] duration-250 hover:translate-y-[0.25em] active:translate-y-[0.5em] active:shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),1px_0px_2px_1px_var(--color-sky-300)] py-0 px-2 h-4 text-xs btn btn-sm btn-primary" 
                                            onClick={()=>actions.open('PRINT PREVIEW SPPD', item,
                                                        {closeOnOutsideClick:false, backToModalType:state}
                                                    )}
                                        ><Printer className="[text-shadow:0px_1px_1px_0px_#950000]"/></Button>
                                    </TooltipComp>
                                    <TooltipComp content={`Cetak Format Notula SPD ${item.ptk_nama}`}>
                                        <Button variant="ghost" className="rounded-full bg-sky-700  text-white shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),0px_0px_4px_1px_var(--color-sky-300),0px_4px_0px_0px_var(--color-sky-800)] duration-250 hover:translate-y-[0.25em] active:translate-y-[0.5em] active:shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),1px_0px_2px_1px_var(--color-sky-300)] py-0 px-2 h-4 text-xs btn btn-sm btn-primary" 
                                            onClick={()=>actions.open('NOTULA RAPAT', item,
                                                        {closeOnOutsideClick:false, backToModalType:state}
                                                    )}
                                        ><NotebookPenIcon className="[text-shadow:0px_1px_1px_0px_#950000]"/></Button>
                                    </TooltipComp>
                                    {
                                        item.resume !=='' && (
                                            
                                    <TooltipComp content={`Cetak Notula SPD untuk ${item.ptk_nama}`}>
                                        <Button variant="ghost" className="rounded-full bg-sky-300  text-white shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),0px_0px_4px_1px_var(--color-sky-300),0px_4px_0px_0px_var(--color-sky-800)] duration-250 hover:translate-y-[0.25em] active:translate-y-[0.5em] active:shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),1px_0px_2px_1px_var(--color-sky-300)] py-0 px-2 h-4 text-xs btn btn-sm btn-primary" 
                                            onClick={()=>actions.open('PRINT NOTULA RAPAT', item,
                                                        {closeOnOutsideClick:false, backToModalType:state}
                                                    )}
                                        ><NotebookPenIcon className="[text-shadow:0px_1px_1px_0px_#950000]"/></Button>
                                    </TooltipComp>
                                        )
                                    }
                                    </div>
                                </TdEdura>
                                {
                                    index === 0 && 
                                    <TdEdura rowSpan={dataSppd.length} className=" w-2/12 align-middle">
                                        <TooltipComp content="Cetak Surat Tugas Perjalanan Dinas">
                                            <Button variant="ghost" className="rounded-full bg-sky-700  text-white shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),0px_0px_4px_1px_var(--color-sky-300),0px_4px_0px_0px_var(--color-sky-800)] duration-250 hover:translate-y-[0.25em] active:translate-y-[0.5em] active:shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),1px_0px_2px_1px_var(--color-sky-300)] py-0 px-2 h-4 text-xs btn btn-sm btn-primary" onClick={
                                                ()=>actions.open('PRINT PREVIEW SURAT TUGAS', dataForm, {closeOnOutsideClick:false, backToModalType:state}
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
            <div className="text-xs">
                <ul className="list-disc list-outside pl-5">
                    <li className="list-item">Jabatan/Tugas dalam SPPD jabatan yang ditugaskan dalam perjalanan dinas. Bukan sekadar Jabatan yang disandang di sekolah</li>
                    <li className="list-item">Misalnya, sebagai 'Pembina Pramuka', 'Panitia SPMB', dll sesuai dengan yang ditugaskan</li>
                    <li className="list-item">Anda dapat mengubah jabatan atau identitas SPPD di <strong>Edit Data PTK</strong></li>
                </ul>
            </div>
        </div>
    )
}