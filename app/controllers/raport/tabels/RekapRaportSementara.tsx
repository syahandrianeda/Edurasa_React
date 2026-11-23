import { useCallback, useState } from "react";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { DataRaportView, ListRaportSiswaUi } from "~/pages/penilaian/DataRaportView";
import type { DataRekapRaportSementaraSheetPreview } from "../sheets/SheetDetailRekapRaportSementara";
import SheetDetailRekapRaportSementara from "../sheets/SheetDetailRekapRaportSementara";
import { cn } from "~/lib/utils";

type Props={
    dataRaport?:DataRaportView
}


export default function RekapRaportSementara({dataRaport}:Props){
    const [selectedSheet, setSelectedSheet] = useState<DataRekapRaportSementaraSheetPreview|null>(null);
    
    const handleSheet = useCallback((dataItem: ListRaportSiswaUi )=>{
        if(!dataRaport) return;
        const keyStruktur = dataRaport.keyStruktur;
        const keySelected = dataRaport.keySelected;
        const source = dataRaport.source;
        const sourceTagihan = dataRaport.sourceTagihan
        const {siswa, data, nilaiRaport, skor, keyKompetensi, sumberMaxMin} = dataItem;
        setSelectedSheet({
            keyStruktur,
            keySelected,
            data:dataItem,
            source,
            sourceTagihan


        })
    },[dataRaport])
    return (
        <>
            <TableWithScrolling  className='text-xs'>
                <thead>
                    <TRowEdura>
                        <ThEdura rowSpan={2}>No</ThEdura>
                        <ThEdura className="max-w-8" rowSpan={2}>NIS</ThEdura>
                        <ThEdura className="max-w-9" rowSpan={2}>NISN</ThEdura>
                        <ThEdura rowSpan={2}>Nama Siswa</ThEdura>
                        <ThEdura rowSpan={2} className="text-wrap max-w-12">Nilai Akhir</ThEdura>
                        <ThEdura colSpan={(dataRaport?.keyKompetensi?.length ?? 1)}>Nilai Tiap Kompetensi</ThEdura>
                    </TRowEdura>
                    <TRowEdura> 
                       {
                        dataRaport?.keyKompetensi?.map((keyKom, iKeyKom)=>
                            <ThEdura key={keyKom.kompetensiSelected+'_'+iKeyKom}>{keyKom.kompetensiSelected} {keyKom.idKompetensi}</ThEdura>
                        )
                       }
                    </TRowEdura>
                </thead>
                <tbody>
                    {
                        dataRaport ? (dataRaport?.listRaportSiswa?.map((data, iData)=>
                            <TRowEdura 
                                key={data.siswa?.id}
                                onClick={()=>{
                                    handleSheet(data)
                                }}
                            >
                                <TdEdura className="text-center">{iData+1}.</TdEdura>
                                <TdEdura className="text-center">{data.siswa.nis}</TdEdura>
                                <TdEdura className="text-center">{data.siswa.nisn}</TdEdura>
                                <TdEdura>{data.siswa.pd_nama}</TdEdura>
                                <TdEdura className="text-center">{data.nilaiRaport?.toFixed(0)}</TdEdura>
                                {
                                    data.sumberMaxMin.map((dataStruktur, iData)=>
                                        <TdEdura key={dataStruktur.type+'_'+iData} className={cn("text-center", dataStruktur.isMax?'bg-green-300':'', dataStruktur.isMin?'bg-rose-300':'')}>
                                            {
                                                dataStruktur.skor
                                            }
                                        </TdEdura>
                                    )
                                }
                              
                            </TRowEdura>
                        )):(
                            <TRowEdura>
                                <TdEdura colSpan={6} className="text-center">Data tidak tersedia</TdEdura>
                            </TRowEdura>
                        )
                    }
                </tbody>
            </TableWithScrolling>
            <SheetDetailRekapRaportSementara 
                item={selectedSheet}
                open ={selectedSheet!==null}
                onOpenChange={open => {
                    if (!open) {
                        setSelectedSheet(null);
                    }
                }}
            />
        </>
    )
}