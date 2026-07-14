import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type"
import type { BankSoalAction } from "./action-type-item-soal"
import { createContext, useCallback, useContext, useMemo, type Dispatch } from "react"
import { useImmerReducer } from "use-immer"
import ItemSoalReducer from "./item-soal-reducer"

export type CreateItemSoalContextProps={
    data:BankSoalAppType,
    action: Dispatch<BankSoalAction>
}
export const CreateItemSoalContext = createContext<CreateItemSoalContextProps|null>(null);
export function useCreateItemSoalContext(){
    const context = useContext(CreateItemSoalContext);
    if(!context){
        throw new Error ('useCreateItemSoalContextmust be used within a CreateItemSoalProvider.')
    }
    return context
}

export function CreateItemSoalProvider({
    children,
    initialData
}: React.ComponentProps<"div"> &{
    initialData:BankSoalAppType
}){
    const [data, action] = useImmerReducer(ItemSoalReducer,initialData);

    const value = useMemo<CreateItemSoalContextProps>(()=>({
        data,
        action
    }),[data, action])

    return (
        <CreateItemSoalContext value={value}>
            {children}
            
        </CreateItemSoalContext>
    )
}