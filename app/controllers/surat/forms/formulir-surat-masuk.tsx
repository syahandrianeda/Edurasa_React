import {type Updater } from "use-immer";
import { CalendarPicker } from "~/components/form-custom/calendar";
import AsalSurat from "~/controllers/surat/modals/fields/asal-surat-masuk";
import KlasifikasiSuratTemplate from "~/controllers/surat/modals/fields/klasifikasi-surat-template";
import NoSuratField from "~/controllers/surat/modals/fields/no-surat";
import PerihalSurat from "~/controllers/surat/modals/fields/perihal-surat";
import TujuanSurat from "~/controllers/surat/modals/fields/tujuan-surat";
import UnggahanFileSuratMasuk from "~/controllers/surat/modals/fieldset/unggahan-file-surat-masuk";
import { KlasifikasiNoSurat } from "~/domain/surat/klasifikasi-surat-permendagri";
import type{ SuratMasukAppType } from "~/types/surat/surat-masuk-app-type";

interface FormInputSuratMasukProps{
    suratMasuk: SuratMasukAppType, 
    setSuratMasuk: Updater<SuratMasukAppType>

    /** handleKlasifikasi yang menghubungkan suratMasuk dan suratKeluar */
    handleKlasifikasi: (v:string)=>void
    handlePrihal: (v:string)=>void
    prefix:string
}
export default function FormInputSuratMasuk({suratMasuk, setSuratMasuk, prefix, handleKlasifikasi, handlePrihal}:FormInputSuratMasukProps){
        
        const handleDate = (value:string|Date)=>{
            if(!value) return;
            setSuratMasuk(draft=>{
                draft.tglsurat = typeof(value) === 'string'? new Date(value):value;
            })
        }
    
    return (
        <div className="relative border bg-linear-to-tl from-sky-300 to-sky-200 rounded-2xl p-4">
            <p className="absolute -top-4 left-0 bg-sky-200 ps-2 pe-4 rounded-tr-2xl">Surat Masuk</p>
                
            <AsalSurat inputValue={suratMasuk.asalsurat} handleChange={(v)=>setSuratMasuk((drf)=>{drf.asalsurat = v})}/>
            <NoSuratField className="shadow-lg shadow-sky-400" inputValue={suratMasuk.nosurat} handleChange={(v)=>setSuratMasuk((drf)=>{drf.nosurat = v})}/>
            <CalendarPicker
                        id="id_tgl_surat"
                        className="col-span-2 mt-7 shadow-lg shadow-sky-400"
                        label="Tanggal Surat"
                        currentDate={suratMasuk.tglsurat}
                        handleChangeDate={handleDate}/>
            <PerihalSurat inputValue={suratMasuk.perihal} handleChange={(v)=>handlePrihal(v)} />
            <TujuanSurat inputValue={suratMasuk.ditujukkankepada??''} handleChange={(v)=>setSuratMasuk(drf=>{drf.ditujukkankepada = v})}/>
            <div className="flex flex-col md:flex-row gap-4 justify-stretch ">
                <UnggahanFileSuratMasuk currentData={suratMasuk} setCurrentData={setSuratMasuk}/> 
                <div className="p-2 shadow-lg shadow-sky-400 md:w-1/2 rounded-2xl">
                    <div className="text-[10px]">
                        {/* <KlasifikasiSuratMasuk currentData={suratMasuk} setCurrentData={(v)=>handleKlasifikasi(v)}/> */}
                        <KlasifikasiSuratTemplate value={prefix} setValue={handleKlasifikasi}/>
                        
                        Berikut index surat yang memiliki template surat otomatis:
                        <ul className="list-disc list-inside shadow-lg shadow-sky-400">
                            {
                                KlasifikasiNoSurat.filter(s=>s.template).map(({description, template},index)=>
                                    <li key={index} className="list-item">{description}</li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}