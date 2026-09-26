import type DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class";
import { getGlobalIndex } from "~/domain/paket-soal/result/create-design";
import IdentitasPaketSoal from "../components/identitas-paket-soal";
import ItemSoalPreview from "../components/item-soal-preview";
import KolomNilaiPaket from "../components/kolom-nilai";
import KopPaketSoal from "../components/kop-paket-soal";
import PetunjukUmumPaketSoal from "../components/petunjuk-umum";
import TableSebaranKompetensiPaketSoal from "../components/sebaran-kompetensi-paket-soal";
import TitleKunciJawabanPembahasan from "./kisi-kisi/title-kunci-jawaban";
import { useExportTarget } from "~/layouts/exports/export-target-provider";
import { StepBackIcon } from "lucide-react";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import ButtonPrintModal from "~/controllers/modal-cetak/control-export-print";
import { useModal } from "~/components/modals/modal-provider";

export default function CetakPaketSoalServer({InstanceDataKisikisi}:{InstanceDataKisikisi:DataKisiKisi}){
     const exportRef = useExportTarget('print-area-modal') as React.Ref<HTMLDivElement>;;
    const {actions} = useModal()
    const setting = InstanceDataKisikisi.dataSetting
    const paketSoal = InstanceDataKisikisi.designPaket
    return (
        <>
            <div className="bg-linear-to-tr from-sky-500 to-purple-300 h-[calc(100dvh-12rem)] md:h-[calc(100dvh-17rem)] lg:h-[calc(100dvh-12rem)] xs:h-[calc(100dvh-2rem)]  overflow-y-auto scrol-h-custom px-2">
                <div ref={exportRef} className="bg-white dark:text-black mx-auto shadow-lg shadow-gray-400  print:bg-white  print:shadow-none p-2">
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
            <ModalFooterEdura>
                <div className="flex w-full mt-2 gap-2">
                    <ButtonDeleteAwesome className="px-2 py-0  bg-rose-500"  type='button' onClick={actions.close} labelButton="Tutup" >
                        <StepBackIcon size={12} className="self-center"/>
                    </ButtonDeleteAwesome>
                    <ButtonPrintModal className="mx-auto px-4 py-0" type="portrait"/>
                </div>
            </ModalFooterEdura>
        </>

    )
}