import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import SwitchDescriptionOpsiJawaban from "./switch-desciption-opsi-jawaban";
import SettingCreatePg from "./setting-pg";

export default function SwitchSettingOpsi({bentukSoal}:{bentukSoal:ListBentukSoalType}){
    switch(bentukSoal.name){
        case 'pg':
            return <SwitchDescriptionOpsiJawaban fokusBentukSoal={bentukSoal}><SettingCreatePg bentukSoal={bentukSoal}/></SwitchDescriptionOpsiJawaban>;
        case 'pg_kompleks':
            return <SwitchDescriptionOpsiJawaban fokusBentukSoal={bentukSoal}>Hello Deskripi</SwitchDescriptionOpsiJawaban>;
        case 'menjodohkan':
            return <SwitchDescriptionOpsiJawaban fokusBentukSoal={bentukSoal}>Hello Deskripi</SwitchDescriptionOpsiJawaban>;
        case 'benar_salah':
            return <SwitchDescriptionOpsiJawaban fokusBentukSoal={bentukSoal}>Hello Deskripi</SwitchDescriptionOpsiJawaban>;
        case 'rapih':
            return <SwitchDescriptionOpsiJawaban fokusBentukSoal={bentukSoal}>Hello Deskripi</SwitchDescriptionOpsiJawaban>;
        default:
            return <p>Opsi Tidak tersedia</p>

        
    }
}