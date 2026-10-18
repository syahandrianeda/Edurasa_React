import {useMemo} from 'react';
import { useFormEdura } from "~/components/form-custom/form-edura"
import { TdEdura, ThEdura, TRowEdura } from '~/components/tabels/tabel-components';
import TableWithScrolling from '~/components/tabels/table-with-scrolling';
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import TableSebaranNoSoalPadaPublikasi from '../tabel/tabel-sebaran-no-soal-publikasi';
import TableSkorKd from '../tabel/tabel-skor-kd';

export default function AllInfoResponTagihan(){
    const {currentData} = useFormEdura<TagihanHasDataResponse>();
    const rombel = getSessionRombel();
    const dataRespon = useMemo(()=>{
        if(!currentData || !rombel) return [];
        return currentData.data_respons.filter(s=>s.rombel === rombel);
    },[rombel, currentData]);
    
    const dataKurikulum = useMemo(()=>{
        if(!currentData) return ;
        
        return currentData.sebaran_kurikulum_by_bentuk_soal
    },[currentData])

    return (
        <div className="p-1">
            <h3 className='text-xl font-bold text-center'>Daftar Peserta Yang Merespon Tagihan Assesmen</h3>
            <h4 className='text-xl font-bold text-center'>{currentData.nama_publikasi}</h4>
            <div className='border m-3'>
                <p className='text-base text-center'>Properti Kurikulum tiap No. Soal</p>
                {
                    dataKurikulum && <TableSebaranNoSoalPadaPublikasi data={dataKurikulum}/>

                }
            </div>
            <p className='text-center font-bold'>Daftar Perespon</p>
            <TableWithScrolling inModal={true}>
                <thead>
                    <TRowEdura>
                        <ThEdura>No</ThEdura>
                        <ThEdura>Waktu Respon</ThEdura>
                        <ThEdura>Nama Peserta</ThEdura>
                        <ThEdura>Token</ThEdura>
                        <ThEdura className='text-wrap max-w-15'>Jumlah Instrumen Yang Direspon</ThEdura>
                        <ThEdura className='text-wrap'>Nilai Sementara</ThEdura>
                    </TRowEdura>
                </thead>
                <tbody>
                    {
                        dataRespon.length === 0 ? (
                            <TRowEdura><TdEdura colSpan={6} className='text-center'>Belum Ada yang merespon</TdEdura></TRowEdura>
                        ):(
                            dataRespon.map((data, iData)=>
                                <TRowEdura key={data.idbaris +'_'+ iData}>
                                    <TdEdura className='text-center'>{iData + 1}</TdEdura>
                                    <TdEdura>{data.end_time?.toLocaleString('id-ID', {dateStyle:'short', timeStyle:'long'})}
                                        <p className='text-end'> diselesaikan selama {data.durasiPengerjaan} menit</p>
                                    </TdEdura>
                                    <TdEdura>{data.siswa?.pd_nama}</TdEdura>
                                    <TdEdura>{data.siswa?.id}</TdEdura>
                                    <TdEdura>{data.totalResponValid}</TdEdura>
                                    <TdEdura>
                                        <TableSkorKd skor_kd={data.skor_kd} data={data.skorKdSebaran}/>
                                    </TdEdura>
                                </TRowEdura>
                            )
                        )
                    }
                </tbody>
            </TableWithScrolling>
        </div>
    )
}