import ButtonAddAwesome from "~/components/button-awesome/add-button";
import { useModal } from "~/components/modals/modal-provider";
import { useAppSelector } from "~/context-reduct/hook";
import { PropertyKurikulumMapelAktifSelector } from "~/context-reduct/selectores/kurmer-selector";
import type { ElemenCpType } from "~/types/kurikulum/elemen-cp";
import type { OrmKurikulumMerdekaType } from "~/types/kurikulum/kurikulum-type";

export default function ButtonAddCp(){
    const {actions} = useModal<ElemenCpType>();
    const data = useAppSelector(PropertyKurikulumMapelAktifSelector);
    const objekKosong = {
        idbaris:0,
        kodemapel:data.mapel_kode,
        fase:data.currentFase.faseName,
        elemen:'',
        cp_utama:'',
        kode_elemen:data?.currentFase.elemen_cp.length + 1,
        cp_kunci:'',
        taksonomibloom:'',
    };
    
    const handleClick = ()=> actions.open('TAMBAH', objekKosong,{closeOnOutsideClick:false})
    return (
        <div className="flex justify-end print:hidden">
            <ButtonAddAwesome onClick={handleClick} className="w-8 h-8 bg-sky-400 text-yellow-50" labelButton="Tambah CP"/>
        </div>
    )
}