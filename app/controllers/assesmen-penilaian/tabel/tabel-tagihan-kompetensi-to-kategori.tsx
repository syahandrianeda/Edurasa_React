import { Fragment, useState } from "react";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type TagihanPenilaianClass from "~/domain/penilaian/infrastucture/tagihan-penilian-class";
import type { SebaranTagihanAssesmenKurikulumType } from "~/domain/penilaian/model/sebaran-tagihan-kuriklum-type";
import type { CollactionMapelInAllPublikasiPaketType, DataSkorSiswaByInstrumenType, DetailPublikasiWithResponSiswaType } from "~/domain/penilaian/type/CountInstrumenSoalTiapAtpInPublikasiPaketType";
import { cn } from "~/lib/utils";
import DetailResponsKdSelectedSheet from "../sheet/detail-respons-kd-selected";

export default function TableTagihanKompetensi({data, showIdentitas=true}:{data?:CollactionMapelInAllPublikasiPaketType[], showIdentitas?:boolean}){
    // const data = instansiasi?.dataSebaranTagihanKurikulum;
    const [selectedRespons, setSelectedRespons] = useState<DetailPublikasiWithResponSiswaType|null>(null)
    
    return (
        <>
        <TableWithScrolling className="text-[10px]">
            <thead>
                <TRowEdura>
                    {/* <ThEdura rowSpan={2}>Aksi</ThEdura> */}
                    <ThEdura rowSpan={2} className="min-w-46">Mata Pelajaran</ThEdura>
                    <ThEdura rowSpan={2} className="min-w-46">Capaian Pembelajaran</ThEdura>
                    <ThEdura rowSpan={2} className="min-w-46">Tujuan Pembelajaran</ThEdura>
                    <ThEdura rowSpan={2} className="min-w-46">Alur Tujuan Pembelajaran</ThEdura>
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
                                    <TRowEdura key={iMapel+'_'+iCp+"_"+iTp+"_"+iAtp} className={cn("", cp.cp_id===0?'odd:bg-rose-300 even:bg-rose-300':'bg-inherit')}>
                                        {
                                            (iCp === 0 && iTp === 0 && iAtp === 0) && (
                                                <>
                                                <TdEdura className="text-wrap" rowSpan={mapel.slotRow}>{mapel.mapelName}</TdEdura>
                                                
                                                </>
                                                
                                            )
                                        }
                                        {
                                            (iTp === 0 && iAtp === 0 )&& (
                                                <TdEdura className="text-wrap" rowSpan={cp.slotRow}>{cp.cp_description}</TdEdura>
                                            )
                                        }
                                        {
                                            (iAtp === 0) && (
                                                <TdEdura className="text-wrap" rowSpan={tp.slotRow}>{tp.tp_description}</TdEdura>
                                            )
                                        }
                                        <TdEdura className="text-wrap">[{atp.atp_id}] {atp.atp_description}</TdEdura>
                                        {
                                            atp.dataTipeAssesmen.filter(s=>['harian', 'mid_semester','akhir_semester'].includes(s.tipe_assesmen)).map((assesmen, iAssesmen)=>
                                                <TdEdura key={assesmen.tipe_assesmen} className="min-w-32">
                                                    {
                                                        assesmen.DetailPublikasiWithResponSiswa.length > 0 && (
                                                            <ol className="list-decimal ps-6 list-outside">
                                                                {
                                                                    assesmen.DetailPublikasiWithResponSiswa.map((sebaran, iSebaran)=>
                                                                        <li key={sebaran.atp_id+'_'+iSebaran} className="mb-2">
                                                                            <div className="flex w-full justify-between border-b">
                                                                                <p>{sebaran.namaPublikasi}</p>
                                                                                <p>({sebaran.mapelNaskah})</p>
                                                                            </div>
                                                                            <div className="flex w-full justify-between border-b">
                                                                                <p className="font-bold">Jumlah Instrumen</p>
                                                                                <p>{sebaran.counstInstrumen} Soal</p>
                                                                            </div>
                                                                            <ol className="list-outside ps-4 list-disc">
                                                                                {
                                                                                    sebaran.dataSoalNaskah.map((detailNaskah, iDetailNaskah)=>
                                                                                        <li key={detailNaskah.bentukSoal+"_"+iDetailNaskah}>
                                                                                            <div className="flex w-full justify-between border-b">
                                                                                                <p>{detailNaskah.bentukSoal.description} </p>
                                                                                                <p>{detailNaskah.koleksiNoSoal.length} soal</p>
                                                                                            </div>
                                                                                            <div className="flex w-full justify-between border-b">
                                                                                                <p>No Soal </p>
                                                                                                <p className="max-w-2/3 text-wrap text-end">{detailNaskah.koleksiNoSoal.join(', ')}</p>
                                                                                            </div>
                                                                                        </li>
                                                                                    )
                                                                                }
                                                                            </ol>
                                                                            <div className="flex w-full justify-between border-b">
                                                                                <p className="font-bold">Respon</p>
                                                                                {
                                                                                    sebaran.dataResponSiswa.length === 0 ?
                                                                                    (
                                                                                        <p className="font-bold text-rose-500">Tidak ada yang menjawab</p>
                                                                                    ):(
                                                                                        
                                                                                            <p>{sebaran.dataResponSiswa.length} Siswa</p>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                            {
                                                                                sebaran.dataResponSiswa.length >0 && (
                                                                                    <div className="flex w-full justify-end border-b">
                                                                                        <p className="font-bold" onClick={()=>setSelectedRespons(sebaran)}>lihat selengkapnya</p>
                                                                                        
                                                                                    </div>

                                                                                )
                                                                            }
                                                                        </li>
                                                                    )
                                                                }
                                                            </ol>
                                                        )
                                                    }
                                                </TdEdura>
                                            )
                                        }
                                       
                                    </TRowEdura>
                                )
                            )
                        )
                    )
                }
                
            </tbody>
        </TableWithScrolling>
        <DetailResponsKdSelectedSheet
            item={selectedRespons}
            open={selectedRespons !==null}
            onOpenChange={open => {
                    if (!open) {
                        setSelectedRespons(null);
                    }
                }}
        />
        </>
    )
}