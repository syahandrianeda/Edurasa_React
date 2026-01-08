
import { toast } from "sonner";
import type { ApiResponse } from "~/configs/appscript-config";

export function ShowToasterSuccess(message:string){
        toast.success(
            'Berhasil ✅',
        {
            description: message,
            duration: 2000,
            closeButton:true,
        }
    );
}

export function ShowToasterLoadingInfo(message:string){
        toast.loading(
            'Loading...',
        {
            description: message,
            duration: 2000,
            closeButton:false,
        }
    );
}

export function ShowToasterError(message:string){
        toast.error(
            'Error',
        {
            description: message,
            duration: 2000,
            closeButton:true,
        }
    );
}

export function ShowLoadingPromise<T>(
    promise: Promise<ApiResponse<T>>,
    messages = {
        loading: 'Memproses...',
        success: 'Berhasil',
        error: 'Terjadi kesalahan'
    }
    ) {
    return toast.promise(
        promise.then(res => {
        if (!res.success) {
            return Promise.reject(res)
        }
        return res
        }),
        {
        loading: messages.loading,
        success: (res) => 'Sumber data : '+ res.source,//res.message ?? messages.success,
        error: (res) => res.message ?? messages.error,
        }
    )
}