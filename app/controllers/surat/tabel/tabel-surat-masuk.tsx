import { Eye } from "lucide-react";
import { useModal } from "~/components/modals/modal-provider";
import { TdEdura, TdEduraFreeze, ThEdura, THEduraFreeze, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { Button } from "~/components/ui/button";
import urlFileDrive from "~/lib/url-fil-drive";
import type { SuratMasukAppType } from "~/types/surat/surat-masuk-app-type";
import SwitchTriggerModalSuratMasuk from "../modals/trigers/trigger-modal-surat-masuk";
import { useAppSelector } from "~/context-reduct/hook";
import { useCallback } from "react";
import { DataOrmSuratKeluarSelector } from "~/context-reduct/selectores/surat-keluar-selector";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type { UserPtk } from "~/types";

export default function TabelSuratMasuk({data, startIndex}:{data:SuratMasukAppType[], startIndex:number}){
    const isAdmin = getSessionApp<UserPtk>()?.name === 'Admin'
    const {actions} = useModal<SuratMasukAppType>();
    const dataSuratKeluar = useAppSelector(DataOrmSuratKeluarSelector);
        const dataTemplate = useCallback((idbaris:number)=>{
            return dataSuratKeluar.find(s=>s.refrensi_suratmasuk === idbaris);
        },[data, dataSuratKeluar])
        
    return (
        <TableWithScrolling>
            <thead>
                <TRowEdura>
                    <THEduraFreeze stateFreeze={true} rowSpan={2} className="print:hidden">Aksi</THEduraFreeze>
                    <ThEdura rowSpan={2} className="w-5 text-wrap">No. urut</ThEdura>
                    {isAdmin && <ThEdura rowSpan={2} className="text-wrap w-5 print:hidden">ID</ThEdura>}
                    <ThEdura rowSpan={2} className="text-wrap w-35">Tanggal Diterima / diinput</ThEdura>
                    <ThEdura colSpan={5} className="text-wrap">Data Surat Masuk</ThEdura>
                    <ThEdura rowSpan={2} className="text-wrap">Ditujukan kepada</ThEdura>
                    <ThEdura rowSpan={2} className="text-wrap">Diteruskan menjadi dasar</ThEdura>
                </TRowEdura>
                <TRowEdura>
                    <ThEdura>File</ThEdura>
                    <ThEdura>No Surat</ThEdura>
                    <ThEdura>Tanggal Surat</ThEdura>
                    <ThEdura>Asal Surat</ThEdura>
                    <ThEdura>Perihal</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                {
                    data.length ? (
                        data.map((m,i)=>
                        <TRowEdura key={m.idbaris}>
                            <TdEduraFreeze stateFreeze={true} className="print:hidden">
                                <SwitchTriggerModalSuratMasuk
                                    actions={actions}
                                    data={m}
                                    />
                            </TdEduraFreeze>
                            <TdEdura>{startIndex + i + 1}</TdEdura>
                            {isAdmin && <TdEdura className="print:hidden">{m.idbaris}</TdEdura>}
                            <TdEdura>{m.tglditerima.toLocaleDateString('id-ID', {dateStyle:'long'})}</TdEdura>
                            <TdEdura>
                                {m.idfile && <Button className="size-4 cursor-pointer text-sky-600 font-bold" variant="ghost" role="button" onClick={()=>window.open(urlFileDrive(m.idfile),'', 'width=720,height=600')}><Eye/></Button>}
                            </TdEdura>
                            <TdEdura><p className="truncate w-42">{m.nosurat}</p></TdEdura>
                            <TdEdura>{m.tglsurat.toLocaleDateString('id-ID', {dateStyle:'long'})}</TdEdura>
                            <TdEdura><p className="truncate w-32">{m.asalsurat}</p></TdEdura>
                            <TdEdura><p className="truncate w-52">{m.perihal}</p></TdEdura>
                            <TdEdura><p className="truncate w-32">{m.ditujukkankepada}</p></TdEdura>
                            <TdEdura>{dataTemplate(m.idbaris)?.dataTemplate?.name ?? '-'}</TdEdura>
                        </TRowEdura>
                    )
                    ):(
                        <TRowEdura>
                            <TdEdura colSpan={10} className="text-center">Belum ada data</TdEdura>
                        </TRowEdura>
                    )
                }
            </tbody>
        </TableWithScrolling>
    )
}