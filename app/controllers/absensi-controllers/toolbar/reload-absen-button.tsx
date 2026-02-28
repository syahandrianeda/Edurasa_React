import { Loader } from "lucide-react";
import { toast } from "sonner";
import { setAbsensiRombel } from "~/context-reduct/global-state/absensi-slice";
import { setloadedApi } from "~/context-reduct/global-state/loaded-slice";
import { useAppDispatch, useAppSelector } from "~/context-reduct/hook";
import AbsensiServiceImplements from "~/infrastructures/services/absensi-service-implements";
import type { AbsensiSiswaSheetType } from "~/types/absensi-siswa";

export default function ButtonReloadAbsen(){
    const rombel = useAppSelector(st=>st.fokusRombel.value);
    const load = useAppSelector(r=>r.loadedApi.loaded)
    const dispatch = useAppDispatch();
    const handleCall = async ()=>{
        
        const Service = new AbsensiServiceImplements();
        dispatch(setloadedApi({
                            loaded:true
                        }));
        toast.promise(
            Service.refreshAbsensi(rombel??'1A'),
            {
                loading: 'Mereload data Absensi...',
                success: (data) => {
                    if(data.success){
                            dispatch(setAbsensiRombel(
                                {
                                    nama_rombel:rombel as string,
                                    data:data.data as AbsensiSiswaSheetType[]
                                }
                            ))
                        
                    }
                    return 'Pemanggilan data telah selesai' ;//+ data?.source;
                },
                error: 'Gagal memuat data Absen',
                finally:()=>{
                    dispatch(setloadedApi({
                            loaded:false
                        }));
                }
            }
        );
    }
    return (
        
            <button onClick={handleCall} className="border hover:bg-sky-400 rounded-2xl text-center p-1 text-sm align-middle  bg-sky-400/50  shadow-2xl flex justify-center gap-2">
                {
                    load && <Loader size={12} className="animate-spin self-center"/>
                }
                Reload Data Absen
            </button>
    )
}