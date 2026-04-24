import type { jp_mapelApp, jp_mapelSheet } from "~/types/mapel/jp_mapel";
import { useCrudMapelRombel } from "./crud-mapelrombel-provider";
import DTOMapelRombel from "~/dtos/dto-mapel-rombel";
import { useAppDispatch } from "~/context-reduct/hook";
import { setDataMapelRombel } from "~/context-reduct/global-state/mapel/mapel-rombel-slice";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import type { ormKurikulumInterface } from "~/types/kurikulum/kurikulum-type";
import { useModal } from "~/components/modals/modal-provider";
import { Loader } from "lucide-react";

export default function ButtonSendMapel({data}:{data:jp_mapelApp[]}){
    const {state, actions}= useCrudMapelRombel();
    const { actions:actionModal } = useModal<ormKurikulumInterface>();
    const dispatch = useAppDispatch();
    const onSubmit =  async (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        
        const dataDto:jp_mapelSheet[]=[];
        data.forEach((d, index)=>{
            const convertDto = DTOMapelRombel.fromSheet(d);
            const perbaikiIndex = {...convertDto, index_in_rombel:index}
            dataDto.push(perbaikiIndex)
        })
        
        const respon = await actions.update(dataDto);
        
        if(respon.success){
            const raw = respon.data as jp_mapelSheet[];
            dispatch(setDataMapelRombel(raw));
            ShowToasterSuccess('Berhasil diupdate');
            actionModal.close();
        }else{
            ShowToasterError('Gagal Menyimpan Edit');
        }
    }
    return (
        <button type="button" disabled={state.isSubmitting} className="border bg-sky-300 rounded-3xl p-2 mx-auto mt-3 flex gap-2" onClick={onSubmit}>{state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>} Simpan</button>
    )
}