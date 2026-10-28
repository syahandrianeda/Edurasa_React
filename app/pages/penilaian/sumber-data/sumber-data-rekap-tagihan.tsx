import {useMemo} from 'react';
import TableWithScrolling from '~/components/tabels/table-with-scrolling';
import { TdEdura, ThEdura, TRowEdura } from '~/components/tabels/tabel-components';
import type { InterfaceMapel } from '~/types/mapel/mapel';
import type { KategoriTagihanHasManyPesertaMapelType } from '~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/KategoriTagihanHasManyPesertaMapelType';
import { getSessionRombel } from '~/infrastructures/session-storage/rombel-session';
import KolomStrukturKurikulumInSumberRekap from './kolom-struktur-kurikulum-in-sumber-rekap';

type Props = {
    fokusMapel:InterfaceMapel,
    kategoriTagihan: KategoriTagihanHasManyPesertaMapelType
}
export default function SumberDataRekapTagihan({fokusMapel, kategoriTagihan}:Props){
    const rombel = getSessionRombel();
    const sumberTagihan = useMemo(()=>{
        if(!kategoriTagihan) return []
        return kategoriTagihan?.koleksiPaketSoal?.filter(s=>s.koleksiMapel.includes(fokusMapel.nama))??[];
    },[fokusMapel, kategoriTagihan])
        
    return (
        <div className="print:hidden shadow-sm rounded shadow-sky-300 p-1 text-sm my-2">
            <h5 className='text-center uppercase'>Sumber data Tagihan Instrumen</h5>
            <p className='text-[8px] text-purple-600 text-center'>Klik pada sel baris untuk melihat detail</p>
            <TableWithScrolling className='text-[10px]'>
                <thead>
                    <TRowEdura>
                        <ThEdura rowSpan={2}>No</ThEdura>
                        <ThEdura rowSpan={2}>Nama Instrumen</ThEdura>
                        <ThEdura rowSpan={2} className='text-wrap'>Jenis Tagihan</ThEdura>
                        <ThEdura rowSpan={2} className='text-wrap'>Sumber</ThEdura>
                        <ThEdura rowSpan={2} className='text-wrap'>Jumlah Peserta</ThEdura>
                        <ThEdura rowSpan={2} className='text-wrap'>Dilaksanakan Pada</ThEdura>
                        <ThEdura colSpan={3}>Struktur Kurikulum Yang Diukur</ThEdura>
                        <ThEdura rowSpan={2} className='text-wrap'>Jumlah Respon</ThEdura>
                        <ThEdura rowSpan={2} className='text-wrap'>Jumlah Tervalidasi</ThEdura>
                    </TRowEdura>
                    <TRowEdura>
                        {
                            sumberTagihan.length === 0 ? (
                                <ThEdura colSpan={3} className='text-center'>Tidak ada sumber data</ThEdura>
                            ):(
                                <>
                                <ThEdura className='text-wrap'>Capaian Pembelajaran (CP)</ThEdura>
                                <ThEdura className='text-wrap'>Tujuan Pembelajaran (TP)</ThEdura>
                                <ThEdura className='text-wrap'>Alur Tujuan Pembelajaran (ATP)</ThEdura>
                                </>
                            )
                        }
                    </TRowEdura>
                </thead>
                <tbody>
                    {
                        sumberTagihan.length === 0 ? (
                            <TRowEdura>
                                <TdEdura colSpan={9} className='text-center'>Tidak ada sumber data</TdEdura>
                            </TRowEdura>
                        ):(
                            sumberTagihan.map((tagihan, iTagihan)=>
                                <TRowEdura key={tagihan.idbaris}>
                                    <TdEdura>{iTagihan+1}</TdEdura>
                                    <TdEdura>{tagihan.namaPublikasi}</TdEdura>
                                    <TdEdura className='text-wrap'>{tagihan.detail?.jenis_tagihan.name}</TdEdura>
                                    <TdEdura className='text-nowrap'>{tagihan.detail?.source}</TdEdura>
                                    <TdEdura className='text-end'>{tagihan.detail?.peserta?.filter(s=>s.nama_rombel === rombel)?.length} siswa</TdEdura>
                                    <TdEdura className='text-wrap'>{tagihan.detail?.start_time?.toLocaleString('id-ID', {dateStyle:'full', timeStyle:'long'})}</TdEdura>
                                    <KolomStrukturKurikulumInSumberRekap kodeMapel={fokusMapel.kode} sumberKolom={tagihan.detail?.sebaranNoSoalFromPropertyKurikulumWithScore}/>
                                    <TdEdura className='text-center'>{tagihan.detail?.data_respons.filter(s=>s.rombel === rombel).length}</TdEdura>
                                    <TdEdura>{tagihan.detail?.data_respons?.filter(s=>s.rombel === rombel && s.sumber_respon !=='siswa').length}</TdEdura>
                                    
                                </TRowEdura>
                            )
                        )
                    }
                </tbody>
            </TableWithScrolling>
        </div>
    )
}