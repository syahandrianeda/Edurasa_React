import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "~/components/ui/sheet";
import type { DataSkorSiswaByInstrumenType, DetailPublikasiWithResponSiswaType } from "~/domain/penilaian/type/CountInstrumenSoalTiapAtpInPublikasiPaketType";

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
                        Data siswa Yang merespon untuk kompoetensi ini (id={item.atp_id})
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
                                <ThEdura rowSpan={2}>Nama Siswa</ThEdura>
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
                                            <ThEdura key={naskah.bentukSoal.name + '_'+noSoal}>{noSoal}</ThEdura>
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
                                        <TdEdura>{respon.siswa_id}</TdEdura>
                                        <TdEdura>{respon.namaSiswa}</TdEdura>
                                        {
                                            respon.dataPerBentukSoal.map((nilaiSkor, iNilai)=>
                                                nilaiSkor.data.map((itemNilai, iItem)=>
                                                    <TdEdura key={nilaiSkor.bentukSoal+'_'+iNilai+'_'+itemNilai.noSoal} className="text-center">{itemNilai.skor}</TdEdura>
                                                )
                                            )
                                        }
                                        <TdEdura className="text-center font-bold">{respon.total}</TdEdura>
                                        <TdEdura className="text-center font-bold">{respon.skor}</TdEdura>
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