import FieldSuratMasukKolomSatu from "../fieldset/surat-masuk-kolom-satu";
import KolomDuaSamainSuratKeluar from "../fieldset/perihal-tujuan-surat"
import FormPtkYangDiperintah from "../forms/form-ptk-diperintah-sppd";
import UnggahanFileSuratMasuk from "../fieldset/unggahan-file-surat-masuk";
import { useFormEdura } from "~/components/form-custom/form-edura";
import type{ SuratMasukAppType } from "~/types/surat/surat-masuk-app-type";

export default function GroupTabUploadSuratMasuk(){
    const {currentData, setCurrentData} = useFormEdura<SuratMasukAppType>()
    return (
        <div className="flex justify-center w-full gap-2 h-[calc(100vh-12.5rem)] p-4">
            <UnggahanFileSuratMasuk currentData={currentData} setCurrentData={setCurrentData}/>
        </div>
    )
}