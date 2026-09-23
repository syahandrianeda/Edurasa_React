import {useCallback, useEffect, useMemo, useState, type ChangeEvent} from 'react';
import {  useFormEdura } from "~/components/form-custom/form-edura";
import WrapperContent from "~/controllers/publikasi-paket-soal/modal/wrapper-content";
import { InputText } from '~/components/fields/fields';
import CalendarTime from '~/components/ui/calender-time';
import { Field, FieldContent, FieldGroup } from '~/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import type { TypePaketSoal } from '~/domain/paket-soal/entities/type-paket';
import {Loader} from 'lucide-react';
import { Input } from '~/components/ui/input';
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
import { DataRombelUI } from '~/domain/rombel/data-rombel';
import DtoTagihanHasDataResponse from '~/dtos/dto-tagihan-has-data-response';
import validationTagihanHasDataResponse from './validation-tagihan-data-response';


export default function EditPublikasiInstrumenTagihan(){
    const {actions:modalAction} = useModal<TagihanHasDataResponse>()
    const {actions:post, state} = useCrudPublikasiPaketSoal();
    const {currentData, setCurrentData} = useFormEdura<TagihanHasDataResponse>();

    const rombel =  getSessionRombel() as string;
    const semester = currentTapelProperties({variant:'getSemester',tgl: currentData.start_time});
    const siswa = useAppSelector(selectAllSiswaDTO);
    const mapelSelector = useAppSelector(CurrentMapelInActiveRombel);
    const kurikulumHasManySoal = useAppSelector(AtpHasManySoalSelector);
    const jenjang = getNumberFromString(rombel);

   /** state lokal */
    const [dataKelas, setDataKelas] = useState<string[]>(currentData?.target_rombel ?? []);
    const [namaPublikasi, setNamaPublikasi] = useState<string>(currentData.nama_publikasi);
    const [startTime, setStartTime] = useState<Date>(currentData.start_time);
    const [endTime, setEndTime] = useState<Date>(currentData.end_time);
    const [targetPaket, setTargetPaket] = useState<TypePaketSoal>(currentData?.target_type);
    const [koleksiIdSiswa, setKoleksiIdSiswa] = useState<number[]>(currentData.target_person)
    const [durasi, setDurasi] = useState<number>(currentData.durasi);
    const [jenisTagihan, setJenisTagihan]= useState<string>(currentData.jenis_tagihan.kode)

    const [koleksiMapel, setKoleksiMapel] = useState<string>('');
    const [koleksiAtp, setKoleksiAtp] = useState<AtpHasManySoalType[]>([]);

    /** memo */
    const koleksiRombel = useMemo(()=>DataRombelUI.filter(s=>s.active && s.jenjang === jenjang),[jenjang, DataRombelUI]);
    const koleksiListTagihan = useMemo(()=>ListJenisTagihan.filter(s=>s.kelas.includes(jenjang) && s.semester.includes(semester as number)),[jenjang, semester])
    const koleksiSiswaUI = useMemo(()=>siswa.filter(s=>s.jenjang === jenjang && dataKelas.includes(s.nama_rombel)),[dataKelas, jenjang]);
    
    const onSelectTarget = useCallback((value:TypePaketSoal) =>{
            setTargetPaket(value);
            if(value === 'siswa'){
                setDataKelas([rombel])
            }
            setKoleksiIdSiswa([])
    },[setTargetPaket, setKoleksiIdSiswa, setDataKelas])
    
    const handleCheckTargetRombel = useCallback(( event: React.ChangeEvent<HTMLInputElement> ) => {
            const value = event.currentTarget.value;

            // Pilih seluruh rombel pada jenjang
            if (value === jenjang.toString()) {
                setDataKelas(
                    koleksiRombel.map((item) => item.rombelName)
                );
                return;
            }

            // Pilih satu rombel
            setDataKelas([value]);
        },[setDataKelas]);
    
    const onChangeJenisTagihan = useCallback((kode:string)=>{
        setJenisTagihan(kode);
    },[setJenisTagihan])

    const handleCheckeTargetPerson = useCallback((e: ChangeEvent<HTMLInputElement>)=>{
        const {value, checked} = e.currentTarget;
        const koleksi = checked 
                        ? [...koleksiIdSiswa, Number(value)]
                        : koleksiIdSiswa.filter(s=> s!==Number(value))
        setKoleksiIdSiswa(koleksi)
    },[setKoleksiIdSiswa]);

    useEffect(()=>{
        setCurrentData(draft=>{
            draft.start_time = startTime;
            draft.end_time = endTime;
            draft.nama_publikasi = namaPublikasi;
            draft.target_type = targetPaket;
            draft.target_person = koleksiIdSiswa;
            draft.durasi = durasi;
            draft.jenis_tagihan = ListJenisTagihan.find(s=>s.kode === jenisTagihan)!;

        })
    },[
        startTime,
        endTime,
        namaPublikasi,
        targetPaket,
        koleksiIdSiswa,
        durasi
    ])

    const onSubmit = ()=>{
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
                        return 'Gagal mengupdate data | ' + err
                    }
                }
            )
                    
        }
    return (
        <fieldset disabled={state.isSubmitting}>
            <WrapperContent className="grid md:grid-cols-2 grid-cols-1 gap-2 w-full text-sm">
                <div className="border rounded-2xl bg-sky-200 p-2 shadow-md shadow-sky-800">
                    <Field className="relative">
                        <InputText type="text" value={namaPublikasi} onChange={(e)=>setNamaPublikasi(e.currentTarget.value)} label="Nama Publikasi"/>
                    </Field>
                    <div className="flex gap-2">
                        <div className="relative mt-7">
                            <div className="absolute -top-3 text-gray-500 left-1 dark:shadow-xs dark:shadow-sky-300 ps-1 pe-4 rounded-tr-2xl bg-white dark:bg-input/30 w-fit text-[10px]">Waktu Mulai</div>
                            <CalendarTime date={startTime} setDate={setStartTime}/>
                        </div>
                        <div className="relative mt-7">
                            
                            <InputText label="Durasi (menit)" type="number" value={durasi} onChange={(e)=>setDurasi(Number(e.currentTarget.value))}/>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative mt-7">
                            <div className="absolute -top-3 text-gray-500 left-1 dark:shadow-xs dark:shadow-sky-300 ps-1 pe-4 rounded-tr-2xl bg-white dark:bg-input/30 w-fit text-[10px]">
                                Batas Akhir Pengerjaan online
                            </div>
                            <CalendarTime date={endTime} setDate={setEndTime}/>
                        </div>
                    </div>
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
                    <FieldGroup>
                        <FieldContent className='gap-2 mt-2 mb-1 bg-white p-2 rounded-2xl'>
                            {
                                targetPaket === 'rombel' ?
                                (
                                    <>
                                        <Field orientation='horizontal'>
                                            <Input type="radio" 
                                                name="target_kelas" 
                                                id="jenjang" 
                                                className='h-3 w-3' 
                                                value={jenjang.toString()} 
                                                checked={dataKelas.length === koleksiRombel.length && koleksiRombel.every((m) => dataKelas.includes(m.rombelName) )} 
                                                onChange={handleCheckTargetRombel}/>
                                            <Label htmlFor="jenjang" className='text-[10px]'>Seluruh Kelas {jenjang} ({koleksiRombel.map(m=>'kelas '+m.rombelName).join(' dan ')})</Label>
                                        </Field>
                                            {
                                                koleksiRombel.map((m, i)=>
                                                    <Field key={i} orientation='horizontal' className='text-[10px]'>
                                                        <Input type="radio" name="target_kelas" id={"rombel_"+m.rombelName} className='h-3 w-3' value={m.rombelName} checked={dataKelas.length === 1 && dataKelas.includes(m.rombelName)} onChange={handleCheckTargetRombel}/>
                                                        <Label htmlFor={"rombel_"+m.rombelName} className='text-[10px]'>Semua Siswa Kelas {m.rombelName}</Label>
                                                    </Field>
                                                    
                                                )
                                            }
                                    </>
                                ):(
                                    <>
                                        {
                                            koleksiRombel.map((m, i)=>
                                                <Field key={i} orientation='horizontal' className='text-[10px]'>
                                                    <Input type="radio" name="target_kelas" id={"rombel_"+m.rombelName} className='h-3 w-3' value={m.rombelName} checked={dataKelas.length === 1 && dataKelas.includes(m.rombelName)} onChange={handleCheckTargetRombel}/>
                                                    <Label htmlFor={"rombel_"+m.rombelName} className='text-[10px]'>Siswa tertentu di kelas {m.rombelName}</Label>
                                                </Field>
                                                
                                            )
                                        }
                                        
                                    </>
                                )
                            }
                        </FieldContent>
                    </FieldGroup>
                    {
                        targetPaket === 'siswa' && <div className="bg-white dark:text-black p-1 text-[8px] m-1 rounded">Paket Soal dengan jenis target <strong>Siswa tertentu</strong> dapat dimanfaaatkan untuk pengayaan/remedian untuk siswa tertentu di kelas {dataKelas}. Silakakn pilih nama-nama siswa sebagai peserta penilaian di samping</div>
                    }
                </div>
                <div className="border rounded-2xl bg-sky-100 p-2 shadow-md shadow-sky-800 ">
                    <div className="relative mt-4">
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
                                                    type="checkbox" 
                                                    value={siswa.id} 
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