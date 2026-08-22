import type { FormatElemen, ListBentukSoalType, PgKompleks, PgTunggal, PilihanBenarSalahType, PilihanMenjodohkan } from "~/types/bank-soal/bentuk-soal-type";
import { type Dispatch } from "react"
import type { BankSoalAction } from "~/controllers/bank-soal/reducer-item-soal/action-type-item-soal";
import type { SwitchOpsiProps } from "../export-type-switch-props";
import SettingPg from "./setting-pg";
import SettingPgKompleks from "./setting-pg-kompleks";

export default function SwitchFieldSettingOpsi({bentukSoal, dataOpsi, action}:SwitchOpsiProps){
    
    switch(bentukSoal.name){
        case 'pg':
            return <SettingPg bentukSoal={bentukSoal} dataOpsi={dataOpsi} action={action}/>
        case 'pg_kompleks':
            return <SettingPgKompleks bentukSoal={bentukSoal} dataOpsi={dataOpsi} action={action}/>
        default:
            return (
                <div>Belum Tersedia</div>
            )
    }
}