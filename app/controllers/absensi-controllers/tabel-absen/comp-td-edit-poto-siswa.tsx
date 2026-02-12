import { useCallback, useMemo } from "react";
import { useModal } from "~/components/modals/modal-provider";
import { TdEduraFreeze } from "~/components/tabels/tabel-components";
import { useAppSelector } from "~/context-reduct/hook";
import { selectAllSiswaDTO } from "~/context-reduct/selectores/data-siswa-aktif";
import OrmAbsensi from "~/domain/absensi/orm-absensi";

export default function TdModalEditPotoProfilSiswa({
    kunciKolom,
    id,
    pd_nama,
    className
}:{
    kunciKolom: boolean,
    id:number,
    pd_nama:string,
    className:string
}){
    const {actions} = useModal<OrmAbsensi>()
    const allSiswa = useAppSelector(selectAllSiswaDTO);
    const findSiswa = useMemo(()=>{
            return allSiswa.find(s=>s.id === id)
        },[allSiswa,id]);

    return (
        <TdEduraFreeze 
            stateFreeze={kunciKolom} 
            className={className}
            onClick={()=>actions.open('EDIT PROFIL',findSiswa,{closeOnOutsideClick:false})}
        >
            {pd_nama}
        </TdEduraFreeze>
    )
}