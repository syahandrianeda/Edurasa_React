import { InputTextArea } from "~/components/fields/fields";
import type { Props } from "./input-opsi-jawaban-online";
import {useCallback, useEffect, useState, type ChangeEvent, type FormEvent, type InputEventHandler} from 'react';
import UploadImageServiceCommon from "~/infrastructures/services/upload-image-commons";
import {toast} from 'sonner';
import urlImgDrive from "~/lib/url-img-drive";
import ImgDriveComp from "~/components/image-from-drive/img-drive";
import UploadGambarSoalService from "~/infrastructures/services/upload-gambar-soal-service-implements";

export function FormIsianSingkat({ data, no_prefix, dataRespon, handleChange }: Props) {
    const [valueInput, setValueInput] = useState<string|null>(dataRespon.respon ?? null)
    
    const handleInput = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        const {value} = e.currentTarget;
        setValueInput(value);
        // handleChange(dataRespon, value, 0);
    }
    const handleUpload = async (e:ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        
        const file = e.target.files?.[0];
        if (!file) return;
        // const respon = await UploadImageServiceCommon(file);
        
         const svc = new UploadGambarSoalService();
                // const url = await svc.uploadFile(file, onProgress,opt);
                // console.log({url})
                // return url;
        toast.promise(
            // UploadImageServiceCommon(file),
            svc.uploadFile(file),
            {
                loading: `Sedang mengupload gambar  ${data.bentuk_soal} No. ${no_prefix}`,
                success: (response)=>{
                    
                    // const komp = ImgDriveComp(response)
                    const result =  `<img src="${response}" classe="aspect-ratio" referrerPolicy="no-referrer"/>`;
                    setValueInput(result);
                    return 'Berhasil mengupload'

                },
                error: (err)=>'Gagal Menguplad, coba lagi! | '+err,
                closeButton:true
            }
        )

    }
    useEffect(()=>{
        if(!valueInput) return;
        handleChange(dataRespon,valueInput,0)
    },[ valueInput, handleChange]);

     const handleBeforeInput = (
            e: React.FormEvent<HTMLTextAreaElement>
        ) => {
            const nativeEvent = e.nativeEvent as InputEvent;

            if ( nativeEvent.inputType === "insertFromPaste" || nativeEvent.inputType === "insertFromPasteAsQuotation" ) {
                e.preventDefault();

                toast.warning("Paste tidak diizinkan", {
                    description: "Silakan ketik jawaban secara langsung.",
                });
            }
        };
        const handleContextMenu = (
                e: React.MouseEvent<HTMLTextAreaElement>
            ) => {
                e.preventDefault();
                alert("Paste tidak diizinkan. Silakan ketik jawaban secara langsung.");
            };

    return (
        <div className="border-t-2 relative mt-4 flex flex-col gap-1">
            <InputTextArea 
                id={data.bentuk_soal + '_' + no_prefix + "_" + no_prefix} label={"Jawaban "+data.bentuk_soal+" No " + no_prefix} rows={2} 
                // value={dataRespon.respon ?? ''} 
                value={valueInput ?? ''}
                // onChange={(e) => handleChange(dataRespon, e.currentTarget?.value, 0)} 
                onChange={handleInput}
                onPaste={(e) => {
                            e.preventDefault();
                            alert("Paste tidak diizinkan. Silakan ketik jawaban secara langsung.");
                        }}
                onBeforeInput={handleBeforeInput}
                 onContextMenu={handleContextMenu}
            />
            <label htmlFor={'upload_'+data.bentuk_soal + '_' + no_prefix + "_" + no_prefix}
                className="flex h-fit w-full items-center justify-center gap-[0.5em] rounded-full bg-sky-700 px-4 py-0 text-white shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),0px_0px_4px_1px_var(--color-sky-100),0px_4px_0px_0px_var(--color-sky-800)] duration-250 hover:translate-y-[0.25em] active:translate-y-[0.5em] active:shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),1px_0px_2px_1px_#f9d1d1]" 
            >
                Upload Gambar
            </label>
            <input type="file" id={'upload_'+data.bentuk_soal + '_' + no_prefix + "_" + no_prefix} className="hidden" onChange={handleUpload}/>
        </div>
    );
}
