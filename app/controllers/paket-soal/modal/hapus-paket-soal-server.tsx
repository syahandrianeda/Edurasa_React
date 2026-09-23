import { TriangleAlert } from "lucide-react";
import PratinjauItemSoalModal from "~/controllers/koleksi-bank-soal/views/pratinjau-soal-di-modal";
import type DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class";
import { getGlobalIndex } from "~/domain/paket-soal/result/create-design";
import IdentitasPaketSoal from "../components/identitas-paket-soal";
import ItemSoalPreview from "../components/item-soal-preview";
import KolomNilaiPaket from "../components/kolom-nilai";
import KopPaketSoal from "../components/kop-paket-soal";
import PetunjukUmumPaketSoal from "../components/petunjuk-umum";
import TableSebaranKompetensiPaketSoal from "../components/sebaran-kompetensi-paket-soal";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import type{ PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal";
import { Navigate, redirect, useNavigate } from "react-router";
import { useModal } from "~/components/modals/modal-provider";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";
import {toast} from 'sonner';
import { useCrudPaketSoalProvider } from "../crud/paket-soal-crud-provider";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import type { PaketSoalSheetType } from "~/types/bank-soal/entities/paket-soal-sheet-type";

export default function HapusPaketSoalServer({InstanceDataKisikisi}:{InstanceDataKisikisi:DataKisiKisi}){
    
    const paketSoal = InstanceDataKisikisi.designPaket;
    const {actions} = useModal();
    const setting = paketSoal.setting;
    const {actions:post} = useCrudPaketSoalProvider()
    

    const HapusPaketSoal = ()=>{
       console.log('akan menghapus id', setting?.idbaris ?? 0);
       const idbaris=setting?.idbaris ?? 0
       const param = {idbaris, status:'hapus'};

        toast.promise(
            post.update(param),
            {
                loading:'Sedang menghapus paket soal',
                success: (respon)=>{
                    const {success, data, detailResponse} = respon;
                    DispatchingResponseToStore(success, data as PaketSoalSheetType[], detailResponse!);
                    actions.close();
                    return 'berhasil menghapus';
                },
                error:(er)=>{
                    return 'Gagal Menghapus'
                }
            }
        )
        
    }
    return (
        <>
            <div className="border-2 md:h-[calc(100vh-12rem)] border-black flex flex-col md:flex-row bg-rose-200">
                <div className="border border-rose-400 justify-items-stretch flex-1 m-2 bg-linear-to-bl from-sky-300 via-rose-300 to-purple-300 rounded-2xl shadow-sm shadow-rose-300 flex flex-col justify-center items-center">
                    <div className="text-2xl font-extrabold text-center">
                        <TriangleAlert size={72} className="text-rose-500 mx-auto"/>
                        Anda yakin akan menghapus Paket Soal ini?
                    </div>
                    <div className="text-xs p-4 text-center">
                        <p><strong>{setting?.identitas?.nama}</strong></p>
                    </div>
                </div>
                <div className="border border-black flex-1 flex flex-col m-2 p-2 overflow-y-hidden bg-linear-to-bl from-sky-300 via-rose-300 to-purple-300 rounded-2xl shadow-sm shadow-rose-300">
                    <div className="border bg-white dark:text-black p-2  text-wrap zoom-50">
                        {
                            (setting?.identitas && setting.identitas.showKop && setting?.dataKopCustom) && (
                                <KopPaketSoal data={setting?.dataKopCustom}/>
                            )
                        }
                        {
                            (setting?.identitas && setting.identitas.showIdentitas && setting.koleksi_mapel && setting.target_paket) && (
                                <IdentitasPaketSoal data={setting.identitas} mapel={setting.koleksi_mapel} />
                            )
                        }
                        
                        {
                            (setting?.identitas && setting.identitas.showKolom) && (
                                <KolomNilaiPaket/>
                            )
                        }
        
                            <ol className="list-[upper-alpha] list-outside marker:font-bold pl-5 align-top">
                                    {
                                        (setting?.identitas && setting.identitas?.showSebaranTp) && (
                                                <li><strong className="uppercase">Sebaran Kompetensi Butir Soal</strong>
                                                    {
                                                        (setting?.identitas && setting.identitas.showSebaranTp && paketSoal) && (
                                                            <TableSebaranKompetensiPaketSoal paketSoal={paketSoal}/>
                                                        )
        
                                                    }
                                                        
                                                    
                                                </li>
                                        )
                                    }
                                    {
                                        (setting?.identitas && setting.identitas.showPetunjuk) && (
                                            <li><strong>PETUNJUK UMUM</strong>
                                            <PetunjukUmumPaketSoal/>
                                            </li>
                                        )
                                    }
                                    {
                                        (setting?.identitas && setting?.count_bentuk_soal && setting?.count_bentuk_soal.length>0) && (
                                            <li>
                                                <strong>PETUNJUK KHUSUS</strong>
                                                <ol className="list-[upper-roman] list-outside ps-4">
        
                                                    {
                                                        setting?.count_bentuk_soal?.map((soal, indexBentuk) => {
                                                            
                                                            const cekStartNumber = paketSoal?.data?.[indexBentuk]?.startNumber
                                                            const dataSoal =  paketSoal?.data?.find( item => item.bentukSoal.name === soal.dataBentukSoal.name ) ?.dataSoal;
                                                            
                                                            return (
                                                                    <li key={indexBentuk}>{soal.description}
                                                                        <ol start={cekStartNumber} className="list-decimal ps-4 marker:font-normal">
                                                                            {Array.from(
                                                                                { length: soal.count },
                                                                                (_, indexSoal) => {
        
                                                                                    const globalIndex = getGlobalIndex(
                                                                                        setting!,
                                                                                        indexBentuk,
                                                                                        indexSoal
                                                                                    )
        
                                                                                    const dataItem = dataSoal?.find(
                                                                                        item => item.index === globalIndex
                                                                                    )
        
                                                                                    return (
                                                                                        <li
                                                                                            key={indexSoal}
                                                                                            
                                                                                            className="cursor-pointer align-top mb-3"
                                                                                        >
                                                                                            
                                                                                            {
        
                                                                                                dataItem
                                                                                                    ? 
                                                                                                        <ItemSoalPreview data={dataItem}/>
                                                                                                    : <p className="text-rose-600">Klik untuk mengambahkan item soal <strong>{soal.dataBentukSoal.description}</strong></p>
                                                                                            }
        
                                                                                        </li>
                                                                                    )
                                                                                }
                                                                            )}
                                                                        </ol>
                                                                    </li>
                                                                )
                                                            }
                                                        )
                                                    }
                                                </ol>
                                            </li>
                                        )
                                    }
                            </ol>
                    </div>
                </div>
            </div>
            <ModalFooterEdura>
                <ButtonDeleteAwesome labelButton="Hapus Paket Soal" onClick={HapusPaketSoal} className="px-4 py-0"/>
            </ModalFooterEdura>
        </>
                    
    )
}