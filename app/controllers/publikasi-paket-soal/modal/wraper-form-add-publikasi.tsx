import { useMemo, type ReactNode } from "react"
import { FormEdura } from "~/components/form-custom/form-edura"
import type { ModalState } from "~/components/modals/modal-provider"
import { useAppSelector } from "~/context-reduct/hook"
import DtoPraSetingPaket from "~/dtos/dto-praseting"
import { getSessionApp } from "~/infrastructures/session-storage/app-session"
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session"
import { getNumberFromString } from "~/lib/get-number"
import type { UserPtk } from "~/types"
import type { PaketSoalAppWithPublikasi } from "~/types/bank-soal/entities/paket-soal-app-type"
import type { PublikasiPaketAppType } from "~/types/bank-soal/entities/publikasi-paket-app-type"

export default function  WrapperFormAddPublikasiPaket ({state, children}:{state:ModalState<PaketSoalAppWithPublikasi>, children:ReactNode

}){
    const rombel = useAppSelector(s=>s.fokusRombel.value) ?? getSessionRombel();
    const user = getSessionApp<UserPtk>()?.name ?? '';
    const jenjang = getNumberFromString(rombel);
    const dataPaket = state.payload
    const newDataPublikasi = useMemo(()=>{
        const endTime = new Date(dataPaket?.start_time ?? new Date());
        endTime.setMinutes(60);
        endTime.setSeconds(0)
        const end_time = new Date(endTime);
        const json_setting = dataPaket?.json_setting &&  DtoPraSetingPaket.praSettingPaketToPraSettingBaku(dataPaket?.json_setting)

        return {
            idbaris             : 0,
            paket_soal_id	    : dataPaket?.idbaris ?? 0,
            start_time          : dataPaket?.start_time ?? new Date(),
            end_time	        , 
            durasi              : 60,
            target_type         : dataPaket?.target_asesmen ?? 'rombel',
            target_person       : [],
            target_rombel       : [rombel],
            jenis_tagihan       : 'PH',
            status              : '',
            id_file_setting     : dataPaket?.id_file_json ?? '',
            id_bank_soal        : dataPaket?.id_banksoal ?? [],
            nama_publikasi      : '',
            oleh                : user,
            json_setting       ,// : dataPaket?.json_setting,

        }
        
    },[])
    return (
        <FormEdura data={newDataPublikasi}>
            {
                children
            }
        </FormEdura>
    )
}