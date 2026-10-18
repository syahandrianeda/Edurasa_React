import * as React from "react";
import { useFormEdura } from "~/components/form-custom/form-edura"
import { ModalFooterEdura } from "~/components/modals/modal-components";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import TemplateImportSkorToKdBuilder from "~/domain/import-skor-to-kd/TemplateImportSkorToKd-builder";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import { useExportTarget } from "~/layouts/exports/export-target-provider";
import { cn } from "~/lib/utils";
import { ButtonExportNilaiPerKd } from "./ButtonExportNilaiPerKd";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import SkorKdSebaranBuilder from "~/domain/penilaian/infrastucture/SkorKdSebaranBuilder";
import SkorKdBuilder from "~/domain/penilaian/infrastucture/SkorKdBuilder";
import type { TemplateImportSkorToKd } from "~/domain/import-skor-to-kd/TemplateImportSkorToKd-type";
import ConverterDataImportToTemplateSkorUI from "./import-skor-kd/converter-data-import-to-template-skor-kd";
import { findDifferences } from "~/lib/isEqualArrayObject";
import type { SkorKdFromImportExcelType } from "./import-skor-kd/skor-kd-from-import-excel-type";
import { ButtonImportExcelNilaiKd } from "./ButtonImportExcelNilaiKd";
import { Badge } from "~/components/ui/badge";
import  TdEduraSkorKd  from "./TdEduraSkorKdImport";
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import ParameterServiceSkorKdImportBuilder from "./import-skor-kd/ParameterServiceSkorKdImportBuilder";
import { TableSiswaJenjang } from "~/controllers/data-siswa-controller/table-data-siswa-jenjang";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { getNumberFromString } from "~/lib/get-number";
import DtoTagihanHasDataResponse from "~/dtos/dto-tagihan-has-data-response";
import { useModal } from "~/components/modals/modal-provider";
import { useCrudImportSkorKdProvider } from "../crud/crud-import-skor-kd-provider";
import {toast} from 'sonner';
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import type { ValidatedResponseSiswa } from "~/types/penilaian/rekap_sementara_sheet_type";


// type KeyLabel={
//     key:string,
//     label:string
// }

// type formatImportType = {
//     source: TemplateImportSkorToKd[],
//     skor_kd:Record<string, number>,
//     keyLabel:KeyLabel[],
//     data: DataUIFormatImportType[]
// }

