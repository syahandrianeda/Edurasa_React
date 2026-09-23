import {useMemo} from 'react';
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { useModal } from "~/components/modals/modal-provider";
import type TagihanPenilaianClass from "~/domain/penilaian/infrastucture/tagihan-penilian-class";
import PraSetingBakuDefault from '~/domain/penilaian/model/default-praseting-baku';
import { getSessionApp } from '~/infrastructures/session-storage/app-session';
import type { UserPtk } from '~/types';

export default function TriggerAddTagihanNonPaket({instansiasi}:{instansiasi:TagihanPenilaianClass}){
    const {actions} = useModal<TagihanPenilaianClass>();
    const rombel = instansiasi.rombel;
    const user = getSessionApp<UserPtk>()?.name ?? '';
    const jenjang = instansiasi.jenjang;

    const newDataPublikasi = useMemo(()=>{
        const end_time =new Date()
        
        // const json_setting = dataPaket?.json_setting &&  DtoPraSetingPaket.praSettingPaketToPraSettingBaku(dataPaket?.json_setting)
        const instalPaketBaku = new PraSetingBakuDefault(rombel).buildDefault();
        const json_setting = instalPaketBaku.dataPrasettingBaku
        return {
            idbaris             : 0,
            paket_soal_id	    : 0,
            start_time          : new Date(),
            end_time	        , 
            durasi              : 0,
            target_type         : 'rombel',
            target_person       : [],
            target_rombel       : [rombel],
            jenis_tagihan       : 'PH',
            status              : '',
            id_file_setting     : '',
            id_bank_soal        : [],
            nama_publikasi      : '',
            oleh                : user,
            json_setting       ,

        }
        
    },[]);
        
        
        
    const openModal = ()=>{
        actions.open('ADD PUBLIKASI NON PAKET SOAL', newDataPublikasi, {closeOnOutsideClick:false})
    }
    return (
        <ButtonCommitAwesome labelButton="Buat Tagihan Manual" className="px-4 py-0 text-[10px]" onClick={openModal}/>
    )
}