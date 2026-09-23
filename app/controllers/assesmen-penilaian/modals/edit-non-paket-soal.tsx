import {useCallback, useEffect, useMemo, useState, type ChangeEvent} from 'react';
import {  useFormEdura } from "~/components/form-custom/form-edura";
import WrapperContent from "~/controllers/publikasi-paket-soal/modal/wrapper-content";
import { InputText } from '~/components/fields/fields';
import CalendarTime from '~/components/ui/calender-time';
import { Field } from '~/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import type { TypePaketSoal } from '~/domain/paket-soal/entities/type-paket';
import {Loader} from 'lucide-react';
import { Input } from '~/components/ui/input';
import { DataRombelUI } from '~/domain/rombel/data-rombel';
import { getSessionRombel } from '~/infrastructures/session-storage/rombel-session';
import { getNumberFromString } from '~/lib/get-number';
import { Label } from '~/components/ui/label';
import type { PublikasiPaketAppType } from '~/types/bank-soal/entities/publikasi-paket-app-type';
import { ListJenisTagihan } from '~/domain/asesmen-penilaian/list-jenis-tagihan';
import { currentTapelProperties } from '~/lib/current-tapel';
import { useAppSelector } from '~/context-reduct/hook';
import { selectAllSiswaDTO } from '~/context-reduct/selectores/data-siswa-aktif';
import { ModalFooterEdura } from '~/components/modals/modal-components';
import ButtonCommitAwesome from '~/components/button-awesome/commit-button';
import { useCrudPublikasiPaketSoal } from '~/controllers/publikasi-paket-soal/crud/crud-publikasi-paket-provider';
import DispatchingResponseToStore from '~/lib/dispatching-response-to-store';
import type { PublikasiPaketSheetType } from '~/types/bank-soal/entities/publikasi-paket-sheet-type';
import DtoPublikasiPaketStatic from '~/dtos/dto-publlikasi-paket-static';
import {toast} from 'sonner'
import { useModal } from '~/components/modals/modal-provider';
import { CurrentMapelInActiveRombel } from '~/context-reduct/selectores/mapel-rombel-selector';
import { TdEdura, ThEdura, TRowEdura } from '~/components/tabels/tabel-components';
import TableWithScrolling from '~/components/tabels/table-with-scrolling';
import { AtpHasManySoalSelector } from '~/context-reduct/selectores/bank-soal-selector';
import QueryAtpHasItemSoal from '~/domain/bank-soal/relational-soal/services/query-atp-has-many-soal';
import type { AtpHasManySoalType } from '~/domain/bank-soal/relational-soal/type';
import validationAddPublikasiNonPaket from '~/controllers/publikasi-paket-soal/modal/validation-add-publikasi-nonpaket';
import type { TagihanHasDataResponse } from '~/domain/penilaian/type/tagihan-assesmen-type';
import DtoTagihanHasDataResponse from '~/dtos/dto-tagihan-has-data-response';
import validationTagihanHasDataResponse from './validation-tagihan-data-response';


