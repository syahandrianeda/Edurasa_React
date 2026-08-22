import type { PgTunggal } from "~/types/bank-soal/bentuk-soal-type";
import ControlInputPg from "../controls/control-input-pg";
import type { SwitchOpsiProps } from "../export-type-switch-props";

export default function SwitchAlatJawab ({
        bentukSoal, 
        dataOpsi,
        action
    }:SwitchOpsiProps ){
    const dataOpsiPg = {...dataOpsi, valid:0}
    switch(bentukSoal.name){
        case 'pg':
            return <ControlInputPg dataOpsi={dataOpsiPg} action={action}/>
        default:
            return <p>Belum tersedia</p>
    }
}