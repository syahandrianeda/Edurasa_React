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

export default function EditPaketSoalServer({InstanceDataKisikisi}:{InstanceDataKisikisi:DataKisiKisi}){
    const {updateExtra} = useFilterContext<PaketSoalDesign>()
    const paketSoal = InstanceDataKisikisi.designPaket;
    const {actions} = useModal();
    const setting = paketSoal.setting;
    const navigate = useNavigate();

    const EditPaketSoal = ()=>{
       updateExtra((draft) => {
            Object.assign(draft, paketSoal);
        });
        actions.close();
        navigate("/bank-soal/create-paket-soal", { replace: true });
        // redirect('bank-soal/create-paket-soal');
        
    }
    return (
        <>
            <div className="border-2 h-[calc(100vh-12rem)] border-black flex bg-rose-200">
                <div className="border border-rose-400 justify-items-stretch flex-1 m-2 bg-linear-to-bl from-sky-300 via-rose-300 to-purple-300 rounded-2xl shadow-sm shadow-rose-300 flex flex-col justify-center items-center">
                    <div className="text-2xl font-extrabold text-center">
                        <TriangleAlert size={72} className="text-rose-500 mx-auto"/>
                        Silakan Edit Paket Soal ini
                    </div>
                    <div className="text-xs p-4 text-center">
                        Pengeditan Naskah Paket Soal akan mempengaruhi data paket soal yang telah dipublikasikan. Apalagi naskah yang telah dipublish dan dikerjakan siswa.
                        <p><strong> Anda akan diarahkan ke laman BUAT PAKET SOAL</strong></p>
                    </div>
                </div>
                <div className="border border-black flex-1 flex flex-col m-2 p-2 bg-linear-to-bl from-sky-300 via-rose-300 to-purple-300 rounded-2xl shadow-sm shadow-rose-300">
                    <div className="border bg-white dark:text-black p-2 overflow-y-hidden text-wrap zoom-50">
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
                <ButtonCommitAwesome labelButton="Edit Paket Soal" onClick={EditPaketSoal} className="px-4 py-0"/>
            </ModalFooterEdura>
        </>
                    
    )
}