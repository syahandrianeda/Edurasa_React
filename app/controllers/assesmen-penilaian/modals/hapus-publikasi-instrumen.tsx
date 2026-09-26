import { Loader, TriangleAlert } from "lucide-react";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import {toast} from 'sonner';
import { useCrudPublikasiPaketSoal } from "~/controllers/publikasi-paket-soal/crud/crud-publikasi-paket-provider";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import type { PublikasiPaketSheetType } from "~/types/bank-soal/entities/publikasi-paket-sheet-type";
import { useModal } from "~/components/modals/modal-provider";
import { useFormEdura } from "~/components/form-custom/form-edura";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { TdEdura, TRowEdura } from "~/components/tabels/tabel-components";

export default function HapusPubilikasiInstrumenSoal(){
    const {currentData:data} = useFormEdura<TagihanHasDataResponse>();
    const {actions:modalAction} = useModal<TagihanHasDataResponse>()
     const {actions:post, state} = useCrudPublikasiPaketSoal();

    const hapusPublikasi = () =>{
        const dto = {idbaris: data.idbaris, status:'hapus'};
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
                        return 'Gagal | '+ err
                    },
                    closeButton:true
                }
            )
    }
    return (
        <fieldset disabled={state.isSubmitting}>
            <div className="border-2 md:h-[calc(100vh-12rem)] border-black flex flex-col md:flex-row bg-rose-200">
                <div className="border border-rose-400 justify-items-stretch flex-1 m-2 bg-linear-to-bl from-sky-300 via-rose-300 to-purple-300 rounded-2xl shadow-sm shadow-rose-300 flex flex-col justify-center items-center">
                    <div className="text-2xl font-extrabold text-center">
                        <TriangleAlert size={72} className="text-rose-500 mx-auto"/>
                        Anda yakin akan menghapus Instrumen Tagihan Penilaian ini?
                    </div>
                    <div className="text-xs p-4 text-center">
                        <p><strong>{data.nama_publikasi}</strong></p>
                    </div>
                </div>
                <div className="border border-black flex-1 flex flex-col justify-center m-2 p-2 overflow-y-hidden bg-linear-to-bl from-sky-300 via-rose-300 to-purple-300 rounded-2xl shadow-sm shadow-rose-300">
                    <div className="bg-white border-sky-400 border-3 rounded-2xl min-h-32 p-2">
                        <TableWithScrolling inModal={true} className="text-[10px] [&_td]:border-0 [&_th]:border-0">
                            <tbody>
                                <TRowEdura>
                                    <TdEdura>Identitas Instrumen</TdEdura>
                                    <TdEdura className="w-3">:</TdEdura>
                                    <TdEdura>{data.nama_publikasi}</TdEdura>
                                </TRowEdura>
                                <TRowEdura>
                                    <TdEdura className="w-14">Dipublikasikan Tanggal</TdEdura>
                                    <TdEdura className="w-3">:</TdEdura>
                                    <TdEdura>{data.start_time.toLocaleDateString('id-ID', {dateStyle:'full'})}</TdEdura>
                                </TRowEdura>
                                <TRowEdura>
                                    <TdEdura>Dipublikasikan oleh</TdEdura>
                                    <TdEdura className="w-3">:</TdEdura>
                                    <TdEdura>{data.oleh}</TdEdura>
                                </TRowEdura>
                                <TRowEdura>
                                    <TdEdura>Tipe Peserta</TdEdura>
                                    <TdEdura className="w-3">:</TdEdura>
                                    <TdEdura className="capitalize">{data.target_type}</TdEdura>
                                </TRowEdura>
                                <TRowEdura>
                                    <TdEdura>Rombel Peserta</TdEdura>
                                    <TdEdura className="w-3">:</TdEdura>
                                    <TdEdura>Kelas {data.target_rombel.join(' dan ')}</TdEdura>
                                </TRowEdura>
                                <TRowEdura>
                                    <TdEdura>Jumlah Kompetensi Yang diukur</TdEdura>
                                    <TdEdura className="w-3">:</TdEdura>
                                    <TdEdura>{data.kurikulum_tagihan.length} ATP</TdEdura>
                                </TRowEdura>
                                <TRowEdura>
                                    <TdEdura>Jumlah Respon</TdEdura>
                                    <TdEdura className="w-3">:</TdEdura>
                                    <TdEdura>{data.data_respons.length} respon</TdEdura>
                                </TRowEdura>
                            </tbody>
                        </TableWithScrolling>
                        
                    </div>
                </div>
            </div>
            <ModalFooterEdura>
                <ButtonDeleteAwesome labelButton="Hapus Instrumen Tagihan" onClick={hapusPublikasi} className="px-4 py-0">
                     {
                        state.isSubmitting && (<Loader size={12} className="animate-spin self-center"/>)
                    }
                </ButtonDeleteAwesome>
            </ModalFooterEdura>
        </fieldset>
                    
    )
}