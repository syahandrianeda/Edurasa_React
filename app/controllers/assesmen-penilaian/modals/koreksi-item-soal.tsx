import { useFormEdura } from "~/components/form-custom/form-edura";
import { useModal } from "~/components/modals/modal-provider"
import type { detailNilaiSiswaAppType, RisponsePenilaianSiswa } from "~/types/penilaian/nilai-siswa-app-type";
import KoreksiWrapper from "./fields/koreksi";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import { useImmer } from "use-immer";
import { useCallback, useMemo } from "react";
import { upsertRespon, type HandleUpdateResponKoreksi } from "~/domain/bank-soal/koreksi";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import GroupingSebaranKurikulum from "~/domain/penilaian/infrastucture/grouping-kurikulum-to-sebaran";
import ResumeSkorKdKoreksi from "./fields/resume-skor-kd-koreksi";
import DtoKoreksiToResponseSheet from "~/dtos/dto-koreksi-to-respons-sheet";

export default function KoreksiItemSoal(){
    const{actions, state, nextState} = useModal();
    const {currentData, setCurrentData} = useFormEdura<detailNilaiSiswaAppType>()
    const [updateRespon, setUpdateRespon] = useImmer< RisponsePenilaianSiswa[]>(currentData.respon ?? [])
    
    const handleChangeUpdateRespon = useCallback<HandleUpdateResponKoreksi>((bentuk_soal, no_prefix, patch)=>{
        setUpdateRespon(draft=>{
            upsertRespon(draft, {bentuk_soal, no_prefix}, patch);
        })
    },[setUpdateRespon]);
    
    // useCallback(()=>{
    //     setCurrentData(draft=>{
    //         draft.respon = updateRespon
    //     })
    // },[updateRespon, setCurrentData])
    const skorKd = useMemo(()=>{
        const Kur = currentData.publikasi?.setting_tagihan?.kurikulum ?? [];
        const idSoal = currentData.publikasi.id_bank_soal
        return GroupingSebaranKurikulum.buildGroupBentukSoalBasedOnKoleksiIdSoalWithScore(Kur,idSoal,updateRespon)
    },[currentData.publikasi, updateRespon])
    
    const onSubmit = ()=>{
        console.log({updateRespon, currentData, skorKd});
        const skor_kd = skorKd.data.flatMap(m=>m.objekSkorKd)?.reduce((a,b)=>({...a, ...b}));
        const dto = DtoKoreksiToResponseSheet.fromGuruMengUpdateRespon(currentData, updateRespon, skor_kd)
        console.log(dto)
    }
    return (
        <>
        <div className="md:min-h-[calc(100dvh-16rem)] h-11/12 max-h-[calc(100dvh-12rem)] overflow-y-auto scrol-h-custom">
            <KoreksiWrapper data={currentData} responSiswa={updateRespon} handleUpdate={handleChangeUpdateRespon}/>
            <ResumeSkorKdKoreksi skorKd={skorKd} />
        </div>
            <ModalFooterEdura>
                <ButtonCommitAwesome labelButton="Kembali" className="px-4 py-0" onClick={()=>actions.open(nextState?.type ?? 'PRA KOREKSI SOAL', nextState?.payload, {closeOnOutsideClick:false, backToModalType:nextState})}/>
                <ButtonCommitAwesome labelButton="Simpan" className="px-4 py-0" onClick={onSubmit}/>
            </ModalFooterEdura>
        </>
    )
}