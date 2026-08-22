import type { FormatElemen, ListBentukSoalType, PgKompleks, PgTunggal, PilihanBenarSalahType, PilihanMenjodohkan } from "~/types/bank-soal/bentuk-soal-type";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { SwitchSettingJsonAlatJawabHandlerPropsType } from "./export-type-switch-props";
import SettingOpsiPg from "./settings/opsi-pg";



export default function SettingAlatJawabHandler ({
        bentukSoal, 
        dataOpsi,
        action
    }:SwitchSettingJsonAlatJawabHandlerPropsType ){
        // const {OpsiPilihanJawaban, fokusOpsi} = data.json_alat_jawab
    
    return (
        <div className="border bg-white p-1 rounded text-xs flex flex-col md:flex-row gap-2 justify-between">
            <div>
                <p>
                    Bentuk Soal : {bentukSoal?.description}
                </p>
                <p>Cara Koreksi : {bentukSoal?.way_correction}</p>
            </div>
            <SwitchSettingJsonAlatJawab bentukSoal={bentukSoal} data={dataOpsi} onHandler={action}/>
            
        </div>
    )
}

function SwitchSettingJsonAlatJawab ({
    bentukSoal,
    data,
    onHandler
    }:{
        bentukSoal:ListBentukSoalType, 
        data:BankSoalAppType['json_alat_jawab'],
        onHandler:(data:BankSoalAppType[keyof BankSoalAppType], key:keyof BankSoalAppType)=>void
    }){

        
        switch(bentukSoal.name){
            case 'pg':
                return <SettingOpsiPg bentukSoal={bentukSoal}
                        dataOpsi={data as PgTunggal}
                        action={onHandler}
                        />
            case 'pg_kompleks':
                return "PG Kompleks Setting";
            default:
                return 'On Proses';
        }
    }