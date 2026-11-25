import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { DataRekapRaportSementaraSheetPreview } from "./SheetDetailRekapRaportSementara";
import { useCallback } from "react";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import { nameOfKategoriTagihan } from "~/domain/kategori-tagihan/builder/KategoriTagihanRaportCollections";
import Decimal from "decimal.js";

export default function SumberTagihanRekapRaport({ item }: { item: DataRekapRaportSementaraSheetPreview|null }){
    
    const totalYangDirespon = useCallback((sumberTagihan:TagihanHasDataResponse)=>{
        if(item?.source === 'responSiswa'){
            const test= sumberTagihan.data_response_bySiswa?.find(s=>s.siswa.id ===  item?.data?.siswa?.id)?.data?.at(-1)?.sumber_respon;
            return sumberTagihan.data_response_bySiswa?.find(s=>s.siswa.id ===  item?.data?.siswa?.id)?.data?.at(-1)?.respon.filter(s=>s.atp_soal?.kodemapel === item?.data?.data?.mapel?.kode).length ?? 0;//.filter(ss=>ss.respon!==null).flatMap(n=>n.respon.map(r=>r.respon !==null)).length 
        }
        
        if(sumberTagihan.peserta.some(s=>s.id === item?.data?.siswa?.id )){
            return sumberTagihan.sebaranNoSoalFromPropertyKurikulumWithScore?.data?.find(s=>s.kodeMapel === item?.data.data?.mapel?.kode)?.jumlahSoalDinilai
        }
        return '-'
    },[item?.data?.siswa?.id, item?.source])
    const statusValidasi = useCallback((tagihan:TagihanHasDataResponse)=>{
        let result:string = '';
        const foundData = tagihan.data_response_bySiswa?.find(s=>s.siswa.id ===  item?.data?.siswa?.id)?.data?.find(s=>s.publikasi_id === tagihan.idbaris)
        const sumber_respon =  foundData?.sumber_respon;
        const koleksiSkorRespon = foundData?.respon.map(m=>m.skor ?? null);
        const koleksiSkorResponNumber = koleksiSkorRespon?.map(Number) ?? []
        const totalSkorRespon = koleksiSkorResponNumber?.length === 0 ||koleksiSkorResponNumber?.every(m=>m === null) || !koleksiSkorResponNumber? 0 : Decimal.sum(...koleksiSkorResponNumber).toNumber()
        const dataSheet = tagihan.dataSkorKdSheet.find(s=>s.siswa_id === item?.data?.siswa?.id)?.data?.map(m=>m.skor) ?? [];
        const hasDataSheet = dataSheet.length === 0 || dataSheet.every(m=> m === null);
        if(sumber_respon === 'siswa' ){
            if(hasDataSheet && totalSkorRespon > 0){
                result = 'Data Import ' 
            }else{
                result = 'Belum Dikoreksi, nilai dari Data Import'
            }
        }else if(sumber_respon === 'guru'){
            if(hasDataSheet){
                result = 'Sudah Divalidasi/koreksi'
            }else{
                
                result = 'Sudah Divalidasi/koreksi dan/atau data Import'
            }
        }else{
            if(hasDataSheet){

                result='Data Import/input manual per skor ' + totalSkorRespon
            }else{
                result='data kosong'

            }
        }
        return result;
        
    },[item?.data?.siswa?.id])
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
                    <ThEdura className="text-wrap max-w-30">Status Validasi/koreksi</ThEdura>
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
                            <TdEdura className="text-center text-wrap">{  statusValidasi(sumberTagihan)} </TdEdura>
                        </TRowEdura>
                    )
                }
            </tbody>
        </TableWithScrolling>
    )
}