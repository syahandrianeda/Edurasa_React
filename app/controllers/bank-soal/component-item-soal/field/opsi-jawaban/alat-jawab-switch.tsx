import type { FormatElemen, ListBentukSoalType, PgKompleks, PgTunggal, PilihanBenarSalahType, PilihanMenjodohkan } from "~/types/bank-soal/bentuk-soal-type";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { SwitchSettingJsonAlatJawabHandlerPropsType } from "./export-type-switch-props";
import SwitchOpsiPg from './fields/opsi-pg'



export default function AlatJawabHandler ({
        bentukSoal, 
        dataOpsi,
        action
    }:SwitchSettingJsonAlatJawabHandlerPropsType ){

        switch(bentukSoal.name){
            case 'pg':
                return <SwitchOpsiPg bentukSoal={bentukSoal}
                        dataOpsi={dataOpsi as PgTunggal}
                        action={action}
                        />
            case 'pg_kompleks':
                return "PG Kompleks Setting";
            default:
                return 'On Proses';
        }
}

function SwitchJsonAlatJawab ({
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
                return <SwitchOpsiPg bentukSoal={bentukSoal}
                        dataOpsi={data as PgTunggal}
                        action={onHandler}
                        />
            case 'pg_kompleks':
                return "PG Kompleks Setting";
            default:
                return 'On Proses';
        }
    }