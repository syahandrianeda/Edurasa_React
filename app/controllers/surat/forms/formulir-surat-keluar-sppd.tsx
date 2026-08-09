import {useEffect } from "react";
import { type Updater } from "use-immer";
import FormulirSppd from "~/controllers/surat/forms/formulir-sppd";
import useNoSuratFormat from "~/hooks/use-nosurat";
import type{ SppdAppType } from "~/types/surat/sppd-app-type";
import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";
import FormulirInputSuratKeluar from "./formulir-surat-keluar";


interface FormulirSuratKeluarBaruProps{
    prefix:string, 
    suratKeluar:SuratKeluarAppType, 
    setSuratKeluar:Updater<SuratKeluarAppType>,
    sppd:SppdAppType[], 
    setSppd:Updater<SppdAppType[]>
}

export default function FormulirSuratKeluarSppd(
    {
        prefix, 
        suratKeluar, 
        setSuratKeluar,
        sppd, 
        setSppd
    }:FormulirSuratKeluarBaruProps){
    const noSuratKeluar = useNoSuratFormat(suratKeluar, prefix);
    
    useEffect(()=>{
        setSuratKeluar(draft=>{
            draft.nosurat = noSuratKeluar;
        })
    },[noSuratKeluar])    
    return (
        <>
        <div className="relative border mt-7 bg-linear-to-tl from-sky-300 to-sky-200 rounded-2xl p-4">
            <h3 className="absolute -top-4 left-0 bg-sky-200 ps-2 pe-4 rounded-tr-2xl">Surat Keluar</h3>
            <div className="relative mt-7 border-2 broder-dotted px-2 py-4 border-sky-300 shadow-lg shadow-sky-500 bg-linear-to-br from-sky-200 to-sky-300 rounded-tr-4xl md:grid-cols-12 gap-2">
                <p className="absolute -top-4 text-xs -left-0.5 bg-sky-200 ps-1 pe-4 rounded-tr-2xl border-s-2 border-t border-b-0 border-e border-sky-300">Jenis Surat Keluar</p>
                {suratKeluar.indekssurat}
            </div>
            <FormulirInputSuratKeluar
                suratKeluar={suratKeluar}
                setSuratKeluar={setSuratKeluar}
                prefix={prefix}
            />
        </div>
        <FormulirSppd suratKeluar={suratKeluar} setSuratKeluar={setSuratKeluar} sppd={sppd} setSppd={setSppd}/>
        </>
    )
}