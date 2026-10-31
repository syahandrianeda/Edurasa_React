import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "~/components/ui/sheet";
import type { FormatKategoriAssesmenTable } from "../toolbar/FormatKategoriAssesmenTable";
import type { DataSiswaBasedMapelInResponAllKategoriTagihanInterface } from "~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/DataSiswaBasedMapelInResponAllKategoriTagihanInterface";
import { namaSumber } from "./namaSumber";
import DefinitionSumber from "./DefintionSource";
import type { KoleksiPublikasiPaketPerMapel } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/StrukturKurikulumMapper";
import CardKalkulasiSkorSheet from "./CardKalkulasiSkorSheet";
import type { KategoriTagihanType } from "~/domain/kategori-tagihan/types/entities/KategoriTagihanType";
import { nameOfKategoriTagihan } from "~/domain/kategori-tagihan/builder/KategoriTagihanRaportCollections";
import TbodyDetailResponSiswa from "./TbodyDetailResponSiswa";
import TbodyDetailSkorSheetKd from "./TbodyDetailSkorSheetKd";

export type SheetPreview = {
    source:FormatKategoriAssesmenTable,
    type:KategoriTagihanType,
    tagihanMapel: KoleksiPublikasiPaketPerMapel[],
    data:DataSiswaBasedMapelInResponAllKategoriTagihanInterface
}

interface Props {
    item: SheetPreview|null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

;
export default function SheetDetailAccumalatorRekap({
    item,
    open,
    onOpenChange,
}: Props) {
    console.log({item});
    
    if (!item) {
        return null;
    }return(
        <Sheet open={open} onOpenChange={onOpenChange} >
            <SheetContent side="right" className=" w-full overflow-y-auto sm:max-w-xl scrol-h-custom" >
                <SheetHeader>
                    <SheetTitle className="capitalize">
                        Proses Kalkulasi Nilai <strong>{item.data.namaSiswa.toLowerCase()}</strong> dari Sumber {namaSumber(item.source)} 
                    </SheetTitle>

                    <SheetDescription className="text-[10px]">
                        <DefinitionSumber source={item.source}/>
                    </SheetDescription>

                </SheetHeader>
                <div className="space-y-4 px-4 pb-6">
                    <h3 className="mb-0">{nameOfKategoriTagihan(item.type)} Mata Pelajaran {item.data?.mapel?.mapelName}</h3>
                    <h4>Sumber data Tagihan/Instrumen Penilaian</h4>
                    <TableWithScrolling inModal={true} className="text-[10px]">
                        <thead>
                            <TRowEdura>
                                <ThEdura>Nama Publikasi</ThEdura>
                                <ThEdura>Pelaksanaan</ThEdura>
                                <ThEdura className="text-wrap">Sebagai Peserta</ThEdura>
                                <ThEdura className="text-wrap max-w-30">Jumlah Soal/Instrumen</ThEdura>
                            </TRowEdura>
                        </thead>
                        <tbody>
                            {
                                item.tagihanMapel?.map((sumberTagihan, iSumberTagihan)=>
                                    <TRowEdura key={sumberTagihan.idbaris}>
                                        <TdEdura className="text-wrap">{sumberTagihan.namaPublikasi}</TdEdura>
                                        <TdEdura className="text-wrap">
                                            <p>{sumberTagihan.detail?.start_time.toLocaleString('id-ID',{dateStyle:'full'})}</p>
                                            <p>Pukul: {sumberTagihan.detail?.start_time.toLocaleString('id-ID',{timeStyle:'long'})}</p>
                                        </TdEdura>
                                        <TdEdura className="text-center">
                                            {
                                                sumberTagihan.detail?.peserta?.some(siswa=>siswa.id === item.data.idSiswa)?
                                                (<strong>Ya</strong>)
                                                :'Tidak'
                                            }
                                        </TdEdura>
                                        <TdEdura className="text-center">{ sumberTagihan.detail?.sebaranNoSoalFromPropertyKurikulumWithScore?.data?.find(s=>s.kodeMapel === item.data.mapel?.kodeMapel)?.jumlahSoalDinilai } </TdEdura>
                                    </TRowEdura>
                                )
                            }
                        </tbody>
                    </TableWithScrolling>
                    <CardKalkulasiSkorSheet 
                        jumlahInstrumen={item.data.mapel?.countSoalMapel ?? null}
                        jumlahSkor={item.data.mapel?.totalMapel ?? null}
                        skor={item.source === 'responSiswa'?(item.data.mapel?.skorMapel ?? null):(item.data?.mapel?.skorMapel_sheet ?? null)}
                        fokus={"Mapel "+item.data?.mapel?.mapelName}
                    >
                        <div className="text-center font-extrabold text-[10px] mb-0 leading-1">Nilai Akhir</div>
                        <div className="text-center font-extrabold text-[10px]">{item.data?.mapel?.mapelName}</div>
                    </CardKalkulasiSkorSheet>
                    <TableWithScrolling inModal={true} className="text-[10px]">
                        <thead>
                            <TRowEdura>
                                <ThEdura>Alur Tujuan Pembalajaran</ThEdura>
                                <ThEdura>Tujuan Pembalajaran</ThEdura>
                                <ThEdura>Capaian Pembelajaran</ThEdura>
                                
                            </TRowEdura>
                        </thead>
                        {
                            item.source === 'responSiswa' ? (
                                <TbodyDetailResponSiswa dataCp={item.data?.mapel?.dataCp}/>
                            ):(
                                <TbodyDetailSkorSheetKd dataCp={item.data?.mapel?.dataCp_sheet}/>

                            )
                        }
                    </TableWithScrolling>
                </div>
                </SheetContent>
        </Sheet>
    )
}