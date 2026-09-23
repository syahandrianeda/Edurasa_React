import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type TagihanPenilaianClass from "~/domain/penilaian/infrastucture/tagihan-penilian-class";
import type { SebaranTagihanAssesmenKurikulumType } from "~/domain/penilaian/type/sebaran-tagihan-kuriklum-type";

export default function TableTagihanKompetensi({data, showIdentitas=true}:{data?:SebaranTagihanAssesmenKurikulumType[], showIdentitas?:boolean}){
    // const data = instansiasi?.dataSebaranTagihanKurikulum;
    
    return (
        <TableWithScrolling className="text-[10px]">
            <thead>
                <TRowEdura>
                    {/* <ThEdura rowSpan={2}>Aksi</ThEdura> */}
                    <ThEdura rowSpan={2}>Mata Pelajaran</ThEdura>
                    <ThEdura rowSpan={2}>CP</ThEdura>
                    <ThEdura rowSpan={2}>TP</ThEdura>
                    <ThEdura rowSpan={2}>ATP</ThEdura>
                    <ThEdura colSpan={3} className="text-wrap">Sebaran Kompetensi di Tagihan</ThEdura>
                </TRowEdura>
                <TRowEdura>
                    <ThEdura className="text-wrap">Harian (Termasuk Praktek, Proyek, Produk)</ThEdura>
                    <ThEdura className="text-wrap">Mid Semester</ThEdura>
                    <ThEdura className="text-wrap">Akhir Semester</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                {
                    data && data.map((mapel, iMapel)=>
                        mapel.dataCp.map((cp, iCp)=>
                            cp.dataTp.map((tp, iTp)=>
                                tp.dataAtp.map((atp, iAtp)=>
                                    <TRowEdura key={iMapel+'_'+iCp+"_"+iTp+"_"+iAtp}>
                                        {
                                            (iCp === 0 && iTp === 0 && iAtp === 0) && (
                                                <>
                                                <TdEdura className="text-wrap" rowSpan={mapel.slotMapel}>{mapel.mapelName}</TdEdura>
                                                
                                                </>
                                                
                                            )
                                        }
                                        {
                                            (iTp === 0 && iAtp === 0 )&& (
                                                <TdEdura className="text-wrap" rowSpan={cp.slotCp}>{cp.cp_description}</TdEdura>
                                            )
                                        }
                                        {
                                            (iAtp === 0) && (
                                                <TdEdura className="text-wrap" rowSpan={tp.slotTp}>{tp.tp_description}</TdEdura>
                                            )
                                        }
                                        <TdEdura className="text-wrap">{atp.atp_description}</TdEdura>
                                        <TdEdura>
                                            {
                                                atp.dataTagihan.find(s=>s.kategori === 'harian')?.dataInstrumen?.map((harian, iHarian)=>
                                                    <p key={iHarian}>({harian.countInstrumen} soal) {showIdentitas && harian.identitas}</p>
                                                )
                                            }
                                        </TdEdura>
                                        <TdEdura>
                                            {
                                                atp.dataTagihan.find(s=>s.kategori === 'mid_semester')?.dataInstrumen?.map((harian, iHarian)=>
                                                    <p key={iHarian}>({harian.countInstrumen} soal) {showIdentitas && harian.identitas}</p>
                                                )
                                            }
                                        </TdEdura>
                                        <TdEdura>
                                            
                                            {
                                                atp.dataTagihan.find(s=>s.kategori === 'akhir_semester')?.dataInstrumen?.map((harian, iHarian)=>
                                                    <p key={iHarian}>({harian.countInstrumen} soal) {showIdentitas &&  harian.identitas}</p>
                                                )
                                            }
                                        
                                        </TdEdura>
                                    </TRowEdura>
                                )
                            )
                        )
                    )
                }
                
            </tbody>
        </TableWithScrolling>
    )
}