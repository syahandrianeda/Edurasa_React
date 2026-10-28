import { sortArrayObjectByOrder } from "~/lib/sort-array-by-order";

export function SanitizerOrderMapelBasedOnMapelRaport<T>(arrayObject: T[], order:string[]):T[]{
    const key = 'kodeMapel' as keyof T;
    
    return sortArrayObjectByOrder(arrayObject,key,order)

}