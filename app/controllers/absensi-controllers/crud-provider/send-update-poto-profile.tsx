import { Loader } from "lucide-react";
import { setAllSiswa } from "~/context-reduct/global-state/siswa-slice";
import { useAppDispatch } from "~/context-reduct/hook";
import { useSiswaCrud } from "~/controllers/data-siswa-controller/kesiswaan-controller";
import { DTOSiswa } from "~/dtos/dto-siswa";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import type { AbsensiSiswaType } from "~/types/absensi-siswa";
import type { SiswaType } from "~/types/siswa";

export default function ButtonSetAsProfile({siswa, data}:{siswa?:SiswaType, data:AbsensiSiswaType}){
    const {state, actions} = useSiswaCrud();
    const idImg = data.fileContent;
    const dispatch = useAppDispatch();

    if(!idImg) return null;
    if(data.kehadiran!=='Hadir') return null;

    const onSendUpdate = async ()=>{
        const updateProfile = {...siswa,time_stamp:new Date(), koleksi_potoinduk:idImg} as SiswaType;
        const DTO = DTOSiswa.toAppScript(updateProfile);
        const param = {
            formData: JSON.stringify(DTO),
            byRow: updateProfile.id
        }
                
        const respon = await actions.update(param);
        if(respon.success){
            
            
            dispatch(setAllSiswa({
                loaded:true,
                allSiswa: respon.data as SiswaType[],
                source: respon?.source,
                loading:false
            }))

            ShowToasterSuccess('Berhasil diupdate');
        }else{
            ShowToasterError('Gagal Menyimpan Edit');
        }
    }
    return (
        <button type="button" onClick={onSendUpdate} className="border rounded-2xl bg-radial from-sky-200 to-sky-600 text-rose-500 font-extrabold border-sky-300 py-1 px-2 text-xs w-fit flex justify-center gap-2">
            {state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>}
            Atur Sbg Poto Profil
        </button>
    )
}