export default function ImportNilaiByKdToSheetKategori(){
    const exportRef = useExportTarget('print-area-modal') as React.Ref<HTMLDivElement>;;
    const {currentData} = useFormEdura<TagihanHasDataResponse>();
    const {actions:actionsModal} = useModal<TagihanHasDataResponse>();
    const {actions:api, state} = useCrudImportSkorKdProvider();
    const {keySkorKD,keyLabelRekapSkorKdSheet,dataSkorKd} = currentData;
    const rombel = getSessionRombel();
    
    const [dataUi, setDataUi] = React.useState<TemplateImportSkorToKd[]>(dataSkorKd)
    
    
    const callBackImport = (data:any[])=>{
        const convert = ConverterDataImportToTemplateSkorUI.convert(data as unknown as SkorKdFromImportExcelType[], currentData);
        // console.log({data, convert}, findDifferences(convert, dataSkorKd));
        setDataUi(convert);
    }
    const onSubmit = React.useCallback(()=>{
        const jenjang = getNumberFromString(rombel);
        const param = ParameterServiceSkorKdImportBuilder.build(dataUi, jenjang, currentData)
        console.log(dataUi, currentData.tipe_assesmen, currentData.keySkorKD, {param});
        toast.promise(
            api.update(param), {
                loading:'Sedang mengimport data ke server',
                success: (data)=>{
                    if(data.detailResponse){
                        DispatchingResponseToStore(data.success, data.data as unknown as ValidatedResponseSiswa[], data.detailResponse, rombel)
                    }
                    actionsModal.close();
                    return 'Berhasil menyimpan ke server';
                },
                error: (err)=>{
                    return "Gagal menyimpan ke Server, | "+ err
                },
                closeButton:true,
            }
        )
    },[rombel, currentData.tipe_assesmen, dataUi])
    return (
        <>
        <div className="h-10/12 mx-auto bg-white dark:text-black p-2 overflow-y-auto scrol-h-custom md:px-4">
            <div className="print:hidden mb-3 text-[8px] flex gap-2">
                <div className="w-full p-4">
                    Petunjuk:
                    <ul className="list-disc list-outside ps-6">
                        <li>Silakan unduh format (template) tabel ini melalui button <strong>Export</strong></li>
                        <li>File yang telah Anda unduh, silakan lengkapi di tempat terpisah (menggunakan ms. excel atau sejenisnya)</li>
                        <li>File yang telah Anda unduh dan edit, silakan simpan kembali. Disarankan dengan nama beda (Gunakan save-as)</li>
                        <li>Silakan file anda <strong>Import</strong> file editan Anda</li>
                        <li>Data perubahan akan tampil di tabel. Jika sudah berubah, silakan <strong>Simpan Server</strong></li>
                    </ul>
                </div>
                <div className="border p-4 w-full">
                    <ul className="list-disc list-outside ps-6">
                        Keterangan warna pada skor:
                        <li className="mb-1">
                            <Badge className="bg-rose-300 text-inherit text-[8px]">Kolom Nama</Badge> menandakan peserta tidak mengirimkan respon secara online (tidak ikut daring), Tempatkan kursor pada sel tersebut untuk membaca pesan selengkapnya.
                        </li>
                        <li className="mb-1">
                            <Badge className="bg-green-300 text-inherit text-[8px]">Skor</Badge> menandakan skor telah disimpan di server, Tempatkan kursor pada sel tersebut untuk membaca pesan selengkapnya.
                        </li>
                        <li className="mb-1">
                            <Badge className="bg-amber-300 text-inherit text-[8px]">Skor</Badge> menandakan skor yang dikirim siswa berbeda dengan skor yang ada di server. Biasanya terjadi ketika Anda mengimport nilai kd tanpa koreksi. Tempatkan kursor pada sel tersebut untuk membaca pesan selengkapnya.
                        </li>
                    </ul>
                </div>
                
            </div>
            <h3 className="text-center">Format Import/Export nilai {currentData.nama_publikasi}</h3>
             <div ref={exportRef} className="bg-white dark:text-black mx-auto shadow-lg shadow-gray-400  print:bg-white  print:shadow-none p-2">
                <TableWithScrolling inModal={true}>
                    <thead>
                        <TRowEdura>
                           {
                            keyLabelRekapSkorKdSheet.map(m=>
                                <ThEdura className="text-wrap" key={m.key}>{m.label}</ThEdura>
                            )
                           }
                        </TRowEdura>
                    </thead>
                    <tbody>
                        {
                            dataUi.map((m, i)=>
                                <TRowEdura key={m.siswa_id}>
                                    <TdEdura className="max-w-5 text-center">{i+1}</TdEdura>
                                    <TdEdura className="w-12">{m.siswa_id}</TdEdura>
                                    <TdEdura className={cn("",m.hasRespon ===0?'bg-rose-300':'bg-inherit')}>{m.nama_siswa}</TdEdura>
                                    <TdEdura className="max-w-5 text-center">{m.rombel}</TdEdura>
                                    {
                                        keySkorKD.map((k,ii)=>
                                            <TdEduraSkorKd key={k} source={m} keySource={k}/>
                                        )
                                    }
                                </TRowEdura>
                            )
                        }
                    </tbody>
                </TableWithScrolling>
            </div>
        </div>
        <ModalFooterEdura>
            <div className="flex gap-2 w-full justify-center">
               <ButtonExportNilaiPerKd currentData={currentData}/>
               <ButtonImportExcelNilaiKd callBack={callBackImport}/>
               <ButtonSaveAwesome labelButton="Simpan Server" className="px-4 py-0" onClick={onSubmit}/>
            </div>
        </ModalFooterEdura>
        </>
    )
}

