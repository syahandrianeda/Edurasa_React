import type { AtpHasManySoalType } from "~/domain/bank-soal/relational-soal/type";
import type { DisplayFormatItemSoal } from "~/domain/paket-soal/result/display-format-item-soal";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";

export interface InitialItemSoalImplemented{
    currentItemSoal:DisplayFormatItemSoal,
    curriculumProvider:AtpHasManySoalType[]
    triggerUpsert:(v:DisplayFormatItemSoal)=>void
    paketSoalHasIplemented?:DisplayFormatItemSoal[]
}