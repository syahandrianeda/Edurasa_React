import { Loader, Upload } from "lucide-react";
import { useState } from "react";
import { ButtonDeletePreview, ButtonPreviewFile, FileInputUpload } from "~/components/form-custom/files-input";
import ButtonTooltip from "~/components/ui_edura/button-tooltip";
import { normalizeFileName } from "~/lib/normalized-filename";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import { useCrudSuratKeluar } from "../../crud/surat-keluar-crud-provider";
import type { SuratMasukAppType } from "~/types/surat/surat-masuk-app-type";

export function FileUploadSuratMasuk({currentData, setCurrentData}:{currentData:SuratMasukAppType, setCurrentData:(updater: (draft: SuratMasukAppType) => void) => void}){
    // const {currentData, setCurrentData} = useFormEdura<SuratKeluarAppType>();
    const [load, setLoad] = useState(false);
    const {actions} = useCrudSuratKeluar();

    const url = currentData?.idfile
    
    // if(url !=='') return null;
    
    const fileSurat = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (!file) return;
            const param={
                // folder:'Arsip Surat Edurasa',
                // subfolder: 'File Surat Keluar',
                namafile: normalizeFileName("dokumen_surat_"+currentData?.perihal)+'_'+new Date().getTime()
            }
            
            setLoad(true);
            const result =  await actions.uploadFile(file,param);
            console.log('upload surat masuk,', result)
            setLoad(false);
            
            if(result.success){
                setCurrentData(draft=>{
                    draft.idfile = result.data.idfile
                });
                // setCurrentData(result.data.idfile)
                ShowToasterSuccess(result.messsage);
            }else{
                ShowToasterError(result.messsage);
            }
    };

    return (
            <FileInputUpload label="File Surat" src={url}>
                <ButtonPreviewFile fileId={url}/>
                <input id="fileSurat" type="file" className="hidden" onChange={fileSurat} />
                <ButtonTooltip asChild tooltip="Upload File" variant="default" className="bg-radial m-0 from-sky-500 to-sky-300 shadow-lg border border-sky-300 rounded-xl">
                    <label htmlFor="fileSurat" className="border border-black p-1 rounded-xl flex justify-between gap-2 items-center">
                        {load && <Loader className="animate-spin" size={12}/>}
                        <Upload size={12}/>
                    </label>
                </ButtonTooltip>
                {/* <FileInputAkte/> */}
                <ButtonDeletePreview fileId={url} callBack={()=>setCurrentData(draft=>{
                    draft.idfile = ""
                })}/>
            </FileInputUpload>
    )
}
