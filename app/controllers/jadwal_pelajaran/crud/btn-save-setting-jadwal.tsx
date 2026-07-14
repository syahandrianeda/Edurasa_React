import { Loader, SaveIcon } from "lucide-react";
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import type { settingJadwalApp, settingJadwalSheet } from "~/types/setting_jadwal/setting_jadwal";
import { useSettingJadwalCrud } from "./crud-setting-jadwal-provider";
import DtoSettingJadwalMapel from "~/dtos/dto-setting-jadwal-mapel";
import { useAppDispatch } from "~/context-reduct/hook";
import { setloadedApi } from "~/context-reduct/global-state/loaded-slice";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import { setSettingJadwalMapel } from "~/context-reduct/global-state/mapel/setting-jadwal-mapel-slice";

export default function BtnSaveSettingJadwal({data}:{data:settingJadwalApp}){
    const {state, actions} = useSettingJadwalCrud();
    const dispatch = useAppDispatch();
    const onClikButton = async ()=>{
        const dto = DtoSettingJadwalMapel.toSheet(data);
        console.log('save setting jadwal app', data, '\r\n dto to sheet', dto);
        dispatch(setloadedApi({
            loaded:true, name:'loaded_animation'
        }));
        const respon = await actions.update(dto);
        if(respon.success){
            const raw = respon.data as settingJadwalSheet[];
            dispatch(setSettingJadwalMapel(raw as settingJadwalSheet[]));
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