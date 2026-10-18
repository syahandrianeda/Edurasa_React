import {Fragment, useCallback, useMemo} from 'react';
import { useFormEdura } from "~/components/form-custom/form-edura";
import { TdEdura, TdEduraFreeze, ThEdura, THEduraFreeze, TRowEdura } from '~/components/tabels/tabel-components';
import TableWithScrolling from '~/components/tabels/table-with-scrolling';
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import TableSkorKd from '../tabel/tabel-skor-kd';
import type { detailNilaiSiswaAppType } from '~/types/penilaian/nilai-siswa-app-type';
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import ButtonCommitAwesome from '~/components/button-awesome/commit-button';
import { useModal } from '~/components/modals/modal-provider';
import TooltipComp from '~/components/ui_edura/tooltip-comp';
import { cn } from '~/lib/utils';
import { useAppSelector } from '~/context-reduct/hook';
import { InstanceDataTagihanPenilaianSector } from '~/context-reduct/selectores/daftar-tagihan-penilaian-selector';
import KoreksiGuruService from '~/infrastructures/services/koreksi-guru-service';
import {toast} from 'sonner';
import DispatchingResponseToStore from '~/lib/dispatching-response-to-store';
import type { NilaiSiswaSheetType } from '~/types/penilaian/nilai-siswa-sheet-type';
import type { SiswaType } from '~/types/siswa';
import SwitchKategoriTagihan from '~/domain/asesmen-penilaian/switch-kategori-tagihan-class';
import GroupingSebaranKurikulum from '~/domain/penilaian/infrastucture/grouping-kurikulum-to-sebaran';
import RisponsePenilaianSiswaBuilder from "~/domain/penilaian/infrastucture/rispon-penilaian-siswa-builder";
import RisponseNilaiSiswaBuilder from '~/domain/penilaian/infrastucture/RisponseNilaiSiswaBuilder';
import { PaketSoalStrukturBuilder } from '~/domain/paket-soal/paket-soal-struktur/PaketSoalStrukturBuilder';
import TemplateKoreksiSiswaBuilder from '~/types/penilaian/TemplateKoreksiSiswaBuilder';
import SkorKdSebaranBuilder from '~/domain/penilaian/infrastucture/SkorKdSebaranBuilder';
import GroupingSebaranInPaketSoal from '~/domain/penilaian/infrastucture/grouping-sebaran-in-paket-soal';

