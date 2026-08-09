import { Fragment, useEffect, useState } from "react";
import { type Updater } from "use-immer";
import { CalendarPickerKaldik } from "~/components/form-custom/calendar";
import { Input } from "~/components/ui/input";
import { useAppSelector } from "~/context-reduct/hook";
import { InstancePangkatGolonganSelector } from "~/context-reduct/selectores/pangkat-golongan-selector";
import { InstanceRiwayatIdAkun } from "~/context-reduct/selectores/riwayat-id-akun-selector";
import SppdForm from "~/controllers/surat/forms/formulir-sppd";
import NoSuratField from "~/controllers/surat/modals/fields/no-surat";
import NoSuratUrutField from "~/controllers/surat/modals/fields/no-surat-urut";
import BuildSppd from "~/domain/surat/sppd/build-sppd";
import useNoSuratFormat from "~/hooks/use-nosurat";
import type{ SppdAppType } from "~/types/surat/sppd-app-type";
import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";

interface FormulirInputSuratKeluarProps{
    prefix:string,
    suratKeluar:SuratKeluarAppType,
    setSuratKeluar:Updater<SuratKeluarAppType>
}
export default function FormulirInputSuratKeluar({prefix,suratKeluar, setSuratKeluar}:FormulirInputSuratKeluarProps){
    const noSuratKeluar = useNoSuratFormat(suratKeluar, prefix);
    // const [tujuanSurat, setTujuanSurat] = useState<string>(suratKeluar.ditujukkankepada||"");
    useEffect(()=>{
        setSuratKeluar(draft=>{
            draft.nosurat = noSuratKeluar
        })
    },[noSuratKeluar])

    const handleDateSuratKeluar = (value:string|Date)=>{
            if(!value) return;
            setSuratKeluar(draft=>{
                draft.tglsurat = typeof(value) === 'string'? new Date(value):value;
            })
        };
    
    const handleSuratTujuan = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.currentTarget;
        // setTujuanSurat(value);
        setSuratKeluar(draft=>{
            draft.ditujukkankepada = value;
        })
    }

    return(
        <>
        <div className="relative grid grid-cols-1  mt-7 border-2 broder-dotted px-2 pb-4 border-sky-300 shadow-lg shadow-sky-500 bg-linear-to-br from-sky-200 to-sky-300 rounded-tr-4xl md:grid-cols-12 gap-2">
                <p className="absolute -top-4 text-xs -left-0.5 bg-sky-200 ps-1 pe-4 rounded-tr-2xl border-s-2 border-t border-b-0 border-e border-sky-300">Nomor Surat Keluar</p>
                <div className="md:col-span-2">
                    <NoSuratUrutField currentData={suratKeluar} setCurrentData={setSuratKeluar}/>
                    <p className="text-[8px] p-1">* No. Surat Keluar terakhir = {(Number(suratKeluar.id_nosurat) - 1).toString().padStart(3,'0')}</p> 
                </div>
                <div className="md:col-span-4">
                    <CalendarPickerKaldik
                        id="id_tgl_surat_keluar"
                        className="col-span-2 mt-7 shadow-lg shadow-sky-400"
                        label="Tanggal Surat Keluar"
                        currentDate={suratKeluar.tglsurat}
                        handleChangeDate={handleDateSuratKeluar}/>
                </div>
                <div className="md:col-span-6">
                    <NoSuratField inputValue={noSuratKeluar}  disable className="shadow-lg shadow-sky-400"/> 
                </div>
                
                
            </div>
            
            <div className="relative grid md:grid-cols-12 gap-2 mt-7 border-2 broder-dotted px-2 py-4 border-sky-300 shadow-lg shadow-sky-500 bg-linear-to-br from-sky-200 to-sky-300 rounded-tr-4xl ">
                <p className="absolute -top-4 text-xs -left-0.5 bg-sky-200 ps-1 pe-4 rounded-tr-2xl border-s-2 border-t border-b-0 border-e border-sky-300">Ditujukan Kepada</p>
                <div className="md:col-span-10 ps-1 pe-4 relative shadow-lg shadow-sky-400 mt-4">
                    <label htmlFor="input_ditujukankepada" className="text-[10px] absolute -top-3 left-1 bg-sky-200 ps-1 pe-4 rounded-tr-2xl border-s-2 border-t border-b-0 border-e border-sky-300">Tujuan Surat (Ditujukan kepada)</label>
                    <Input  type="text" 
                            id="input_ditujukankepada" value={suratKeluar.ditujukkankepada} 
                            onChange={handleSuratTujuan} 
                            className="p-1  border-s-2 border-b-3 border-sky-300 rounded-s-none rounded-ee-none focus-visible:border-sky-300 outline-0 focus-visible:ring-0 focus-visible:outline-none bg-sky-100 focus-within:ring-0"/>
                </div>
            </div>
        </>
    )
}