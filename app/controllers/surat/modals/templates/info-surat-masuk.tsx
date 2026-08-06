import { X } from "lucide-react";
import { useMemo } from "react";
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import { useModal } from "~/components/modals/modal-provider";
import { TdEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useAppSelector } from "~/context-reduct/hook";
import { DataOrmSuratKeluarSelector } from "~/context-reduct/selectores/surat-keluar-selector";
import type { SuratMasukAppType } from "~/types/surat/surat-masuk-app-type";

export default function InfoSuratMasuk({data}:{data:SuratMasukAppType}){
    const {actions} = useModal();
    const dataSuratKeluar = useAppSelector(DataOrmSuratKeluarSelector);
    const dataTemplate = useMemo(()=>{
        return dataSuratKeluar.find(s=>s.refrensi_suratmasuk === data.idbaris);
    },[data, dataSuratKeluar])
    console.log({dataTemplate, data, dataSuratKeluar})
    return (
        <>
            <div className="flex md:h-98 items-center justify-center border rounded-3xl p-4 bg-white dark:bg-white">
                <TableWithScrolling>
                    <tbody>
                        <TRowEdura>
                            <TdEdura className="border-e-0">Dicatat pada</TdEdura>
                            <TdEdura className="border-s-0 border-e-0">:</TdEdura>
                            <TdEdura className="border-s-0">{data.tglditerima.toLocaleDateString('id-ID', {dateStyle:'full'})}</TdEdura>
                        </TRowEdura>
                        <TRowEdura>
                            <TdEdura className="border-e-0">Diarsipkan oleh</TdEdura>
                            <TdEdura className="border-s-0 border-e-0">:</TdEdura>
                            <TdEdura className="border-s-0">{data.oleh}</TdEdura>
                        </TRowEdura>
                        <TRowEdura>
                            <TdEdura className="border-e-0">Asal Surat</TdEdura>
                            <TdEdura className="border-s-0 border-e-0">:</TdEdura>
                            <TdEdura className="border-s-0">{data.asalsurat}</TdEdura>
                        </TRowEdura>
                        <TRowEdura>
                            <TdEdura className="border-e-0">Tanggal Surat</TdEdura>
                            <TdEdura className="border-s-0 border-e-0">:</TdEdura>
                            <TdEdura className="border-s-0">{data.tglsurat.toLocaleDateString('id-ID', {dateStyle:'full'})}</TdEdura>
                        </TRowEdura>
                        <TRowEdura>
                            <TdEdura className="border-e-0">Nomor Surat</TdEdura>
                            <TdEdura className="border-s-0 border-e-0" >:</TdEdura>
                            <TdEdura className="border-s-0">{data.nosurat}</TdEdura>
                        </TRowEdura>
                        <TRowEdura>
                            <TdEdura className="border-e-0">Perihal</TdEdura>
                            <TdEdura className="border-s-0 border-e-0" >:</TdEdura>
                            <TdEdura className="border-s-0">{data.perihal}</TdEdura>
                        </TRowEdura>
                        <TRowEdura>
                            <TdEdura className="border-e-0">Ditujukan Kepada</TdEdura>
                            <TdEdura className="border-s-0 border-e-0" >:</TdEdura>
                            <TdEdura className="border-s-0">{data.ditujukkankepada}</TdEdura>
                        </TRowEdura>
                        <TRowEdura>
                            <TdEdura className="border-e-0">Diteruskan ke surat keluar</TdEdura>
                            <TdEdura className="border-s-0 border-e-0" >:</TdEdura>
                            <TdEdura className="border-s-0">{dataTemplate?.dataTemplate?.name} </TdEdura>
                        </TRowEdura>
                        <TRowEdura>
                            <TdEdura className="border-e-0">Status Surat</TdEdura>
                            <TdEdura className="border-s-0 border-e-0" >:</TdEdura>
                            <TdEdura className="border-s-0 first-letter:uppercase">{data.status}</TdEdura>
                        </TRowEdura>
                    </tbody>
                </TableWithScrolling>
            </div>
            <ModalFooterEdura>
                <ButtonSaveAwesome labelButton="Tutup" onClick={()=>actions.close()} className="px-4 py-0"><X size={15}/></ButtonSaveAwesome>                            
            </ModalFooterEdura>
        </>
    )
}