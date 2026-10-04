import { useCallback, type ChangeEvent } from "react";
import { Input } from "~/components/ui/input";
import type { HandleUpdateResponKoreksi } from "~/domain/bank-soal/koreksi";
import type { TemplateKoreksiSiswaType } from "~/types/penilaian/TemplateKoreksiSiswaType";
import {toast} from 'sonner';
import UploadGambarSoalService from "~/infrastructures/services/upload-gambar-soal-service-implements";

export function KoreksiIsianSingkat({template, handleUpdate}:{template:TemplateKoreksiSiswaType, handleUpdate: HandleUpdateResponKoreksi}){
    const data = template.data;
        const uploadFile= useCallback((e:ChangeEvent<HTMLInputElement>)=>{
            e.preventDefault();
             e.preventDefault();
            const {name} = e.currentTarget;
            const splitting = name.split('_');
            const no_prefix = splitting.pop();
            const bentuk_soal = splitting.join('_');
    
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
                    loading: `Sedang mengupload gambar  ${bentuk_soal} No. ${no_prefix}`,
                    success: (response)=>{
                        
                        // const komp = ImgDriveComp(response)
                        const result =  `<img src="${response}" classe="aspect-ratio" referrerPolicy="no-referrer"/>`;
                        // setValueInput(result);
                        handleUpdate(bentuk_soal, Number(no_prefix), { respon: result});
                        return 'Berhasil mengupload'
    
                    },
                    error: (err)=>'Gagal Menguplad, coba lagi! | '+err,
                    closeButton:true
                }
            )
    
        },[])
    return (
        <ol className="list-decimal list-outside ps-4">
            {
                data.map(({soal, no_prefix, respon})=>
                    <li key={no_prefix}>
                        {
                            (soal?.stimulus !=="") && (
                                <div className="editor-document [&>p]:m-0 [&>img]:m-0"
                                    dangerouslySetInnerHTML={{__html:soal?.stimulus}}/>
                            )

                        }
            
                        {
                            soal?.pertanyaan && <div className="editor-document [&>p]:m-0 [&>img]:m-0"
                            dangerouslySetInnerHTML={{__html: soal?.pertanyaan}}/>
                        }
                        <div className="bg-white dark:text-black p-2 whitespace-pre-wrap border-2 rounded-2xl border-dashed border-green-300">
                            <p className="font-bold">Pembahasan/Penskoran:</p>
                            <div dangerouslySetInnerHTML={{__html:soal?.pembahasan_penskoran}} className="editor-document"/>
                        </div>
                        <div className="relative mt-4">
                            {/* <InputText readOnly type="text" value={respon?.respon ?? ''} label={`Respon Siswa No. ${no_prefix}`}/> */}
                            <div className="absolute -top-4 border-black border left-0 w-auto ps-1 pe-4 bg-white dark:text-black rounded-tr-2xl">Respon Siswa No. {no_prefix}</div>
                            <div className="rounded-b-2xl px-2 whitespace-pre-wrap bg-white min-h-12  max-h-36 overflow-y-auto scrol-h-custom border-black border editor-document" dangerouslySetInnerHTML={{__html:respon?.respon??''}} />
                            <label htmlFor={"file_"+soal.bentuk_soal +'_'+ no_prefix} className="flex h-fit w-fit items-center justify-center gap-[0.5em] rounded-full bg-sky-700 px-4 py-0 text-[10px] text-white shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),0px_0px_4px_1px_var(--color-sky-100),0px_4px_0px_0px_var(--color-sky-800)] duration-250 hover:translate-y-[0.25em] active:translate-y-[0.5em] active:shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),1px_0px_2px_1px_#f9d1d1]">Upload Respon</label>
                            <input type="file" id={"file_"+soal.bentuk_soal +'_'+ no_prefix} name={soal.bentuk_soal +'_'+ no_prefix} className="hidden" onChange={uploadFile}/>
                        </div>
                        <div className="flex w-full border justify-end mt-1 mb-3">
                            <div className="border flex gap-2 items-center">
                                <label htmlFor={soal.bentuk_soal +'_'+ no_prefix} className="font-bold text-green-800 text-nowrap">SKOR {template.bentuk_soal.description} No. {no_prefix}</label>
                                <Input
                                    id={soal.bentuk_soal +'_'+ no_prefix}
                                    className="min-w-15 bg-white dark:text-black"
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={respon?.skor ?? ''}
                                    onChange={(e)=>{
                                        const raw = e.target.value;
                                        /** input kosong = tidak mengubah skor */
                                        if(raw === '') return;
                                        const skor = Number(raw);
                                        if(Number.isNaN(skor)) return;
                                        /** clamp skor pada rentang 0-100 */
                                        handleUpdate(template.bentuk_soal.name, no_prefix, { skor: Math.min(100, Math.max(0, skor)) });
                                    }}
                                />
                            </div>
                        </div>
                    </li>
                )
            }
        </ol>
    )
}