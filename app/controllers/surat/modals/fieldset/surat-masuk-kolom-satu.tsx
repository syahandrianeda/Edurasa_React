import { useFormEdura } from "~/components/form-custom/form-edura";
import AsalSurat from "../fields/asal-surat-masuk";
import TanggalSurat from "../fields/tanggal-surat";
import type { SuratMasukAppType } from "~/types/surat/surat-masuk-app-type";
import NoSuratField from "../fields/no-surat";
import KlasifikasiSuratMasuk from "../fields/klasifikasi-surat-masuk";

export default function FieldSuratMasukKolomSatu(){
    const {currentData, setCurrentData} = useFormEdura<SuratMasukAppType>();
    return (
        <div className="bg-linear-to-tl  from-sky-300 to-sky-100 p-2 dark:text-sky-600 rounded-2xl">
            <h4 className="text-lg font-bold text-center border-b-2 border-double border-sky-400">Asal dan Nomor Surat</h4>
            <div className="grid grid-cols-3 gap-1">
                <AsalSurat inputValue={currentData.asalsurat} handleChange={(v)=>setCurrentData(drf=>{drf.asalsurat = v})}/>
                <TanggalSurat/>
                <NoSuratField className="col-span-3" inputValue={currentData.nosurat} handleChange={(v)=>setCurrentData(drf=>{drf.nosurat = v})}/>
            </div>
            <KlasifikasiSuratMasuk currentData={currentData} setCurrentData={setCurrentData}/>
        </div>
    )
}