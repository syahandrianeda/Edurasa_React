import type { FormatElemen, ListBentukSoalType, PgKompleks, PgTunggal, PilihanBenarSalahType, PilihanMenjodohkan } from "~/types/bank-soal/bentuk-soal-type";
import { type Dispatch } from "react"
import type { BankSoalAction } from "~/controllers/bank-soal/reducer-item-soal/action-type-item-soal";
import SwitchFieldSettingOpsi from "../setting/switch-setting-opsi";



type SettingOpsiProps = {
    fokusBentukSoal:ListBentukSoalType,
    dataOpsi:PgTunggal|PgKompleks|PilihanBenarSalahType|PilihanMenjodohkan,
    action:Dispatch<BankSoalAction>
}
export default function SettingAlatJawab ({
        fokusBentukSoal, 
        dataOpsi,
        action
    }:SettingOpsiProps ){
        // const {OpsiPilihanJawaban, fokusOpsi} = data.json_alat_jawab
    
    return (
        <div className="border bg-white p-1 rounded text-xs flex flex-col md:flex-row gap-2 justify-between">
            <div>
                <p>
                    Bentuk Soal : {fokusBentukSoal?.description}
                </p>
                <p>Cara Koreksi : {fokusBentukSoal?.way_correction}</p>
            </div>
            <SwitchFieldSettingOpsi bentukSoal={fokusBentukSoal} dataOpsi={dataOpsi} action={action}/>
            
        </div>
    )
}