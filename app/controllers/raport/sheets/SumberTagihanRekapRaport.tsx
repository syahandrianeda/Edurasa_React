import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { DataRekapRaportSementaraSheetPreview } from "./SheetDetailRekapRaportSementara";
import { useCallback } from "react";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import { nameOfKategoriTagihan } from "~/domain/kategori-tagihan/builder/KategoriTagihanRaportCollections";

export default function SumberTagihanRekapRaport({ item }: { item: DataRekapRaportSementaraSheetPreview|null }){
    
    const totalYangDirespon = useCallback((sumberTagihan:TagihanHasDataResponse)=>{
        if(item?.source === 'responSiswa'){
            const test= sumberTagihan.data_response_bySiswa?.find(s=>s.siswa.id ===  item?.data?.siswa?.id)?.data?.at(-1)?.respon.filter(s=>s.atp_soal?.kodemapel === item?.data?.data?.mapel?.kode).length ;//.filter(ss=>ss.respon!==null).flatMap(n=>n.respon.map(r=>r.respon !==null)).length 
            return sumberTagihan.data_response_bySiswa?.find(s=>s.siswa.id ===  item?.data?.siswa?.id)?.data?.at(-1)?.respon.filter(s=>s.atp_soal?.kodemapel === item?.data?.data?.mapel?.kode).length ?? 0;//.filter(ss=>ss.respon!==null).flatMap(n=>n.respon.map(r=>r.respon !==null)).length 
        }
        
        if(sumberTagihan.peserta.some(s=>s.id === item?.data?.siswa?.id )){
            return sumberTagihan.sebaranNoSoalFromPropertyKurikulumWithScore?.data?.find(s=>s.kodeMapel === item?.data.data?.mapel?.kode)?.jumlahSoalDinilai
        }
        return '-'
    },[item?.data?.siswa?.id, item?.source])
    
    return (
        <TableWithScrolling inModal={true} className="text-[10px]">
            <thead>
                <TRowEdura>
                    <ThEdura>Jenis Assesmen</ThEdura>
                    <ThEdura>Nama Publikasi</ThEdura>
                    <ThEdura>Pelaksanaan</ThEdura>
                    <ThEdura className="text-wrap">Sebagai Peserta</ThEdura>
                    <ThEdura className="text-wrap max-w-30">Jumlah Soal/Instrumen</ThEdura>
                    <ThEdura className="text-wrap max-w-30">Instrumen Yang Direspon</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                {
                    // item.tagihanMapel?.map((sumberTagihan, iSumberTagihan)=>
                    item?.sourceTagihan.map((sumberTagihan, iSumberTagihan)=>
                        <TRowEdura key={sumberTagihan.idbaris}>
                            <TdEdura className="text-wrap">{nameOfKategoriTagihan(sumberTagihan.tipe_assesmen)}</TdEdura>
                            <TdEdura className="text-wrap">{sumberTagihan.nama_publikasi}</TdEdura>
                            <TdEdura className="text-wrap">
                                <p>{sumberTagihan.start_time.toLocaleString('id-ID',{dateStyle:'full'})}</p>
                                <p>Pukul: {sumberTagihan.start_time.toLocaleString('id-ID',{timeStyle:'long'})}</p>
                            </TdEdura>
                            <TdEdura className="text-center">
                                {
                                    sumberTagihan.peserta?.some(siswa=>siswa.id === item.data?.siswa?.id)?
                                    (<strong>Ya</strong>)
                                    :'Tidak'
                                }
                            </TdEdura>
                            <TdEdura className="text-center">{ sumberTagihan.sebaranNoSoalFromPropertyKurikulumWithScore?.data?.find(s=>s.kodeMapel === item.data.data?.mapel?.kode)?.jumlahSoalDinilai } </TdEdura>
                            <TdEdura className="text-center">{ totalYangDirespon(sumberTagihan)} </TdEdura>
                        </TRowEdura>
                    )
                }
            </tbody>
        </TableWithScrolling>
    )
}