import { setloadedApi } from "~/context-reduct/global-state/loaded-slice";
import { setSiswaDapodik } from "~/context-reduct/global-state/sheet-dapodik-slice";
import { useAppDispatch, useAppSelector } from "~/context-reduct/hook";
import { DTOSiswaDapodikAppToSheet } from "~/dtos/dto-file-dapodik-to-sheet";
import DapodikServiceImplements from "~/infrastructures/services/dapodik-service-implements";
import { ShowToasterSuccess } from "~/lib/toaster";
import type { SiswaDapodikAppToSheet } from "~/types/siswa-dapodik";

export default function ButtonSaveDapodikSheet({formDapodik}:{formDapodik:Record<string, unknown>}){
    const dispatch = useAppDispatch();
    const loading = useAppSelector(state=>state.loadedApi.loaded);
    const onHandleClick = async ()=>{
        
        const dtoToSheet = DTOSiswaDapodikAppToSheet.fromImportArray(formDapodik);
        const service = new DapodikServiceImplements();
        const paramUpdate = {
            data: JSON.stringify(dtoToSheet)
            
        }
        dispatch(setloadedApi({
            loaded:true,name:'loaded_animation'
        }))
        const data = await service.saveAllDapodik(paramUpdate);
        
        if(data?.success){
            dispatch(setSiswaDapodik(data?.data as unknown as SiswaDapodikAppToSheet[]))
            // dispatch(setSiswaDapodik({
            //     siswaDapodik : data?.data as unknown as SiswaDapodikAppToSheet[]  //as SiswaDapodikAppToSheet[],
                
            // }));
            ShowToasterSuccess('Berhasil disimpan');
        }
        
        dispatch(setloadedApi({
            loaded:false, name:'loaded_animation'
        }))
    }
    return (
        <button disabled={loading } className="border border-sky-500 rounded-xl p-1 bg-radial from-amber-200 text-rose-600 to-sky-600 shadow-lg font-extrabold w-fit mx-auto" onClick={onHandleClick}>Simpan Ke Server {loading && 'sedang berlangsung....'}</button>
    )
}