import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import { useModal } from "~/components/modals/modal-provider";
import { useAppDispatch, useAppSelector } from "~/context-reduct/hook";
import type { ElemenCpType } from "~/types/kurikulum/elemen-cp";
import { useCrudElemenCpProvider } from "./crud-elemen-cp-provider";
import type { currentFase, OrmKurikulumMerdekaType } from "~/types/kurikulum/kurikulum-type";
import DTOCp from "~/dtos/dto-cp";
import { setloadedApi } from "~/context-reduct/global-state/loaded-slice";
import { setKurmerCp } from "~/context-reduct/global-state/kurikulum/kurmer-slice";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import { Loader } from "lucide-react";
import { PropertyKurikulumMapelAktifSelector } from "~/context-reduct/selectores/kurmer-selector";

export default function SendCpUpdate({mode, data}:{mode:'update'|'delete', data:OrmKurikulumMerdekaType}){
    const dataasal = useAppSelector(PropertyKurikulumMapelAktifSelector);
    if(mode === 'update'){
        return (
            <CpUpdate data={data} dataAsal={dataasal}/>
        )
    }
    return (
        <CpDelete data={data} dataAsal={dataasal}/>
    )
}
function CpUpdate({data, dataAsal}:{data:OrmKurikulumMerdekaType, dataAsal:currentFase}){
    const dispatch = useAppDispatch();
    const {actions:actionModal} = useModal<ElemenCpType>();
    const {state, actions}=useCrudElemenCpProvider();
    const onSubmit =  async (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if(data.cp_utama ==="" || data.elemen ==="") {
            alert('Elemen dan/atau CP tidak boleh kosong');
            return;
        }
        const dataMerge = {...data, ...dataAsal}
        const dataDto = DTOCp.fromOrmToSheet(dataMerge);
        
        const paramUpdate = {
            data: JSON.stringify([dataDto]),
            key_match:'idbaris',
            key_index:'idbaris',
            schema:JSON.stringify({
                idbaris:'number',
                kode_elemen:'number',
            })
            
        }
        const respon  = await actions.update(paramUpdate);
                
                dispatch(setloadedApi({
                            loaded:true
                        }))
                if(respon.success){
                    const raw = respon.data as ElemenCpType[];
                    dispatch(setKurmerCp(raw));
                    ShowToasterSuccess('Berhasil diupdate');
                    actionModal.close();
                }else{
                    ShowToasterError('Gagal Menyimpan Edit');
                }
                dispatch(setloadedApi({
                                    loaded:false
                                }))
    }
    return (
        <ButtonSaveAwesome onClick={onSubmit} className="px-2 py-1" labelButton="Simpan">{state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>}</ButtonSaveAwesome>
    )
}
function CpDelete({data, dataAsal}:{data:OrmKurikulumMerdekaType, dataAsal:currentFase}){
    const dispatch = useAppDispatch();
    const {actions:actionModal} = useModal<ElemenCpType>();
    const {state, actions}=useCrudElemenCpProvider();
    const onSubmit =  async (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const dataMerge = {...data, ...dataAsal, status:'hapus'}
        const dataDto = DTOCp.fromOrmToSheet(dataMerge);
        
        const paramUpdate = {
            data: JSON.stringify([dataDto]),
            key_match:'idbaris',
            key_index:'idbaris',
            schema:JSON.stringify({
                idbaris:'number',
                kode_elemen:'number',
            })
            
        }
        const respon  = await actions.update(paramUpdate);
                
                dispatch(setloadedApi({
                            loaded:true
                        }))
                if(respon.success){
                    const raw = respon.data as ElemenCpType[];
                    dispatch(setKurmerCp(raw));
                    ShowToasterSuccess('Berhasil diupdate');
                    actionModal.close();
                }else{
                    ShowToasterError('Gagal Menyimpan Edit');
                }
                dispatch(setloadedApi({
                                    loaded:false
                                }))
    }
    return (
        <ButtonDeleteAwesome onClick={onSubmit} className="px-2 py-1" labelButton="Simpan" disabled={state.isSubmitting}>{state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>}</ButtonDeleteAwesome>
    )
}