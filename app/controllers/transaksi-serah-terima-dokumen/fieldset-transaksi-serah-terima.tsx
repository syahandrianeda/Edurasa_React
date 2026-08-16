import { useFormEdura } from "~/components/form-custom/form-edura"
import {type TransaksiEventType } from "~/domain/serah-terima/entities/transaksi-event-type"
import FormTransaksiSerahTerimaKolomIsi from "./field-kolom-isi-transaksi-serah-terima";
import { useImmer } from "use-immer";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type { UserPtk } from "~/types";
import type { SnapshotTransaksiSerahTerima, TransaksiSerahTerimaDokumenAppType, TransaksiSerahTerimaDokumenSheetType } from "~/types/galleries/transaksi-serah-terima-dokumen";
import { useModal } from "~/components/modals/modal-provider";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import { useCrudTransaksiSerahTerimaProvider } from "./crud-provider-transaksi-serah-terima";
import ButtonUpdateTransaksiSerahTerimaDokumen from "./button-update-transaksi-serah-terima";
import { UploadBuktiPeneyerahan } from "./upload-bukti-penyerahan";
import { FilePreviewProvider, SectionPreview } from "~/components/form-custom/files-input";
import DtoTransaksiSerahTerimaDokumen from "~/dtos/dto-transaksi-serah-terima";
import { toast } from "sonner";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";

export default function FieldsetTransaksiSerahTerima(){
    const {state, actions:modal}=useModal()
    const {currentData} = useFormEdura<TransaksiEventType>();
    const {state:statePost, actions:post} = useCrudTransaksiSerahTerimaProvider();
    const user = getSessionApp<UserPtk>()?.name;
    const {event:serahTerimaDokumen, person:personTarget, transaksi:transaksiServer} = currentData;
    
    const koleksiTransaksi = serahTerimaDokumen?.jenis?.toString().split('_');
    const initial:TransaksiSerahTerimaDokumenAppType = {
                idbaris: 0,
                serah_terima_idbaris: serahTerimaDokumen.idbaris,
                target_person_id: personTarget.id as number,
                items: [],
                jenis: transaksiServer[0]?.jenis ?? koleksiTransaksi?.[0],
                idfile: '',
                oleh: user ?? '',
                snapshot: [],
                tgl: new Date(),
                keterangan: '',
                status:''
    };
    const foundTransaksi = transaksiServer.find(s=>s.jenis === koleksiTransaksi?.[0])
    const [formDataTransaksi, setFormDataTransaksi] = useImmer<TransaksiSerahTerimaDokumenAppType>(foundTransaksi ?? initial)
    
    const onSubmit = async()=>{
        const snapshotBaru:SnapshotTransaksiSerahTerima={
                                    oleh:formDataTransaksi.oleh,
                                    tgl:new Date(),
                                    jenis: formDataTransaksi.jenis,
                                    target_person_id:formDataTransaksi.target_person_id,
                                    type_target_person:serahTerimaDokumen.type_target!,
                                    idfile:formDataTransaksi.idfile
                                }
        const snapshot:SnapshotTransaksiSerahTerima[] = formDataTransaksi.snapshot 
                        ? [ ...formDataTransaksi.snapshot, snapshotBaru ] 
                        : [snapshotBaru];
        const formData = {...formDataTransaksi, snapshot}
        const dataForm = DtoTransaksiSerahTerimaDokumen.fromAppToSheet(formData);
        
        toast.promise(
            post.update(dataForm),
            {
                loading:'Mengirimkan data ...',
                success: (respon)=>{
                    const {success, data, detailResponse} = respon;
                    DispatchingResponseToStore(success, data as unknown as TransaksiSerahTerimaDokumenSheetType[], detailResponse!);
                    modal.close();
                    return 'Berhasil diupdate'
                },
                error:(er)=>{
                    console.error((er));
                    return 'Gagal merespon';
                }

            }
        )
    }
    return (
        <>
            <div className="grid grid-cols-1 md:max-h-[calc(100vh-12.5rem)] gap-2 space-x-1 md:grid-cols-3 bg-linear-to-tl from-sky-600 to-sky-500 p-2 overflow-y-auto scrol-h-custom">
                <div className="bg-linear-to-br  from-sky-500 via-cyan-300 to-purple-400 rounded-2xl shadow-sm shadow-sky-100 p-2 md:col-span-2">
                    <FormTransaksiSerahTerimaKolomIsi formDataTransaksi={formDataTransaksi} setFormDataTransaksi={setFormDataTransaksi}/>
                </div>        
                <div className="bg-linear-to-tr  from-sky-500 via-cyan-300 to-purple-400 flex items-center  rounded-2xl shadow-sm shadow-sky-200 p-2 md:col-span-1">
                    <FilePreviewProvider>
                        <div className="bg-linear-to-tl min-h-80 shadow-lg shadow-sky-400 from-sky-300 to-sky-100 p-2 dark:text-sky-600 rounded-2xl">
                            <h4 className="text-lg font-bold text-center border-b-2 border-double border-sky-400">
                                Upload Poto Penyerahan/Penerimaan
                            </h4>
                            <p className="text-[10px]">Untuk keperluan dokumentasi, silakan upload Poto penyerahan</p>
                            <UploadBuktiPeneyerahan currentData={formDataTransaksi} setCurrentData={setFormDataTransaksi}/>
                            <div className="overflow-x-hidden scrol-h-custom">
                                <SectionPreview className="min-h-48"/>
                            </div>
                        </div>
                    </FilePreviewProvider>
                    
                </div>        
            </div>
                <ModalFooterEdura>
                    {
                        // state.type === 'HAPUS'?<ButtonSendDeleteSerahTerimaDokumen/>:<ButtonSendEditSerahTerimaDokumen/>
                        state.type === 'HAPUS'?'button hapus':<ButtonUpdateTransaksiSerahTerimaDokumen disabled={statePost.isSubmitting} onSubmit={onSubmit}/>
                    }
                </ModalFooterEdura>
        </>
    )
}