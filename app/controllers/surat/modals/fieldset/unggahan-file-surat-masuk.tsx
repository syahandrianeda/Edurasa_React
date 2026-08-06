import { FilePreviewProvider, SectionPreview } from "~/components/form-custom/files-input";
import { FileUploadSuratMasuk } from "../fields/unggah-file-surat-masuk.js";

import type{ SuratMasukAppType } from "~/types/surat/surat-masuk-app-type.js";

export default function({currentData, setCurrentData}:{currentData:SuratMasukAppType, setCurrentData:(updater: (draft: SuratMasukAppType) => void) => void}){
    // const {currentData, setCurrentData} = useFormEdura<SuratMasukAppType>()
    return (
        <FilePreviewProvider>
            <div className="bg-linear-to-tl md:w-1/2 min-h-80 shadow-lg shadow-sky-400 from-sky-300 to-sky-100 p-2 dark:text-sky-600 rounded-2xl">
                <h4 className="text-lg font-bold text-center border-b-2 border-double border-sky-400">
                    Unggah File Surat
                </h4>
                <p className="text-[10px]">Untuk keperluan dokumentasi, silakan unggah file surat masuk</p>
                <FileUploadSuratMasuk setCurrentData={setCurrentData} currentData={currentData}/>
                <div className="overflow-x-hidden h-2/3 scrol-h-custom">
                    <SectionPreview/>
                </div>
            </div>
        </FilePreviewProvider>
    )
}