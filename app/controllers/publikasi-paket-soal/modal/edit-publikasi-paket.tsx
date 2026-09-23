import { Field, FieldContent, FieldGroup } from "~/components/ui/field";
import WrapperContent from "./wrapper-content";
import { InputText } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import {type PublikasiPaketAppType, type PublikasiPaketAppValidWithPaketSoal } from "~/types/bank-soal/entities/publikasi-paket-app-type";
import CalendarTime from "~/components/ui/calender-time";
import { useCallback, useEffect, useMemo, useState, type ChangeEvent } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "~/components/ui/select";
import type { TypePaketSoal } from "~/domain/paket-soal/entities/type-paket";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { DataRombelUI } from "~/domain/rombel/data-rombel";
import { useAppSelector } from "~/context-reduct/hook";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { getNumberFromString } from "~/lib/get-number";
import { selectAllSiswaDTO } from "~/context-reduct/selectores/data-siswa-aktif";
import { ListJenisTagihan } from "~/domain/asesmen-penilaian/list-jenis-tagihan";
import { currentTapelProperties } from "~/lib/current-tapel";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { useCrudPublikasiPaketSoal } from "../crud/crud-publikasi-paket-provider";
import { Loader } from "lucide-react";
import { useModal } from "~/components/modals/modal-provider";
import type { PaketSoalAppWithPublikasi } from "~/types/bank-soal/entities/paket-soal-app-type";
import DtoPublikasiPaketStatic from "~/dtos/dto-publlikasi-paket-static";
import {toast} from 'sonner';
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import type { PublikasiPaketSheetType } from "~/types/bank-soal/entities/publikasi-paket-sheet-type";

export default function EditPublikasiPaketSoal(){
    const {actions:post, state} = useCrudPublikasiPaketSoal();
    const {actions:modalAction} = useModal<PublikasiPaketAppValidWithPaketSoal>()
    // const {currentData, setCurrentData} = useFormEdura<PublikasiPaketAppType>();
    const {currentData, setCurrentData} = useFormEdura<PublikasiPaketAppValidWithPaketSoal>();
    const rombel = useAppSelector(s=> s.fokusRombel.value) ?? getSessionRombel() as string;
    const siswa = useAppSelector(selectAllSiswaDTO);
    const [startTime, setStartTime] = useState<Date>(currentData.start_time);
    const [endTime, setEndTime] = useState<Date>(currentData.end_time);
    const [namaPublikasi, setNamaPublikasi] = useState<string>(currentData.nama_publikasi);
    const [dataKelas, setDataKelas] = useState<string[]>(currentData.target_rombel);
    const [durasi, setDurasi] = useState<number>(currentData.durasi);
    const [targetPaket, setTargetPaket] = useState<TypePaketSoal>(currentData.target_type);
    const [koleksiIdSiswa, setKoleksiIdSiswa] = useState<number[]>(currentData.target_person)
    
    const jenjang = getNumberFromString(rombel);//useMemo(()=>getNumberFromString(rombel), [rombel]);
    const semester = useMemo(()=>currentTapelProperties({variant:'getSemester', tgl:currentData.start_time}),[currentData.start_time])


    const koleksiRombel = useMemo(()=>DataRombelUI.filter(s=>s.active && s.jenjang === jenjang),[jenjang, DataRombelUI])
    const koleksiSiswaUI = useMemo(()=>siswa.filter(s=>s.jenjang === jenjang && dataKelas.includes(s.nama_rombel)),[dataKelas, jenjang]);
    const koleksiListTagihan = useMemo(()=>ListJenisTagihan.filter(s=>s.kelas.includes(jenjang) && s.semester.includes(semester as number)),[jenjang, semester]);
    // const disabledEditStartTime = useMemo(()=> startTime.getTime() < new Date().getTime(),[startTime])
    // console.log({disabledEditStartTime})

    const onSelectTarget = useCallback((v:TypePaketSoal)=>{
        setTargetPaket(v);
        if(v === 'siswa'){
            // const awalKelas = currentData.target_rombel;
            setDataKelas([rombel])

        }
        setKoleksiIdSiswa([])
    },  [setTargetPaket, setDataKelas, setKoleksiIdSiswa])

    const handleCheckTargetRombel = (
            event: React.ChangeEvent<HTMLInputElement>
        ) => {
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
        };
    const onChangeJenisTagihan = (v:string)=>{
        setCurrentData(draft=>{
            draft.jenis_tagihan = v
        })
    }
    
    const handleCheckeTargetPerson = (e: ChangeEvent<HTMLInputElement>)=>{
        const {value, checked} = e.currentTarget;
        const koleksi = checked 
                        ? [...koleksiIdSiswa, Number(value)]
                        : koleksiIdSiswa.filter(s=> s!==Number(value))
        setKoleksiIdSiswa(koleksi)
    }

    useEffect(()=>{
        setCurrentData(draft=>{
            draft.durasi = durasi;
            draft.start_time = startTime;
            draft.end_time = endTime;
            draft.target_person = koleksiIdSiswa,
            draft.target_rombel = dataKelas
            draft.target_type = targetPaket
            draft.nama_publikasi = namaPublikasi
        })
    },[
        durasi,
        startTime, 
        endTime,
        koleksiIdSiswa,
        dataKelas,
        targetPaket,
        namaPublikasi
    ])
    
    const onSubmit = useCallback(()=>{
        const dto = DtoPublikasiPaketStatic.fromAppValidationToSheet(currentData)
        
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
    },[currentData])
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
                                            <Input type="radio" name="target_kelas" id="jenjang" className='h-3 w-3' value={jenjang.toString()} checked={ dataKelas.length === koleksiRombel.length && koleksiRombel.every((m) => dataKelas.includes(m.rombelName) ) } onChange={handleCheckTargetRombel}/>
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
                            value={currentData.jenis_tagihan}
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
                                                <Input id={"id_siswa_"+siswa.id}  type="checkbox" value={siswa.id} checked={koleksiIdSiswa.includes(siswa.id)} onChange={handleCheckeTargetPerson} className="h-3 w-3"/>
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