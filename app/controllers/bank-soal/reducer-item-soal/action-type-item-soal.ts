import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type"
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm"

export type BankSoalAction =
    | setIdbaris
    | setBentukSoal
    | setCreatorItemSoal
    | removeJson_alat_jawab
    | setPropertyKurikulum
    | setItemSoal
    | resetItemSoal
    | initializeItemSoal
    ;

export interface setIdbaris{
    type: 'idbaris',
    payload:number
}
export interface removeJson_alat_jawab{
    type:'remove_json_alat_jawab',
    //payload: 'json_alat_jawab'
    // payload?:string
};
export interface setPropertyKurikulum{
    type:'propertyKurikulum',
    payload:AtpAsOrm
}
export interface setBentukSoal{
    type:'bentuk_soal',
    payload:ListBentukSoalType
}
export interface setCreatorItemSoal{
    type:'creator',
    payload:string
}
export interface setItemSoal{
    type:'set_item_soal',
    payload:Partial<BankSoalAppType>;
}
export interface resetItemSoal{
    type: 'reset'
}
export interface initializeItemSoal{
    type: "initialize",
    payload: {
        kurikulum:AtpAsOrm,
        bentukSoal:ListBentukSoalType,
        creator:string,
        jenjang:number,
        mapel:string,
    },
}