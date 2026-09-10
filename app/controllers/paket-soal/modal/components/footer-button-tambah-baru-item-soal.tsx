import { useMemo } from "react";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import { useModal } from "~/components/modals/modal-provider";
import { useAppSelector } from "~/context-reduct/hook";
import type { AtpHasManySoalType } from "~/domain/bank-soal/relational-soal/type";
import type { DisplayFormatItemSoal } from "~/domain/paket-soal/result/display-format-item-soal";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { getNumberFromString } from "~/lib/get-number";
import type { UserPtk } from "~/types";
import type { BankSoalAppType, JsonAlatJawabTupple } from "~/types/bank-soal/bank-soal-type";
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";

export default function ModalFooterButtonTambahBaruItemSoal({currentData, AtpAsOrm}:{currentData:DisplayFormatItemSoal, AtpAsOrm:AtpHasManySoalType}){
    const {actions, state} = useModal()
    const oleh = useAppSelector(s=>s.auth.user?.name) ?? ''
    const rombel = useAppSelector(s=>s.fokusRombel.value) ?? getSessionRombel();

    const itemAtpSelected :AtpAsOrm= useMemo(()=>{
        const {hasSoal, ...data} = AtpAsOrm;
        return data;
    }, [AtpAsOrm]);


     const onAddNewItemSOal = ()=>{
                
                if(!itemAtpSelected) return
                const snapshot_kurikulum = itemAtpSelected
                const kode_mapel = itemAtpSelected?.kodemapel!
                const mapel_name = itemAtpSelected?.mapelname!
                const kd_id= itemAtpSelected?.atp_as_tp_id
                const kd_deskripsi = itemAtpSelected?.atp_as_tp_description
                const fase_jenjang = itemAtpSelected?.kelas
                const ruang_lingkup = itemAtpSelected?.lingkup_materi!
                const jenjang_khusus = getNumberFromString(rombel)
                const auto_koreksi = currentData.bentuk_soal?.way_correction!
                const bentuk_soal = currentData.bentuk_soal?.name!
                const json_alat_jawab = helperCreateDefaultJsonAlatJawab(currentData.bentuk_soal?.name!)

                const initialCreateItemSoal:BankSoalAppType={
                            idbaris:0,
                            fase_jenjang,
                            jenjang_khusus,
                            kurikulum:'kurmer',
                            kode_mapel,
                            mapel_name,
                            kd_id,
                            kd_deskripsi,
                            bentuk_soal,
                            materi_pokok:'',
                            indikator_soal:'',
                            lk:'',
                            ruang_lingkup,
                            stimulus:'',
                            pertanyaan:'',
                            jawaban:[],//string|number|string[]|number[],
                            pembahasan_penskoran:'',//string,
                            json_alat_jawab,
                            // json_alat_jawab?:PgTunggal|PgKompleks|PilihanBenarSalahType|PilihanMenjodohkan,
                            snapshot_kurikulum,
                            oleh,
                            refrensi:'',
                            auto_koreksi,
                            status:''
        }
        
                actions.open('ADD NEW ITEM SOAL PAKET', initialCreateItemSoal,  {closeOnOutsideClick:false, backToModalType:state})
            }

    return (
        <ModalFooterEdura>
            <ButtonCommitAwesome labelButton="Buat baru" className="py-0 px-2" onClick={onAddNewItemSOal}/>
        </ModalFooterEdura>
    )
}

function helperCreateDefaultJsonAlatJawab(bentukSoal:string):JsonAlatJawabTupple|undefined{
    switch (bentukSoal){
        case 'pg':{
            const OpsiPilihanJawaban = Array.from ({length:4}, (_, index)=>( {index, content:''}));
            const formatOpsi = 'vertical';
            const valid = [0]
            return {OpsiPilihanJawaban,formatOpsi, valid}
        };
        case 'pg_kompleks':{
            const OpsiPilihanJawaban = Array.from ({length:4}, (_, index)=>( {index, content:''}));
            const formatOpsi = 'vertical';
            const valid = [0]
            return {OpsiPilihanJawaban,formatOpsi, valid}
        };
        default:
            return 
    }
    
}