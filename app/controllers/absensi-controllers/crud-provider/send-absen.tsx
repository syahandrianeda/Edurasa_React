import { useFormEdura } from "~/components/form-custom/form-edura";
import { useModal} from "~/components/modals/modal-provider";
import { useAppDispatch } from "~/context-reduct/hook";
import type OrmAbsensi from "~/domain/absensi/orm-absensi";
import type { AbsensiSiswaSheetType } from "~/types/absensi-siswa";
import { useCrudAbsensi } from "./absensi-crud-provider";
import { Loader } from "lucide-react";
import { setloadedApi } from "~/context-reduct/global-state/loaded-slice";
import { ShowToasterSuccess } from "~/lib/toaster";
import { setAbsensiRombel } from "~/context-reduct/global-state/absensi-slice";
import type { ModalType } from "~/components/modals/modal-type";

export default function SendAbsen({stateType}:{stateType:ModalType}){
    const dispatch = useAppDispatch();
    const {currentData, setCurrentData} = useFormEdura<AbsensiSiswaSheetType>();
    const {actions:actionModal} = useModal<OrmAbsensi>();
    const {state, actions:absenCrud} = useCrudAbsensi();

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(currentData?.kehadiran === 'Hadir' && currentData?.fileContent===""){
            alert('Anda harus mengupload foto/dokumen pendukung yang menyatakan murid hadir. Atau Anda tidak perlu menyimpan data untuk keterangan Hadir tanpa unggah foto pendukung kehadiran.')
            return 
        }
        
        const kondisiObject:Record<string, any> =Object.assign({},currentData, {action:'guruNgabsensiSiswaEdurasa'});

        const argService = {
            data:JSON.stringify([kondisiObject]),
            rombel:kondisiObject.kelas
        }
        
        dispatch(setloadedApi({
                    loaded:true,
                    name:'loaded_animation'
                }))
        const respon  = await absenCrud.update(argService);
        
        dispatch(setloadedApi({
            loaded:false, name:'loaded_animation'
        }));
        
        if(respon.success){
            dispatch(setAbsensiRombel(
                {
                    nama_rombel:kondisiObject.kelas,
                    data:respon.data as AbsensiSiswaSheetType[]
                }
            ))
            ShowToasterSuccess('Berhasil diupdate');
            actionModal.close();
        };
    }

    return (
        <button onClick={onSubmit}  disabled={state.isSubmitting} type="button" className="border border-sky-500 rounded-xl p-1 bg-radial from-amber-200 text-rose-600 to-sky-600 shadow-xs shadow-amber-300 font-extrabold w-fit mx-auto flex justify-center gap-2">
            {state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>}Simpan
        </button>
    )
}