export default function EditNonPaketSoal(){
    const {actions:modalAction} = useModal<TagihanHasDataResponse>()
    const {actions:post, state} = useCrudPublikasiPaketSoal();
    const {currentData, setCurrentData} = useFormEdura<TagihanHasDataResponse>();
    const rombel =  getSessionRombel() as string;
    const semester = currentTapelProperties({variant:'getSemester',tgl: new Date()});
    const siswa = useAppSelector(selectAllSiswaDTO);
    const mapelSelector = useAppSelector(CurrentMapelInActiveRombel);
    const kurikulumHasManySoal = useAppSelector(AtpHasManySoalSelector);
   /** state lokal */
    const [dataKelas, setDataKelas] = useState<string[]>(currentData?.target_rombel ?? []);
    const jenjang = getNumberFromString(rombel)
    const [namaPublikasi, setNamaPublikasi] = useState<string>(currentData.nama_publikasi);
    const [startTime, setStartTime] = useState<Date>(currentData.start_time);
    const [targetPaket, setTargetPaket] = useState<TypePaketSoal>(currentData?.target_type);
    const [koleksiIdSiswa, setKoleksiIdSiswa] = useState<number[]>(currentData.target_person);
    const [koleksiMapel, setKoleksiMapel] = useState<string[]>(currentData.setting_tagihan?.koleksi_mapel?.data ?? []);
    const [koleksiAtp, setKoleksiAtp] = useState<AtpHasManySoalType[]>(currentData.kurikulum_tagihan);
    const [jenisTagihan, setJenisTagihan] = useState<string>(currentData.jenis_tagihan.kode);

    const koleksiListTagihan = useMemo(()=>ListJenisTagihan.filter(s=>s.kelas.includes(jenjang) && s.semester.includes(semester as number)),[jenjang, semester]);
    const koleksiSiswaUI = useMemo(()=>siswa.filter(s=>s.jenjang === jenjang && dataKelas.includes(s.nama_rombel)),[dataKelas, jenjang]);
    
    const kurikulumKelasUI = useMemo(()=>{
        if(!kurikulumHasManySoal || !koleksiMapel) return [];
        const dataGroup = kurikulumHasManySoal.dataGroup;
        const query = new QueryAtpHasItemSoal(dataGroup).filteringMapel(...koleksiMapel).get();
        return query
    },[kurikulumHasManySoal, 
        koleksiMapel, 
    ]);
   
    const mapel = useMemo(()=>koleksiMapel.length> 0 ? koleksiMapel[0] : '',[koleksiMapel])
    
    const checkedCollectionAtp = useCallback(( checked:boolean, value:AtpHasManySoalType,)=>{
        const newKoleksi = checked ? [...koleksiAtp, value] : koleksiAtp.filter(s=>s.atp_as_tp_id !== value.atp_as_tp_id);
        setKoleksiAtp(newKoleksi)
    }, [koleksiAtp, setKoleksiAtp])
    
    const onChangeJenisTagihan = (value: string) =>{
        setJenisTagihan(value);
    }

    const onSelectTarget = useCallback((v:TypePaketSoal)=>{
           setTargetPaket(v);
           if(v === 'siswa'){
               // const awalKelas = currentData.target_rombel;
               setDataKelas([rombel])
   
           }
           setKoleksiIdSiswa([])
       },  [setTargetPaket, 
        setDataKelas, setKoleksiIdSiswa
    ]); 

    const handleCheckeTargetPerson = (e: ChangeEvent<HTMLInputElement>)=>{
            const {value, checked} = e.currentTarget;
            const koleksi = checked 
                            ? [...koleksiIdSiswa, Number(value)]
                            : koleksiIdSiswa.filter(s=> s!==Number(value))
            setKoleksiIdSiswa(koleksi)
        };

    const onSelectMapel = useCallback((v:string)=>{
          setKoleksiMapel([v]);
          setKoleksiAtp([]);
       },  [ setKoleksiMapel, setKoleksiAtp]);

     useEffect(()=>{
        setCurrentData(draft=>{
            draft.start_time = startTime;
            draft.end_time = startTime;
            draft.nama_publikasi = namaPublikasi;
            draft.target_type = targetPaket;
            draft.target_person = koleksiIdSiswa;
            // draft.durasi = durasi;
            draft.jenis_tagihan = ListJenisTagihan.find(s=>s.kode === jenisTagihan)!;
            draft.kurikulum_tagihan = koleksiAtp;
            draft.koleksi_mapelName = koleksiMapel
            // draft.jenis_tagihan = jenisTagihan
            const setting = (draft.setting_tagihan ?? {}) as NonNullable<typeof draft['setting_tagihan']>;
            setting.koleksi_mapel = {...setting.koleksi_mapel, data:koleksiMapel};
            setting.kurikulum = koleksiAtp,
            setting.count_bentuk_soal = setting.count_bentuk_soal.map(m=>({
                ...m,
                count: koleksiAtp.length
            }));
            draft.setting_tagihan = setting;

        })
    },[
        startTime,
        // endTime,
        namaPublikasi,
        targetPaket,
        koleksiIdSiswa,
        // durasi,
        koleksiAtp,
        jenisTagihan,
        koleksiMapel
    ])
    const onSubmit = useCallback(()=>{
        const dto = DtoTagihanHasDataResponse.fromTagihanHasDataResponseToPublikasiSheetType(currentData)
        const isValid = validationTagihanHasDataResponse(currentData);
        if(!isValid.isValid){
            alert(isValid.message?.join('\r\n'));
            return;
        }
        
        

        toast.promise(
            post.update(dto),
            {
                loading:'sedang mengupdate',
                success: (respon)=>{
                    
                    const {success, data, detailResponse} = respon;
                    if(detailResponse){
                        DispatchingResponseToStore(success, data as PublikasiPaketSheetType[], detailResponse)
                    }
                    modalAction.close();
                    return 'berhasil'
                },
                error: (err)=>{
                    console.log(err);
                    return 'Gagal'
                }
            }
        )
                
    },[currentData]);
    
    return (
        <fieldset disabled={state.isSubmitting}>
            <WrapperContent className="grid md:grid-cols-2 grid-cols-1 gap-2 w-full text-sm">
                <div className="border rounded-2xl bg-sky-200 p-2 shadow-md shadow-sky-800">
                    <Field className="relative">
                        <InputText type="text" value={namaPublikasi} onChange={(e)=>setNamaPublikasi(e.currentTarget.value)} label="Nama Publikasi"/>
                    </Field>
                    <div className="flex flex-col md:flex-row gap-2">
                        <Field className="relative mt-4" orientation={"horizontal"}>
                            <div className='text-[10px] absolute -top-2 ps-1 pe-4 bg-white dark:bg-sky-900/80 dark:text-sky-200 rounded-tr-2xl w-fit'>
                                Jenis Tagihan
                            </div>
                            <Select
                                value={jenisTagihan}
                                onValueChange={onChangeJenisTagihan}
                                >
                                <SelectTrigger className='bg-white w-full rounded-tl-none text-[10px]'>
                                    <SelectValue placeholder="Pilih jenis tagihan"/>
                                </SelectTrigger>
                                <SelectContent className='bg-white dark:text-black w-full'>
                                    {
                                        koleksiListTagihan.map((tagihan, iTagihan)=>
                                            <SelectItem key={iTagihan} value={tagihan.kode}>{tagihan.name}</SelectItem>
                                        )
                                    }
                                </SelectContent>
                            </Select>
                        </Field>
                        
                        <Field className='relative mt-4' orientation={"horizontal"}>
                            <div className='text-[10px] absolute -top-2 ps-1 pe-4 bg-white dark:bg-sky-900/80 dark:text-sky-200 rounded-tr-2xl w-fit'>Jenis Peserta</div>
                            <Select
                                
                                    value={targetPaket}
                                    onValueChange={onSelectTarget}
                                >
                                <SelectTrigger className='bg-white w-full rounded-tl-none text-[10px]'>
                                    <SelectValue placeholder="Pilih target Paket"/>
                                </SelectTrigger>
                                <SelectContent className='bg-white dark:text-black w-full'>
                                    <SelectItem value="rombel">Kelas</SelectItem>
                                    <SelectItem value="siswa">Siswa Tertentu</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>
                    
                        {
                            targetPaket === 'siswa' && (
                                <div className="relative mt-4">
                                    <div className='text-[10px] absolute -top-3.5 text-slate-600 ps-1 pe-4 bg-white dark:bg-sky-900/80 dark:text-sky-200 rounded-tr-2xl w-fit'>
                                        Data Calon Peserta
                                    </div>
                                    <div className="flex flex-col max-h-64 overflow-y-auto scrol-h-custom bg-white p-2 shadow shadow-sky-300 rounded-b-xl">
                                        {
                                            koleksiSiswaUI.map((siswa, iSiswa)=>
                                                <Field key={iSiswa} className="flex flex-row  w-full justify-between has-checked:bg-green-300 " orientation={"horizontal"}>
                                                    <Label htmlFor={"id_siswa_"+siswa.id} className="text-[10px] w-full border-b-[0.5px] border-slate-300 checked:border-slate-600">
                                                        ({siswa.nama_rombel}) {siswa.pd_nama}
                                                    </Label>
                                                    <Input 
                                                        id={"id_siswa_"+siswa.id}  
                                                        type="checkbox" value={siswa.id} 
                                                        checked={koleksiIdSiswa.includes(siswa.id)} 
                                                        onChange={handleCheckeTargetPerson} 
                                                        className="h-3 w-3"/>
                                                </Field>
                                            )
                                        }
                                    </div>
                                </div>

                            )
                        }
                </div>
                <div className="border rounded-2xl bg-sky-200 p-2 shadow-md shadow-sky-800">
                    <div className="relative mt-4">
                        <div className="absolute -top-3 text-gray-500 left-1 dark:shadow-xs dark:shadow-sky-300 ps-1 pe-4 rounded-tr-2xl bg-white dark:bg-input/30 w-fit text-[10px]">
                            Pelaksanaan
                        </div>
                        <CalendarTime date={startTime} setDate={setStartTime}/>
                    </div>
                    <Field className='relative mt-4' orientation={"horizontal"}>
                        <div className='text-[10px] absolute -top-2 ps-1 pe-4 bg-white dark:bg-sky-900/80 dark:text-sky-200 rounded-tr-2xl w-fit'>
                            Muatan Pelajaran
                        </div>
                        <Select
                            
                                value={mapel}
                                onValueChange={onSelectMapel}
                            >
                            <SelectTrigger className='bg-white w-full rounded-tl-none text-[10px]'>
                                <SelectValue placeholder="Pilih Mapel"/>
                            </SelectTrigger>
                            <SelectContent className='bg-white dark:text-black w-full'>
                                {
                                    mapelSelector.data.map((mapel, iMapel)=>
                                        <SelectItem key={mapel.idbaris} value={mapel.nama_mapel}>{mapel.nama_mapel}</SelectItem>
                                    )
                                }
                                
                            </SelectContent>
                        </Select>
                    </Field>
                    <div className='max-h-60 overflow-y-auto scrol-h-custom'>
                        <TableWithScrolling className='text-[10px]'>
                            <thead>
                                <TRowEdura>
                                    {/* <ThEdura className="text-wrap text-[10px]">Capaian Pembelajaran (CP)</ThEdura> */}
                                    <ThEdura className="text-wrap text-[10px]">Tujuan Pembelajaran (TP)</ThEdura>
                                    <ThEdura className="text-wrap text-[10px]">Alur Tujuan Pembelajaran (ATP)</ThEdura>
                                    <ThEdura>Pilih</ThEdura>
                                </TRowEdura>
                            </thead>
                            <tbody>
                                {
                                    kurikulumKelasUI.map((mapel, index)=>
                                        
                                            mapel.hasTp.map((tp, iTp)=>
                                                tp.hasAtp.map((atp, iAtp)=>
                                                    <TRowEdura key={index+'_'+iTp+'_'+iAtp} className="[&:has(:checked)>td]:bg-amber-300">
                                                        {
                                                            (iAtp === 0) &&(<TdEdura className='text-wrap' rowSpan={tp.hasAtp.length}>{tp.tp_description}</TdEdura>)
        
                                                        }
                                                        <TdEdura className='text-wrap'>({atp.kelas.join(' dan ')}) {atp.atp_description}</TdEdura>  
                                                        {/* <TdEdura className='text-wrap'>
                                                            {
                                                                atp.hasSoal.map(({bentukSoal, data},iSoal)=><div className='flex justify-between' key={iSoal}><span>{bentukSoal.shortName}: </span><span>{data.length}</span></div>)
                                                            }
                                                        </TdEdura>   */}
                                                        <TdEdura className='align-middle'>
                                                            <input 
                                                                type="checkbox" 
                                                                className="peer" 
                                                                id={'atp_'+atp.atp_id} 
                                                                value={atp.atp_id}
                                                                checked={koleksiAtp.some(s=>s.atp_as_tp_id === atp.atp_id)}
                                                                onChange={(e)=>checkedCollectionAtp(e.currentTarget.checked, atp.source)}
                                                                />
                                                        </TdEdura>  
                                                    </TRowEdura>
                                                )
                                            )
                                        )
                                    
                                }
                            </tbody>
                        </TableWithScrolling>
                    </div>
                </div>
            </WrapperContent>
                <ModalFooterEdura>
                <ButtonCommitAwesome labelButton="Simpan Perubahan" className="px-4 py-0" onClick={onSubmit}>
                    {
                        state.isSubmitting && (<Loader size={12} className="animate-spin self-center"/>)
                    }
                </ButtonCommitAwesome>
            </ModalFooterEdura>
            
        </fieldset>
    )
}