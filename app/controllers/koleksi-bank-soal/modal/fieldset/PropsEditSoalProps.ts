import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type"

export type PropsEditSoalProps = {
    currentData: BankSoalAppType,
    
    action:<K extends keyof BankSoalAppType>(value:BankSoalAppType[K],  key:K)=>void
}