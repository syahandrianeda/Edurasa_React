import { useMemo } from "react";
import { useModal } from "~/components/modals/modal-provider";
import { TdEduraFreeze } from "~/components/tabels/tabel-components";
import TooltipComp from "~/components/ui_edura/tooltip-comp";
import { useAppSelector } from "~/context-reduct/hook";
import { selectAllSiswaDTO } from "~/context-reduct/selectores/data-siswa-aktif";
import type OrmAbsensi from "~/domain/absensi/orm-absensi";

export default function TdModalEditDataSiswa({
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
    const keterangan_tgl_keluar = findSiswa?.keluar_tgl?.toLocaleString('id-ID',{dateStyle:'long'}) ?? 'tanggal yang belum ditentukan';
    return (
        <TooltipComp content={`${findSiswa?.aktif} pada ${keterangan_tgl_keluar}`}>

            <TdEduraFreeze 
                stateFreeze={kunciKolom} 
                className={className}
                data-content-type="string"
                onClick={()=>actions.open('EDIT SISWA',findSiswa,{closeOnOutsideClick:false})}
            >
                {pd_nama}
            </TdEduraFreeze>
        </TooltipComp>
    )
}