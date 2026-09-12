import  { TRowEdura, ThEdura, TdEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import PreviewKunciJawaban from "~/controllers/koleksi-bank-soal/views/preview-kunci-jawaban-pembahasan";
import ItemSoalPreview from "../../components/item-soal-preview";
import type DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class";
import { Fragment, useMemo } from "react";

type Props = {
    isMultiple:boolean,
    KisiKisiInstance?:DataKisiKisi

}
export default function TableKisiKisiDanSoal({isMultiple, KisiKisiInstance}:Props){
    const KisikisiMappingMapel = useMemo(()=>{
            if(!KisiKisiInstance)  return [];
            return KisiKisiInstance.generate();
        }, [KisiKisiInstance]);
    return (
        <TableWithScrolling className="text-[10px]" inModal={true}>
            <thead>
                {
                    isMultiple ? (
                        <TRowEdura>
                            <ThEdura className="text-wrap">Mata Pelajaran</ThEdura>
                            <ThEdura className="text-wrap">Capaian Pembelajaran</ThEdura>
                            <ThEdura className="text-wrap">Tujuan Pembelajaran</ThEdura>
                            <ThEdura className="text-wrap">Materi Pokok</ThEdura>
                            <ThEdura className="text-wrap">Level Kognitif</ThEdura>
                            <ThEdura className="text-nowrap">Indikator Soal</ThEdura>
                            <ThEdura className="text-wrap">No Soal</ThEdura>
                            <ThEdura className="text-wrap">Bentuk Soal</ThEdura>
                            
                        </TRowEdura>
                        
                    ):(
                        <TRowEdura>
                            <ThEdura className="text-wrap">Capaian Pembelajaran</ThEdura>
                            <ThEdura className="text-wrap">Tujuan Pembelajaran</ThEdura>
                            <ThEdura className="text-wrap">Materi Pokok</ThEdura>
                            <ThEdura className="text-wrap">Level Kognitif</ThEdura>
                            <ThEdura className="text-nowrap">Indikator Soal</ThEdura>
                            <ThEdura className="text-wrap">No Soal</ThEdura>
                            <ThEdura className="text-wrap">Bentuk Soal</ThEdura>
                        </TRowEdura>

                    )
                }
            </thead>
            <tbody>
                {
                    KisiKisiInstance  && (
                            KisikisiMappingMapel.map((mapel, index)=>
                            mapel.dataCp.map((dataCp,iCp)=>
                                dataCp.dataTp.map((dataTp, iTp)=>
                                    dataTp.dataAtp.map((dataAtp, iAtp)=>
                                        dataAtp.dataMateriPokok.map((materi, iMateri)=>
                                            materi.dataSoal.map((soal, iSoal)=>
                                                <Fragment key={index +""+iCp+""+iSoal}>

                                                    <TRowEdura  className="odd:bg-white even:bg-white">
                                                        {
                                                            isMultiple && <TdEdura className="text-wrap">{mapel.mapelName}</TdEdura>
                                                        }
                                                    <TdEdura className="text-wrap"><p className="font-bold">{dataCp.elemen}</p>{dataCp.cp_description}</TdEdura>
                                                    <TdEdura className="text-wrap">{dataAtp.atp_description}</TdEdura>
                                                    <TdEdura className="text-wrap">{materi.materiPokok}</TdEdura>
                                                    <TdEdura className="text-wrap">{soal.data_soal?.lk}</TdEdura>
                                                        <TdEdura className="text-wrap">{soal.data_soal?.indikator_soal}</TdEdura>
                                                        <TdEdura className="text-wrap">{soal.no_soal}</TdEdura>
                                                        <TdEdura className="text-wrap">{soal.bentuk_soal?.description}</TdEdura>
                                                    </TRowEdura>
                                                    <TRowEdura>

                                                        <TdEdura className="text-wrap" colSpan={isMultiple?8:7}> 
                                                            <ItemSoalPreview data={soal}/> 
                                                            {
                                                                soal.data_soal && <PreviewKunciJawaban data={soal.data_soal} className=" rounded-2xl p-2 shadow shadow-slate-400 mt-2"/>
                                                            }
                                                        </TdEdura>
                                                        
                                                    </TRowEdura>
                                                </Fragment>
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                }
            </tbody>
        </TableWithScrolling>
    )
}