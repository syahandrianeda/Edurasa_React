import ButtonAddAwesome from "~/components/button-awesome/add-button";
import { useModal } from "~/components/modals/modal-provider";
import { useAppSelector } from "~/context-reduct/hook";
import { PropertyKurikulumMapelAktifSelector } from "~/context-reduct/selectores/kurmer-selector";
import type { jp_mapelSheet } from "~/types/mapel/jp_mapel";


export default function ButtonAddMapel(){
    const {actions} = useModal<jp_mapelSheet>();
    const data = useAppSelector(PropertyKurikulumMapelAktifSelector);
    const objekKosong:jp_mapelSheet = {
        idbaris:0,
        idmapel:0,
        kode:'',
        nama_mapel:'',
        nama_mapel_ijazah:'',
        jp_perminggu: 0,
        following_students: 0,
        status:'',
        nama_rombel: '',   
        index_in_rombel:0,
        
    };
    
    const handleClick = ()=> actions.open('TAMBAH MAPEL ROMBEL', objekKosong,{closeOnOutsideClick:false})
    return (
        <div className="flex justify-end print:hidden">
            <ButtonAddAwesome onClick={handleClick} className="w-8 h-8 bg-sky-400 text-yellow-50" labelButton="Tambah Mapel"/>
        </div>
        
    )
}