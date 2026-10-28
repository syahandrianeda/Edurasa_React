import { TdEdura, TdEduraFreeze, ThEdura, THEduraFreeze, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "~/components/ui/sheet";
import type { DataSkorSiswaByInstrumenType } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/DataSkorSiswaByInstrumenType";
import type { DetailPublikasiWithResponSiswaType } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/DetailPublikasiWithResponSiswaType";

interface Props {
    item: DetailPublikasiWithResponSiswaType|null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DetailResponsKdSelectedSheet({
    item,
    open,
    onOpenChange,
}: Props) {

    if (!item) {
        return null;
    }return(
        <Sheet open={open} onOpenChange={onOpenChange} >
            <SheetContent side="right" className=" w-full overflow-y-auto sm:max-w-xl" >
                <SheetHeader>
                    <SheetTitle>
                        Data siswa Yang merespon untuk kompetensi ini (id={item.atp_id})
                    </SheetTitle>

                    <SheetDescription>
                        Berikut daftar dan skor yang merespon instrumen soal yang ditandai sebagai Atp ini.
                    </SheetDescription>

                </SheetHeader>
                <div className="space-y-4 px-4 pb-6">
                    <TableWithScrolling className="text-[8px]">
                        <thead>
                            <TRowEdura>
                                <ThEdura rowSpan={2}>No</ThEdura>
                                <ThEdura rowSpan={2} className="text-wrap max-w-5">Token Siswa</ThEdura>
                                <THEduraFreeze stateFreeze={true} rowSpan={2}>Nama Siswa</THEduraFreeze>
                                <ThEdura rowSpan={2} className="text-wrap max-w-12">Kelas</ThEdura>
                                {
                                    item.dataSoalNaskah.map((naskah, iNaskah)=>
                                        <ThEdura key={naskah.bentukSoal.name} colSpan={naskah.koleksiNoSoal.length}>{naskah.bentukSoal.description}</ThEdura>
                                    )
                                }
                                <ThEdura rowSpan={2}>Total</ThEdura>
                                <ThEdura rowSpan={2}>Skor</ThEdura>
                            </TRowEdura>
                            <TRowEdura>
                                {
                                    item.dataSoalNaskah.map((naskah, iNaskah)=>
                                        naskah.koleksiNoSoal.map((noSoal, iNoSoal)=>
                                            <ThEdura key={naskah.bentukSoal.name + '_'+noSoal}>{noSoal}{naskah.bentukSoal.name==='pg' && (<p>{naskah.koleksiJawaban[iNoSoal]}</p>)}</ThEdura>
                                        )
                                    )
                                }
                            </TRowEdura>
                        </thead>
                        <tbody>
                            {
                                item.dataResponSiswa.map((respon, iRespon)=>
                                    <TRowEdura key={respon.siswa_id}>
                                        <TdEdura>{iRespon+1}</TdEdura>
                                        <TdEdura className="text-center">{respon.siswa_id}</TdEdura>
                                        <TdEduraFreeze stateFreeze={true}>{respon.namaSiswa}</TdEduraFreeze>
                                        <TdEdura className="text-center">{respon.rombel}</TdEdura>
                                        {
                                            respon.dataPerBentukSoal.map((nilaiSkor, iNilai)=>
                                                nilaiSkor.data.length > 0 ? (nilaiSkor.data.map((itemNilai, iItem)=>
                                                    <TdEdura key={nilaiSkor.bentukSoal+'_'+iNilai+'_'+itemNilai.noSoal} className="text-center">
                                                        {
                                                            nilaiSkor.bentukSoal === 'pg'?  (
                                                                <div className="flex w-ful justify-between"><span>{itemNilai.responJawaban}</span><span>{itemNilai.skor}</span></div>
                                                            ):itemNilai.skor 
                                                        }
                                                    </TdEdura>
                                                )):(
                                                    <TdEdura key={nilaiSkor+"_"+iNilai} colSpan={respon.countSoal}>Respon Tidak ada</TdEdura>
                                                )
                                            )
                                        }
                                        <TdEdura className="text-center font-bold">{item.atp_id===0 ?null: respon.total}</TdEdura>
                                        <TdEdura className="text-center font-bold">{item.atp_id===0 ?null: respon.skor}</TdEdura>
                                    </TRowEdura>
                                )
                            }
                        </tbody>
                    </TableWithScrolling>
                </div>
                
                
                

            </SheetContent>
        </Sheet>
    )
}