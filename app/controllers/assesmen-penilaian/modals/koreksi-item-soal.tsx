import { useFormEdura } from "~/components/form-custom/form-edura";
import { useModal } from "~/components/modals/modal-provider"
import type { detailNilaiSiswaAppType } from "~/types/penilaian/nilai-siswa-app-type";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import KoreksiWrapper from "./fields/koreksi";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import { useImmer } from "use-immer";
import { useCallback, useMemo } from "react";
import { upsertRespon, type HandleUpdateResponKoreksi } from "~/domain/bank-soal/koreksi";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
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
import SkorKdSebaranBuilder from "~/domain/penilaian/infrastucture/SkorKdSebaranBuilder";
import { PaketSoalStrukturBuilder } from "~/domain/paket-soal/paket-soal-struktur/PaketSoalStrukturBuilder";
import TemplateKoreksiSiswaBuilder from "~/types/penilaian/TemplateKoreksiSiswaBuilder";
import RisponseNilaiSiswaBuilder from "~/domain/penilaian/infrastucture/RisponseNilaiSiswaBuilder";
import { findDifferences, isEqualValue } from "~/lib/isEqualArrayObject";

export default function KoreksiItemSoal(){
    const dataTagihan = useAppSelector(InstanceDataTagihanPenilaianSector);
    const rombel = getSessionRombel();
    const{actions, state, nextState} = useModal();
    const {currentData, setCurrentData} = useFormEdura<detailNilaiSiswaAppType>();
    
    const dataTabelParent = useMemo(()=>{
        if(!dataTagihan) return;
        return dataTagihan?.dataTagihanHasResponse.find(s=>s.idbaris === currentData.publikasi_id)
    },[currentData, dataTagihan]);

    const currentDataSelector = useMemo(()=>{
        // if(!dataTagihan) return ;
        if(!dataTabelParent) return ;
        
        /** currentData adalah data yang terpilih dan menjadi fokus modal */
        // const rep =  dataTabelParent?.find(s=>s.idbaris === currentData.publikasi_id);
        const rep = dataTabelParent;
        // const resp =   rep?.data_respons.find(s=>s.idbaris === currentData.idbaris);
        const resp =   dataTabelParent.data_respons.find(s=>s.idbaris === currentData.idbaris);
        if(!resp){
            const jenis_tagihan =  rep?.jenis_tagihan?.kode ?? '';
            const kategori = new SwitchKategoriTagihan(jenis_tagihan).kategori;
            const idSoal = rep?.id_bank_soal;
            const settingTagihan = rep?.setting_tagihan?.count_bentuk_soal;//
            const strukturNaskah = PaketSoalStrukturBuilder.buildFromCountBentukSoalPaket(rep.bank_soal_collections, settingTagihan ?? [])
            const respon = RisponseNilaiSiswaBuilder.build(strukturNaskah,[])
            const templateKoreksiSiswa = TemplateKoreksiSiswaBuilder.build(strukturNaskah,respon);// RisponsePenilaianSiswaBuilder.build(rep?.bank_soal_collections ?? [],settingTagihan ?? [],[]) ;//(dataTagihan?.createTemplateKoreksiPerSiswa(kurikulum, idSoal) ?? {sebaran:[], respon:[]}) as unknown as {sebaran:detailNilaiSiswaAppType['templateKoreksiSiswa'],respon:RisponsePenilaianSiswa[]};
            const skorKdSebaran =  SkorKdSebaranBuilder.build(rep.sebaran_kurikulum_by_bentuk_soal, respon);
            const objekKdSebaran = skorKdSebaran.data.map(m=>m.objekSkorKd).reduce((a,b)=>({...a,...b}))

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
                skorKdSebaran,
                objekKdSebaran
    
            }
            return data;
        }

        return resp;
    // }, [currentData, dataTagihan]);
    }, [currentData, dataTabelParent]);
    console.log(findDifferences(currentData, currentDataSelector), isEqualValue(currentData, currentDataSelector));
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
        if(!dataTabelParent) return;
       
        const sebaran_kurikulum_by_bentuk_soal = dataTabelParent.sebaran_kurikulum_by_bentuk_soal;
        
        return SkorKdSebaranBuilder.build(sebaran_kurikulum_by_bentuk_soal,updateRespon)
    },[dataTabelParent, updateRespon])
    
    const onSubmit = async()=>{
        if(!skorKd) {
            alert('skorKD belum terdeteksi');
            return;
        };
        const service = new KoreksiGuruService();
        const skor_kd = skorKd.data.map(m=>m.objekSkorKd).reduce((a,b)=>({...a, ...b}));//.flatMap(m=>m.objekSkorKd)?.reduce((a,b)=>({...a, ...b}));
        const dtoParamUtama = DtoKoreksiToResponseSheet.fromGuruMengUpdateRespon(currentDataSelector!, updateRespon, skor_kd);
        const dtoKategoriAssesmen = DtoKoreksiToKategoriAssesmenTab.fromGuruMengUpdateRespon(currentDataSelector!, updateRespon, skor_kd)
        // console.log({updateRespon, skorKd, dtoParamUtama, currentDataSelector})
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
            {
                skorKd && <ResumeSkorKdKoreksi skorKd={skorKd} />
            }
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