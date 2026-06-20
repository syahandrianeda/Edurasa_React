import ButtonAddAwesome from "~/components/button-awesome/add-button";
import { useModal } from "~/components/modals/modal-provider";
import { useAppSelector } from "~/context-reduct/hook";
import { PropertyKurikulumMapelAktifSelector } from "~/context-reduct/selectores/kurmer-selector";
import type { OrmFaseKurikulumType } from "~/types/kurikulum/kurikulum-type";

export default function ButtonAddTp(){
    const {actions} = useModal<OrmFaseKurikulumType>();
    const data = useAppSelector(PropertyKurikulumMapelAktifSelector);
    const objekKosong:OrmFaseKurikulumType = {
        idbaris_tp:0,
        fase_name:data.currentFase?.faseName, // fase A, fase B, fase C
        // source_tab?:string,
        // source_data_tp?:FaseKurikulumType
        tp:'',
        // kelas?:number[],
        // atp?:OrmAtp[],
        countItem:0,
        atp:[]
    };
    
    const handleClick = ()=> actions.open('TAMBAH TP', objekKosong,{closeOnOutsideClick:false})
    return (
        <div className="flex justify-end print:hidden">
            <ButtonAddAwesome onClick={handleClick} className="w-8 h-8 bg-sky-400 text-yellow-50" labelButton="Tambah TP"/>
        </div>
    )
}