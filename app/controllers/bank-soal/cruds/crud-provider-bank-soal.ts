import { createCrudProvider } from "~/crud/crud-template-provider";
import type { BankSoalServiceInterface } from "~/domain/interfaces/bank-soal-service-interface";
import type { BankSoalSheetType } from "~/types/bank-soal/bank-soal-type";

export const {
    CrudProvider: CrudBankSoalProvider,
    useCrud: useCrudBankSoalProvider,
} = createCrudProvider<BankSoalSheetType, BankSoalServiceInterface>()