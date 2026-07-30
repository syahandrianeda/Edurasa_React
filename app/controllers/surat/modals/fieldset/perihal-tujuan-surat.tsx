import { useFormEdura } from "~/components/form-custom/form-edura";
import TemplatingIndexSurat from "../fields/index-templating";
import PerihalSurat from "../fields/perihal-surat";
import TujuanSurat from "../fields/tujuan-surat";
import type{ SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";

export default function(){
    const {currentData, setCurrentData} = useFormEdura<SuratKeluarAppType>();
    return (
        <div className="bg-linear-to-tl  from-sky-300 to-sky-100 p-2 dark:text-sky-600 rounded-2xl">
            <h4 className="text-lg font-bold text-center border-b-2 border-double border-sky-400">
                Tujuan dan Perihal Surat
            </h4>
            <PerihalSurat inputValue={currentData.perihal} handleChange={(v)=>setCurrentData(drf=>{drf.perihal = v})}/>
            <TujuanSurat inputValue={currentData.ditujukkankepada} handleChange={(v)=>setCurrentData(drf=>{drf.ditujukkankepada = v})}/>
            <TemplatingIndexSurat inputValue={currentData.indekssurat} handleChange={(v)=>setCurrentData(drf=>{drf.indekssurat = v})}/>
        </div>
    )
}