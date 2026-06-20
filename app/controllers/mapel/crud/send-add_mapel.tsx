import type { jp_mapelApp, jp_mapelSheet } from "~/types/mapel/jp_mapel";
import { useCrudMapelRombel } from "./crud-mapelrombel-provider";
import { useModal } from "~/components/modals/modal-provider";
import type { ormKurikulumInterface } from "~/types/kurikulum/kurikulum-type";
import { useAppDispatch, useAppSelector } from "~/context-reduct/hook";
import { DtoMapelSelector } from "~/context-reduct/selectores/mapel-selector";
import DTOMapelRombel from "~/dtos/dto-mapel-rombel";
import type { ReactNode } from "react";
import { CurrentMapelInActiveRombel } from "~/context-reduct/selectores/mapel-rombel-selector";
import { setDataMapelRombel } from "~/context-reduct/global-state/mapel/mapel-rombel-slice";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import { Loader } from "lucide-react";
import { koleksiJpInJenjang } from "~/domain/mapel/jp-in-jenjang";
import { resolveNumber } from "~/dtos/_resolver";

export default function ButtonAddMapel ({data, children}:{data:jp_mapelApp, children:ReactNode}){
    const {state, actions}= useCrudMapelRombel();
        const { actions:actionModal } = useModal<ormKurikulumInterface>();
        const rombel = useAppSelector(state=>state.fokusRombel.value);
        const dataMapel = useAppSelector(CurrentMapelInActiveRombel);
        const dispatch = useAppDispatch();
        const onSubmit =  async (e: React.MouseEvent<HTMLButtonElement>)=>{
            e.preventDefault();
            if(data.kode === "") return;
            const dataDto:jp_mapelSheet[]=[];
            dataMapel.data.forEach((d, index)=>{
                const convertDto = DTOMapelRombel.fromSheet(d);
                const perbaikiIndex = {...convertDto, index_in_rombel:index}
                dataDto.push(perbaikiIndex)
            });
            const dataHasConverted = DTOMapelRombel.fromSheet(data);
            const dataJP = koleksiJpInJenjang.find(s=>s.kode_umum === data.kode)
            const jpJenjang = dataJP?.jenjangJp.find(s=>s.jenjang === resolveNumber(rombel))?.jp || 2 ;//jenjangJp.find(t=>t.jenjang === parseInt(rombel as string));
            const dataHasIndexed = {...dataHasConverted, index_in_rombel:dataMapel.data.length, jp_perminggu:jpJenjang, nama_rombel:rombel}
            if (dataHasIndexed) dataDto.push(dataHasIndexed);
            
            const respon = await actions.update(dataDto);
                    
                    if(respon.success){
                        const raw = respon.data as jp_mapelSheet[];
                        dispatch(setDataMapelRombel(raw));
                        ShowToasterSuccess('Berhasil ditambah');
                        actionModal.close();
                    }else{
                        ShowToasterError('Gagal Menyimpan Edit');
                    }
        }

    return (
        <button
            disabled={state.isSubmitting} 
            className="border bg-sky-300 rounded-3xl p-2 mx-auto mt-3 flex gap-2" type="button" onClick={onSubmit}>{state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>} {children ?? 'Tambahkan'}</button>
            
    )
}