import { Loader, Paperclip, Trash } from "lucide-react";
import type {  ChangeEventHandler, MouseEventHandler } from "react";
import ButtonTooltip from "~/components/ui_edura/button-tooltip";
import { useAppSelector } from "~/context-reduct/hook";
import { cn } from "~/lib/utils";
import type { KehadiranType } from "~/types/absensi-siswa";

export function UploadFileAbsen({
    kehadiran,
    infoInput,
    onChangeFile,
    className
}:{
    kehadiran:KehadiranType,
    infoInput:string,
    onChangeFile:ChangeEventHandler<HTMLInputElement> | undefined,
    className: string
}
){
    const processing = useAppSelector(state=>state.loadedApi.loaded);

    return (
        <div className={cn("flex justify-center w-fit p-0.5", className)}>
            <input id={`input_file_${kehadiran}`} type="file" className="hidden" onChange={onChangeFile} />
                <ButtonTooltip asChild tooltip={infoInput} variant="outline" className="bg-linear-to-b cursor-pointer text-white hover:text-yellow-300 m-0 h-fit justify-center px-2 py-0 ring-0 outline-0 from-sky-600 to-sky-500 shadow-lg border border-sky-300 rounded-xl">
                    <label htmlFor={`input_file_${kehadiran}`}>
                        {processing && <Loader className="animate-spin" size={8}/>}
                        <Paperclip size={8}/>
                        
                    </label>
                </ButtonTooltip>
        </div>
        )

}

export function ButtonRemoveFileAbsen({
    className,
    onRemove,
    
}:{ 
    className:string,
    onRemove:MouseEventHandler<HTMLButtonElement> 
}){
    return (
        <ButtonTooltip asChild tooltip="Hapus file, dan pilih gambar/icon default" variant="outline"
            className="m-0 h-fit flex justify-center py-0 ring-0 outline-0 w-10 rounded-xl">
            <button 
                className={cn("bg-radial hover:text-white from-rose-500 to-rose-300 border-sky-300",className)} 
                onClick={onRemove}  
                >
                <Trash size={8}/>
            </button>
        </ButtonTooltip>
    )
}