import  { TRowEdura, ThEdura, TdEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import PreviewKunciJawaban from "~/controllers/koleksi-bank-soal/views/preview-kunci-jawaban-pembahasan";
import ItemSoalPreview from "../../components/item-soal-preview";
import type DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class";
import { useMemo } from "react";

type Props = {
    isMultiple:boolean,
    KisiKisiInstance?:DataKisiKisi

}
export default function TableKisiKisi({isMultiple, KisiKisiInstance}:Props){
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
                            <ThEdura className="text-wrap">Indikator Soal</ThEdura>
                            <ThEdura className="text-wrap">No Soal</ThEdura>
                            <ThEdura className="text-wrap">Bentuk Soal</ThEdura>
                            <ThEdura className="text-nowrap">Instrumen Soal</ThEdura>
                            <ThEdura className="text-wrap">Kunci Jawaban/Penskoran</ThEdura>
                        </TRowEdura>
                        
                    ):(
                        <TRowEdura>
                            <ThEdura className="text-wrap">Capaian Pembelajaran</ThEdura>
                            <ThEdura className="text-wrap">Tujuan Pembelajaran</ThEdura>
                            <ThEdura className="text-wrap">Materi Pokok</ThEdura>
                            <ThEdura className="text-wrap">Level Kognitif</ThEdura>
                            <ThEdura className="text-wrap">Indikator Soal</ThEdura>
                            <ThEdura className="text-wrap">No Soal</ThEdura>
                            <ThEdura className="text-wrap">Bentuk Soal</ThEdura>
                            <ThEdura className="text-nowrap">Instrumen Soal</ThEdura>
                            <ThEdura className="text-wrap">Kunci Jawaban/Penskoran</ThEdura>
                        </TRowEdura>

                    )
                }
            </thead>
            <tbody>
                {
                    (KisiKisiInstance && isMultiple) ? (
                            KisikisiMappingMapel.map((mapel, index)=>
                            mapel.dataCp.map((dataCp,iCp)=>
                                dataCp.dataTp.map((dataTp, iTp)=>
                                    dataTp.dataAtp.map((dataAtp, iAtp)=>
                                        dataAtp.dataMateriPokok.map((materi, iMateri)=>
                                            materi.dataSoal.map((soal, iSoal)=>
                                                <TRowEdura key={index +""+iCp+""+iSoal} className="odd:bg-white even:bg-white">
                                                    {
                                                        iCp === 0 && iTp === 0 && iAtp === 0 && iMateri === 0  && iSoal === 0 && (
                                                            <TdEdura rowSpan={mapel.countRow} className="text-wrap">{mapel.mapelName}</TdEdura>

                                                        )
                                                    }{
                                                        iTp === 0 && iAtp === 0 && iMateri === 0  && iSoal === 0 && (
                                                            <TdEdura rowSpan={dataCp.countRow} className="text-wrap"><p className="font-bold">{dataCp.elemen}</p>{dataCp.cp_description} </TdEdura>

                                                        )
                                                    }
                                                    {
                                                        iMateri === 0 && iSoal === 0  && (
                                                            <TdEdura rowSpan={dataAtp.countRow} className="text-wrap">{dataAtp.atp_description}</TdEdura>
                                                            
                                                        )
                                                    }
                                                    {/* <TdEdura  className="text-wrap">TP {dataAtp.atp_description}<br/>{iMateri}</TdEdura> */}
                                                    { iSoal === 0 && <TdEdura className="text-wrap" rowSpan={materi.countRow}>{soal.data_soal?.materi_pokok}</TdEdura>}
                                                    <TdEdura className="text-wrap">{soal.data_soal?.lk}</TdEdura>
                                                    <TdEdura className="text-wrap">{soal.data_soal?.indikator_soal}</TdEdura>
                                                    <TdEdura className="text-wrap">{soal.no_soal}</TdEdura>
                                                    <TdEdura className="text-wrap">{soal.bentuk_soal?.description}</TdEdura>
                                                    <TdEdura className="text-wrap"> <ItemSoalPreview data={soal}/> </TdEdura>
                                                    <TdEdura className="text-wrap">
                                                            {soal.data_soal && <PreviewKunciJawaban data={soal.data_soal}/>}
                                                    </TdEdura>
                                                    
                                                </TRowEdura>
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    ):(
                            KisikisiMappingMapel.map((mapel, index)=>
                            mapel.dataCp.map((dataCp,iCp)=>
                                dataCp.dataTp.map((dataTp, iTp)=>
                                    dataTp.dataAtp.map((dataAtp, iAtp)=>
                                        dataAtp.dataMateriPokok.map((materi, iMateri)=>
                                            materi.dataSoal.map((soal, iSoal)=>
                                                <TRowEdura key={index +""+iCp+""+iSoal} className="odd:bg-white even:bg-white">
                                                    {
                                                        iTp === 0 && iAtp === 0 && iMateri === 0  && iSoal === 0 && (
                                                            <TdEdura rowSpan={dataCp.countRow} className="text-wrap"><p className="font-bold">{dataCp.elemen}</p>{dataCp.cp_description}</TdEdura>

                                                        )
                                                    }
                                                    {
                                                        iMateri === 0 && iSoal === 0  && (
                                                            <TdEdura rowSpan={dataAtp.countRow} className="text-wrap">{dataAtp.atp_description}</TdEdura>
                                                            
                                                        )
                                                    }
                                                    {/* <TdEdura  className="text-wrap">TP {dataAtp.atp_description}<br/>{iMateri}</TdEdura> */}
                                                    { iSoal === 0 && <TdEdura className="text-wrap" rowSpan={materi.countRow}>{soal.data_soal?.materi_pokok}</TdEdura>}
                                                    <TdEdura className="text-wrap">{soal.data_soal?.lk}</TdEdura>
                                                    <TdEdura className="text-wrap">{soal.data_soal?.indikator_soal}</TdEdura>
                                                    <TdEdura className="text-wrap">{soal.no_soal}</TdEdura>
                                                    <TdEdura className="text-wrap">{soal.bentuk_soal?.description}</TdEdura>
                                                    <TdEdura className="text-wrap"> <ItemSoalPreview data={soal}/> </TdEdura>
                                                    <TdEdura className="text-wrap">
                                                            {soal.data_soal && <PreviewKunciJawaban data={soal.data_soal}/>}
                                                    </TdEdura>
                                                    
                                                </TRowEdura>
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