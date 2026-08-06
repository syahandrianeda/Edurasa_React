import { useEffect, useMemo, useState } from "react";
import KlasifikasiSurat from "../fields/klasifikasi-surat";
import NoSuratField from "../fields/no-surat";
import NoSuratUrutField from "../fields/no-surat-urut";
import TanggalSurat from "../fields/tanggal-surat";
import { useFormEdura } from "~/components/form-custom/form-edura";
import type{ SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";
import { NAMA_SEKOLAH } from "~/domain/identitas_aplikasi/identitas-aplikasi";

export default function(){
    const {currentData, setCurrentData} = useFormEdura<SuratKeluarAppType>();
    const [disableInputNoSurat, setDisableInputNoSurat] = useState<boolean>(true);
    const [prefix, setPrefix] = useState<string>(currentData.nosurat.split('/')[0]);

    const handleKlasifikasi = (v:string)=>{
        setDisableInputNoSurat(v !== 'manual');
        
        setPrefix(v);
    }

    const noSuratValue = useMemo(()=>{
        const noUrut = currentData.id_nosurat.padStart(3,'0');
        const namaSekolah=NAMA_SEKOLAH;
        const romawi = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII']
        const tgl = currentData.tglsurat;
        const indexBulan = tgl.getMonth();
        const tahun = tgl.getFullYear()
        const sufix = `${romawi[indexBulan]}/${tahun}`
        return `${prefix}/${noUrut}-${namaSekolah}/${sufix}`;
    },[prefix, currentData.nosurat, currentData.id_nosurat, currentData.tglsurat])

    useEffect(()=>{
        setCurrentData(draft=>{
            draft.nosurat = noSuratValue
        })
    },[noSuratValue])

    const handleInputNoSurat = (v:string)=>{

        setCurrentData(draft=>{
            draft.nosurat = v
        })
    }

    return (
        <div className="bg-linear-to-tl  from-sky-300 to-sky-100 p-2 dark:text-sky-600 rounded-2xl">
            <h4 className="text-lg font-bold text-center border-b-2 border-double border-sky-400">Nomor dan Tanggal Surat</h4>
            <div className="grid grid-cols-3 gap-1">
                <NoSuratUrutField currentData={currentData} setCurrentData={setCurrentData}/>
                <TanggalSurat/>
            </div>
            <KlasifikasiSurat prefix={prefix} onChangePrefix={handleKlasifikasi}/>
            <NoSuratField disable={disableInputNoSurat} inputValue={currentData.nosurat} handleChange={handleInputNoSurat}/>
        </div>
    )
}