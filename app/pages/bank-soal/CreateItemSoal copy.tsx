import { useEffect } from "react";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";
import type { EditorSoalType } from "~/types/bank-soal/editor-soal";
import { useAppSelector } from "~/context-reduct/hook";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type { UserPtk } from "~/types";
import FormulirItemSoal from "../../controllers/bank-soal/editor/FormulirItemSoal";
import { useCreateItemSoalContext } from "~/controllers/bank-soal/reducer-item-soal/immer-reducer-context";
import { getNumberFromString } from "~/lib/get-number";
import { TaksonomiMatcher } from "~/domain/taksonomi";
import { TaksonomiBloomInstance } from "~/context-reduct/selectores/taksonomi-selector";



export function CreateItemSoal() {
    const Rombel = useAppSelector(state=>state.fokusRombel.value);
    const fokusMapel = useAppSelector(s=>s.fokusMapel.data.nama);
    const bloom = useAppSelector(TaksonomiBloomInstance);
    const me = getSessionApp<UserPtk>();
    
    const {value} = useFilterContext<{
        fokusBentukSoal?: ListBentukSoalType;
        fokusAtp?: AtpAsOrm | undefined;
        fokusEditor?:EditorSoalType
    }>();
    const { action} = useCreateItemSoalContext();
    
    useEffect(() => {
        if (value?.extra) { return; }

        action({ type: "reset", });

    }, [value?.extra, action]);

    useEffect(() => {
        const kurikulum = value?.extra?.fokusAtp;
        if (!kurikulum) return;

        action({ type: "propertyKurikulum", payload: kurikulum, });
        /** tambahkan lk dari indikator */
        const indikator= kurikulum.atp_as_tp_description;
        const taksonomi = new TaksonomiMatcher(bloom.data);
        const match = taksonomi.find(indikator);
        action({
            type:'set_item_soal',
            payload:{
                lk:match?.LK
            }
        })
        
        }, [ value?.extra?.fokusAtp, action, ]);

    useEffect(() => {
        const bentuk = value?.extra?.fokusBentukSoal;

        if (!bentuk) return;

        action({ type: "bentuk_soal", payload: bentuk, });

    }, [ value?.extra?.fokusBentukSoal, action, ]);

    useEffect(() => {

        if (!me) return

        action({ type: "creator", payload: me.name, });

    }, [ me, action, ]);

    useEffect(() => {

        action({
            type: "set_item_soal",
            payload: { jenjang_khusus: getNumberFromString( Rombel ?? "", ), },
        });

    }, [ Rombel, action, ]);

    useEffect(() => {

        action({
            type: "set_item_soal",
            payload: {
                mapel_name: fokusMapel,
            },
        });
        }, [ fokusMapel, action,
    ]);    

    if(!value?.extra?.fokusAtp){
        return <MessageNotReady/>
    } 
    
    switch(value?.extra?.fokusEditor?.name){
        case 'formulir':
            return <FormulirItemSoal bentukSoal={value?.extra?.fokusBentukSoal}  description={value?.extra?.fokusEditor?.description}/>;
        case 'copy_paste':
            return <p>Copast {value?.extra?.fokusEditor?.description}</p>;
        default:
            return <MessageNotReady/>
            
        }
        
}

function MessageNotReady(){
    return(
        <div className="flex flex-col gap-2 justify-center items-center min-h-1/5">
            <p>Aplikasi Belum Siap</p>
            <div className="border rounded-3xl p-3 bg-amber-100">
                    Periksa Kurikulum, aplikasi tidak bisa mendeteksi Kurikulum Anda
            </div>
        </div>
    )
}
