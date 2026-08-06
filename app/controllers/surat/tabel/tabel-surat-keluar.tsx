import { Eye} from "lucide-react";
import { useModal } from "~/components/modals/modal-provider";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import SwitchTriggerModalSuratKeluar from "../modals/trigers/trigger-modal-surat-keluar";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import { Button } from "~/components/ui/button";
import CellPersonalTypeTemplate from "./cell-personal-type-template";
import urlFileDrive from "~/lib/url-fil-drive";


export default function TableSuratKeluar({data, startIndex=0}:{data:DataOrmSuratKeluarType[], startIndex:number}){
    const {state, actions} = useModal<DataOrmSuratKeluarType>();
    
    return (
        <TableWithScrolling className="text-[10px]">
            <thead>
                <TRowEdura>
                    <ThEdura className="print:hidden">Aksi</ThEdura>
                    <ThEdura className="w-5 text-wrap">No. urut</ThEdura>
                    <ThEdura>No Surat</ThEdura>
                    <ThEdura>Tanggal Surat</ThEdura>
                    <ThEdura>Tujuan Surat</ThEdura>
                    <ThEdura>Index Surat</ThEdura>
                    <ThEdura>Perihal</ThEdura>
                    <ThEdura>File</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                {
                    data.length ? (
                        data.map((m, i)=>
                            <TRowEdura key={m.idbaris}>
                                <TdEdura className="print:hidden">
                                    <SwitchTriggerModalSuratKeluar
                                        data={m}
                                        actions={actions}
                                    />
                                </TdEdura>
                                <TdEdura>{(startIndex + i + 1)}</TdEdura>
                                <TdEdura className="w-35"><span className="truncate">{m.nosurat}</span></TdEdura>
                                <TdEdura>{m.tglsurat?.toLocaleDateString('id-ID', {dateStyle:'long'})}</TdEdura>
                                <TdEdura className="text-wrap">{m.ditujukkankepada}</TdEdura>
                                <TdEdura className="text-wrap">{m.indekssurat}</TdEdura>
                                <TdEdura className="text-wrap">{m.perihal}
                                    {
                                        m.hasTemplate && m.dataTemplate?.personalSppdType?.length && <CellPersonalTypeTemplate data={m.dataTemplate.personalSppdType} />
                                    }
                                </TdEdura>
                                <TdEdura className="text-[8px] align-middle">
                                    {m.idfile && <Button className="size-4 cursor-pointer text-sky-600 font-bold" variant="ghost" role="button" onClick={()=>window.open(urlFileDrive(m.idfile),'', 'width=720,height=600')}><Eye/></Button>}
                                </TdEdura>
                                
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