import * as React from "react";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import { useModal } from "~/components/modals/modal-provider";
import type { SppdAppType } from "~/types/surat/sppd-app-type";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { toast } from "sonner";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import { useImmer } from "use-immer";
import { useAppSelector } from "~/context-reduct/hook";
import BuildSppd from "~/domain/surat/sppd/build-sppd";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";
import { StepBackIcon } from "lucide-react";
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import { InstancePangkatGolonganSelector } from "~/context-reduct/selectores/pangkat-golongan-selector";
import DtoSppd from "~/dtos/dto-sppd";
import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";
import { InstanceRiwayatIdAkun } from "~/context-reduct/selectores/riwayat-id-akun-selector";
import { useSppdCrudProvider } from "../../crud/sppd-crud-provider";
import { useCrudSuratKeluar } from "../../crud/surat-keluar-crud-provider";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import type { SppdSheetType } from "~/types/surat/sppd-sheet-type";
import type { SuratKeluarSheetType } from "~/types/surat/surat-keluar-sheet-type";
import { DataOrmSuratKeluarSelector } from "~/context-reduct/selectores/surat-keluar-selector";
import SelectRiwayatIdAkun from "../fields/select-riwayat-id-akun";

export default function FormPtkYangDiperintah(){
    const pangkatGolonganSelector = useAppSelector(InstancePangkatGolonganSelector)
    const suratKeluarSelector =useAppSelector(DataOrmSuratKeluarSelector);
    const ptkAkun = useAppSelector(InstanceRiwayatIdAkun)
    const {state, actions:actionModal} = useModal<DataOrmSuratKeluarType>();
    const {actions:postSppd, state:stateSppd} = useSppdCrudProvider();
    const {actions:postSuratKeluar, state:stateSuratKeluar} = useCrudSuratKeluar();
    const {currentData, setCurrentData} = useFormEdura<DataOrmSuratKeluarType>();
    const dataPtk = state.payload?.dataTemplate?.personalSppdType
    const [data, setData] = useImmer<SppdAppType[]>(dataPtk ?? [])
    const [idPtk, setIdPtk] = React.useState<number[]>(state.payload?.target_ptk ?? [])
    const ptkAll = ptkAkun.getAkunAktifInDate(currentData.tglsurat).sort((a, b)=>a.nama_guru.localeCompare(b.nama_guru))
    const pangkatGolongan = pangkatGolonganSelector.getPangkatGolonganAktifInDate(currentData.tglsurat).sort((a, b)=>a.nama_user.localeCompare(b.nama_user))
    
    const onChangePtk = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {checked, value, dataset} = e.currentTarget;
        const collectionId = checked
                    ?[...new Set([...idPtk, Number(value)])]
                    : idPtk.filter(s=>s !== Number(value));

        const ptkSppd:SppdAppType[] = []
        for(const id of collectionId){
            const durasi = dataPtk![0].ptk_durasisppd ?? 1;
            const foundSppd= dataPtk?.find(s=>s.ptk_diperintah === id);
            const foundRiwayat = ptkAll.find(s=>s.user_id === id);
            const foundPangkat = pangkatGolongan.find(s=>s.user_id === id);//oundRiwayat?.user_id && s.idbaris === foundRiwayat?.idbaris)
            const textPangkat = foundPangkat?.asn === 'pns' ?
                                    `${foundPangkat?.pangkat} - ${foundPangkat?.golongan}/${foundPangkat?.ruang}`
                                    : foundPangkat?.asn ===""?
                                        ""
                                        :`${foundPangkat?.pangkat} - ${foundPangkat?.golongan}` ;
            const data = new BuildSppd()
                        .setIdbaris(foundSppd?.idbaris ?? 0)
                        .setRefrensiSuratKeluar(currentData?.idbaris ?? 0)
                        .setPtkId(id)
                        .setLamaPerjalanan(durasi)
                        .setPtkNama(foundRiwayat?.nama_guru ?? '')
                        .setPtkNip(foundRiwayat?.nip ?? '')
                        .setPtkJabatan(foundSppd?.ptk_jabatan ?? foundRiwayat?.jabatan ?? '')
                        .setNoSuratSppd(currentData.nosurat)
                        .setPtkGolongan(textPangkat)
                        .setTempatSppd(foundSppd?.ptk_tempatsppd ?? currentData.ditujukkankepada)
                        .setTglMulaiDinas(currentData?.tglsurat)
                        .setMaksudSppd(currentData?.perihal)
                        .data as SppdAppType;
            ptkSppd.push(data);

        }

        setIdPtk(collectionId);
        setData(ptkSppd)
        setCurrentData(draft=>{
            draft.target_ptk = collectionId
        })
    }
    
    const backButton = ()=>{
        const foundSelector = suratKeluarSelector.find(s=>s.idbaris === currentData?.idbaris );
        actionModal.open('INFO', foundSelector, {closeOnOutsideClick:false})

    }
    const onSubmit = ()=>{
                const dtoSppd = DtoSppd.arrayToSheet(data);
        const updateSuratKeluar:Partial<SuratKeluarAppType> = {idbaris:currentData.idbaris, target_ptk: currentData.target_ptk} ;
        
        toast.promise(
                postSppd.update(dtoSppd),
                {
                    loading: 'Mengupdate SPPD',
                    success: (response) => {
                        
                        const {success,data,detailResponse} = response;
                        if(detailResponse){
                            DispatchingResponseToStore(success,data as SppdSheetType[],detailResponse)
                        }
                        
                        return 'Pemanggilan data telah selesai' 
                    },
                    error: `Gagal mengupdate SPDD`,
                    finally(){
                        
                    },
                    closeButton:true,
                }
            )
            toast.promise(
                postSuratKeluar.update(updateSuratKeluar),
                {
                    loading: 'Mengupdate Surat Keluar',
                    success: (response) => {
                        // const data = response.data as SppdSheetType[];
                        const {success,data,detailResponse} = response;
                        if(detailResponse){
                            DispatchingResponseToStore(success,data as SuratKeluarSheetType[],detailResponse)
                        }
                        // const currentSuratkeluar = data.find(s=>s.idbaris)
                        return 'Pemanggilan data telah selesai' 
                    },
                    error: `Gagal mengupdate Surat Keluar`,
                    finally(){
                        
                    },
                    closeButton:true,
                }
            )
    }
    return (
        <>
            <div className="flex gap-4 flex-col md:flex-row pt-4 px-2  border-2">
                <div className="relative w-5/12 pt-3 border md:h-72 min-h-72 overflow-y-auto scrol-h-custom">
                    <div className="border-2 border-sky-300 border-dotted rounded-md p-2">
                    <span className="absolute top-0 left-1  bg-white">Preview Surat Tugas:</span>
                        <TableWithScrolling className="table-auto w-full border-none">
                            <tbody>
                                <tr><td colSpan={3} className="text-center">...</td></tr>
                                <tr><td colSpan={3} className="text-center font-extrabold">MEMERINTAHKAN</td></tr>
                                {
                                    data && data.map((m, index)=>
                                        <tr key={m.idbaris +'_'+ index}>
                                            <td className="px-2 align-top">{index+1}.</td>
                                            <td className="px-2 w-4/12">
                                                <ol className="list-none list-inside mt-0 pt-0 mb-2">
                                                    <li className="list-item">Nama</li>
                                                    <li className="list-item">Pangkat/Golongan</li>
                                                    <li className="list-item">NIP</li>
                                                    <li className="list-item">Jabatan</li>
                                                </ol>
                                            </td>
                                            <td className="align-top px-2 w-8/12">
                                                <ul className="list-inside list-none w-full mb-2">
                                                    <li className="border-b border-dotted border-gray-400">:  {m.ptk_nama}</li>
                                                    <li className="border-b border-dotted border-gray-400">:  {m.ptk_golongan}</li>
                                                    <li className="border-b border-dotted border-gray-400">:  {m.ptk_nip}</li>
                                                    <li className="border-b border-dotted border-gray-400">:  {m.ptk_jabatan}</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </TableWithScrolling>
                        
                    </div>
                </div>
                <div className="relative w-7/12 pt-3 border place-items-center md:h-72 min-h-72 overflow-y-auto scrol-h-custom p-2">
                    <div className="border-2 p-4 border-dotted rounded-md border-sky-300">
                        <span className="md:absolute top-0 left-4 bg-white">Ptk Aktif di tanggal ini:</span>
                        <SelectRiwayatIdAkun activeDate={currentData.tglsurat} values={idPtk} setValues={onChangePtk}/>
                    </div>
                </div>
                
            </div>  

            <ModalFooterEdura>
                <div className="flex w-full mt-2 gap-2">
                    <ButtonDeleteAwesome className="px-2 py-0  bg-rose-500"  type='button' onClick={backButton} labelButton="Kembali"  
                        disabled={stateSppd.isSubmitting||stateSuratKeluar.isSubmitting}
                    ><StepBackIcon size={12} className="self-center"/></ButtonDeleteAwesome>
                    <ButtonSaveAwesome className="px-2 py-0 mx-auto"  type='button' onClick={onSubmit} labelButton="Simpan"  
                        disabled={stateSppd.isSubmitting||stateSuratKeluar.isSubmitting}
                    >
                        {
                            // (stateSppd.isSubmitting||stateSuratKeluar.isSubmitting) && <Loader size={12} className="animate-spin self-center"/>
                        }
                    </ButtonSaveAwesome> 
                </div>
            </ModalFooterEdura>
        </>

        
        
    )
} 
