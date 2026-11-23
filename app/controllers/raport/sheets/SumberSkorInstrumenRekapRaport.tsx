import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { KoleksiStrukturInstrumenSkorUI } from "~/domain/raport/infrastructures/builder/KoleksiStrukturWithSourceSkor";

type Props = {
   data:KoleksiStrukturInstrumenSkorUI[],
   keyKompetensi:string
}

export default function SumberSkorInstrumenRekapRaport({data,keyKompetensi}:Props){
   
    return (
        <TableWithScrolling inModal={true} className="text-[10px]">
            <thead>
                <TRowEdura>
                    <ThEdura className="text-wrap">Kompetensi Yang Dipilih ({keyKompetensi.toUpperCase()})</ThEdura>
                    <ThEdura className="text-wrap">Sumber Tagihan (Paket Soal)</ThEdura>
                    <ThEdura className="text-wrap">Bentuk dan Nomor Soal</ThEdura>
                    <ThEdura className="text-wrap">Skor respon</ThEdura>
                    <ThEdura className="text-wrap">Skor validasi</ThEdura>
                    <ThEdura className="text-wrap">Total Skor</ThEdura>
                    <ThEdura className="text-wrap">Nilai Tiap Kompetensi</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                {
                    data.map((struktur, iStruktur)=>
                        struktur.sourceInstrumenSkor.map((perTagihan, iTagihan)=>
                            perTagihan.soalSkor.map((soalSkor, iSoalSkor)=>
                                <TRowEdura key={soalSkor.tagihan.idbaris+'_'+iSoalSkor+'_'+iTagihan+'_'+iStruktur}>
                                    {
                                        iSoalSkor === 0 && iTagihan === 0 && (
                                            <TdEdura className="text-wrap" rowSpan={struktur.countInstrumen}>
                                                [{struktur.idType}] {struktur.description}
                                            </TdEdura>
                                        )
                                    }
                                    {
                                        iSoalSkor === 0 && (
                                            <TdEdura className="text-wrap min-w-24" rowSpan={perTagihan.soalSkor.length}>{perTagihan.tagihan.nama_publikasi}</TdEdura>
                                        )
                                    }
                                    <TdEdura>
                                                 <div className="w-full flex justify-between min-w-24">
                                                     <p>{soalSkor.bentuk_soal}</p>
                                                     <p>No. {soalSkor.no_soal}</p>
                                                 </div>
                                         </TdEdura>
                                         <TdEdura className="text-center">
                                             {soalSkor.skor}
                                         </TdEdura>
                                         <TdEdura className="text-center">
                                             {soalSkor.skorSheetKd}
                                         </TdEdura>
                                        {
                                                iSoalSkor === 0 && iTagihan === 0  && <TdEdura rowSpan={struktur.countInstrumen} className="text-wrap text-center">{struktur.totalSkor}</TdEdura>
                                        }
                                        
                                        {
                                            iSoalSkor === 0 && iTagihan === 0  && <TdEdura rowSpan={struktur.countInstrumen} className="text-wrap text-center">{struktur.skor}</TdEdura>
                                        }
                                </TRowEdura>
                            )
                        )
                        // struktur.sourceItemInstrumenSkor.map((dataSkor, iDataSkor)=>
                        //     <TRowEdura key={struktur.idType + '_'+iStruktur+'_'+iDataSkor}>
                        //         {
                        //              iDataSkor === 0 && <TdEdura rowSpan={struktur.countInstrumen} className="text-wrap">[{struktur.idType}] {struktur.description}</TdEdura>
                        //         }
                        //         <TdEdura className="text-wrap">{dataSkor.tagihan.nama_publikasi}</TdEdura>
                        //         <TdEdura>
                        //                 <div className="w-full flex justify-between min-w-24">
                        //                     <p>{dataSkor.bentuk_soal}</p>
                        //                     <p>No. {dataSkor.no_soal}</p>
                        //                 </div>
                        //         </TdEdura>
                        //         <TdEdura className="text-center">
                        //             {dataSkor.skor}
                        //         </TdEdura>
                        //         <TdEdura className="text-center">
                        //             {dataSkor.skorSheetKd}
                        //         </TdEdura>
                                
                        //         {
                        //             iDataSkor === 0 && <TdEdura rowSpan={struktur.countInstrumen} className="text-wrap text-center">{struktur.totalSkor}</TdEdura>
                        //         }
                                
                        //         {
                        //             iDataSkor === 0 && <TdEdura rowSpan={struktur.countInstrumen} className="text-wrap text-center">{struktur.skor}</TdEdura>
                        //         }
                                
                        //     </TRowEdura>
                        // )
                    )
                }
               
            </tbody>
        </TableWithScrolling>
    )
}
