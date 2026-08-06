import * as React from "react";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import { useModal } from "~/components/modals/modal-provider";
import type { SppdAppType } from "~/types/surat/sppd-app-type";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { toast } from "sonner";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useAppSelector } from "~/context-reduct/hook";
import BuildSppd from "~/domain/surat/sppd/build-sppd";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";
import { Loader, StepBackIcon } from "lucide-react";
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import { useSppdCrudProvider } from "../../crud/sppd-crud-provider";
import { useCrudSuratKeluar } from "../../crud/surat-keluar-crud-provider";
import { DataOrmSuratKeluarSelector } from "~/context-reduct/selectores/surat-keluar-selector";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import type { SppdSheetType } from "~/types/surat/sppd-sheet-type";
import { InputText } from "~/components/fields/fields";


export default function FormDetailPtk(){
    const {state, actions:actionModal, nextState} = useModal<SppdAppType>();
    const {currentData:data, setCurrentData} = useFormEdura<SppdAppType>()
    const {actions:postSppd, state:stateSppd} = useSppdCrudProvider();
    const {actions:postSuratKeluar, state:stateSuratKeluar} = useCrudSuratKeluar();
    const suratKeluarSelector =useAppSelector(DataOrmSuratKeluarSelector);
    const [jabatanTugas, setJabatanTugas] = React.useState<string>(data.ptk_jabatan)
    
    
        const backButton = ()=>{
            const foundSelector = suratKeluarSelector.find(s=>s.idbaris === data?.refrensi_suratkeluar );
            actionModal.open('INFO', foundSelector, {closeOnOutsideClick:false})
    
        }
        const onSubmit = ()=>{
            // console.log(data, currentData)
            const dtoSppd:Partial<SppdAppType> = {idbaris:data.idbaris, ptk_jabatan:jabatanTugas }
            const dataSppd = new BuildSppd()
                                .setIdbaris(data.idbaris)
                                .setPtkJabatan(jabatanTugas)
                                .data
            toast.promise(
                    postSppd.update(dataSppd),
                    {
                        loading: 'Mengupdate SPPD',
                        success: (response) => {
                            // const data = response.data as SppdSheetType[];
                            console.log('respons sppd', response)
                            const {success,data,detailResponse} = response;
                            if(detailResponse){
                                DispatchingResponseToStore(success,data as SppdSheetType[],detailResponse)
                            }
                            
                            return 'Pemanggilan data telah selesai' 
                        },
                        error: `Gagal mengupdate SPDD`,
                        finally(){
                            
                        },
                        // closeButton:true,
                    }
                )
                
        }
    return (
        <>
            <div className="flex flex-col gap-y-1 pt-4 space-y-4 md:h-72 min-h-98 border-2 items-center">
                <div className="border-2 relative border-sky-300 border-dotted rounded-md p-2 w-full md:w-10/12">
                    <span className="absolute top-0 left-1 -translate-y-4">Preview SPPD:</span>
                    <TableWithScrolling className="table-auto w-full border-none">
                        <tbody>
                            <tr>
                                <td className="px-2 align-top">2.</td>
                                <td className="align-top px-2">Nama/NIP Pegawai yang melaksanakan perjalanan dinas</td>
                                <td className="border-s border-black px-2">{data.ptk_nama}<br/>{data.ptk_nip}</td>
                            </tr>
                            <tr className="border-t border-b border-s-0 border-e-0 border-black">
                                <td className="px-2 align-top">3.</td>
                                <td className="px-2 w-6/12">
                                    <ol className="list-[lower-alpha] list-inside mt-0 pt-0">
                                        <li className="list-item">Pangkat dan Golongan</li>
                                        <li className="list-item">Jabatan/Instansi</li>
                                        <li className="list-item">Tingkat Biaya Perjalanan Dinas</li>
                                    </ol>
                                </td>
                                <td className="border-s border-black align-top px-2 w-6/12">
                                    <ul className="list-inside list-none w-full">
                                        <li className="border-b border-dotted border-gray-400">{data.ptk_golongan}</li>
                                        <li className="border-b border-dotted border-gray-400 text-sky-500 font-bold">{jabatanTugas}</li>
                                        <li className="border-b border-dotted border-gray-400">-</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="text-[8px] px-2">4...</td>
                                <td className="border-s border-black"></td>
                            </tr>
                        </tbody>
                    </TableWithScrolling>
                    <div className="text-[10px]">
                    <ul className="list-disc list-outside pl-5">
                        <li className="list-item">Jabatan/Tugas dalam SPPD jabatan yang ditugaskan dalam perjalanan dinas. Bukan sekadar Jabatan yang disandang di sekolah. Misalnya, sebagai 'Bendahara BOS', 'Pengaurus Aset', ' 'Pembina Ekskul', 'Panitia SPMB', dll sesuai dengan yang ditugaskan</li>
                        <li className="list-item">Anda dapat menambah PTK yang diperintahkan ada di <strong>Edit PTK yang diperintah</strong></li>
                    </ul>
                </div>
                </div>
                <div className="flex gap-2 place-items-center relative p-2 justify-items-center w-10/12 flex-col md:flex-row">
                    <div className="rounded-md w-full">
                        <InputText value={jabatanTugas} onChange={(e)=>setJabatanTugas(e.currentTarget.value)} label="Ubah Jabatan/Tugas perjalanan Dinas" className="focus-visible:ring-0 focus-visible:outline-none focus-within:ring-0"/>
                    </div>
                </div>
            </div>  

            <ModalFooterEdura>
                <div className="flex w-full mt-2 gap-2">
                    <ButtonDeleteAwesome className="px-2 py-0  bg-rose-500"  type='button' onClick={backButton} labelButton="Kembali"  
                        disabled={stateSppd.isSubmitting||stateSuratKeluar.isSubmitting}
                    ><StepBackIcon size={12} className="self-center"/></ButtonDeleteAwesome>
                    <ButtonSaveAwesome className="px-2 py-0 mx-auto"  type='button' onClick={onSubmit} labelButton="Simpan"  
                        // disabled={stateSppd.isSubmitting||stateSuratKeluar.isSubmitting}
                    >
                        {
                            (stateSppd.isSubmitting||stateSuratKeluar.isSubmitting) && <Loader size={12} className="animate-spin self-center"/>
                        }
                    </ButtonSaveAwesome> 
                </div>
            </ModalFooterEdura>
        </>

        
        
    )
} 
