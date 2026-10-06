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
import KoreksiGuruService from "~/infrastructures/services/koreksi-guru-service";
import DtoKoreksiToKategoriAssesmenTab from "~/dtos/dto-koreksi-to-kategori-assesmen-tab";
import {toast} from 'sonner';
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { useAppSelector } from "~/context-reduct/hook";
import { InstanceDataTagihanPenilaianSector } from "~/context-reduct/selectores/daftar-tagihan-penilaian-selector";
import SwitchKategoriTagihan from "~/domain/asesmen-penilaian/switch-kategori-tagihan-class";

export default function KoreksiItemSoal(){
    const dataTagihan = useAppSelector(InstanceDataTagihanPenilaianSector);
    const rombel = getSessionRombel();
    const{actions, state, nextState} = useModal();
    const {currentData, setCurrentData} = useFormEdura<detailNilaiSiswaAppType>();
    const currentDataSelector = useMemo(()=>{
        if(!dataTagihan) return ;
        const dataTabelParent = dataTagihan?.dataTagihanHasResponse;
        
        /** currentData adalah data yang terpilih dan menjadi fokus modal */
        const rep =  dataTabelParent?.find(s=>s.idbaris === currentData.publikasi_id);
        
        const resp =   rep?.data_respons.find(s=>s.idbaris === currentData.idbaris);
        if(!resp){
            const jenis_tagihan =  rep?.jenis_tagihan?.kode ?? '';
            const kategori = new SwitchKategoriTagihan(jenis_tagihan).kategori;
            const idSoal = rep?.id_bank_soal;
            const settingTagihan = rep?.setting_tagihan?.count_bentuk_soal;//
            const templateKoreksi = dataTagihan?.createTemplateKoreksiUsingSetingTagihan(idSoal ?? [],settingTagihan ?? [],[]) ;//(dataTagihan?.createTemplateKoreksiPerSiswa(kurikulum, idSoal) ?? {sebaran:[], respon:[]}) as unknown as {sebaran:detailNilaiSiswaAppType['templateKoreksiSiswa'],respon:RisponsePenilaianSiswa[]};
             const respon =  templateKoreksi?.respon ?? [];
            const templateKoreksiSiswa =  templateKoreksi?.sebaran ?? [];
            const Kur = rep?.kurikulum_tagihan ?? []
            const skorKdSebaran =  GroupingSebaranKurikulum.buildGroupBentukSoalBasedOnKoleksiIdSoalWithScore(Kur,idSoal ?? [],respon);
                    

            const data:detailNilaiSiswaAppType = {
                idbaris: 0,	
                siswa_id: currentData.siswa_id,
                siswa:currentData.siswa,
                publikasi_id: currentData?.publikasi_id,
                jenis_tagihan,
                tipe_assesmen: kategori,
                sumber_respon: 'guru',
                rombel: currentData?.siswa?.nama_rombel ?? '',
                start_time: new Date(),
                end_time:new Date(),
                respon,
                // skor_kd:[],
                needValidate:true,
    
                totalResponValid: 0,
                durasiPengerjaan: 0,
                publikasi: rep!,
                templateKoreksiSiswa,
                skorKdSebaran
    
            }
            return data;
        }

        return resp;
    }, [currentData, dataTagihan]);
    
    // const dataRespon = useMemo(()=>{
    //     if(!currentDataSelector || !rombel) return []

    //     return currentDataSelector?.data_response_bySiswa.filter(s=>s.siswa.nama_rombel === rombel)
    // },[rombel, currentDataSelector])
    


    const [updateRespon, setUpdateRespon] = useImmer< RisponsePenilaianSiswa[]>(currentDataSelector?.respon ?? [])
    
    const handleChangeUpdateRespon = useCallback<HandleUpdateResponKoreksi>((bentuk_soal, no_prefix, patch)=>{
        setUpdateRespon(draft=>{
            upsertRespon(draft, {bentuk_soal, no_prefix}, patch);
        })
    },[setUpdateRespon, upsertRespon]);
    
    // useCallback(()=>{
    //     setCurrentData(draft=>{
    //         draft.respon = updateRespon
    //     })
    // },[updateRespon, setCurrentData])
    const skorKd = useMemo(()=>{
        const Kur = currentDataSelector?.publikasi?.setting_tagihan?.kurikulum ?? [];
        const idSoal = currentDataSelector?.publikasi?.id_bank_soal
        return GroupingSebaranKurikulum.buildGroupBentukSoalBasedOnKoleksiIdSoalWithScore(Kur,idSoal ?? [],updateRespon)
    },[currentDataSelector, updateRespon])
    
    const onSubmit = async()=>{
        
        const service = new KoreksiGuruService();
        const skor_kd = skorKd.data.flatMap(m=>m.objekSkorKd)?.reduce((a,b)=>({...a, ...b}));
        const dtoParamUtama = DtoKoreksiToResponseSheet.fromGuruMengUpdateRespon(currentDataSelector!, updateRespon, skor_kd);
        const dtoKategoriAssesmen = DtoKoreksiToKategoriAssesmenTab.fromGuruMengUpdateRespon(currentDataSelector!, updateRespon, skor_kd)

        const requeset = toast.promise(
            service.update(dtoParamUtama, dtoKategoriAssesmen),
            {
                loading:'sedang menyimpan data...',
                success: (data)=>{
                    if(data.message){
                        return 'Proses selesai, namun  '+ data.message
                    }
                    return 'Proses selesai '
                },
                error: (er)=>{
                    return 'Gagal, coba lagi nanti karena '+er
                },
                closeButton:true
            }

        )
        const data = await requeset.unwrap();
        
         if (data && Array.isArray(data)) {
             data.forEach(({ success, data, detailResponse, }) => {

                 if (detailResponse) {
                     DispatchingResponseToStore(
                         success,
                         data,
                         detailResponse,
                         getSessionRombel()
                     );

                    
                 }
             } );
             
            actions.open(nextState?.type ?? 'PRA KOREKSI SOAL', nextState?.payload, {closeOnOutsideClick:false, backToModalType:nextState})
         }
                        
    }
    
    return (
        <>
        <div className="md:min-h-[calc(100dvh-16rem)] h-11/12 max-h-[calc(100dvh-12rem)] overflow-y-auto scrol-h-custom">
        {
            currentDataSelector && <KoreksiWrapper data={currentDataSelector} responSiswa={updateRespon} handleUpdate={handleChangeUpdateRespon}/>
        }
            <ResumeSkorKdKoreksi skorKd={skorKd} />
        </div>
            <ModalFooterEdura>
                <div className="flex flex-row gap-2 w-full justify-center">
                    <ButtonCommitAwesome labelButton="Kembali" className="px-4 py-0" onClick={()=>actions.open(nextState?.type ?? 'PRA KOREKSI SOAL', nextState?.payload, {closeOnOutsideClick:false, backToModalType:nextState})}/>
                    <ButtonCommitAwesome labelButton="Simpan" className="px-4 py-0" onClick={onSubmit}/>
                </div>
            </ModalFooterEdura>
        </>
    )
}