import type { Draft } from "immer";
import type { ActionDispatch } from "react";
import type { Updater } from "use-immer";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { BankSoalAction } from "./action-type-item-soal";
import { RegistryItemSoalReducer } from "./registry-reducer";

interface ItemSoalReducer{
    itemsoal:BankSoalAppType | null,
    dispatch:Updater<BankSoalAppType | null>
}
/**
 * 
 * @param itemsoal 
 * @param dispatch 
 */


export default function ItemSoalReducer(itemsoal:BankSoalAppType, action:BankSoalAction){
    const reducer = RegistryItemSoalReducer[action.type];

    return reducer.execute(
        itemsoal,
        action as never,
    );
}