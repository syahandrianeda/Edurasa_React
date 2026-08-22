import type { ReactNode } from "node_modules/@types/react";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import SwitchSettingOpsi from "./switch-setting-opsi";
import CreatePg from "./create-pg";

export default function WrapCreateOpsiJawaban({bentukSoal}:{bentukSoal:ListBentukSoalType}){
    /** handleCountOpsi */
    /** handleFormatOpsi */
    /** handleInputContent */
    return (
        <div className="relative mt-8 gap-0 bg-linear-to-br  via-amber-300 from-gray-300 to-purple-300 shadow-md shadow-sky-600 rounded-tr-2xl rounded-b-2xl p-2 mb-3">
            <div className="font-bold absolute ps-1 pe-4 rounded-tr-2xl -top-4 left-0 bg-sky-300 text-xs">
                Opsi Jawaban:
            </div>
            <SwitchSettingOpsi bentukSoal={bentukSoal}/>
            <CreatePg/>

        </div>
    )
}