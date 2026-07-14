import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import { Loader, SaveIcon } from "lucide-react";
import { useSebaranJadwalCrud } from "./crud-sebaran-jadwal-provider";
import DtoJadwalPelajaranTable from "~/dtos/dto-jadwal-pelajaran-table";
import { useAppDispatch } from "~/context-reduct/hook";
import { setloadedApi } from "~/context-reduct/global-state/loaded-slice";
import { setDataJadwalPelajaran } from "~/context-reduct/global-state/mapel/jadwal-pelajaran";
import type { jadwalMapelAccordTable } from "~/types/setting_jadwal/jadwal_mapel";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";

export default function BtnSaveSettingMapel({data}:{data:any}){
    const {state, actions} = useSebaranJadwalCrud();
    const dispatch = useAppDispatch();
    const onClikButton = async ()=>{
        // const dto = DtoSettingJadwalMapel.toSheet(data);
        const dto = DtoJadwalPelajaranTable.sebararanMapelToSheet(data);
        console.log('save jadwal app', data, dto);
        dispatch(setloadedApi({
                    loaded:true, name:'loaded_animation'
                }));
        const respon = await actions.update(dto);
        if(respon.success){
            const raw = respon.data as jadwalMapelAccordTable[];
            dispatch(setDataJadwalPelajaran(raw as jadwalMapelAccordTable[]));
            ShowToasterSuccess('Berhasil diupdate');
        }else{
            ShowToasterError('Gagal diupdate');
        }
        dispatch(setloadedApi({
            loaded:false, name:'loaded_animation'
        }));
    }
    return (
        <ButtonSaveAwesome 
            labelButton="Simpan"  
            disabled={state.isSubmitting}
            className={`py-1 px-2 text-xs disabled:bg-gray-300 disabled:shadow-none`} 
            onClick={onClikButton}>{state.isSubmitting ? <Loader size={12} className="animate-spin self-center"/> : <SaveIcon size={12}/>}</ButtonSaveAwesome>
    )

    
}