export default function PraKoreksiSoal(){
    const dataTagihan = useAppSelector(InstanceDataTagihanPenilaianSector);
    const {currentData} = useFormEdura<TagihanHasDataResponse>();
    const {actions,state} = useModal<TagihanHasDataResponse>()
    const rombel = getSessionRombel();

    const currentDataSelector = useMemo(()=>{
        const dataTabelParent = dataTagihan?.dataTagihanHasResponse;

        /** currentData adalah data yang terpilih dan menjadi fokus modal */
        return dataTabelParent?.find(s=>s.idbaris === currentData.idbaris)
    }, [currentData, dataTagihan]);

    const dataRespon = useMemo(()=>{
        if(!currentDataSelector || !rombel) return []

        return currentDataSelector?.data_response_bySiswa.filter(s=>s.siswa.nama_rombel === rombel)
    },[rombel, currentDataSelector])
    
    const jumlahPerespon = currentDataSelector?.jumlahPerespon ?? 0;
        
    
    
    const callTriggerModalKoreksi = useCallback((dataSheetResponTagihan:detailNilaiSiswaAppType)=>{
        
        actions.open('KOREKSI SOAL',dataSheetResponTagihan, {closeOnOutsideClick:false, backToModalType: state})
    },[actions]);

    const handleDelete = useCallback(async (item:detailNilaiSiswaAppType)=>{
        const konfirmasi = confirm(`Anda yakin akan menghapus respon ini?`);
        if(!konfirmasi) return;

        
        const rombel = item.rombel;
        const idbaris = item.idbaris;
        const formData = {
                idbaris,
                siswa_id:'',
                rombel,
                publikasi_id:''
            }
        
        const service = new KoreksiGuruService();
        const request = toast.promise(
            service.delete(formData),
            {
                loading: 'Sedang menghapus',
                success: (res)=>"Berhasil " + res?.message,
                error:(er)=>'Gagal, dengan pesan ' + er,
                closeButton:true,
            }
        )
        const data = await request.unwrap();
        if(data.success){
            DispatchingResponseToStore(data.success, data.data as NilaiSiswaSheetType[], data.detailResponse!)
        }
        

        

    },[])

    const handleBantuIsi = useCallback(async(siswa:SiswaType)=>{
        if(!currentDataSelector) return;

        const jenis_tagihan =  currentDataSelector?.jenis_tagihan.kode;
        const kategori = new SwitchKategoriTagihan(jenis_tagihan).kategori;
        const idSoal = currentDataSelector.id_bank_soal;
        const settingTagihan = currentDataSelector.setting_tagihan?.count_bentuk_soal;//
        // const templateKoreksi = dataTagihan?.createTemplateKoreksiUsingSetingTagihan(idSoal,settingTagihan ?? [],[]) ;//(dataTagihan?.createTemplateKoreksiPerSiswa(kurikulum, idSoal) ?? {sebaran:[], respon:[]}) as unknown as {sebaran:detailNilaiSiswaAppType['templateKoreksiSiswa'],respon:RisponsePenilaianSiswa[]};
        // const templateKoreksi = RisponsePenilaianSiswaBuilder.build(currentDataSelector.bank_soal_collections,settingTagihan ?? [], [])
        const StrukturPaket = PaketSoalStrukturBuilder.buildFromCountBentukSoalPaket(currentData.bank_soal_collections, settingTagihan ?? [])
        // const templateKoreksi = RisponseNilaiSiswaBuilder.build(StrukturPaket, [])
        // const respon =  templateKoreksi?.respon ?? [];
        const respon =  RisponseNilaiSiswaBuilder.build(StrukturPaket, [])
        const templateKoreksiSiswa = TemplateKoreksiSiswaBuilder.build(StrukturPaket,[]);// templateKoreksi?.sebaran ?? [];
        const Kur = currentDataSelector?.setting_tagihan?.kurikulum ?? [];
        const StrukturKurikulum = GroupingSebaranInPaketSoal.build(StrukturPaket);
        // const skorKdSebaran =  GroupingSebaranKurikulum.buildGroupBentukSoalBasedOnKoleksiIdSoalWithScore(Kur,idSoal ?? [],respon);
        const skorKdSebaran =  SkorKdSebaranBuilder.build(StrukturKurikulum, respon)
        const objekKdSebaran = skorKdSebaran.data.map(m=>m.objekSkorKd).reduce((a,b)=>({...a,...b}))
        const data:detailNilaiSiswaAppType = {
            idbaris: 0,	
            siswa_id: siswa.id,
            siswa,
            publikasi_id: currentDataSelector?.idbaris,
            jenis_tagihan,
            tipe_assesmen: kategori,
            sumber_respon: 'guru',
            rombel: siswa.nama_rombel,
            start_time: new Date(),
            end_time:new Date(),
            respon,
            // skor_kd:[],
            needValidate:true,

            totalResponValid: 0,
            durasiPengerjaan: 0,
            publikasi: currentDataSelector,
            templateKoreksiSiswa,
            skorKdSebaran,
            objekKdSebaran

        }

        // const dataFound =dataRespon.find(s=>s.siswa.id === siswa.id);
        // const dataForm = {...dataFound, data}
        
        actions.open('KOREKSI SOAL',data, {closeOnOutsideClick:false, backToModalType: state})
    },[actions,currentDataSelector,dataTagihan])
    
    return (
        <>
            <div className='p-4 border border-black bg-white dark:text-black'>
                <h3 className='text-center'>{currentData.nama_publikasi}</h3>
                <div className='border mx-auto p-2 rounded-2xl text-[10px] border-sky-800 my-2'>
                    <TooltipComp content="scroll ke bawah untuk melihat detail">
                        <p className='text-center'>Ringkasan ↡ </p>
                    </TooltipComp>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-5 max-h-11.5 overflow-y-auto scrol-h-custom border-t-2 border-dashed'>
                        <div className='w-full'>
                           <div className='flex w-full justify-between border-b border-sky-600 border-dashed'>
                                <p>ID publikasi paket</p>
                                <p>{currentData.idbaris}</p>
                            </div> 
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
                                <p>{jumlahPerespon} Peserta</p>
                            </div>
                            <div className='flex w-full justify-between border-b border-sky-600 border-dashed'>
                                <p>Duplikat</p>
                                <p>{(currentData.data_respons.length - jumlahPerespon)} data</p>
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
                            dataRespon && dataRespon.map((data, iData)=>
                                data.data.length ? (
                                        data.data.map((respon, iRespon)=>
                                        <TRowEdura key={data.siswa.id + '_'+iData+'_'+iRespon}>
                                            {
                                                iRespon === 0 && (
                                                    <Fragment>
                                                        {/* <TdEdura rowSpan={data.data.length===0?1:data.data.length}>-</TdEdura> */}
                                                        <TdEdura rowSpan={data.data.length===0?1:data.data.length}>{iData + 1}</TdEdura>
                                                        <TdEdura rowSpan={data.data.length===0?1:data.data.length}>{data.siswa.id}</TdEdura>
                                                        <TdEduraFreeze className={cn('align-top',respon.needValidate?'text-rose-600 font-bold':'text-inherit')} stateFreeze={true} rowSpan={data.data.length===0?1:data.data.length}>{data.siswa.pd_nama}</TdEduraFreeze>

                                                    </Fragment>
                                                )
                                            }
                                            <TdEdura className='text-wrap'>
                                                <div className='flex w-full justify-between border-b border-sky-600 border-dashed'>
                                                    <p>{respon.publikasi_id}</p>
                                                    <p>id publikasi assesmen</p>
                                                </div> 
                                                <div className='flex w-full justify-between border-b border-sky-600 border-dashed'>
                                                    <p>{respon.idbaris}</p>
                                                    <p>id respon</p>
                                                </div> 
                                                <div className='flex w-full justify-between border-b border-sky-600 border-dashed'>
                                                    <p>Jumlah Soal Dijawab</p>
                                                    <p>{respon.totalResponValid}</p>
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
                                                <div className={cn('flex w-full justify-between border-b border-sky-600 border-dashed', respon.needValidate?'text-rose-600 font-bold':'text-green-600 font-bold')}>
                                                    <p>Butuh Validasi</p>
                                                    <p>{respon.needValidate?'Ya':'Tidak / Sudah divalidasi'}</p>
                                                </div> 
                                            </TdEdura>
                                            <TdEdura>
                                                <TableSkorKd skor_kd={respon.skor_kd} data={respon.skorKdSebaran} className='[&_th]:border-black [&_td]:align-middle [&_td]:text-center  [&_td]:border-black'/>
                                            </TdEdura>
                                            <TdEdura>
                                                <div className='min-h-24 w-full flex flex-col justify-center items-center gap-2'>
                                                    <ButtonCommitAwesome className='px-4 py-0' labelButton={respon.needValidate?'Koreksi':'Koreksi Ulang'} onClick={()=>callTriggerModalKoreksi(respon)}></ButtonCommitAwesome>
                                                    <ButtonCommitAwesome className='px-4 py-0' labelButton='Hapus' onClick={()=>handleDelete(respon)}></ButtonCommitAwesome>
                                                </div>
                                            </TdEdura>
                                        </TRowEdura>
                                    )   
                                ):(
                                    <TRowEdura key={data.siswa.id+'_'+iData}>
                                        <TdEdura>{iData + 1}</TdEdura>
                                        <TdEdura>{data.siswa.id}</TdEdura>
                                        <TdEduraFreeze className='align-top' stateFreeze={true}>{data.siswa.pd_nama}</TdEduraFreeze>
                                        <TdEdura className='text-wrap'>Belum merespon</TdEdura>
                                        <TdEdura> </TdEdura>
                                        <TdEdura>
                                            <div className='min-h-6 flex flex-col justify-center items-center'>
                                                <ButtonCommitAwesome className='px-4 py-0' labelButton='Bantu Isi' onClick={()=>handleBantuIsi(data.siswa)}></ButtonCommitAwesome>
                                            </div>
                                        </TdEdura>
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