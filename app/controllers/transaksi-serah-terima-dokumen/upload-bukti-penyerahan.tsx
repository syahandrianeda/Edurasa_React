import { Loader, Upload } from "lucide-react";
import { useState } from "react";
import { ButtonDeletePreview, ButtonPreviewFile, FileInputUpload } from "~/components/form-custom/files-input";
import {type Updater} from 'use-immer'
import ButtonTooltip from "~/components/ui_edura/button-tooltip";
import { normalizeFileName } from "~/lib/normalized-filename";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import { useCrudTransaksiSerahTerimaProvider } from "./crud-provider-transaksi-serah-terima";
import type { TransaksiSerahTerimaDokumenAppType } from "~/types/galleries/transaksi-serah-terima-dokumen";

export function UploadBuktiPeneyerahan({
    currentData, 
    setCurrentData
}:{
    currentData:TransaksiSerahTerimaDokumenAppType,
    setCurrentData:Updater<TransaksiSerahTerimaDokumenAppType>
}){
    // const {currentData, setCurrentData} = useFormEdura<SuratKeluarAppType>();
    const [load, setLoad] = useState(false);
    const {actions} = useCrudTransaksiSerahTerimaProvider();

    const url = currentData?.idfile
    
    // if(url !=='') return null;
    
    const filePotoPenyerahan = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (!file) return;
            const param={
                // folder:'Arsip Surat Edurasa',
                // subfolder: 'File Surat Keluar',
                namafile: normalizeFileName(currentData?.jenis)+'_id_'+currentData.serah_terima_idbaris+'_personId_'+currentData.target_person_id+"_"+new Date().getTime()
            }
            
            setLoad(true);
            const result =  await actions.uploadFile(file,param);
            setLoad(false);
            
            if(result.success){
                setCurrentData(draft=>{
                    draft.idfile = result.data.idfile
                });
                ShowToasterSuccess(result.messsage);
            }else{
                ShowToasterError(result.messsage);
            }
    };

    return (
            <FileInputUpload label="Poto Penyerahan" src={url}>
                <ButtonPreviewFile fileId={url}/>
                <input id="file_poto" type="file" className="hidden" onChange={filePotoPenyerahan} />
                <ButtonTooltip asChild tooltip="Upload File" variant="default" className="bg-radial m-0 from-sky-500 to-sky-300 shadow-lg border border-sky-300 rounded-xl">
                    <label htmlFor="file_poto" className="border border-black p-1 rounded-xl flex justify-between gap-2 items-center">
                        {load && <Loader className="animate-spin" size={12}/>}
                        <Upload size={12}/>
                    </label>
                </ButtonTooltip>
                <ButtonDeletePreview fileId={url} callBack={()=>setCurrentData(draft=>{
                    draft.idfile = ""
                })}/>
            </FileInputUpload>
    )
}
