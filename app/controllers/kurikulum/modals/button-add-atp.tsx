import ButtonAddAwesome from "~/components/button-awesome/add-button";
import { useModal } from "~/components/modals/modal-provider";
import { useAppSelector } from "~/context-reduct/hook";
import { PropertyKurikulumMapelAktifSelector } from "~/context-reduct/selectores/kurmer-selector";
import { getNumberFromString } from "~/lib/get-number";
import type { OrmAtp } from "~/types/kurikulum/kurikulum-type";

export default function ButtonAddAtp(){
    const {actions} = useModal<OrmAtp>();
    const data = useAppSelector(PropertyKurikulumMapelAktifSelector);
    const kelas = useAppSelector(state=>state.fokusRombel.value);
    const m = data.currentFase.elemen_cp[0]?.tp_fase_properties[0];
    if(!m) return 'Not Found'
    const objekKosong:OrmAtp = {
        idbaris_atp:0,
                        atp:'',
                        source_atp:{
                            idbaris:0,
                            atp:'',
                            foreignkey_tp:m.source_data_tp?.idbaris??0,
                            foreignkey_elemencp:m.source_data_tp?.foreignkey_elemencp??0,
                            kelas:[getNumberFromString(kelas??'1')],
                            status:'',
                        },
                        kelas:[getNumberFromString(kelas??'1')],
                        countItem:1,
                        status:''
    };
    
    const handleClick = ()=> actions.open('TAMBAH ATP', objekKosong,{closeOnOutsideClick:false})
    return (
        <div className="flex justify-end print:hidden">
            <ButtonAddAwesome onClick={handleClick} className="w-8 h-8 bg-sky-400 text-yellow-50" labelButton="Tambah ATP"/>
        </div>
    )
}