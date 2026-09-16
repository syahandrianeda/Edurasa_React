import { Field, FieldContent, FieldGroup } from "~/components/ui/field";
import WrapperContent from "./wrapper-content";
import { InputText } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import {type PublikasiPaketAppType, type PublikasiPaketAppValidWithPaketSoal } from "~/types/bank-soal/entities/publikasi-paket-app-type";
import CalendarTime from "~/components/ui/calender-time";
import { useCallback, useEffect, useMemo, useState, type ChangeEvent } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "~/components/ui/select";
import type { TypePaketSoal } from "~/domain/paket-soal/entities/type-paket";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { DataRombelUI } from "~/domain/rombel/data-rombel";
import { useAppSelector } from "~/context-reduct/hook";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { getNumberFromString } from "~/lib/get-number";
import { selectAllSiswaDTO } from "~/context-reduct/selectores/data-siswa-aktif";
import { ListJenisTagihan } from "~/domain/asesmen-penilaian/list-jenis-tagihan";
import { currentTapelProperties } from "~/lib/current-tapel";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { useCrudPublikasiPaketSoal } from "../crud/crud-publikasi-paket-provider";
import { Loader, TriangleAlert } from "lucide-react";
import { useModal } from "~/components/modals/modal-provider";
import type { PaketSoalAppWithPublikasi } from "~/types/bank-soal/entities/paket-soal-app-type";
import DtoPublikasiPaketStatic from "~/dtos/dto-publlikasi-paket-static";
import {toast} from 'sonner';
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import type { PublikasiPaketSheetType } from "~/types/bank-soal/entities/publikasi-paket-sheet-type";
import TableInfoPublikasiPaket from "./table-info-publikasi";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";

export default function HapusPublikasiPaketSoal(){
    const {actions:post, state} = useCrudPublikasiPaketSoal();
    const {actions:modalAction} = useModal<PublikasiPaketAppValidWithPaketSoal>()
    // const {currentData, setCurrentData} = useFormEdura<PublikasiPaketAppType>();
    const {currentData, setCurrentData} = useFormEdura<PublikasiPaketAppValidWithPaketSoal>();
   
    const onSubmit = useCallback(()=>{
        const dto = {idbaris:currentData.idbaris, status:'hapus'};//DtoPublikasiPaketStatic.fromAppValidationToSheet(currentData)
        
        toast.promise(
            post.update(dto),
            {
                loading:'sedang mengupdate',
                success: (respon)=>{
                    
                    const {success, data, detailResponse} = respon;
                    if(detailResponse){
                        DispatchingResponseToStore(success, data as PublikasiPaketSheetType[], detailResponse)
                    }
                    modalAction.close();
                    return 'berhasil'
                },
                error: (err)=>{
                    console.log(err);
                    return 'Gagal'
                }
            }
        )
    },[currentData])
    return (
        <fieldset disabled={state.isSubmitting}>
            <WrapperContent className="grid md:grid-cols-2 grid-cols-1 gap-2 w-full text-sm">
                <div className="border border-rose-400 justify-items-stretch flex-1 m-2 bg-linear-to-bl from-sky-300 via-rose-300 to-purple-300 rounded-2xl shadow-sm shadow-rose-300 flex flex-col justify-center items-center">
                    <div className="text-2xl font-extrabold text-center">
                        <TriangleAlert size={72} className="text-rose-500 mx-auto"/>
                        Anda yakin akan menghapus publikasi paket ini?
                    </div>
                    <div className="text-xs p-4 text-center">
                        <p><strong>{currentData.nama_publikasi}</strong></p>
                    </div>
                </div>
                <div className="border border-black flex-1 flex flex-col m-2 p-2 bg-linear-to-bl from-sky-300 via-rose-300 to-purple-300 rounded-2xl shadow-sm shadow-rose-300">
                    <div className="border bg-white dark:text-black p-2 overflow-y-hidden text-wrap zoom-50">
                        <TableInfoPublikasiPaket currentData={currentData}/>
                    </div>
                </div>
            </WrapperContent>
            <ModalFooterEdura>
            <ButtonDeleteAwesome labelButton="Hapus Publikasi" className="px-4 py-0" onClick={onSubmit}>
                {
                    state.isSubmitting && (<Loader size={12} className="animate-spin self-center"/>)
                }
            </ButtonDeleteAwesome>
        </ModalFooterEdura>
        </fieldset>
    )
}