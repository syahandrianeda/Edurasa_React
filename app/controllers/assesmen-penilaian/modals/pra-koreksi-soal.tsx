import {Fragment, useMemo} from 'react';
import { useFormEdura } from "~/components/form-custom/form-edura";
import { TdEdura, TdEduraFreeze, ThEdura, THEduraFreeze, TRowEdura } from '~/components/tabels/tabel-components';
import TableWithScrolling from '~/components/tabels/table-with-scrolling';
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import ResponAllSiswaInPublikasiPaket from '~/domain/sistem-koreksi/respon-all-siswa-in-publikasi';
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import TableSkorKd from '../tabel/tabel-skor-kd';
import { ModalFooterEdura } from '~/components/modals/modal-components';
import type { NilaiSiswaAppType } from '~/types/penilaian/nilai-siswa-app-type';

export default function PraKoreksiSoal(){
    const {currentData} = useFormEdura<TagihanHasDataResponse>();
    const rombel = getSessionRombel();
    const dataRespon = useMemo(()=>{
        if(!currentData || !rombel) return [];
        const instansiasi = new ResponAllSiswaInPublikasiPaket(currentData, rombel).build();
        return instansiasi.dataKolektiResonseCurrentPublikasi.filter(s=>s.siswa.nama_rombel === rombel);
    },[rombel, currentData])
    
    const jumlahPerespon = useMemo(()=>{
        const map = new Map(currentData.data_respons.map(m=>([m.siswa_id, m])));
        return [...map.values()];
    },[currentData.data_respons])
    console.log({jumlahPerespon, dataRespon})
    
    return (
        <>
            <div className='p-4 border border-black bg-white dark:text-black'>
                <h3 className='text-center'>{currentData.nama_publikasi}</h3>
                <div className='border mx-auto p-2 rounded-2xl text-[10px] border-sky-800 my-2'>
                    <p className='text-center'>Ringkasan ↡</p>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-5 max-h-11.5 overflow-y-auto scrol-h-custom border-t-2 border-dashed'>
                        <div className='w-full'>
                           <div className='flex w-full justify-between border-b border-sky-600 border-dashed'>
                                <p>Sumber Naskah</p>
                                <p>{currentData.source}</p>
                            </div> 
                            <div className='flex w-full justify-between border-b border-sky-600 border-dashed'>
                                <p>Muatan Pelajaran</p>
                                <p className='text-wrap'>{currentData.koleksi_mapelName.join(', ')}</p>
                            </div>
                            <div className='flex w-full justify-between border-b border-sky-600 border-dashed'>
                                <p>Kompetensi yang diukur</p>
                                <div className='w-2/3'>
                                    {
                                        currentData.kurikulum_tagihan.map((atp, iAtp)=>
                                            <p className='truncate border-b border-dashed border-sky-600' key={atp.atp_as_tp_id}>[{atp.atp_as_tp_id}] {atp.atp_as_tp_description}</p>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            
                            <div className='flex w-full justify-between border-b border-sky-600 border-dashed'>
                                <p>Jumlah Peserta</p>
                                <p>{currentData.peserta.length} Peserta</p>
                            </div>
                            <div className='flex w-full justify-between border-b border-sky-600 border-dashed'>
                                <p>Responden</p>
                                <p>{jumlahPerespon.length} Peserta</p>
                            </div>
                            <div className='flex w-full justify-between border-b border-sky-600 border-dashed'>
                                <p>Duplikat</p>
                                <p>{(currentData.data_respons.length - jumlahPerespon.length)} data</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='h-[calc(100vh-25rem)] md:h-[calc(100dvh-16rem)] overflow-y-auto scrol-h-custom border-t-2 border-sky-400 border-dotted'>
                <TableWithScrolling inModal={true} className='text-[10px]'>
                    <thead>
                        <TRowEdura>
                            <ThEdura>No</ThEdura>
                            <ThEdura>Token</ThEdura>
                            <THEduraFreeze stateFreeze={true}>Nama Siswa</THEduraFreeze>
                            <ThEdura className='text-no-wrap'>Ringkasan Respon</ThEdura>
                            <ThEdura>Skor Sementara</ThEdura>
                            <ThEdura>Aksi</ThEdura>
                        </TRowEdura>
                    </thead>
                    <tbody>
                        {
                            dataRespon.map((data, iData)=>
                                data.data.length ? (
                                        data.data.map((respon, iRespon)=>
                                        <TRowEdura key={data.siswa.id + '_'+iData+'_'+iRespon}>
                                            {
                                                iRespon === 0 && (
                                                    <Fragment>
                                                        {/* <TdEdura rowSpan={data.data.length===0?1:data.data.length}>-</TdEdura> */}
                                                        <TdEdura rowSpan={data.data.length===0?1:data.data.length}>{iData + 1}</TdEdura>
                                                        <TdEdura rowSpan={data.data.length===0?1:data.data.length}>{data.siswa.id}</TdEdura>
                                                        <TdEduraFreeze className='align-top' stateFreeze={true} rowSpan={data.data.length===0?1:data.data.length}>{data.siswa.pd_nama}</TdEduraFreeze>

                                                    </Fragment>
                                                )
                                            }
                                            <TdEdura className='text-wrap'>
                                                <div className='flex w-full justify-between border-b border-sky-600 border-dashed'>
                                                    <p>Jumlah Soal Dijawab</p>
                                                    <p>{respon.totalResponValid}</p>
                                                </div> 
                                                <div className='flex w-full justify-between border-b border-sky-600 border-dashed'>
                                                    <p>Durasi Pengerjaan</p>
                                                    <p>{respon.durasiPengerjaan} menit</p>
                                                </div>  
                                                <div className='flex w-full justify-between border-b border-sky-600 border-dashed'>
                                                    <p>Durasi Pengerjaan</p>
                                                    <p>{respon.durasiPengerjaan} menit</p>
                                                </div>
                                                <div className='flex w-full justify-between border-b border-sky-600 border-dashed'>
                                                    <p>Waktu Mulai Pengerjaan</p>
                                                    <p>Pkl {respon.start_time?.toLocaleString('id-ID',{timeStyle:'long'})}</p>
                                                </div> 
                                                <div className='flex w-full justify-between border-b border-sky-600 border-dashed'>
                                                    <p>Waktu Selesai Pengerjaan</p>
                                                    <p>Pkl {respon.end_time?.toLocaleString('id-ID',{timeStyle:'long'})}</p>
                                                </div>
                                                <div className='flex w-full justify-between border-b border-sky-600 border-dashed'>
                                                    <p>Butuh Validasi</p>
                                                    <p>{respon.needValidate?'Ya':'Tidak / Sudah divalidasi'}</p>
                                                </div> 
                                            </TdEdura>
                                            <TdEdura>
                                                <TableSkorKd skor_kd={respon.skor_kd} className='[&_th]:border-black [&_td]:align-middle [&_td]:text-center  [&_td]:border-black'/>
                                            </TdEdura>
                                            <TdEdura/>
                                        </TRowEdura>
                                    )   
                                ):(
                                    <TRowEdura key={data.siswa.id+'_'+iData}>
                                        <TdEdura>{iData + 1}</TdEdura>
                                        <TdEdura>{data.siswa.id}</TdEdura>
                                        <TdEduraFreeze className='align-top' stateFreeze={true}>{data.siswa.pd_nama}</TdEduraFreeze>
                                        <TdEdura className='text-wrap'>Belum merespon</TdEdura>
                                        <TdEdura/>
                                        <TdEdura/>
                                    </TRowEdura>
                                )
                            )
                        }
                    </tbody>
                </TableWithScrolling>
                </div>

            </div>
        </>
    )
}