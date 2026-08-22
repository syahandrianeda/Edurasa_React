import type { FormatElemen, ListBentukSoalType, PgKompleks, PgTunggal, PilihanBenarSalahType, PilihanMenjodohkan } from "~/types/bank-soal/bentuk-soal-type";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import { type Dispatch } from "react"
import type { BankSoalAction } from "~/controllers/bank-soal/reducer-item-soal/action-type-item-soal";

/**@deprecated */
export type SwitchOpsiProps = {
    bentukSoal:ListBentukSoalType,
    dataOpsi:PgTunggal|PgKompleks|PilihanBenarSalahType|PilihanMenjodohkan,
    action:Dispatch<BankSoalAction>
}

/**@deprecated */
export type SwitchSettingJsonAlatJawabHandlerPropsType = {
    bentukSoal:ListBentukSoalType, 
    dataOpsi:PgTunggal|PgKompleks|PilihanBenarSalahType|PilihanMenjodohkan,
    action: (data:BankSoalAppType[keyof BankSoalAppType], key:keyof BankSoalAppType)=>void
}