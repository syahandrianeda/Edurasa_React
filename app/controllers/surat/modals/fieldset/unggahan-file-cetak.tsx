
import { FilePreviewProvider, SectionPreview } from "~/components/form-custom/files-input";
import { FileUploadSuratKeluar } from "../fields/unggah-file-surat.-keluar";

export default function(){
    
    return (
        <FilePreviewProvider>
            <div className="bg-linear-to-tl from-sky-300 to-sky-100 p-2 dark:text-sky-600 rounded-2xl">
                <h4 className="text-lg font-bold text-center border-b-2 border-double border-sky-400">
                    Unggah File Cetak
                </h4>
                <p className="text-[10px]">Untuk keperluan dokumentasi, silakan unggah file surat keluar yang telah Anda cetak dan ditandangani</p>
                <FileUploadSuratKeluar/>
                <div className="overflow-x-hidden h-2/3 scrol-h-custom">
                    <SectionPreview/>
                </div>
            </div>
        </FilePreviewProvider>
    )
}