import { useAppSelector } from '~/context-reduct/hook';
import guruLaki from '../../images/guru_laki.png'
import guruPerempuan from '../../images/guru_perempuan3.webp';
import mejaGuru from '../../images/meja_guru.webp';
import imgLiburan from '../../images/liburan.png';
import { OrmAbsensiSelector } from '~/context-reduct/selectores/absensi-selector';
import { useFilterContext } from '~/components/toolbars/state-toolbar/state-toolbar';
import { useEffect, useMemo } from 'react';
import ImageHarian from '~/controllers/absensi-controllers/cards/images-harian';
import { Gender } from '~/types/enums/gender';
import DigitalClock from '~/components/timer/jam-digital';

export default function AbsensiSiswaHariIniPage() {   
    //dataAbsenToDay
    const ormAbsen = useAppSelector(OrmAbsensiSelector);
    const user = useAppSelector(state=>state.auth.user);
    const rombel = useAppSelector(state=>state.fokusRombel.value);
    
    
    const {value, setValue} = useFilterContext();

    const isSabtuLibur = useAppSelector(state=>state.uiPreference.sabtuLibur);//value?.sabtuLibur; 

    useEffect(()=>{
        setValue({
            bulan:new Date()
        })
    },[])
    const kehadiranSiswaHariIni = useMemo(()=>{
        
        return ormAbsen.dataAbsenToDay(value?.bulan||new Date(),isSabtuLibur).filter(s=>s.status === 'aktif');
        
    },[ormAbsen, value?.bulan, isSabtuLibur,rombel]);
    
    const rekap = useMemo(()=>{
        if(!kehadiranSiswaHariIni) return ;
        
        return {
            totalMurid : kehadiranSiswaHariIni?.length,
            muridLaki: kehadiranSiswaHariIni?.filter(s=>s.pd_jk ===Gender.LAKI_LAKI).length,
            muridPerempuan: kehadiranSiswaHariIni?.filter(s=>s.pd_jk === Gender.PEREMPUAN).length,
            muridHadirLaki: kehadiranSiswaHariIni?.filter(s=>s.pd_jk === Gender.LAKI_LAKI && s.dataAbsen.kehadiran === 'Hadir').length,
            muridHadirPerempuan: kehadiranSiswaHariIni?.filter(s=>s.pd_jk === Gender.PEREMPUAN && s.dataAbsen.kehadiran === 'Hadir').length,
            muridHadir: kehadiranSiswaHariIni?.filter(s=> s.dataAbsen.kehadiran === 'Hadir').length,
            muridSakitLaki: kehadiranSiswaHariIni?.filter(s=>s.pd_jk === Gender.LAKI_LAKI && s.dataAbsen.kehadiran === 'Sakit').length,
            muridSakitPerempuan: kehadiranSiswaHariIni?.filter(s=>s.pd_jk === Gender.PEREMPUAN && s.dataAbsen.kehadiran === 'Sakit').length,
            muridSakit: kehadiranSiswaHariIni?.filter(s=> s.dataAbsen.kehadiran === 'Sakit').length,
            muridIjinLaki: kehadiranSiswaHariIni?.filter(s=>s.pd_jk === Gender.LAKI_LAKI && s.dataAbsen.kehadiran === 'Ijin').length,
            muridIjinPerempuan: kehadiranSiswaHariIni?.filter(s=>s.pd_jk === Gender.PEREMPUAN && s.dataAbsen.kehadiran === 'Ijin').length,
            muridIjin: kehadiranSiswaHariIni?.filter(s=> s.dataAbsen.kehadiran === 'Ijin').length,
            muridAlpaLaki: kehadiranSiswaHariIni?.filter(s=>s.pd_jk === Gender.LAKI_LAKI && s.dataAbsen.kehadiran === 'Alpa').length,
            muridAlpaPerempuan: kehadiranSiswaHariIni?.filter(s=>s.pd_jk === Gender.PEREMPUAN && s.dataAbsen.kehadiran === 'Alpa').length,
            muridAlpa: kehadiranSiswaHariIni?.filter(s=> s.dataAbsen.kehadiran === 'Alpa').length,
        }
    
    },[kehadiranSiswaHariIni]);

    const Walikelas = useMemo(()=>{
        return user?.friends.find(s=>s.kode_mapel_ampu === rombel);
    },[rombel,user])

    const isPropertiCurrentDate = useMemo(()=>{
        return ormAbsen.ormKaldik.getPropertyTglToday(new Date(),isSabtuLibur)
    },[ormAbsen, isSabtuLibur]);
    if(isPropertiCurrentDate.isLibur){
        return (
            <img src={imgLiburan} data-word='image-liburan' referrerPolicy='no-referrer'/>
        )
    }
    return (
        <div data-word="img" className="relative bg-ruangan bg-fixed bg-no-repeat bg-size-[100vw] bg-bottom">
            <div className="grid grid-cols-4 items-center justify-center mt-6 print:mt-1 min-h-[calc(100vh-10rem)] border-s-4 border-t-4 border-e-4 border-b-0 w-11/12 md:w-10/12 mx-auto border-sky-800 rounded-t-4xl bg-linear-to-b from-sky-300 to-sky-500">
                <div className='flex justify-center flex-col print:flex-row-reverse md:flex-row-reverse col-span-4'>
                    <div className='col-span-1 font-bold text-end pe-2'>
                        {new Date().toLocaleString('id-ID', {dateStyle:'full'})}
                        <DigitalClock/>
                    </div>
                    <div className='col-span-2 text-center relative mt-5'>
                        <img src={Walikelas?.avatar} className='rounded-full h-20 w-20 outline-2 outline-white bg-white left-5/12 md:left-20  absolute' referrerPolicy='no-referrer'></img>
                        <img src={mejaGuru} referrerPolicy='no-referrer' className='mt-10 h-50 mx-auto'/>
                        <div className='text-3xl font-extrabold absolute text-center w-full left-0 top-1/2 bottom-1/2'>{rombel}</div>
                        <div className='text-sm font-bold absolute left-0 translate-y-7 text-center w-full top-1/2'>{Walikelas?.name}</div>
                    </div>
                    <div className='border-sky-400/50 bg-sky-400/50 col-span-1 h-fit mt-2 border-3 text-xs  rounded-2xl p-1'>
                        <table className='w-full'>
                            <tbody>
                                <tr>
                                    <td className='w-20'>Kelas</td>
                                    <td className='w-2'>:</td>
                                    <td colSpan={3}>{rombel}</td>
                                </tr>
                                <tr>
                                    <td >Wali Kelas</td>
                                    <td>:</td>
                                    <td colSpan={3} className='truncate'>{Walikelas?.name}</td>
                                </tr>
                                <tr>
                                    <td className='bg-sky-200'>Keterangan</td>
                                    <td className='bg-sky-200 w-8 border-e text-center' colSpan={2}>L</td>
                                    <td className='bg-sky-200 w-8 border-e text-center'>P</td>
                                    <td className='bg-sky-200 text-center'>Total</td>
                                </tr>
                                <tr>
                                    <td className='border-b'>Jumlah Murid</td>
                                    <td className='border-b border-e'></td>
                                    <td className='w-8 border-e text-center'>{rekap?.muridLaki}</td>
                                    <td className='w-8 border-e text-center'>{rekap?.muridPerempuan}</td>
                                    <td className='w-8 border-e text-center'>{rekap?.totalMurid}</td>
                                </tr>
                                <tr>
                                    <td className='border-b'>Jumlah Hadir</td>
                                    <td className='border-b'></td>
                                    <td className='w-8 border text-center'>{rekap?.muridHadirLaki}</td>
                                    <td className='w-8 border text-center'>{rekap?.muridHadirPerempuan}</td>
                                    <td className='w-8 border text-center'>{rekap?.muridHadir}</td>
                                </tr>
                                <tr>
                                    <td className='border-b'>Jumlah Sakit</td>
                                    <td className='border-b'></td>
                                    <td className='w-8 border text-center'>{rekap?.muridSakitLaki}</td>
                                    <td className='w-8 border text-center'>{rekap?.muridSakitPerempuan}</td>
                                    <td className='w-8 border text-center'>{rekap?.muridSakit}</td>
                                </tr>
                                <tr>
                                    <td className='border-b'>Jumlah Ijin</td>
                                    <td className='border-b'></td>
                                    <td className='w-8 border text-center'>{rekap?.muridIjinLaki}</td>
                                    <td className='w-8 border text-center'>{rekap?.muridIjinPerempuan}</td>
                                    <td className='w-8 border text-center'>{rekap?.muridIjin}</td>
                                </tr>
                                <tr>
                                    <td className='border-b'>Jumlah Alpa</td>
                                    <td className='border-b'></td>
                                    <td className='w-8 border text-center'>{rekap?.muridAlpaLaki}</td>
                                    <td className='w-8 border text-center'>{rekap?.muridAlpaPerempuan}</td>
                                    <td className='w-8 border text-center'>{rekap?.muridAlpa}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {
                    kehadiranSiswaHariIni.map((dataAbsen,i)=>(
                        <ImageHarian  key={i}
                            mode={value?.modeTampilanAbsen?.name || 'icon'} 
                            dataAbsenToday={dataAbsen}
                            template={ormAbsen.absenTemplate}
                            />
                    ))
                }
            </div>
            <div className='sticky bottom-0 print:relative'>
                <img src={guruLaki} className='absolute bottom-0 -right-10 print:hidden h-50 md:h-90' referrerPolicy="no-referrer"/>
                <img src={guruPerempuan} className='absolute bottom-0 -left-5 h-50 md:h-90 print:hidden' referrerPolicy="no-referrer"/>
            </div>
        </div>
    );
}       